import { 
  Type, 
  MinusSquare, 
  Bookmark, 
  Save,
  BrainCircuit,
  ChevronDown
} from 'lucide-react';

export function NotesView() {
  return (
    <div className="flex-1 flex overflow-hidden relative w-full h-full">
      {/* Sticky TOC Sidebar (Left Column) */}
      <aside className="hidden md:block w-64 p-8 overflow-y-auto border-r border-outline-variant bg-surface-container-low flex-shrink-0 h-full">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-8">Contents</h3>
        <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
          <li>
            <a href="#intro" className="hover:text-on-surface transition-colors block py-2 border-l border-transparent hover:border-outline pl-4">I. Introduction</a>
          </li>
          <li>
            <a href="#linear-equations" className="text-on-surface block py-2 border-l border-on-surface pl-4 bg-surface-container-highest">II. Linear Equations</a>
          </li>
          <li>
            <a href="#practice" className="hover:text-on-surface transition-colors block py-2 border-l border-transparent hover:border-outline pl-4">III. Practice Problems</a>
          </li>
        </ul>
      </aside>

      {/* Reading Canvas (Right Column) */}
      <article className="flex-1 p-4 md:p-10 max-w-4xl mx-auto w-full relative overflow-y-auto h-full pb-20 md:pb-10">
        
        {/* Floating Toolbar */}
        <div className="fixed top-24 right-4 md:right-10 z-10 flex flex-col gap-2 bg-surface-container-low border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-2 rounded-none">
          <button className="text-on-surface-variant hover:text-white p-2 rounded-xl hover:bg-outline-variant transition-colors" title="Increase Text Size">
            <Type size={16} />
          </button>
          <button className="text-on-surface-variant hover:text-white p-2 rounded-xl hover:bg-outline-variant transition-colors" title="Decrease Text Size">
            <MinusSquare size={16} />
          </button>
          <div className="w-full h-px bg-outline-variant my-1"></div>
          <button className="text-on-surface-variant hover:text-white p-2 rounded-xl hover:bg-outline-variant transition-colors" title="Bookmark">
            <Bookmark size={16} />
          </button>
          <button className="text-on-surface-variant hover:text-white p-2 rounded-xl hover:bg-outline-variant transition-colors" title="Save Note">
            <Save size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-16 mt-4 md:mt-0">
          
          {/* Section 2 */}
          <section className="space-y-8" id="linear-equations">
            <h2 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-on-surface">Linear Equations</h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-loose">
              A linear equation is an algebraic equation in which each term is either a constant or the product of a constant and a single <span className="border-b border-dashed border-outline hover:border-on-surface cursor-help text-on-surface transition-colors">variable</span>. Linear equations can have one or more variables. The most basic form is a linear equation in one variable, which produces a straight line when graphed on a Cartesian coordinate system.
            </p>

            {/* Key Formula Box */}
            <div className="border-2 border-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-8 relative overflow-hidden group mt-12 bg-surface-container-highest flex">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 border-2 border-black rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-center justify-center bg-surface-container-high">
                  <span className="font-serif text-2xl font-black uppercase text-on-surface">f(x)</span>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-4">Key Formula</h4>
                  <p className="font-serif text-3xl md:text-4xl font-black uppercase tracking-wider text-on-surface">y = mx + b</p>
                  <p className="font-sans text-sm text-on-surface-variant mt-4 leading-relaxed">Where <span className="font-mono px-1 py-0.5 rounded text-on-surface">m</span> is the slope and <span className="font-mono px-1 py-0.5 rounded text-on-surface">b</span> is the y-intercept.</p>
                </div>
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-loose mt-8">
              Understanding the slope-intercept form is crucial because it immediately gives you visual information about the line. The slope tells you the steepness and direction, while the y-intercept provides a concrete starting point on the y-axis.
            </p>

            {/* Expandable Accordion */}
            <div className="mt-12 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none overflow-hidden" id="proof-accordion" onClick={(e) => {
              e.currentTarget.classList.toggle('accordion-active');
            }}>
              <button className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-surface-container transition-colors">
                <span className="font-serif text-xl md:text-2xl font-black uppercase text-on-surface flex items-center gap-4">
                  <BrainCircuit size={20} className="text-on-surface-variant" />
                  Step-by-Step Proof
                </span>
                <ChevronDown size={20} className="text-on-surface-variant accordion-icon" />
              </button>
              <div className="accordion-content border-t-2 border-black">
                <div className="p-6 md:p-8 space-y-6 font-sans text-sm text-on-surface-variant leading-loose bg-surface-container-low">
                  <p>To prove that <code className="px-1.5 py-0.5 rounded font-mono text-xs text-on-surface">y - y₁ = m(x - x₁)</code> is equivalent to <code className="px-1.5 py-0.5 rounded font-mono text-xs text-on-surface">y = mx + b</code>:</p>
                  <ol className="list-decimal list-inside space-y-4 pl-2 font-mono text-xs">
                    <li>Start with the point-slope form: <code className="px-1.5 py-0.5 rounded text-on-surface">y - y₁ = m(x - x₁)</code></li>
                    <li>Distribute the slope <code className="px-1.5 py-0.5 rounded text-on-surface">m</code>: <code className="px-1.5 py-0.5 rounded text-on-surface">y - y₁ = mx - mx₁</code></li>
                    <li>Isolate <code className=" px-1.5 py-0.5 rounded text-on-surface">y</code>: <code className="px-1.5 py-0.5 rounded text-on-surface">y = mx - mx₁ + y₁</code></li>
                    <li>Define <code className="px-1.5 py-0.5 rounded text-on-surface">b = y₁ - mx₁</code></li>
                    <li>Substitute <code className="px-1.5 py-0.5 rounded text-on-surface">b</code> back into the equation: <code className="text-on-surface text-sm">y = mx + b</code></li>
                  </ol>
                </div>
              </div>
            </div>

          </section>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant/80 to-transparent"></div>

          {/* Section 3 (Stub for scrolling) */}
          <section className="space-y-6 opacity-40 hover:opacity-100 transition-opacity pb-10" id="practice">
            <h2 className="font-serif text-4xl md:text-5xl font-black uppercase text-on-surface tracking-tighter">Practice Problems</h2>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-loose">Ready to test your knowledge? Try solving these typical problems based on the concepts above.</p>
          </section>

        </div>
      </article>
    </div>
  );
}
