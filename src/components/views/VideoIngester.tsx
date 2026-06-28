import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { CheckCircle2, Film, Edit3, Check, X } from 'lucide-react';

export function VideoIngester() {
  const subjects = useQuery(api.admin.listSubjects);
  const notesList = useQuery(api.notesIngestion.listAllNotes);
  const attachVideoToNote = useMutation(api.notesIngestion.attachVideoToNote);
  const updateVideo = useMutation(api.admin.updateVideo);

  // Form states
  const [classLevel, setClassLevel] = useState('Basic 9');
  const [subjectCode, setSubjectCode] = useState('');
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  
  // Status states
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Edit states
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [editVideoTitle, setEditVideoTitle] = useState('');
  const [editVideoUrl, setEditVideoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Update default subject code when subjects query completes
  useEffect(() => {
    if (subjects && subjects.length > 0 && !subjectCode) {
      setSubjectCode(subjects[0].code);
    }
  }, [subjects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedNoteId) {
      setErrorMsg('ERROR: TARGET NOTES TOPIC KEY REQUIRED');
      return;
    }
    if (!videoUrl.trim()) {
      setErrorMsg('ERROR: VIDEO STREAM URL REQUIRED');
      return;
    }
    if (!videoTitle.trim()) {
      setErrorMsg('ERROR: VIDEO DESCRIPTIVE NAME REQUIRED');
      return;
    }

    setIsLoading(true);
    try {
      await attachVideoToNote({
        noteId: selectedNoteId as Id<"notes">,
        videoUrl: videoUrl.trim(),
        videoTitle: videoTitle.trim(),
      });
      setStatus('success');
      setVideoUrl('');
      setVideoTitle('');
    } catch (err: any) {
      setErrorMsg(err.message || 'SYSTEM_REGISTRATION_FAILURE: CHECK DATABASE TELEMETRY');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent, noteId: string) => {
    e.preventDefault();
    if (!editVideoTitle.trim() || !editVideoUrl.trim()) return;

    setIsSaving(true);
    try {
      await updateVideo({
        id: noteId as Id<"notes">,
        videoTitle: editVideoTitle.trim(),
        videoUrl: editVideoUrl.trim(),
      });
      setEditingVideoId(null);
    } catch (err: any) {
      alert(err.message || 'Error updating video resource');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white border-4 border-black p-6 rounded-none shadow-[6px_6px_0_0_rgba(0,0,0,1)] relative select-none space-y-8 text-left">
      <div className="absolute -top-4 -left-4 bg-[#FF007F] border-2 border-black px-2 py-1 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
        VIDEO_PIPELINE
      </div>

      <div className="border-b-4 border-black pb-4">
        <h2 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
          VIDEO CURRICULUM INGESTER
        </h2>
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-1">
          Link Stream Lesson Reference Payloads to Active Academic Topics
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-[#A7F3D0] border-4 border-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col items-center gap-4 text-center">
          <CheckCircle2 size={40} className="text-black" />
          <div>
            <h3 className="font-mono text-xs font-black uppercase tracking-widest text-black">
              VIDEO PIPELINE UPDATED
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-wider text-black/75 mt-1">
              Video attachment deployed and synchronized successfully!
            </p>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-mono text-[10px] uppercase font-bold py-2 px-4 transition-colors cursor-pointer"
          >
            INGEST ANOTHER VIDEO
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="bg-[#FCA5A5] border-2 border-black p-3 font-mono text-[9px] font-bold uppercase text-black">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Level select */}
            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                CLASS LEVEL //
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs uppercase focus:outline-none focus:bg-[#FFF3C4] focus:ring-2 focus:ring-black placeholder-gray-400 font-bold"
              >
                <option value="Basic 7">BASIC 7</option>
                <option value="Basic 8">BASIC 8</option>
                <option value="Basic 9">BASIC 9</option>
              </select>
            </div>

            {/* Subject Code select */}
            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                SUBJECT CODE //
              </label>
              <select
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs uppercase focus:outline-none focus:bg-[#FFF3C4] focus:ring-2 focus:ring-black placeholder-gray-400 font-bold"
              >
                {subjects?.map((sub) => (
                  <option key={sub._id} value={sub.code}>
                    {sub.name} ({sub.code})
                  </option>
                )) || <option value="">NO SUBJECTS DETECTED</option>}
              </select>
            </div>
          </div>

          {/* Target Note Selection / Lookup Key */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black flex justify-between">
              <span>TARGET NOTES TOPIC KEY //</span>
              <span className="text-gray-400">REQUIRED</span>
            </label>
            <select
              value={selectedNoteId}
              onChange={(e) => setSelectedNoteId(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs uppercase focus:outline-none focus:bg-[#FFF3C4] focus:ring-2 focus:ring-black placeholder-gray-400 font-bold"
            >
              <option value="">-- SELECT TARGET TOPIC --</option>
              {notesList?.filter(n => n.classLevel === classLevel).map((note) => (
                <option key={note._id} value={note._id}>
                  {note.title} [{note.staticLookupKey}]
                </option>
              ))}
            </select>
          </div>

          {/* Video Title */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
              VIDEO LESSON TITLE //
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="E.G., HOW SPREADSHEETS CALCULATE FORMULAS"
              className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs uppercase focus:outline-none focus:bg-[#FFF3C4] focus:ring-2 focus:ring-black placeholder-gray-400 font-bold"
            />
          </div>

          {/* Video URL */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
              STREAM SOURCE URL //
            </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="E.G., HTTPS://WWW.YOUTUBE.COM/WATCH?V=..."
              className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs uppercase focus:outline-none focus:bg-[#FFF3C4] focus:ring-2 focus:ring-black placeholder-gray-400 font-bold"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00FF88] text-black border-2 border-black py-3 font-mono font-black text-sm uppercase rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'SYNCING PIPELINE...' : '🚀 ATTACH MEDIA'}
          </button>
        </form>
      )}

      {/* Registry Preview Engine */}
      <div className="space-y-4 pt-6 border-t-4 border-black">
        <h3 className="font-mono text-xs font-black uppercase tracking-widest text-black flex items-center gap-1.5">
          <Film size={14} />
          <span>CURATED_VIDEO_REGISTRY //</span>
        </h3>
        <div className="max-h-64 overflow-y-auto pr-1">
          {notesList && notesList.filter(n => n.videoUrl).length > 0 ? (
            notesList.filter(n => n.videoUrl).map((note) => {
              const sub = subjects?.find(s => s._id === note.subjectId);
              const isEditing = editingVideoId === note._id;

              if (isEditing) {
                return (
                  <form 
                    key={note._id} 
                    onSubmit={(e) => handleEditSubmit(e, note._id)}
                    className="border-4 border-black mb-4 p-4 bg-[#FFF3C4] space-y-4 rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left w-full min-w-0 overflow-hidden"
                  >
                    <div className="font-mono text-[9px] font-black uppercase text-black tracking-widest border-b-2 border-black pb-2 flex justify-between items-center min-w-0">
                      <span className="truncate pr-2">EDITING_VIDEO_RESOURCE // {note.staticLookupKey}</span>
                    </div>

                    <div className="flex flex-col space-y-1 w-full min-w-0">
                      <label className="font-mono text-[9px] font-bold uppercase tracking-wider text-black">TITLE //</label>
                      <input 
                        type="text"
                        value={editVideoTitle}
                        onChange={(e) => setEditVideoTitle(e.target.value)}
                        className="w-full bg-white border-2 border-black rounded-none p-2.5 font-mono text-xs uppercase focus:outline-none focus:ring-2 focus:ring-black font-bold min-w-0 block"
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-1 w-full min-w-0">
                      <label className="font-mono text-[9px] font-bold uppercase tracking-wider text-black">STREAM URL //</label>
                      <input 
                        type="text"
                        value={editVideoUrl}
                        onChange={(e) => setEditVideoUrl(e.target.value)}
                        className="w-full bg-white border-2 border-black rounded-none p-2.5 font-mono text-xs uppercase focus:outline-none focus:ring-2 focus:ring-black font-bold min-w-0 block"
                        required
                      />
                    </div>

                    <div className="flex gap-2 justify-end pt-1 flex-wrap w-full min-w-0">
                      <button
                        type="button"
                        onClick={() => setEditingVideoId(null)}
                        className="px-3 py-1.5 border-2 border-black bg-white text-black font-mono text-[9px] font-bold uppercase flex items-center gap-1 hover:bg-gray-100 cursor-pointer flex-shrink-0"
                      >
                        <X size={12} />
                        <span>CANCEL</span>
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-3 py-1.5 border-2 border-black bg-[#00FF88] text-black font-mono text-[9px] font-bold uppercase flex items-center gap-1 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:shadow-[1px_1px_0_0_rgba(0,0,0,1)] cursor-pointer disabled:opacity-50 flex-shrink-0"
                      >
                        <Check size={12} />
                        <span>{isSaving ? 'SAVING...' : 'SAVE CHANGES'}</span>
                      </button>
                    </div>
                  </form>
                );
              }

              return (
                <div key={note._id} className="border-2 border-black mb-2 p-3 bg-[#F9F9F9] flex justify-between items-center font-mono text-xs font-bold rounded-none w-full min-w-0 overflow-hidden gap-2">
                  <div className="flex flex-col text-left max-w-[65%] min-w-0 flex-1">
                    <span className="text-black uppercase truncate block">{note.videoTitle || 'UNTITLED VIDEO'}</span>
                    <span className="text-[9px] text-gray-500 lowercase mt-0.5 truncate block">{note.videoUrl}</span>
                  </div>
                  <div className="flex items-center gap-3.5 flex-shrink-0 min-w-0">
                    <button
                      onClick={() => {
                        setEditingVideoId(note._id);
                        setEditVideoTitle(note.videoTitle || '');
                        setEditVideoUrl(note.videoUrl || '');
                      }}
                      className="font-mono text-[9px] font-bold text-black border-2 border-black bg-white hover:bg-[#38BDF8] px-2 py-1 transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-none flex items-center gap-1 flex-shrink-0"
                    >
                      <Edit3 size={10} />
                      <span>EDIT</span>
                    </button>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="bg-black text-[#00FF88] px-2 py-0.5 border border-black text-[9px] uppercase">
                        {sub ? sub.code : 'LESSON'}
                      </span>
                      <span className="text-[9px] text-gray-500 uppercase">{note.staticLookupKey}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center p-4 border border-dashed border-gray-300 font-mono text-[9px] text-gray-400 uppercase tracking-wider">
              [ NO VIDEO LINKS REGISTERED ]
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
