import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { CheckCircle2, AlertTriangle, Database, Edit2, Check, X } from 'lucide-react';

export function NoteIngester() {
  const subjects = useQuery(api.admin.listSubjects);
  const notesList = useQuery(api.notesIngestion.listAllNotes);
  
  const registerNoteMetadata = useMutation(api.notesIngestion.registerNoteMetadata);
  const updateNote = useMutation(api.notesIngestion.updateNote);

  // Form states (Registration)
  const [title, setTitle] = useState('');
  const [classLevel, setClassLevel] = useState('Basic 9');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [staticLookupKey, setStaticLookupKey] = useState('');
  
  // Loading & Ingestion states
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [ingestedNoteId, setIngestedNoteId] = useState<string | null>(null);

  // Editing states
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editClassLevel, setEditClassLevel] = useState('Basic 9');
  const [editSubjectId, setEditSubjectId] = useState('');
  const [editStaticLookupKey, setEditStaticLookupKey] = useState('');
  const [editStatus, setEditStatus] = useState<'IDLE' | 'SAVING' | 'SYNCED'>('IDLE');
  const [editError, setEditError] = useState('');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedClass, setSelectedClass] = useState('ALL');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('ERROR: LESSON TOPIC TITLE REQUIRED');
      return;
    }
    if (!selectedSubjectId) {
      setErrorMsg('ERROR: SUBJECT NODE SELECTION REQUIRED');
      return;
    }
    if (!staticLookupKey.trim()) {
      setErrorMsg('ERROR: LOCAL DATA ARRAY KEY MATCH REQUIRED');
      return;
    }

    setStatus('processing');

    try {
      const noteId = await registerNoteMetadata({
        title: title.trim(),
        classLevel,
        subjectId: selectedSubjectId as Id<"subjects">,
        staticLookupKey: staticLookupKey.trim(),
      });

      setIngestedNoteId(noteId);
      setStatus('success');
      setTitle('');
      setStaticLookupKey('');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'SYSTEM_REGISTRATION_FAILURE: CHECK DATABASE TELEMETRY');
    }
  };

  const handleStartEdit = (note: any) => {
    setEditingNoteId(note._id);
    setEditTitle(note.title);
    setEditClassLevel(note.classLevel);
    setEditSubjectId(note.subjectId);
    setEditStaticLookupKey(note.staticLookupKey);
    setEditStatus('IDLE');
    setEditError('');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNoteId) return;

    if (!editTitle.trim()) {
      setEditError('ERROR: TITLE REQUIRED');
      return;
    }
    if (!editSubjectId) {
      setEditError('ERROR: SUBJECT REQUIRED');
      return;
    }
    if (!editStaticLookupKey.trim()) {
      setEditError('ERROR: LOOKUP KEY REQUIRED');
      return;
    }

    setEditStatus('SAVING');
    try {
      await updateNote({
        id: editingNoteId as Id<"notes">,
        title: editTitle.trim(),
        classLevel: editClassLevel,
        subjectId: editSubjectId as Id<"subjects">,
        staticLookupKey: editStaticLookupKey.trim(),
      });
      setEditStatus('SYNCED');
      setTimeout(() => {
        setEditingNoteId(null);
      }, 600);
    } catch (err: any) {
      setEditStatus('IDLE');
      setEditError(err.message || 'UPDATE FAILURE');
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative select-none space-y-10">
      <div className="absolute -top-4 -left-4 bg-[#FF3B30] border-2 border-black px-2 py-1 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
        METADATA_REGISTRY
      </div>

      <div className="border-b-4 border-black pb-4">
        <h2 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
          LESSON METADATA REGISTRY
        </h2>
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-1">
          Local Static Curriculum Restructuring Gateway
        </p>
      </div>

      {status === 'processing' ? (
        /* Thick Marquee Loader */
        <div className="flex flex-col items-center justify-center py-16 gap-6 bg-gray-50 border-2 border-black">
          <div className="w-full bg-black text-[#FFD833] border-y-4 border-black overflow-hidden py-3 relative">
            <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono text-xs font-black uppercase tracking-widest">
              <span>[ REGISTERING_LESSON_MAP: SEEDING LOOKUP REFERENCES... ]</span>
              <span>[ COMPACTING_CURRICULUM_ROW... ]</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-[#FFD833] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-4 h-4 bg-[#38BDF8] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 bg-[#A7F3D0] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="font-mono text-[10px] text-black font-bold uppercase tracking-wider">
            [ REGISTERING_LESSON_MAP... ]
          </span>
        </div>
      ) : status === 'success' ? (
        /* Ingestion Success View */
        <div className="bg-[#A7F3D0] border-4 border-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col items-center gap-4 text-center">
          <CheckCircle2 size={40} className="text-black" />
          <div>
            <h3 className="font-mono text-xs font-black uppercase tracking-widest text-black">
              METADATA REGISTERED
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-wider text-black/75 mt-1">
              Lesson reference mapping deployment successful!
            </p>
          </div>
          <div className="font-mono text-[8px] bg-white border border-black px-2 py-1 text-black font-bold uppercase">
            DB_REF // {ingestedNoteId}
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-mono text-[10px] uppercase font-bold py-2 px-4 transition-colors cursor-pointer"
          >
            REGISTER ANOTHER LESSON
          </button>
        </div>
      ) : (
        /* Main Registration Form */
        <form onSubmit={handleSubmit} className="space-y-5 border-4 border-black rounded-none bg-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          {/* Note Title */}
          <div className="flex flex-col space-y-1.5 text-left">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black flex justify-between">
              <span>LESSON TOPIC TITLE //</span>
              <span className="text-gray-400">REQUIRED</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.G., INTRODUCTION TO POLYNOMIALS"
              className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black placeholder-gray-400 focus:outline-none focus:bg-[#FFF3C4]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Level Dropdown */}
            <div className="flex flex-col space-y-1.5 text-left">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                CURRICULUM LEVEL //
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black focus:outline-none focus:bg-[#FFF3C4]"
              >
                <option value="Basic 7">Basic 7</option>
                <option value="Basic 8">Basic 8</option>
                <option value="Basic 9">Basic 9</option>
              </select>
            </div>

            {/* Subject Selector */}
            <div className="flex flex-col space-y-1.5 text-left">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                MAP TO SUBJECT //
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black focus:outline-none focus:bg-[#FFF3C4]"
              >
                <option value="">SELECT SUBJECT NODE</option>
                {subjects?.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.code} - {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Local Lookup Key Match */}
          <div className="flex flex-col space-y-1.5 text-left">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black flex justify-between">
              <span>LOCAL DATA ARRAY KEY MATCH //</span>
              <span className="text-gray-400">REQUIRED</span>
            </label>
            <input
              type="text"
              value={staticLookupKey}
              onChange={(e) => setStaticLookupKey(e.target.value)}
              placeholder="E.G., algorithm-basics"
              className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black placeholder-gray-400 focus:outline-none focus:bg-[#FFF3C4]"
            />
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="bg-[#FF3B30] text-black border-2 border-black p-3 rounded-none flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wide shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <AlertTriangle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#FFD833] border-2 border-black rounded-none py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-black flex items-center justify-center gap-2 cursor-pointer transition-all duration-100 ease-in-out hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
          >
            <span>REGISTER LESSON METADATA</span>
            <Database size={14} />
          </button>
        </form>
      )}

      {/* Ingested Notes List and Editor Section */}
      <div className="space-y-6 border-t-4 border-black pt-8">
        <div className="text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-serif text-xl md:text-2xl font-black uppercase text-black">
              INGESTED CURRICULUM NODES
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-1">
              Real-Time Active Database Streams
            </p>
          </div>
        </div>

        {/* Brutalist Control Deck UI */}
        <div className="border-4 border-black bg-[#F0F0F0] p-4 space-y-4 text-left shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          <div className="flex flex-col space-y-1.5">
            <label className="font-mono text-[10px] font-bold uppercase text-black">SEARCH CURRICULUM NODES //</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="FILTER BY TITLE OR LOOKUP KEY..."
              className="w-full bg-white border-2 border-black rounded-none p-3 font-mono uppercase text-xs focus:outline-none placeholder-gray-500 font-bold focus:bg-[#FFF3C4]"
            />
          </div>

          {/* Class level filter chips */}
          <div className="space-y-2">
            <span className="font-mono text-[9px] font-bold text-gray-500 uppercase block">FILTER BY LEVEL //</span>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'Basic 7', 'Basic 8', 'Basic 9'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedClass(lvl)}
                  className={`px-3 py-1.5 font-mono text-[10px] cursor-pointer rounded-none font-bold border-2 border-black transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_rgba(0,0,0,1)]
                    ${selectedClass === lvl 
                      ? 'bg-[#FFDE00] text-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' 
                      : 'bg-white text-black'
                    }
                  `}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Subject filter chips */}
          <div className="space-y-2">
            <span className="font-mono text-[9px] font-bold text-gray-500 uppercase block">FILTER BY SUBJECT NODE //</span>
            <div className="flex flex-wrap gap-2">
              {['ALL', ...(subjects ? subjects.map(s => s._id) : [])].map((subId) => {
                const subObj = subjects?.find(s => s._id === subId);
                const displayName = subId === 'ALL' ? 'ALL SUBJECTS' : subObj ? `${subObj.code} (${subObj.name.toUpperCase()})` : 'UNKNOWN';
                return (
                  <button
                    key={subId}
                    type="button"
                    onClick={() => setSelectedSubject(subId)}
                    className={`px-3 py-1.5 font-mono text-[10px] cursor-pointer rounded-none font-bold border-2 border-black transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_rgba(0,0,0,1)]
                      ${selectedSubject === subId 
                        ? 'bg-[#38BDF8] text-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' 
                        : 'bg-white text-black'
                      }
                    `}
                  >
                    {displayName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filtered Notes List Rendering */}
        <div className="space-y-4">
          {notesList === undefined ? (
            <div className="font-mono text-xs font-bold uppercase text-gray-400 p-4 border-2 border-dashed border-black/30">
              STREAMING ACTIVE NOTES...
            </div>
          ) : notesList.length === 0 ? (
            <div className="font-mono text-xs font-bold uppercase text-gray-400 p-4 border-2 border-dashed border-black/30">
              NO ACTIVE LESSON METADATA DETECTED
            </div>
          ) : (() => {
            const filteredNotes = notesList.filter(note => {
              const matchesClass = selectedClass === 'ALL' || note.classLevel === selectedClass;
              const matchesSubject = selectedSubject === 'ALL' || note.subjectId === selectedSubject;
              const matchesSearch = searchQuery.trim() === '' || 
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.staticLookupKey.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesClass && matchesSubject && matchesSearch;
            });

            if (filteredNotes.length === 0) {
              return (
                <div className="font-mono text-xs font-bold uppercase text-red-500 p-8 border-2 border-dashed border-black text-center bg-red-50">
                  NO MATCHING NOTES SYNCED
                </div>
              );
            }

            return filteredNotes.map((note) => {
              const isNoteEditing = editingNoteId === note._id;
              const mappedSubject = subjects?.find(s => s._id === note.subjectId);

              return (
                <div 
                  key={note._id}
                  className="border-4 border-black bg-white p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col gap-4 text-left transition-all"
                >
                  {isNoteEditing ? (
                    /* Inline Editing Mode Form */
                    <form onSubmit={handleSaveEdit} className="space-y-4 w-full">
                      <div className="flex flex-col space-y-1">
                        <label className="font-mono text-[9px] font-bold text-gray-500 uppercase">TITLE //</label>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="rounded-none border-2 border-black bg-white p-2.5 font-mono text-xs font-bold uppercase focus:outline-none focus:bg-[#FFF3C4]"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[9px] font-bold text-gray-500 uppercase">CURRICULUM LEVEL //</label>
                          <select
                            value={editClassLevel}
                            onChange={(e) => setEditClassLevel(e.target.value)}
                            className="rounded-none border-2 border-black bg-white p-2.5 font-mono text-xs font-bold uppercase focus:outline-none focus:bg-[#FFF3C4]"
                          >
                            <option value="Basic 7">Basic 7</option>
                            <option value="Basic 8">Basic 8</option>
                            <option value="Basic 9">Basic 9</option>
                          </select>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[9px] font-bold text-gray-500 uppercase">MAP TO SUBJECT //</label>
                          <select
                            value={editSubjectId}
                            onChange={(e) => setEditSubjectId(e.target.value)}
                            className="rounded-none border-2 border-black bg-white p-2.5 font-mono text-xs font-bold uppercase focus:outline-none focus:bg-[#FFF3C4]"
                          >
                            <option value="">SELECT SUBJECT</option>
                            {subjects?.map((sub) => (
                              <option key={sub._id} value={sub._id}>
                                {sub.code} - {sub.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label className="font-mono text-[9px] font-bold text-gray-500 uppercase">LOCAL DATA KEY MATCH //</label>
                        <input
                          type="text"
                          value={editStaticLookupKey}
                          onChange={(e) => setEditStaticLookupKey(e.target.value)}
                          className="rounded-none border-2 border-black bg-white p-2.5 font-mono text-xs font-bold uppercase focus:outline-none focus:bg-[#FFF3C4]"
                        />
                      </div>

                      {editError && (
                        <div className="bg-[#FF3B30] text-black border-2 border-black p-2 font-mono text-[9px] font-bold uppercase tracking-wide">
                          {editError}
                        </div>
                      )}

                      <div className="flex gap-2 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingNoteId(null)}
                          className="px-3 py-1.5 border-2 border-black bg-white text-black font-mono text-[9px] font-bold uppercase flex items-center gap-1 hover:bg-gray-100 cursor-pointer"
                        >
                          <X size={12} />
                          <span>CANCEL</span>
                        </button>
                        <button
                          type="submit"
                          disabled={editStatus === 'SAVING'}
                          className="px-3 py-1.5 border-2 border-black bg-[#00FF88] text-black font-mono text-[9px] font-bold uppercase flex items-center gap-1 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:shadow-[1px_1px_0_0_rgba(0,0,0,1)] cursor-pointer disabled:opacity-50"
                        >
                          <Check size={12} />
                          <span>{editStatus === 'SAVING' ? 'SAVING...' : editStatus === 'SYNCED' ? 'SYNCED' : 'SAVE SYNC'}</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Static Display Mode */
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[8px] font-bold bg-[#FFD833] border border-black px-1.5 py-0.5 text-black">
                            {note.classLevel}
                          </span>
                          <span className="font-mono text-[8px] font-bold bg-[#C4B5FD] border border-black px-1.5 py-0.5 text-black uppercase">
                            KEY: {note.staticLookupKey}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg font-black text-black uppercase leading-tight mt-1">
                          {note.title}
                        </h4>
                        <p className="font-mono text-[8px] text-gray-400">
                          SUBJECT: {mappedSubject ? `${mappedSubject.code} (${mappedSubject.name.toUpperCase()})` : 'UNKNOWN NODE'}
                        </p>
                      </div>

                      <div className="flex-shrink-0 self-end md:self-center">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(note)}
                          className="px-3 py-1.5 border-2 border-black bg-[#38BDF8] text-black font-mono text-[9px] font-bold uppercase flex items-center gap-1 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:shadow-[1px_1px_0_0_rgba(0,0,0,1)] cursor-pointer"
                        >
                          <Edit2 size={12} />
                          <span>EDIT NOTE</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}

