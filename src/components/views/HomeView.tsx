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
      <section className="bg-surface-container-high rounded-none p-8 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative overflow-hidden mb-12 transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_0_rgba(0,0,0,1)] transition-all">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1 w-full lg:w-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-black tracking-tighter uppercase text-on-surface mb-4">Welcome back,<br/><span className="text-on-surface-variant tracking-tight">{data.user.name}</span></h2>
            
            <div className="mt-8 flex flex-col gap-2 max-w-md">
              <div className="flex justify-between items-center tracking-widest text-[10px] font-mono uppercase text-on-surface-variant">
                <span>{data.user.phase}</span>
                <span>{data.user.xp} / {data.user.maxXp} XP</span>
              </div>
              
              {/* Minimalist Progress Bar */}
              <div className="w-full h-[1px] bg-outline-variant relative">
                <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${(data.user.xp / data.user.maxXp) * 100}%` }}></div>
              </div>
            </div>
          </div>
          
          {/* Status Label */}
          <div className="border-2 border-black bg-surface px-6 py-2 rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex items-center gap-4 lg:mt-0 mt-4">
            <div className="w-2 h-2 bg-primary border border-black rounded-none"></div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface">Live Session in 15m</span>
          </div>
        </div>
      </section>

      {/* Task Tracks Section */}
      <section className="flex flex-col gap-10 lg:gap-14">
        
        {/* WATCH Track */}
        <div className="relative group">
          <div className="flex items-center gap-3 mb-6 px-1">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Watch Collection</h3>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            {data.watchCollection.map((item: any) => (
              <a key={item.id} href="#" className={`flex-none w-72 md:w-80 snap-start bg-surface-container-highest rounded-none border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all duration-200 relative flex flex-col justify-between h-48 md:h-56 group ${item.locked ? 'opacity-50 pointer-events-none' : ''}`}>
                {item.locked && (
                  <div className="absolute inset-0 bg-surface/30 backdrop-blur-[2px] z-20 flex items-center justify-center">
                    <Lock size={20} className="text-on-surface-variant" />
                  </div>
                )}
                <div className={`relative z-10 flex flex-col h-full justify-between ${item.locked ? '' : ''}`}>
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">{item.category}</span>
                    <span className="font-mono text-[10px] text-on-surface-variant">{item.duration}</span>
                  </div>
                  <div>
                    <h4 className={`font-serif text-xl font-bold uppercase tracking-tight ${item.locked ? 'text-on-surface-variant' : 'text-on-surface transition-all'}`}>{item.title}</h4>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* READ Track */}
        <div className="relative group">
          <div className="flex items-center gap-3 mb-6 px-1">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Read Archives</h3>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            {data.readArchives.map((item: any) => (
              <a key={item.id} href="#" className={`flex-none w-72 md:w-80 snap-start bg-surface-container-high rounded-none border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all duration-200 relative flex flex-col justify-between h-48 md:h-56 group ${item.locked ? 'opacity-50 pointer-events-none' : ''}`}>
                {item.locked && (
                  <div className="absolute inset-0 bg-surface/30 backdrop-blur-[2px] z-20 flex items-center justify-center">
                    <Lock size={20} className="text-on-surface-variant" />
                  </div>
                )}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">{item.category}</span>
                    <span className="font-mono text-[10px] text-on-surface-variant">{item.duration}</span>
                  </div>
                  <div>
                    <h4 className={`font-serif text-xl font-bold uppercase tracking-tight ${item.locked ? 'text-on-surface-variant' : 'text-on-surface transition-all'}`}>{item.title}</h4>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* DO Track */}
        <div className="relative group">
          <div className="flex items-center gap-3 mb-6 px-1">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Active Quests</h3>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            {data.activeQuests.map((item: any) => (
              <a key={item.id} href="#" className={`flex-none w-72 md:w-80 snap-start bg-surface-container rounded-none border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-6 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all duration-200 relative flex flex-col justify-between h-48 md:h-56 group ${item.locked ? 'opacity-50 pointer-events-none' : ''}`}>
                {item.locked && (
                  <div className="absolute inset-0 bg-surface/30 backdrop-blur-[2px] z-20 flex items-center justify-center">
                    <Lock size={20} className="text-on-surface-variant" />
                  </div>
                )}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">{item.category}</span>
                    <span className="font-mono text-[10px] text-on-surface-variant">{item.duration}</span>
                  </div>
                  <div>
                    <h4 className={`font-serif text-xl font-bold uppercase tracking-tight ${item.locked ? 'text-on-surface-variant' : 'text-on-surface transition-all'}`}>{item.title}</h4>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

