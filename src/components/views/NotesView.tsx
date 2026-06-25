import { 
  Type, 
  MinusSquare, 
  Bookmark, 
  Save,
  ChevronDown
} from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useState } from 'react';

interface NotesViewProps {
  activeNoteId: string | null;
  onBack: () => void;
}

export function NotesView({ activeNoteId, onBack }: NotesViewProps) {
  const [textSize, setTextSize] = useState<number>(14); // in pixels
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('IDLE'); // IDLE, SAVING, SAVED

  const noteData = useQuery(
    api.notesIngestion.getNoteDetails,
    activeNoteId ? { noteId: activeNoteId as Id<"notes"> } : 'skip'
  );

  const handleSave = () => {
    setSaveStatus('SAVING');
    setTimeout(() => {
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('IDLE'), 2000);
    }, 1000);
  };

  if (!activeNoteId) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-white min-h-[400px] w-full">
        <div className="border-4 border-black bg-black text-[#FFD833] p-8 font-mono text-xs font-bold uppercase tracking-widest text-center shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-xl">
          [ NO_ACTIVE_TRANSMISSION: PLEASE_SELECT_A_LESSON_NOTE_FROM_THE_LIBRARY ]
        </div>
      </div>
    );
  }

  const isBinaryOrRawPayload = (text: string): boolean => {
    if (!text) return false;
    if (text.startsWith('%PDF') || text.includes('\\x00') || text.startsWith('data:')) {
      return true;
    }
    let nonPrintableCount = 0;
    const checkLength = Math.min(text.length, 500);
    for (let i = 0; i < checkLength; i++) {
      const charCode = text.charCodeAt(i);
      if ((charCode < 32 && charCode !== 9 && charCode !== 10 && charCode !== 13) || charCode > 126) {
        nonPrintableCount++;
      }
    }
    if (nonPrintableCount > checkLength * 0.15) {
      return true;
    }
    return false;
  };

  const filteredBlocks = noteData?.contentBlocks?.filter(
    (block: any) => !isBinaryOrRawPayload(block.body)
  ) || [];

  const dbNoteToc = filteredBlocks
    ?.map((block: any, idx: number) => {
      if (block.heading) {
        return { id: `block-${idx}`, label: block.heading };
      }
      return null;
    })
    .filter((item: any): item is { id: string; label: string } => item !== null) || [];

  return (
    <div className="flex-1 flex overflow-hidden relative w-full h-full bg-white select-none">
      {/* Table of Contents & Topic Selector Sidebar (Left Column) */}
      <aside className="hidden md:block w-72 p-6 overflow-y-auto border-r border-outline-variant bg-[#F3F4F6] flex-shrink-0 h-full flex flex-col justify-between">
        <div className="space-y-8">
          {/* Back button */}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-black hover:bg-black hover:text-white px-3 py-2 border-2 border-black rounded-none font-mono text-[9px] uppercase tracking-wider transition-all duration-100 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] bg-white w-full justify-center"
          >
            ← RETURN_TO_LIBRARY
          </button>
          {/* Topic Details Info */}
          <div className="space-y-4">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Current Transmission //</h3>
            {noteData ? (
              <div className="p-3 border-2 border-black bg-[#A7F3D0] shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex flex-col gap-1">
                <span className="font-mono text-[8px] font-bold text-emerald-800 uppercase tracking-widest">
                  PAYLOAD
                </span>
                <span className="font-serif text-xs font-black uppercase text-black leading-tight break-words">
                  {noteData.title}
                </span>
              </div>
            ) : (
              <div className="p-3 border-2 border-black bg-gray-200 font-mono text-[9px] font-bold uppercase text-gray-500 animate-pulse">
                LOADING TITLE...
              </div>
            )}
          </div>

          <hr className="border-t-2 border-dashed border-black/30" />

          {/* Contents Index */}
          <div className="space-y-4">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Contents</h3>
            <ul className="space-y-2 font-mono text-[10px] uppercase tracking-widest">
              {dbNoteToc.length > 0 ? (
                dbNoteToc.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      className="hover:text-black transition-colors block py-2 border-l-2 border-transparent hover:border-black pl-4 text-gray-600 font-bold"
                    >
                      {item.label}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 font-mono text-[8px]">[ NO SECTION HEADINGS ]</li>
              )}
            </ul>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-8 pt-4 border-t border-black/10 font-mono text-[8px] text-gray-400 uppercase tracking-widest space-y-1">
          <div>NODE // NOTES_VIEW</div>
          <div>STATUS // {noteData ? 'COMPILED' : 'SYNCING'}</div>
        </div>
      </aside>

      {/* Reading Canvas (Right Column) */}
      <article className="flex-1 p-4 md:p-10 max-w-4xl mx-auto w-full relative overflow-y-auto h-full pb-20 md:pb-10">
        
        {/* Floating Toolbar */}
        <div className="fixed top-24 right-4 md:right-10 z-15 flex flex-col gap-2 bg-[#F3F4F6] border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-2 rounded-none">
          <button 
            onClick={() => setTextSize(prev => Math.min(prev + 2, 24))}
            className="text-black hover:bg-black hover:text-white p-2 rounded-none border border-transparent hover:border-black transition-colors cursor-pointer" 
            title="Increase Text Size"
          >
            <Type size={16} />
          </button>
          <button 
            onClick={() => setTextSize(prev => Math.max(prev - 2, 12))}
            className="text-black hover:bg-black hover:text-white p-2 rounded-none border border-transparent hover:border-black transition-colors cursor-pointer" 
            title="Decrease Text Size"
          >
            <MinusSquare size={16} />
          </button>
          
          <div className="w-full h-px bg-black my-1"></div>
          
          <button 
            onClick={() => setIsBookmarked(prev => !prev)}
            className={`p-2 rounded-none border border-transparent hover:border-black transition-all cursor-pointer
              ${isBookmarked ? 'bg-[#38BDF8] text-black border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' : 'text-black hover:bg-black hover:text-white'}
            `} 
            title="Bookmark"
          >
            <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
          </button>
          
          <button 
            onClick={handleSave}
            disabled={saveStatus !== 'IDLE'}
            className={`p-2 rounded-none border border-transparent hover:border-black transition-all cursor-pointer disabled:opacity-50
              ${saveStatus === 'SAVED' ? 'bg-[#A7F3D0] text-black border-black' : 'text-black hover:bg-black hover:text-white'}
            `} 
            title="Save Note"
          >
            {saveStatus === 'SAVING' ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full block"></span>
            ) : (
              <Save size={16} />
            )}
          </button>
        </div>

        {/* Mobile Info Bar */}
        <div className="md:hidden mb-6 flex flex-col gap-2">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-black hover:bg-black hover:text-white px-3 py-2 border-2 border-black rounded-none font-mono text-[9px] uppercase tracking-wider transition-all duration-100 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] bg-white justify-center"
          >
            ← RETURN_TO_LIBRARY
          </button>
          {noteData && (
            <div className="p-3 border-2 border-black bg-[#A7F3D0] font-mono text-[9px] font-bold uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              VIEWING: {noteData.title}
            </div>
          )}
        </div>

        {/* Content Canvas */}
        <div className="mt-4 md:mt-0 space-y-16" style={{ fontSize: `${textSize}px` }}>
          {noteData ? (
            <section className="space-y-8" id="db-note">
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block animate-pulse">
                  {noteData.summaryBadge}
                </span>
                <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                  {noteData.title}
                </h1>
                <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2 text-left">
                  TARGET CLASS: {noteData.classLevel}
                </p>
              </div>

              <div className="space-y-8 max-w-3xl">
                {noteData.contentBlocks && filteredBlocks.map((block: any, idx: number) => {
                  switch (block.type) {
                    case 'challenge_callout':
                      return (
                        <div key={idx} id={`block-${idx}`}>
                          {block.heading && (
                            <h4 className="font-serif text-lg font-black uppercase tracking-tight text-black mb-2 text-left">
                              {block.heading}
                            </h4>
                          )}
                          <div className="bg-[#FFD833] border-4 border-black rounded-none p-5 my-6 text-black font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                            {block.body}
                          </div>
                        </div>
                      );
                    case 'bullet_point':
                      return (
                        <div key={idx} id={`block-${idx}`} className="text-left mb-4 pl-6 relative">
                          {block.heading && (
                            <h4 className="font-serif text-lg font-black uppercase tracking-tight text-black mb-2">
                              {block.heading}
                            </h4>
                          )}
                          <div className="flex items-start gap-2">
                            <span className="inline-block w-2 h-2 bg-black mt-2.5 rounded-none flex-shrink-0" />
                            <p className="text-base md:text-lg text-black leading-relaxed font-normal">
                              {block.body}
                            </p>
                          </div>
                        </div>
                      );
                    case 'text':
                    default:
                      return (
                        <div key={idx} id={`block-${idx}`}>
                          {block.heading && (
                            <h3 className="font-serif text-xl font-black uppercase tracking-tight text-black mb-2 text-left">
                              {block.heading}
                            </h3>
                          )}
                          <p className="text-base md:text-lg text-black leading-relaxed font-normal mb-4 text-left">
                            {block.body}
                          </p>
                        </div>
                      );
                  }
                })}
              </div>
            </section>
          ) : (
            <div className="flex items-center justify-center p-8">
              <div className="border-4 border-black bg-black text-[#FFD833] p-8 font-mono text-xs font-bold uppercase tracking-widest text-center shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                [ LOADING_AND_DECRYPTING_CURRICULUM_DATA... ]
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
