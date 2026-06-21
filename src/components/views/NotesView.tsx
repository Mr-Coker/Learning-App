import { 
  Type, 
  MinusSquare, 
  Bookmark, 
  Save,
  BrainCircuit,
  ChevronDown,
  BookOpen,
  Terminal,
  Cpu,
  Layers,
  Search,
  ListOrdered
} from 'lucide-react';
import { useState } from 'react';

type TopicId = 'linear-equations' | 'algorithms';

interface Topic {
  id: TopicId;
  title: string;
  category: string;
  toc: { id: string; label: string }[];
}

export function NotesView() {
  const [activeTopic, setActiveTopic] = useState<TopicId>('linear-equations');
  const [textSize, setTextSize] = useState<number>(14); // in pixels
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('IDLE'); // IDLE, SAVING, SAVED
  
  // Accordion active state for Step-by-Step Proof / Walkthroughs
  const [accordionActive, setAccordionActive] = useState<boolean>(false);

  const topics: Topic[] = [
    {
      id: 'linear-equations',
      title: "Linear Equations",
      category: "Mathematics",
      toc: [
        { id: "intro", label: "I. Introduction" },
        { id: "slope-intercept", label: "II. Slope-Intercept Form" },
        { id: "proof-accordion", label: "III. Step-by-Step Proof" },
        { id: "practice", label: "IV. Practice Problems" }
      ]
    },
    {
      id: 'algorithms',
      title: "Introduction to Algorithms",
      category: "Computer Science",
      toc: [
        { id: "what-is-algorithm", label: "I. Definition & Analogy" },
        { id: "characteristics", label: "II. Key Characteristics" },
        { id: "constructs", label: "III. Programming Constructs" },
        { id: "computational-concepts", label: "IV. Abstraction & Decomposition" },
        { id: "examples", label: "V. Practical Algorithms" }
      ]
    }
  ];

  const handleSave = () => {
    setSaveStatus('SAVING');
    setTimeout(() => {
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('IDLE'), 2000);
    }, 1000);
  };

  const handleTopicChange = (topicId: TopicId) => {
    setActiveTopic(topicId);
    setAccordionActive(false);
  };

  const activeTopicDetails = topics.find(t => t.id === activeTopic)!;

  return (
    <div className="flex-1 flex overflow-hidden relative w-full h-full bg-white select-none">
      {/* Table of Contents & Topic Selector Sidebar (Left Column) */}
      <aside className="hidden md:block w-72 p-6 overflow-y-auto border-r border-outline-variant bg-[#F3F4F6] flex-shrink-0 h-full flex flex-col justify-between">
        <div className="space-y-8">
          {/* Topic Selector */}
          <div className="space-y-4">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Select Topic //</h3>
            <div className="flex flex-col gap-2">
              {topics.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTopicChange(t.id)}
                  className={`w-full text-left p-3 border-2 border-black rounded-none font-mono text-[10px] uppercase tracking-wider transition-all duration-100 flex items-center justify-between cursor-pointer
                    ${activeTopic === t.id 
                      ? 'bg-[#FFD833] shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' 
                      : 'bg-white hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="truncate mr-2">{t.title}</span>
                  <BookOpen size={12} />
                </button>
              ))}
            </div>
          </div>

          <hr className="border-t-2 border-dashed border-black/30" />

          {/* Contents Index */}
          <div className="space-y-4">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Contents</h3>
            <ul className="space-y-2 font-mono text-[10px] uppercase tracking-widest">
              {activeTopicDetails.toc.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className="hover:text-black transition-colors block py-2 border-l-2 border-transparent hover:border-black pl-4 text-gray-600 font-bold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-8 pt-4 border-t border-black/10 font-mono text-[8px] text-gray-400 uppercase tracking-widest space-y-1">
          <div>NODE // NOTES_VIEW</div>
          <div>STATUS // COMPILED</div>
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

        {/* Mobile Topic Switcher */}
        <div className="md:hidden mb-6 flex gap-2 overflow-x-auto pb-2 border-b border-black">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTopicChange(t.id)}
              className={`flex-none px-3 py-2 border-2 border-black font-mono text-[9px] uppercase tracking-wider
                ${activeTopic === t.id ? 'bg-[#FFD833] font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)]' : 'bg-white'}
              `}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Content Canvas */}
        <div className="mt-4 md:mt-0 space-y-16" style={{ fontSize: `${textSize}px` }}>
          
          {activeTopic === 'linear-equations' ? (
            /* ==========================================
               TOPIC: LINEAR EQUATIONS
               ========================================== */
            <section className="space-y-8" id="linear-equations-note">
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                  MODULE_01 // {activeTopicDetails.category.toUpperCase()}
                </span>
                <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none">
                  Linear Equations
                </h1>
              </div>

              <p className="font-sans text-on-surface-variant leading-loose" id="intro">
                A linear equation is an algebraic equation in which each term is either a constant or the product of a constant and a single <span className="border-b border-dashed border-black hover:border-black cursor-help text-black font-bold transition-colors">variable</span>. Linear equations can have one or more variables. The most basic form is a linear equation in one variable, which produces a straight line when graphed on a Cartesian coordinate system.
              </p>

              {/* Key Formula Box */}
              <div className="border-2 border-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 md:p-8 relative overflow-hidden group mt-12 bg-[#FFD833] flex" id="slope-intercept">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 w-16 h-16 border-2 border-black rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-center justify-center bg-white">
                    <span className="font-serif text-2xl font-black uppercase text-black">f(x)</span>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-gray-700 uppercase tracking-[0.2em] mb-2 font-bold">Key Formula //</h4>
                    <p className="font-serif text-3xl md:text-4xl font-black uppercase tracking-wider text-black">y = mx + b</p>
                    <p className="font-sans text-sm text-gray-800 mt-3 leading-relaxed">
                      Where <span className="font-mono px-1 py-0.5 border border-black bg-white text-black font-bold">m</span> is the slope and <span className="font-mono px-1 py-0.5 border border-black bg-white text-black font-bold">b</span> is the y-intercept.
                    </p>
                  </div>
                </div>
              </div>

              <p className="font-sans text-on-surface-variant leading-loose mt-8">
                Understanding the slope-intercept form is crucial because it immediately gives you visual information about the line. The slope tells you the steepness and direction, while the y-intercept provides a concrete starting point on the y-axis.
              </p>

              {/* Expandable Accordion */}
              <div 
                className={`mt-12 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none overflow-hidden transition-all
                  ${accordionActive ? 'bg-[#F3F4F6]' : 'bg-white'}
                `} 
                id="proof-accordion"
              >
                <button 
                  onClick={() => setAccordionActive(prev => !prev)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span className="font-serif text-xl md:text-2xl font-black uppercase text-black flex items-center gap-4">
                    <BrainCircuit size={20} className="text-black" />
                    Step-by-Step Proof
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-black transition-transform duration-200
                      ${accordionActive ? 'transform rotate-180' : ''}
                    `} 
                  />
                </button>
                
                {accordionActive && (
                  <div className="border-t-2 border-black p-6 md:p-8 space-y-6 font-sans text-sm text-gray-700 leading-loose bg-white">
                    <p>To prove that <code className="px-1.5 py-0.5 border border-black bg-gray-50 font-mono text-xs text-black font-bold">y - y₁ = m(x - x₁)</code> is equivalent to <code className="px-1.5 py-0.5 border border-black bg-gray-50 font-mono text-xs text-black font-bold">y = mx + b</code>:</p>
                    <ol className="list-decimal list-inside space-y-4 pl-2 font-mono text-xs text-black">
                      <li>Start with the point-slope form: <code className="px-1.5 py-0.5 bg-gray-50 text-black font-bold">y - y₁ = m(x - x₁)</code></li>
                      <li>Distribute the slope <code className="px-1.5 py-0.5 bg-gray-50 text-black font-bold">m</code>: <code className="px-1.5 py-0.5 bg-gray-50 text-black font-bold">y - y₁ = mx - mx₁</code></li>
                      <li>Isolate <code className=" px-1.5 py-0.5 bg-gray-50 text-black font-bold">y</code>: <code className="px-1.5 py-0.5 bg-gray-50 text-black font-bold">y = mx - mx₁ + y₁</code></li>
                      <li>Define <code className="px-1.5 py-0.5 bg-gray-50 text-black font-bold">b = y₁ - mx₁</code></li>
                      <li>Substitute <code className="px-1.5 py-0.5 bg-gray-50 text-black font-bold">b</code> back into the equation: <code className="text-black text-sm font-bold bg-[#A7F3D0] px-2 py-0.5 border border-black">y = mx + b</code></li>
                    </ol>
                  </div>
                )}
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-black/30 to-transparent"></div>

              {/* Practice problems */}
              <section className="space-y-6 opacity-80 hover:opacity-100 transition-opacity pb-10" id="practice">
                <h2 className="font-serif text-3xl font-black uppercase text-black tracking-tighter">Practice Problems //</h2>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Calculate the slope-intercept form for the line passing through points <span className="font-mono text-black font-bold bg-[#A7F3D0] px-1.5 py-0.5 border border-black">(2, 4)</span> and <span className="font-mono text-black font-bold bg-[#A7F3D0] px-1.5 py-0.5 border border-black">(5, 10)</span>.
                </p>
              </section>
            </section>
          ) : (
            /* ==========================================
               TOPIC: ALGORITHMS (pdf Content)
               ========================================== */
            <section className="space-y-8" id="algorithms-note">
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                  MODULE_02 // {activeTopicDetails.category.toUpperCase()}
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
                    ${accordionActive ? 'bg-[#F3F4F6]' : 'bg-white'}
                  `} 
                >
                  <button 
                    onClick={() => setAccordionActive(prev => !prev)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-serif text-lg font-bold uppercase text-black flex items-center gap-4">
                      <Search size={18} className="text-black" />
                      B. Linear Search Walkthrough
                    </span>
                    <ChevronDown 
                      size={20} 
                      className={`text-black transition-transform duration-200
                        ${accordionActive ? 'transform rotate-180' : ''}
                      `} 
                    />
                  </button>
                  
                  {accordionActive && (
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
          )}

        </div>
      </article>
    </div>
  );
}
