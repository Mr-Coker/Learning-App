import { PlayCircle, Lock, BookOpen, Edit, Zap } from 'lucide-react';

export function HomeView() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-10 hide-scrollbar pb-24 md:pb-10 max-w-7xl mx-auto w-full">
      {/* Top Header Banner */}
      <section className="bg-surface-container-high rounded-2xl p-6 border border-white/5 relative overflow-hidden mb-8 shadow-lg w-full">
        {/* Abstract Glassmorphism Glow Background */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1 w-full lg:w-auto">
            <h2 className="font-geist text-2xl md:text-3xl text-on-surface mb-2 font-semibold">Welcome back, Alex! 🚀</h2>
            
            <div className="bg-surface-container-highest/50 p-4 rounded-xl border border-white/5 mt-4 flex flex-col gap-2 max-w-md">
              <div className="flex justify-between items-center">
                <span className="font-geist text-sm font-medium text-primary">Level 4 Tech Scholar</span>
                <span className="font-geist text-xs text-on-surface-variant">850 / 1000 XP</span>
              </div>
              
              {/* Gamified XP Bar */}
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden relative shadow-inner">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary w-[85%] rounded-full shadow-[0_0_10px_rgba(164,230,255,0.5)]"></div>
              </div>
            </div>
          </div>
          
          {/* Live Ticker */}
          <div className="bg-surface-container/80 backdrop-blur-md border border-tertiary-container/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(50,214,201,0.15)] animate-pulse lg:mt-0 mt-2">
            <Zap size={16} className="text-tertiary-container fill-tertiary-container" />
            <span className="font-geist font-medium text-sm text-tertiary-container">Next live session starts in 15 mins!</span>
          </div>
        </div>
      </section>

      {/* Task Tracks Section */}
      <section className="flex flex-col gap-10">
        
        {/* WATCH Track */}
        <div className="relative group">
          <div className="flex items-center gap-3 mb-4 px-2">
            <span className="text-primary bg-primary/10 p-2 rounded-lg">
              <PlayCircle size={20} />
            </span>
            <h3 className="font-geist text-xl text-on-surface uppercase tracking-wider font-semibold">Watch</h3>
          </div>
          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            
            {/* Unlocked Card */}
            <a href="#" className="flex-none w-72 md:w-80 snap-start bg-surface-container-high rounded-xl border border-white/5 border-t-primary p-4 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(164,230,255,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group/card block h-40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col h-full gap-4">
                <div className="flex justify-between items-start">
                  <span className="font-geist text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Physics</span>
                  <div className="flex items-center gap-1 text-on-surface-variant font-geist text-xs">
                    <PlayCircle size={14} /> 15 mins
                  </div>
                </div>
                <div>
                  <h4 className="font-sans text-lg text-on-surface font-semibold group-hover/card:text-primary transition-colors">Quantum Mechanics Intro</h4>
                </div>
                <div className="mt-auto flex items-center gap-2 text-primary font-geist text-sm font-medium group-hover/card:drop-shadow-[0_0_8px_rgba(164,230,255,0.8)] transition-all">
                  <PlayCircle size={18} /> Start Video
                </div>
              </div>
            </a>
            
            {/* Locked Card */}
            <div className="flex-none w-72 md:w-80 snap-start bg-surface-container rounded-xl border border-white/5 p-4 relative overflow-hidden opacity-60 pointer-events-none h-40">
              <div className="absolute inset-0 bg-surface/50 backdrop-blur-sm z-20 flex items-center justify-center">
                <Lock size={32} className="text-secondary drop-shadow-[0_0_12px_rgba(233,179,255,0.8)] fill-secondary" />
              </div>
              <div className="relative z-10 flex flex-col h-full gap-4 blur-[2px]">
                <div className="flex justify-between items-start">
                  <span className="font-geist text-xs px-2 py-1 bg-surface-variant text-on-surface-variant rounded-full">Physics</span>
                  <div className="flex items-center gap-1 text-on-surface-variant font-geist text-xs">
                    <PlayCircle size={14} /> 25 mins
                  </div>
                </div>
                <div>
                  <h4 className="font-sans text-lg text-on-surface font-semibold">Wave-Particle Duality</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* READ Track */}
        <div className="relative group">
          <div className="flex items-center gap-3 mb-4 px-2">
            <span className="text-secondary bg-secondary/10 p-2 rounded-lg">
              <BookOpen size={20} />
            </span>
            <h3 className="font-geist text-xl text-on-surface uppercase tracking-wider font-semibold">Read</h3>
          </div>
          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            
            {/* Unlocked Card */}
            <a href="#" className="flex-none w-72 md:w-80 snap-start bg-surface-container-high rounded-xl border border-white/5 border-t-secondary p-4 hover:border-secondary/50 hover:shadow-[0_0_20px_rgba(233,179,255,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group/card block h-40">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col h-full gap-4">
                <div className="flex justify-between items-start">
                  <span className="font-geist text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">History</span>
                  <div className="flex items-center gap-1 text-on-surface-variant font-geist text-xs">
                    <BookOpen size={14} /> 10 mins
                  </div>
                </div>
                <div>
                  <h4 className="font-sans text-lg text-on-surface font-semibold group-hover/card:text-secondary transition-colors">The Industrial Revolution</h4>
                </div>
                <div className="mt-auto flex items-center gap-2 text-secondary font-geist text-sm font-medium group-hover/card:drop-shadow-[0_0_8px_rgba(233,179,255,0.8)] transition-all">
                  <BookOpen size={18} /> Begin Reading
                </div>
              </div>
            </a>
            
            {/* Locked Card */}
            <div className="flex-none w-72 md:w-80 snap-start bg-surface-container rounded-xl border border-white/5 p-4 relative overflow-hidden opacity-60 pointer-events-none h-40">
              <div className="absolute inset-0 bg-surface/50 backdrop-blur-sm z-20 flex items-center justify-center">
                <Lock size={32} className="text-secondary drop-shadow-[0_0_12px_rgba(233,179,255,0.8)] fill-secondary" />
              </div>
              <div className="relative z-10 flex flex-col h-full gap-4 blur-[2px]">
                <div className="flex justify-between items-start">
                  <span className="font-geist text-xs px-2 py-1 bg-surface-variant text-on-surface-variant rounded-full">History</span>
                  <div className="flex items-center gap-1 text-on-surface-variant font-geist text-xs">
                    <BookOpen size={14} /> 15 mins
                  </div>
                </div>
                <div>
                  <h4 className="font-sans text-lg text-on-surface font-semibold">Post-War Economics</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DO Track */}
        <div className="relative group">
          <div className="flex items-center gap-3 mb-4 px-2">
            <span className="text-tertiary bg-tertiary/10 p-2 rounded-lg">
              <Edit size={20} />
            </span>
            <h3 className="font-geist text-xl text-on-surface uppercase tracking-wider font-semibold">Do</h3>
          </div>
          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            
            {/* Unlocked Card */}
            <a href="#" className="flex-none w-72 md:w-80 snap-start bg-surface-container-high rounded-xl border border-white/5 border-t-tertiary p-4 hover:border-tertiary/50 hover:shadow-[0_0_20px_rgba(91,243,229,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group/card block h-40">
              <div className="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col h-full gap-4">
                <div className="flex justify-between items-start">
                  <span className="font-geist text-xs px-2 py-1 bg-tertiary/10 text-tertiary rounded-full">Algebra</span>
                  <div className="flex items-center gap-1 text-on-surface-variant font-geist text-xs">
                    <Edit size={14} /> 20 mins
                  </div>
                </div>
                <div>
                  <h4 className="font-sans text-lg text-on-surface font-semibold group-hover/card:text-tertiary transition-colors">Linear Equations Quiz</h4>
                </div>
                <div className="mt-auto flex items-center gap-2 text-tertiary font-geist text-sm font-medium group-hover/card:drop-shadow-[0_0_8px_rgba(91,243,229,0.8)] transition-all">
                  <Edit size={18} /> Start Practice
                </div>
              </div>
            </a>
            
            {/* Locked Card 1 */}
            <div className="flex-none w-72 md:w-80 snap-start bg-surface-container rounded-xl border border-white/5 p-4 relative overflow-hidden opacity-60 pointer-events-none h-40">
              <div className="absolute inset-0 bg-surface/50 backdrop-blur-sm z-20 flex items-center justify-center">
                <Lock size={32} className="text-secondary drop-shadow-[0_0_12px_rgba(233,179,255,0.8)] fill-secondary" />
              </div>
              <div className="relative z-10 flex flex-col h-full gap-4 blur-[2px]">
                <div className="flex justify-between items-start">
                  <span className="font-geist text-xs px-2 py-1 bg-surface-variant text-on-surface-variant rounded-full">Algebra</span>
                  <div className="flex items-center gap-1 text-on-surface-variant font-geist text-xs">
                    <Edit size={14} /> 30 mins
                  </div>
                </div>
                <div>
                  <h4 className="font-sans text-lg text-on-surface font-semibold">Quadratic Functions Project</h4>
                </div>
              </div>
            </div>
            
            {/* Locked Card 2 */}
            <div className="flex-none w-72 md:w-80 snap-start bg-surface-container rounded-xl border border-white/5 p-4 relative overflow-hidden opacity-60 pointer-events-none h-40">
              <div className="absolute inset-0 bg-surface/50 backdrop-blur-sm z-20 flex items-center justify-center">
                <Lock size={32} className="text-secondary drop-shadow-[0_0_12px_rgba(233,179,255,0.8)] fill-secondary" />
              </div>
              <div className="relative z-10 flex flex-col h-full gap-4 blur-[2px]">
                <div className="flex justify-between items-start">
                  <span className="font-geist text-xs px-2 py-1 bg-surface-variant text-on-surface-variant rounded-full">Algebra</span>
                  <div className="flex items-center gap-1 text-on-surface-variant font-geist text-xs">
                    <Edit size={14} /> 45 mins
                  </div>
                </div>
                <div>
                  <h4 className="font-sans text-lg text-on-surface font-semibold">Final Exam Prep</h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
