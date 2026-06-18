import { PlusCircle, Send, ArrowUp, ArrowRight, Shield } from 'lucide-react';

export function ChatView() {
  return (
    <div className="flex-1 flex overflow-hidden w-full relative">
      {/* Channels Sidebar (Inner Left Column) */}
      <div className="w-56 md:w-64 bg-surface-container-low border-r border-outline-variant flex flex-col hidden md:flex flex-shrink-0 h-full">
        <div className="p-8 border-b border-outline-variant">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Frequency</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <a href="#" className="block px-4 py-3 rounded-none bg-outline-variant text-on-surface font-mono text-[10px] uppercase tracking-widest border-l-2 border-on-surface">
              <span className="opacity-50">CH.01</span> MATH
          </a>
          <a href="#" className="block px-4 py-3 rounded-none text-on-surface-variant hover:text-on-surface transition-colors font-mono text-[10px] uppercase tracking-widest border-l-2 border-transparent">
              <span className="opacity-50">CH.02</span> SCIENCE
          </a>
          <a href="#" className="block px-4 py-3 rounded-none text-on-surface-variant hover:text-on-surface transition-colors font-mono text-[10px] uppercase tracking-widest border-l-2 border-transparent">
              <span className="opacity-50">CH.03</span> LITERATURE
          </a>
          <a href="#" className="block px-4 py-3 rounded-none text-on-surface-variant hover:text-on-surface transition-colors font-mono text-[10px] uppercase tracking-widest border-l-2 border-transparent">
              <span className="opacity-50">CH.04</span> SYSTEMS
          </a>
        </div>
      </div>

      {/* Chat Stream (Right Column) */}
      <div className="flex-1 flex flex-col bg-background relative h-full">
        {/* Chat Header */}
        <header className="h-20 flex items-center px-4 md:px-8 border-b border-outline-variant bg-background/80 backdrop-blur-md z-10 flex-shrink-0">
          <div className="flex items-baseline gap-4">
            <span className="text-2xl md:text-3xl font-serif font-black uppercase text-on-surface tracking-tighter">Math</span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-mono hidden sm:block mt-2">Calculus & Algebra protocols.</span>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10">
          
          {/* System Message */}
          <div className="flex justify-center">
            <span className="bg-outline-variant text-on-surface-variant font-mono text-[10px] uppercase tracking-widest px-6 py-2 border border-outline-variant text-center">
              Connection Established
            </span>
          </div>

          {/* Regular Message */}
          <div className="flex gap-6">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" 
              alt="User Avatar" 
              className="w-10 h-10 rounded-none border-2 border-black flex-shrink-0 object-cover grayscale opacity-80 shadow-[2px_2px_0_0_rgba(0,0,0,1)]" 
            />
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[10px] text-on-surface uppercase tracking-widest">AV_01</span>
                <span className="font-mono text-[10px] text-on-surface-variant">10:42</span>
              </div>
              <div className="bg-surface-container-high rounded-none border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 text-on-surface-variant font-sans text-sm inline-block max-w-[90%] md:max-w-[80%] leading-relaxed">
                Hey everyone, is anyone else struggling with problem 4 on the derivatives worksheet? I keep getting zero in the denominator.
              </div>
            </div>
          </div>

          {/* Upvoteable Question Card */}
          <div className="flex gap-6">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1024&auto=format&fit=crop" 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full flex-shrink-0 object-cover grayscale opacity-80" 
            />
            <div className="w-full max-w-2xl">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[10px] text-on-surface uppercase tracking-widest">SJ_02</span>
                <span className="font-mono text-[10px] text-on-surface-variant">10:45</span>
              </div>
              <div className="bg-surface-container border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none p-8 relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-2">
                  <h4 className="font-serif text-xl font-bold uppercase tracking-tight text-on-surface flex-1">Chain Rule Application</h4>
                  <span className="text-on-surface-variant px-2 py-0.5 border border-outline rounded-none text-[10px] font-mono uppercase tracking-widest w-fit">Unresolved</span>
                </div>
                <p className="font-sans text-sm text-on-surface-variant mb-6 leading-relaxed">
                  When applying the chain rule to f(x) = sin(cos(x^2)), do I derive the x^2 first or the outer sine function? The textbook examples are a bit ambiguous on the order of operations here.
                </p>
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-outline-variant">
                  <button className="flex items-center gap-3 text-on-surface-variant hover:text-on-surface transition-colors font-mono text-[10px] uppercase tracking-widest">
                    <ArrowUp size={14} /> 12 Upvotes
                  </button>
                  <button className="text-on-surface-variant hover:text-on-surface font-mono text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2">
                    View Data <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Response */}
          <div className="flex gap-6">
            <div className="w-10 h-10 rounded-none border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex-shrink-0 bg-primary flex items-center justify-center">
              <Shield size={16} className="text-on-primary" />
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-3 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface">Director</span>
                <span className="bg-primary text-on-primary flex items-center gap-1 px-2 py-0.5 rounded-none text-[8px] font-mono uppercase tracking-widest leading-none">
                   STAFF
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant">10:52</span>
              </div>
              <div className="bg-primary text-on-primary rounded-none border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 font-sans text-sm inline-block max-w-[90%] md:max-w-[80%] leading-relaxed font-medium">
                Excellent question. Always work from the outside in. First derive sin(u), then cos(v), and finally x^2. I've placed a diagram in the archives that breaks this down.
              </div>
            </div>
          </div>

          {/* Regular Message */}
          <div className="flex gap-6">
            <div className="w-10 h-10 rounded-none border-2 border-black flex-shrink-0 bg-surface shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-center justify-center">
            </div>
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface">OP_04</span>
                <span className="font-mono text-[10px] text-on-surface-variant">10:55</span>
              </div>
              <div className="bg-surface-container-high rounded-none border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 text-on-surface-variant font-sans text-sm inline-block max-w-[90%] md:max-w-[80%] leading-relaxed">
                Ah, outside in makes so much more sense. Thanks!
              </div>
            </div>
          </div>

        </div>

        {/* Message Input */}
        <div className="p-4 md:p-8 bg-background/90 backdrop-blur-md border-t border-outline-variant flex-shrink-0">
          <div className="relative flex items-center max-w-4xl mx-auto">
            <button className="absolute left-3 md:left-6 text-on-surface-variant hover:text-on-surface transition-colors">
              <PlusCircle size={20} />
            </button>
            <input 
              type="text" 
              className="w-full bg-surface-container-low border-4 border-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] py-4 pl-12 md:pl-16 pr-16 text-on-surface font-sans text-sm focus:shadow-[6px_6px_0_0_rgba(0,0,0,1)] focus:outline-none transition-all" 
              placeholder="Transmit message..." 
            />
            <button className="absolute right-3 md:right-4 bg-primary text-on-primary p-2 border-2 border-black rounded-none hover:bg-primary/90 transition-all flex items-center justify-center">
              <Send size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
