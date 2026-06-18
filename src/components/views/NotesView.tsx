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
      <aside className="hidden md:block w-64 p-6 overflow-y-auto border-r border-outline-variant/20 bg-surface-container-low/50 backdrop-blur-md flex-shrink-0 h-full">
        <h3 className="font-geist text-xl font-semibold text-on-surface mb-6">Contents</h3>
        <ul className="space-y-4 font-geist text-sm font-medium">
          <li>
            <a href="#intro" className="text-on-surface-variant hover:text-primary transition-colors block py-1 pl-2">1. Introduction</a>
          </li>
          <li>
            <a href="#linear-equations" className="text-primary block py-1 pl-2 neon-blue-indicator font-semibold bg-primary/5 rounded-r-md">2. Linear Equations</a>
          </li>
          <li>
            <a href="#practice" className="text-on-surface-variant hover:text-primary transition-colors block py-1 pl-2">3. Practice Problems</a>
          </li>
        </ul>
      </aside>

      {/* Reading Canvas (Right Column) */}
      <article className="flex-1 p-4 md:p-10 max-w-4xl mx-auto w-full relative overflow-y-auto h-full pb-20 md:pb-10">
        
        {/* Floating Toolbar */}
        <div className="fixed top-24 right-4 md:right-10 z-10 flex flex-col gap-2 bg-surface-container-high/80 backdrop-blur-xl border border-outline-variant/30 p-2 rounded-xl shadow-lg">
          <button className="text-on-surface-variant hover:text-primary p-1 rounded-md hover:bg-white/5 transition-colors" title="Increase Text Size">
            <Type size={20} />
          </button>
          <button className="text-on-surface-variant hover:text-primary p-1 rounded-md hover:bg-white/5 transition-colors" title="Decrease Text Size">
            <MinusSquare size={20} />
          </button>
          <div className="w-full h-px bg-outline-variant/50 my-1"></div>
          <button className="text-on-surface-variant hover:text-primary p-1 rounded-md hover:bg-white/5 transition-colors" title="Bookmark">
            <Bookmark size={20} />
          </button>
          <button className="text-on-surface-variant hover:text-primary p-1 rounded-md hover:bg-white/5 transition-colors" title="Save Note">
            <Save size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-16 mt-4 md:mt-0">
          
          {/* Section 2 */}
          <section className="space-y-6" id="linear-equations">
            <h2 className="font-geist text-3xl md:text-5xl font-bold text-on-surface tracking-tight">2. Linear Equations</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
              A linear equation is an algebraic equation in which each term is either a constant or the product of a constant and a single <span className="tooltip-container border-b-2 border-dashed border-primary cursor-help text-primary font-medium">variable<span className="tooltip-text">A symbol, usually a letter, that represents one or more numbers.</span></span>. Linear equations can have one or more variables. The most basic form is a linear equation in one variable, which produces a straight line when graphed on a Cartesian coordinate system.
            </p>

            {/* Key Formula Box */}
            <div className="bg-surface-container-high rounded-xl p-6 neon-purple-border relative overflow-hidden group mt-10">
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 bg-secondary-container text-on-secondary p-3 rounded-lg flex items-center justify-center">
                  <span className="font-geist text-3xl font-bold italic">f(x)</span>
                </div>
                <div>
                  <h4 className="font-geist text-xs font-semibold text-secondary uppercase tracking-widest mb-1">Key Formula</h4>
                  <p className="font-geist text-2xl md:text-3xl font-semibold text-on-surface font-mono tracking-wider">y = mx + b</p>
                  <p className="font-sans text-base text-on-surface-variant mt-2">Where <span className="text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded font-medium">m</span> is the slope and <span className="text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded font-medium">b</span> is the y-intercept.</p>
                </div>
              </div>
            </div>

            <p className="font-sans text-lg text-on-surface-variant leading-relaxed mt-6">
              Understanding the slope-intercept form is crucial because it immediately gives you visual information about the line. The slope tells you the steepness and direction, while the y-intercept provides a concrete starting point on the y-axis.
            </p>

            {/* Expandable Accordion */}
            <div className="mt-10 border border-outline-variant/30 rounded-xl bg-surface-container overflow-hidden" id="proof-accordion" onClick={(e) => {
              e.currentTarget.classList.toggle('accordion-active');
            }}>
              <button className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none hover:bg-surface-container-highest transition-colors">
                <span className="font-geist text-lg md:text-xl font-semibold text-on-surface flex items-center gap-3">
                  <BrainCircuit size={24} className="text-primary" />
                  Deep Dive: Step-by-Step Proof
                </span>
                <ChevronDown size={24} className="text-on-surface-variant accordion-icon" />
              </button>
              <div className="accordion-content bg-surface-container-low border-t border-outline-variant/20">
                <div className="p-4 md:p-6 space-y-4 font-sans text-base text-on-surface-variant leading-relaxed">
                  <p>To prove that <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">y - y₁ = m(x - x₁)</code> is equivalent to <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">y = mx + b</code>:</p>
                  <ol className="list-decimal list-inside space-y-3 pl-2">
                    <li>Start with the point-slope form: <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">y - y₁ = m(x - x₁)</code></li>
                    <li>Distribute the slope <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">m</code>: <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">y - y₁ = mx - mx₁</code></li>
                    <li>Isolate <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">y</code> by adding <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">y₁</code> to both sides: <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">y = mx - mx₁ + y₁</code></li>
                    <li>Define <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">b = y₁ - mx₁</code> (since <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">x₁</code> and <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">y₁</code> are constants, <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">b</code> is a constant).</li>
                    <li>Substitute <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-on-surface">b</code> back into the equation: <code className="bg-surface-bright/50 px-1.5 py-0.5 rounded font-mono text-sm text-primary font-bold">y = mx + b</code></li>
                  </ol>
                </div>
              </div>
            </div>

          </section>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant/50 to-transparent"></div>

          {/* Section 3 (Stub for scrolling) */}
          <section className="space-y-6 opacity-50 hover:opacity-100 transition-opacity pb-10" id="practice">
            <h2 className="font-geist text-3xl md:text-5xl font-bold text-on-surface tracking-tight">3. Practice Problems</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed">Ready to test your knowledge? Try solving these typical problems based on the concepts above.</p>
          </section>

        </div>
      </article>
    </div>
  );
}
