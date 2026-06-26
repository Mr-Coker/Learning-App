import {
  Type,
  MinusSquare,
  Bookmark,
  Save,
  ChevronDown,
  Terminal,
  Cpu,
  Layers,
  Search,
  ListOrdered,
  BrainCircuit
} from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useState } from 'react';
import { staticCurriculumNotes as curriculumNotes } from '../../data/curriculumNotes';

interface NotesViewProps {
  activeNoteId: string | null;
  onBack: () => void;
}

export function NotesView({ activeNoteId, onBack }: NotesViewProps) {
  const [textSize, setTextSize] = useState<number>(14); // in pixels
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('IDLE'); // IDLE, SAVING, SAVED
  const [searchAccordionActive, setSearchAccordionActive] = useState<boolean>(false);

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

  if (noteData === undefined) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="border-4 border-black bg-black text-[#FFD833] p-8 font-mono text-xs font-bold uppercase tracking-widest text-center shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          [ LOADING_AND_DECRYPTING_CURRICULUM_DATA... ]
        </div>
      </div>
    );
  }

  const fullLessonContent = curriculumNotes.find(
    (n) => n.id === noteData?.staticLookupKey
  );

  const contentBlocksToRender = fullLessonContent ? fullLessonContent.contentBlocks : [];

  if (!noteData || !fullLessonContent || contentBlocksToRender.length === 0) {
    return <div className="p-6 border-4 border-black font-bold uppercase">[ TRANSMISSION_EMPTY: SEED REAL CHUNK DATA VIA ADMIN ]</div>;
  }

  const dbNoteToc = noteData?.staticLookupKey === 'algorithm-basics'
    ? [
        { id: "what-is-algorithm", label: "I. Definition & Analogy" },
        { id: "characteristics", label: "II. Key Characteristics" },
        { id: "constructs", label: "III. Programming Constructs" },
        { id: "computational-concepts", label: "IV. Abstraction & Decomposition" },
        { id: "examples", label: "V. Practical Algorithms" }
      ]
    : contentBlocksToRender
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
              <div className="p-3 border-2 border-black bg-[#A7F3D0] shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex flex-col gap-1 text-left">
                <span className="font-mono text-[8px] font-bold text-emerald-800 uppercase tracking-widest">
                  PAYLOAD
                </span>
                <span className="font-serif text-xs font-black uppercase text-black leading-tight break-words">
                  {noteData.title}
                </span>
              </div>
            ) : (
              <div className="p-3 border-2 border-black bg-gray-200 font-mono text-[9px] font-bold uppercase text-gray-500 animate-pulse text-left">
                LOADING TITLE...
              </div>
            )}
          </div>

          <hr className="border-t-2 border-dashed border-black/30" />

          {/* Contents Index */}
          <div className="space-y-4 text-left">
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
        <div className="mt-8 pt-4 border-t border-black/10 font-mono text-[8px] text-gray-400 uppercase tracking-widest space-y-1 text-left">
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
            <div className="p-3 border-2 border-black bg-[#A7F3D0] font-mono text-[9px] font-bold uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
              VIEWING: {noteData.title}
            </div>
          )}
        </div>

        {/* Content Canvas */}
        <div className="mt-4 md:mt-0 space-y-16" style={{ fontSize: `${textSize}px` }}>
          {noteData ? (
            noteData.staticLookupKey === 'algorithm-basics' ? (
              /* ==========================================
                 REDESIGNED GORGEOUS ALGORITHM NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left" id="algorithms-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_02 // COMPUTER SCIENCE
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none">
                    Introduction to Algorithms
                  </h1>
                </div>

                {/* Section 1: What is an Algorithm */}
                <div className="space-y-4" id="what-is-algorithm">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                    <Terminal size={20} />
                    1. What is an Algorithm?
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose">
                    An <strong className="text-black font-black">algorithm</strong> is a finite set of instructions, commands, or a step-by-step procedure carried out in a specific order to solve logical, mathematical, or real-world problems.
                  </p>

                  {/* Concept box: Analogy */}
                  <div className="bg-[#38BDF8] border-2 border-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
                    <h4 className="font-mono text-[9px] font-bold text-black uppercase tracking-wider mb-2">Real-World Analogy //</h4>
                    <p className="font-sans text-sm text-black leading-relaxed">
                      A cooking recipe is a classic analogy. It outlines step-by-step instructions, taking inputs (raw ingredients) to produce a specific output (the finished meal).
                    </p>
                  </div>

                  {/* Grid Components */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="border border-black p-4 bg-white">
                      <span className="font-mono text-[9px] font-bold text-gray-500 block mb-1">PROBLEM //</span>
                      <p className="font-sans text-xs text-black">A real-world instance or issue requiring a program or set of instructions.</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <span className="font-mono text-[9px] font-bold text-gray-500 block mb-1">INPUT //</span>
                      <p className="font-sans text-xs text-black">The necessary and desired values provided to the algorithm.</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <span className="font-mono text-[9px] font-bold text-gray-500 block mb-1">PROCESSING UNIT //</span>
                      <p className="font-sans text-xs text-black">The component (like the CPU) that executes the input to produce outcomes.</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <span className="font-mono text-[9px] font-bold text-gray-500 block mb-1">OUTPUT //</span>
                      <p className="font-sans text-xs text-black">The final outcome or result produced by the program.</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Characteristics */}
                <div className="space-y-4 pt-6" id="characteristics">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                    <Cpu size={20} />
                    2. Key Characteristics
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose">
                    To be effective, any computer algorithm must possess the following structural traits:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[9px] font-black text-black">INPUT / OUTPUT</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Requires some input values (non-zero) and results in one or more outcomes.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[9px] font-black text-black">UNAMBIGUITY</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Instructions must be perfectly clear, straightforward, and unambiguous.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[9px] font-black text-black">FINITENESS</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Must have a limited, countable number of instructions (it must end).</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[9px] font-black text-black">LANGUAGE INDEPENDENT</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Instructions must be generic enough to run on any programming syntax.</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Programming Constructs */}
                <div className="space-y-4 pt-6" id="constructs">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                    <Layers size={20} />
                    3. Programming Constructs
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose">
                    Programs are built using three fundamental structures that dictate execution flow:
                  </p>

                  <div className="space-y-6">
                    {/* Sequence */}
                    <div className="border-2 border-black rounded-none p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#FFD833] border border-black font-mono text-[8px] font-bold px-1.5 py-0.5">I</span>
                        <h4 className="font-serif text-lg font-bold text-black uppercase">SEQUENCE</h4>
                      </div>
                      <p className="font-sans text-xs text-gray-600 leading-relaxed">
                        The most basic construct where instructions occur and execute one after another in order. The computer runs code line-by-line, from top to bottom.
                      </p>
                    </div>

                    {/* Selection */}
                    <div className="border-2 border-black rounded-none p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#38BDF8] border border-black font-mono text-[8px] font-bold px-1.5 py-0.5">II</span>
                        <h4 className="font-serif text-lg font-bold text-black uppercase">SELECTION</h4>
                      </div>
                      <p className="font-sans text-xs text-gray-600 leading-relaxed">
                        Determines which path a program takes depending on whether a condition is met. Achieved using <code className="px-1 bg-gray-100 border font-mono">IF</code> statement selections.
                      </p>
                    </div>

                    {/* Iteration */}
                    <div className="border-2 border-black rounded-none p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#A7F3D0] border border-black font-mono text-[8px] font-bold px-1.5 py-0.5">III</span>
                        <h4 className="font-serif text-lg font-bold text-black uppercase">ITERATION (LOOPING)</h4>
                      </div>
                      <p className="font-sans text-xs text-gray-600 leading-relaxed">
                        The repeated execution of a specific section of code while a program is running. A loop repeats a set of steps as many times as required without code duplication.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Computational Concepts */}
                <div className="space-y-4 pt-6" id="computational-concepts">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                    <BrainCircuit size={20} />
                    4. Key Computational Concepts
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Abstraction */}
                    <div className="border-2 border-black p-6 bg-[#FFD833] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-3">
                      <h4 className="font-serif text-xl font-bold uppercase text-black">ABSTRACTION</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        The process of hiding background details or unnecessary implementation complexities so users only see the required information.
                      </p>
                      <div className="bg-white/80 p-3 border border-black text-[10px] font-sans leading-relaxed text-black/80">
                        <strong>Example:</strong> When using a washing machine, you simply put in clothes. You don't need to know the engineering mechanisms.
                      </div>
                    </div>

                    {/* Decomposition */}
                    <div className="border-2 border-black p-6 bg-[#A7F3D0] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-3">
                      <h4 className="font-serif text-xl font-bold uppercase text-black">DECOMPOSITION</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        The process of breaking down a large, complex problem into smaller, more manageable parts.
                      </p>
                      <div className="bg-white/80 p-3 border border-black text-[10px] font-sans leading-relaxed text-black/80">
                        <strong>Why it matters:</strong> Smaller parts are easier to design, test, and solve. Problems are harder to resolve on a CPU without this step.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-black/30 to-transparent"></div>

                {/* Section 5: Practical Examples */}
                <div className="space-y-6 pt-6" id="examples">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                    <ListOrdered size={20} />
                    5. Practical Examples & Applications
                  </h2>

                  {/* Multiplication */}
                  <div className="border-2 border-black p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-4">
                    <h4 className="font-serif text-lg font-bold text-black uppercase tracking-tight">A. Simple Multiplication Plan</h4>
                    <p className="font-sans text-xs text-gray-600">A step-by-step plan to multiply two numbers and display the result:</p>
                    
                    <div className="bg-[#F3F4F6] border border-black p-4 font-mono text-xs space-y-1.5 text-black">
                      <div>STEP 1 // Start</div>
                      <div>STEP 2 // Declare three integers: x, y, and z</div>
                      <div>STEP 3 // Define the values of x and y</div>
                      <div>STEP 4 // Multiply the values of x and y</div>
                      <div>STEP 5 // Store the result of Step 4 into z</div>
                      <div>STEP 6 // Print z</div>
                      <div>STEP 7 // End</div>
                    </div>
                  </div>

                  {/* Linear Search */}
                  <div 
                    className={`border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none overflow-hidden transition-all
                      ${searchAccordionActive ? 'bg-[#F3F4F6]' : 'bg-white'}
                    `} 
                  >
                    <button 
                      onClick={() => setSearchAccordionActive(prev => !prev)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-serif text-lg font-bold uppercase text-black flex items-center gap-4">
                        <Search size={18} className="text-black" />
                        B. Linear Search Walkthrough
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-black transition-transform duration-200
                          ${searchAccordionActive ? 'transform rotate-180' : ''}
                        `} 
                      />
                    </button>
                    
                    {searchAccordionActive && (
                      <div className="border-t-2 border-black p-6 md:p-8 space-y-6 font-sans text-sm text-gray-700 leading-loose bg-white">
                        <p>
                          <strong>Linear Search</strong> is the simplest sequential searching method, where you start at one end of a list and check every single element one by one until the desired item (the "key") is found.
                        </p>
                        
                        <div className="border-l-4 border-black pl-4 py-2 space-y-2">
                          <div className="font-mono text-xs font-bold text-black">VISUAL WALKTHROUGH //</div>
                          <div className="font-mono text-xs text-gray-600">Given array: arr[] = [10, 50, 30, 70, 80, 20, 90, 40] and Target Key = 30</div>
                          <ol className="list-decimal list-inside space-y-2 pl-2 font-mono text-[11px] mt-2 text-black">
                            <li>Compare Key (30) with arr[0] (10) &rarr; Not equal. Move to next.</li>
                            <li>Compare Key (30) with arr[1] (50) &rarr; Not equal. Move to next.</li>
                            <li>Compare Key (30) with arr[2] (30) &rarr; <span className="bg-[#A7F3D0] border border-black px-1 font-bold">Match found!</span> Yields success and returns index 2.</li>
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </section>
            ) : (
              /* ==========================================
                 STANDARD FALLBACK DYNAMIC RENDERER
                 ========================================== */
              <section className="space-y-8" id="db-note">
                <div className="space-y-2 text-left">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block animate-pulse">
                    STATIC NOTE // {noteData.classLevel.toUpperCase()}
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    {noteData.title}
                  </h1>
                  <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2 text-left">
                    TARGET CLASS: {noteData.classLevel}
                  </p>
                </div>

                <div className="space-y-8 max-w-3xl">
                  {fullLessonContent && fullLessonContent.contentBlocks.map((block: any, idx: number) => {
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
            )
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
