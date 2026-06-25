import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  ArrowLeft, 
  GraduationCap, 
  Layers 
} from 'lucide-react';

type LibraryScreen = 'grades' | 'topics' | 'note_detail';

interface LibraryViewProps {
  onNoteSelect?: (noteId: string) => void;
}

export function LibraryView({ onNoteSelect }: LibraryViewProps) {
  const subjects = useQuery(api.admin.listSubjects);

  const [screen, setScreen] = useState<LibraryScreen>('grades');
  const [expandedGradeId, setExpandedGradeId] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<any | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<any | null>(null);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);

  const notes = useQuery(
    api.notesIngestion.getNotesBySubject,
    selectedSubject?._id ? { subjectId: selectedSubject._id } : 'skip'
  );

  const grades = [
    { id: 'basic-7', label: 'Basic 7', tag: 'JHS_01' },
    { id: 'basic-8', label: 'Basic 8', tag: 'JHS_02' },
    { id: 'basic-9', label: 'Basic 9', tag: 'JHS_03' },
  ];

  const getSubjectColor = (code: string) => {
    const cleanCode = (code || '').toUpperCase();
    if (cleanCode.startsWith('MATH')) return '#FFD833'; // Yellow
    if (cleanCode.startsWith('PHYS') || cleanCode.startsWith('SCI')) return '#A7F3D0'; // Green
    if (cleanCode.startsWith('CYBER') || cleanCode.startsWith('ICT')) return '#C4B5FD'; // Purple
    if (cleanCode.startsWith('ENG')) return '#38BDF8'; // Blue
    const fallbacks = ['#FFD833', '#A7F3D0', '#38BDF8', '#C4B5FD', '#FCA5A5'];
    let hash = 0;
    for (let i = 0; i < cleanCode.length; i++) {
      hash = cleanCode.charCodeAt(i) + ((hash << 5) - hash);
    }
    return fallbacks[Math.abs(hash) % fallbacks.length];
  };

  const getSubjectsForGrade = (gradeId: string) => {
    if (!subjects) return [];
    return subjects.filter(subj => {
      const code = (subj.code || '').toLowerCase();
      const name = (subj.name || '').toLowerCase();
      
      if (gradeId === 'basic-7') {
        return code.includes('7') || code.endsWith('01') || code.includes('math01') || name.includes('7') || code.includes('cyber03');
      }
      if (gradeId === 'basic-8') {
        return code.includes('8') || code.endsWith('02') || name.includes('8') || code.includes('phys02');
      }
      if (gradeId === 'basic-9') {
        return code.includes('9') || code.endsWith('03') || name.includes('9') || (!code.includes('7') && !code.includes('8') && !code.includes('01') && !code.includes('02'));
      }
      return false;
    });
  };

  const handleGradeToggle = (gradeId: string) => {
    setExpandedGradeId(prev => (prev === gradeId ? null : gradeId));
  };

  const handleSubjectClick = (grade: any, subject: any) => {
    setSelectedGrade(grade);
    setSelectedSubject(subject);
    setScreen('topics');
  };

  const handleBack = () => {
    if (screen === 'note_detail') {
      setScreen('topics');
      setSelectedNote(null);
    } else if (screen === 'topics') {
      setScreen('grades');
      setSelectedSubject(null);
    }
  };

  if (!subjects) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="border-4 border-black bg-black text-[#FFD833] p-8 font-mono text-xs font-bold uppercase tracking-widest text-center shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          [ DATA_STREAM_SYNCING... ]
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-10 hide-scrollbar pb-24 md:pb-10 max-w-6xl mx-auto w-full bg-white select-none">
      
      {screen === 'note_detail' && selectedNote ? (
        /* Detailed Learning Note Viewer Panel */
        <div className="space-y-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors cursor-pointer group font-mono text-[10px] font-bold uppercase tracking-widest bg-transparent border-0"
          >
            <ArrowLeft size={16} className="group-hover:translate-x-[-2px] transition-transform text-black" />
            <span>RETURN_TO_RESOURCES_INDEX</span>
          </button>

          {/* Header */}
          <div className="border-b-4 border-black pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
                {selectedNote.summaryBadge}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none">
                {selectedNote.title}
              </h1>
              <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">
                TARGET CLASS: {selectedNote.classLevel}
              </p>
            </div>
            <div className="px-4 py-2 border-2 border-black bg-[#FFD833] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] font-mono text-[10px] font-bold uppercase tracking-widest">
              OFFICIAL TRANSMISSION
            </div>
          </div>

          {/* Content Blocks */}
          <div className="space-y-8 max-w-3xl">
            {selectedNote.contentBlocks.map((block: any, idx: number) => {
              switch (block.type) {
                case 'challenge_callout':
                  return (
                    <div 
                      key={idx}
                      className="border-4 border-black bg-[#FFD833] p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none relative overflow-hidden"
                    >
                      <div className="absolute -top-1 -right-1 bg-black text-[#FFD833] border-l-2 border-b-2 border-black px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-wider">
                        EXAM_INTEL
                      </div>
                      {block.heading && (
                        <h4 className="font-serif text-lg font-black uppercase tracking-tight text-black mb-2">
                          {block.heading}
                        </h4>
                      )}
                      <p className="font-mono text-xs font-bold uppercase tracking-wide leading-relaxed text-black">
                        {block.body}
                      </p>
                    </div>
                  );
                case 'bullet_list':
                  return (
                    <div key={idx} className="space-y-3">
                      {block.heading && (
                        <h3 className="font-serif text-xl font-black uppercase tracking-tight text-black">
                          {block.heading}
                        </h3>
                      )}
                      <ul className="list-none space-y-2.5 pl-4 border-l-4 border-black">
                        {block.body.split('\n').map((point: string, pIdx: number) => (
                          <li key={pIdx} className="font-mono text-xs uppercase tracking-wider text-black font-semibold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-black inline-block flex-shrink-0"></span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                case 'text':
                default:
                  return (
                    <div key={idx} className="space-y-2">
                      {block.heading && (
                        <h3 className="font-serif text-xl font-black uppercase tracking-tight text-black">
                          {block.heading}
                        </h3>
                      )}
                      <p className="font-sans text-sm text-black leading-relaxed font-semibold">
                        {block.body}
                      </p>
                    </div>
                  );
              }
            })}
          </div>
        </div>
      ) : screen === 'topics' && selectedGrade && selectedSubject ? (
        /* SCREEN: TOPIC LISTING (Notes & Resources) */
        <div className="space-y-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors cursor-pointer group font-mono text-[10px] font-bold uppercase tracking-widest bg-transparent border-0"
          >
            <ArrowLeft size={16} className="group-hover:translate-x-[-2px] transition-transform text-black" />
            <span>RETURN_TO_LIBRARY</span>
          </button>

          {/* Header */}
          <div className="border-b-4 border-black pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
                {selectedGrade.tag} // {selectedSubject.code}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none">
                {selectedSubject.name}
              </h1>
              <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">
                {selectedGrade.label} &middot; {notes ? notes.length : 0} Resources
              </p>
            </div>
            <div
              className="px-4 py-2 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-black font-mono text-[10px] font-bold uppercase tracking-widest"
              style={{ backgroundColor: getSubjectColor(selectedSubject.code) }}
            >
              MODULE_INSTRUCTION_PACK
            </div>
          </div>

          {/* Notes Cards Grid */}
          {/* Notes Cards Grid */}
          {(() => {
            const groupedNotes: { [title: string]: any[] } = {};
            if (notes) {
              notes.forEach((note) => {
                if (!groupedNotes[note.title]) {
                  groupedNotes[note.title] = [];
                }
                groupedNotes[note.title].push(note);
              });
              Object.keys(groupedNotes).forEach((title) => {
                groupedNotes[title].sort((a, b) => (a.subTopicIndex ?? 0) - (b.subTopicIndex ?? 0));
              });
            }

            const hasNotes = Object.keys(groupedNotes).length > 0;

            if (hasNotes) {
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(groupedNotes).map(([mainTitle, subNotes]) => (
                    <div 
                      key={mainTitle} 
                      className="border-4 border-black bg-[#F3F4F6] p-5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col gap-4"
                    >
                      <div className="flex items-center justify-between border-b-2 border-black pb-2">
                        <h4 className="font-serif text-base md:text-lg font-black uppercase tracking-tight text-black truncate max-w-[80%]">
                          {mainTitle}
                        </h4>
                        <span className="font-mono text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 border border-black bg-black text-[#FFD833] flex-shrink-0">
                          {subNotes.length} UNITS
                        </span>
                      </div>
                      <div className="flex flex-col gap-3">
                        {subNotes.map((note) => (
                          <div
                            key={note._id}
                            onClick={() => {
                              if (onNoteSelect) {
                                onNoteSelect(note._id);
                              } else {
                                setSelectedNote(note);
                                setScreen('note_detail');
                              }
                            }}
                            className="border-2 border-black bg-white rounded-none p-3.5 flex items-center justify-between transition-all duration-100 cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="w-8 h-8 border-2 border-black flex items-center justify-center flex-shrink-0 text-black font-mono text-xs font-bold shadow-[1px_1px_0_0_rgba(0,0,0,1)]"
                                style={{ backgroundColor: getSubjectColor(selectedSubject.code) }}
                              >
                                {(note.subTopicIndex ?? 0) + 1}
                              </div>
                              <div className="min-w-0">
                                <span className="font-serif text-xs font-bold uppercase text-black block truncate leading-tight">
                                  {note.subTopicTitle || note.title}
                                </span>
                                <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider font-bold block mt-0.5">
                                  {note.classLevel} &middot; {note.contentBlocks?.length || 0} BLOCKS
                                </span>
                              </div>
                            </div>
                            <ChevronRight size={14} className="text-black flex-shrink-0 ml-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <div className="border-4 border-black bg-black text-white p-8 font-mono text-[10px] font-bold uppercase tracking-widest text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] leading-relaxed">
                [ SYSTEM_ALERT: NO ADM_TRANSMISSIONS LOGGED FOR THIS SUBJECT YET ]
              </div>
            );
          })()}
        </div>
      ) : (
        /* SCREEN: GRADE LIST with Accordion Dropdowns */
        <div className="space-y-10">
          {/* Page Header */}
          <div className="border-b-4 border-black pb-6">
            <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
              NODE // CURRICULUM_ARCHIVE
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none">
              LIBRARY
            </h1>
            <p className="font-sans text-sm text-black font-semibold mt-3 leading-relaxed max-w-xl">
              Browse all available JHS class levels and subjects. Select a subject to access its full collection of notes.
            </p>
          </div>

          {/* Grade Accordion Cards */}
          <div className="space-y-6">
            {grades.map((grade) => {
              const isExpanded = expandedGradeId === grade.id;
              const gradeSubjects = getSubjectsForGrade(grade.id);

              return (
                <div
                  key={grade.id}
                  className={`border-2 border-black rounded-none overflow-hidden transition-all duration-100
                    ${isExpanded
                      ? 'shadow-[6px_6px_0_0_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]'
                      : 'shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                    }
                  `}
                >
                  {/* Grade Header Accordion Button */}
                  <button
                    onClick={() => handleGradeToggle(grade.id)}
                    className={`w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer transition-colors border-0
                      ${isExpanded ? 'bg-[#FFD833]' : 'bg-[#F3F4F6] hover:bg-gray-200'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 border-2 border-black flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,1)] bg-white">
                        <GraduationCap size={24} className="text-black" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
                          {grade.label}
                        </h2>
                        <span className="font-mono text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                          {grade.tag} // {gradeSubjects.length} SUBJECTS
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      size={24}
                      className={`text-black transition-transform duration-200 flex-shrink-0
                        ${isExpanded ? 'rotate-180' : ''}
                      `}
                    />
                  </button>

                  {/* Subject List Grid (Expands under Accordion) */}
                  {isExpanded && (
                    <div className="border-t-2 border-black bg-white p-4 md:p-6">
                      {gradeSubjects.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {gradeSubjects.map((subject) => (
                            <button
                              key={subject._id}
                              onClick={() => handleSubjectClick(grade, subject)}
                              className="border-2 border-black rounded-none p-4 text-left transition-all duration-100 cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] shadow-[2px_2px_0_0_rgba(0,0,0,1)] group"
                              style={{ backgroundColor: getSubjectColor(subject.code) }}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="w-8 h-8 bg-white border border-black flex items-center justify-center">
                                  <Layers size={14} className="text-black" />
                                </div>
                                <ChevronRight size={14} className="text-black group-hover:translate-x-1 transition-transform" />
                              </div>
                              <h3 className="font-serif text-lg font-bold uppercase tracking-tight text-black mb-1">
                                {subject.name}
                              </h3>
                              <span className="font-mono text-[8px] font-bold text-black/70 uppercase tracking-widest">
                                {subject.code}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                          NO ACTIVE SUBJECTS REGISTERED FOR THIS SYLLABUS LEVEL
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
