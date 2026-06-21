import { PlayCircle, Lock, BookOpen, Edit, Zap, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export function HomeView() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay for dynamic loading
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        // Artificial delay to show loading state
        setTimeout(() => {
          setData(jsonData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-on-surface-variant animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-10 hide-scrollbar pb-24 md:pb-10 max-w-7xl mx-auto w-full">
      {/* Top Header Banner */}
      <section className="bg-[#38BDF8] rounded-none p-8 md:p-10 border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] relative overflow-hidden mb-12 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left Column (Greeting Area) */}
          <div className="flex-1">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-black leading-none">
              WELCOME BACK,<br/>
              <span className="bg-white border-2 border-black px-2 inline-block mt-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform">
                {data.user.name.toUpperCase()}! 
              </span>
            </h2>
          </div>
          
          {/* Right Column (XP & Level Progress Box) */}
          <div className="w-full">
            <div className="bg-white border-2 border-black rounded-none p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col gap-4">
              <div className="flex justify-between items-center border-b-2 border-dashed border-black pb-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                  LEVEL 4 TECH SCHOLAR //
                </span>
                <span className="bg-[#A7F3D0] border border-black px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-black">
                  ACTIVE
                </span>
              </div>
              
              <div className="flex justify-between items-end">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  CURRENT_XP //
                </span>
                <span className="font-mono text-sm font-bold text-black">
                  {data.user.xp} / {data.user.maxXp} XP
                </span>
              </div>
              
              {/* Custom Progress Bar */}
              <div className="w-full h-6 bg-transparent border-2 border-black rounded-none overflow-hidden relative p-[2px]">
                <div 
                  className="h-full bg-[#FFD833] border-r-2 border-black" 
                  style={{ width: `${(data.user.xp / data.user.maxXp) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task Tracks Section */}
      <section className="flex flex-col gap-12 lg:gap-16">
        
        {/* WATCH Track */}
        <div className="relative">
          <div className="mb-6">
            <div className="inline-block bg-[#FFD833] border-2 border-black rounded-none px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                CH.01 WATCH //
              </span>
            </div>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            {data.watchCollection.map((item: any) => {
              const description = {
                "Quantum Mechanics Intro": "Explore the fundamental wave equations, spin theory, and quantum states.",
                "Wave-Particle Duality": "Understand how matter behaves as both waves and particles in microscopic realms."
              }[item.title] || "Master this module to unlock further nodes in the curriculum.";
              
              return (
                <div 
                  key={item.id} 
                  className={`flex-none w-72 md:w-80 snap-start bg-[#FFD833] rounded-none border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 relative flex flex-col justify-between h-56 group ${item.locked ? 'opacity-50 pointer-events-none' : 'hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all'}`}
                >
                  {item.locked && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1.5px] z-20 flex items-center justify-center">
                      <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                        <Lock size={20} className="text-black fill-black" />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-black/60 bg-white/40 px-1.5 py-0.5 border border-black/20">
                      {item.category}
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-black/80">
                      EST_TIME // {item.duration}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-serif text-lg md:text-xl font-bold uppercase tracking-tight text-black line-clamp-1 mb-2">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-black/75 leading-relaxed line-clamp-3">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* READ Track */}
        <div className="relative">
          <div className="mb-6">
            <div className="inline-block bg-[#38BDF8] border-2 border-black rounded-none px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                CH.02 READ //
              </span>
            </div>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            {data.readArchives.map((item: any) => {
              const description = {
                "The Industrial Revolution": "Deconstruct the economic shift, machine automation, and social impact.",
                "Post-War Economics": "Analyze structural recovery, monetary policy, and global financial frameworks."
              }[item.title] || "Master this module to unlock further nodes in the curriculum.";

              return (
                <div 
                  key={item.id} 
                  className={`flex-none w-72 md:w-80 snap-start bg-[#38BDF8] rounded-none border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 relative flex flex-col justify-between h-56 group ${item.locked ? 'opacity-50 pointer-events-none' : 'hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all'}`}
                >
                  {item.locked && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1.5px] z-20 flex items-center justify-center">
                      <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                        <Lock size={20} className="text-black fill-black" />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-black/60 bg-white/40 px-1.5 py-0.5 border border-black/20">
                      {item.category}
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-black/80">
                      EST_TIME // {item.duration}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-serif text-lg md:text-xl font-bold uppercase tracking-tight text-black line-clamp-1 mb-2">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-black/75 leading-relaxed line-clamp-3">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DO Track */}
        <div className="relative">
          <div className="mb-6">
            <div className="inline-block bg-[#A7F3D0] border-2 border-black rounded-none px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-black">
                CH.03 DO //
              </span>
            </div>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            {data.activeQuests.map((item: any) => {
              const description = {
                "Linear Equations Quiz": "Solve multi-variable equations and visualize coordinates on graphs.",
                "Quadratic Functions Project": "Calculate parabolas, vertices, and apply curves to real-world physics.",
                "Final Exam Prep": "Comprehensive review of all algebraic formulas and functional proof systems."
              }[item.title] || "Master this module to unlock further nodes in the curriculum.";

              return (
                <div 
                  key={item.id} 
                  className={`flex-none w-72 md:w-80 snap-start bg-[#A7F3D0] rounded-none border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 relative flex flex-col justify-between h-56 group ${item.locked ? 'opacity-50 pointer-events-none' : 'hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all'}`}
                >
                  {item.locked && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1.5px] z-20 flex items-center justify-center">
                      <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                        <Lock size={20} className="text-black fill-black" />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-black/60 bg-white/40 px-1.5 py-0.5 border border-black/20">
                      {item.category}
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-black/80">
                      EST_TIME // {item.duration}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-serif text-lg md:text-xl font-bold uppercase tracking-tight text-black line-clamp-1 mb-2">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-black/75 leading-relaxed line-clamp-3">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

