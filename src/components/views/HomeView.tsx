import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { PlayCircle, Lock, BookOpen, Edit, Zap, Loader2, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface HomeViewProps {
  userEmail: string;
}

interface Assignment {
  id: number;
  category: string;
  title: string;
  due: string;
  status: string;
  xp: number;
}

export function HomeView({ userEmail }: HomeViewProps) {
  const stats = useQuery(api.dashboard.getLiveStats, { email: userEmail });
  const recentActivities = useQuery(api.dashboard.getRecentActivity, { email: userEmail });
  
  // Outstanding assignments list (matching model in AssignmentsView)
  const outstandingAssignments: Assignment[] = [
    { 
      id: 1, 
      category: "Mathematics", 
      title: "Algebra 101: Quadratics", 
      due: "Today, 11:59 PM", 
      status: "80%", 
      xp: 50
    },
    { 
      id: 2, 
      category: "Sciences", 
      title: "Science Lab Report", 
      due: "Tomorrow, 5:00 PM", 
      status: "0%", 
      xp: 120
    }
  ];

  // Helper hook/state for countdown timers
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getCountdown = (dueStr: string): string => {
    let targetDate = new Date();
    
    const todayMatch = dueStr.match(/Today,\s*(\d+):(\d+)\s*(AM|PM)/i);
    const tomorrowMatch = dueStr.match(/Tomorrow,\s*(\d+):(\d+)\s*(AM|PM)/i);
    
    let matched = false;
    let hours = 0;
    let minutes = 0;
    let isTomorrow = false;
    
    if (todayMatch) {
      matched = true;
      hours = parseInt(todayMatch[1], 10);
      minutes = parseInt(todayMatch[2], 10);
      const ampm = todayMatch[3].toUpperCase();
      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
    } else if (tomorrowMatch) {
      matched = true;
      hours = parseInt(tomorrowMatch[1], 10);
      minutes = parseInt(tomorrowMatch[2], 10);
      const ampm = tomorrowMatch[3].toUpperCase();
      if (ampm === "PM" && hours < 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
      isTomorrow = true;
    }
    
    if (matched) {
      targetDate.setHours(hours, minutes, 0, 0);
      if (isTomorrow) {
        targetDate.setDate(targetDate.getDate() + 1);
      }
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) return "EXPIRED";
      
      const diffHours = Math.floor(diff / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${diffHours}H ${diffMinutes}M LEFT`;
    }
    
    return dueStr;
  };

  const formatActivityTime = (timestamp: number): string => {
    const d = new Date(timestamp);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  if (stats === undefined || recentActivities === undefined) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white">
        <div className="bg-[#F3F4F6] border-4 border-black p-8 text-center max-w-sm w-full shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <Loader2 className="w-10 h-10 text-black animate-spin mx-auto mb-4" />
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-black">
            DIAGNOSING SYSTEM...
          </h2>
          <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-2">
            SYNCHRONIZING BEACON AND ARCHIVES
          </p>
        </div>
      </div>
    );
  }

  if (stats === null) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="bg-[#FF3B30] text-black border-4 border-black p-6 max-w-md w-full shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <h2 className="font-serif text-xl font-bold uppercase mb-2">ACCESS TERMINATED</h2>
          <p className="font-mono text-xs uppercase tracking-wide">
            ERROR: ACTIVE SCHOLAR PROFILE NOT DETECTED.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar pb-24 md:pb-8 max-w-7xl mx-auto w-full space-y-8 select-none">
      
      {/* 1. Transmission Feed */}
      <section className="bg-black text-[#A7F3D0] border-4 border-black p-3.5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative overflow-hidden flex flex-col gap-1.5">
        <div className="absolute -top-1 right-2 bg-[#A7F3D0] text-black px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase">
          LIVE_TRANSMISSIONS
        </div>
        <div className="flex items-center gap-2 border-b border-dashed border-[#A7F3D0]/30 pb-1.5">
          <div className="w-2 h-2 bg-[#A7F3D0] animate-pulse"></div>
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase">FEED // STATUS: SYNCED</span>
        </div>
        <div className="flex flex-col gap-1">
          {recentActivities.map((act) => (
            <div key={act._id} className="font-mono text-[10px] uppercase flex justify-between gap-4">
              <span className="text-gray-400 font-bold shrink-0">{formatActivityTime(act.createdAt)} -</span>
              <span className="text-left flex-1 truncate">{act.message}</span>
              <span className="text-[#38BDF8] shrink-0">[{act.type}]</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Welcome Banner & Level Display */}
      <section className="bg-[#38BDF8] p-6 md:p-8 border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center w-full">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase text-black leading-none">
              WELCOME BACK,<br/>
              <span className="bg-white border-2 border-black px-2.5 inline-block mt-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform">
                {stats.name.toUpperCase()}! 
              </span>
            </h2>
          </div>
          
          <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col gap-3">
            <div className="flex justify-between items-center border-b-2 border-dashed border-black pb-1.5">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-black">
                {stats.role} PROFILE //
              </span>
              <span className="bg-[#A7F3D0] border border-black px-1 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-black">
                ACTIVE
              </span>
            </div>
            
            <div className="flex justify-between items-end text-[9px] font-mono font-bold text-black uppercase tracking-wider">
              <span>CURRENT_XP //</span>
              <span>{stats.xp} / {stats.maxXp} XP</span>
            </div>
            
            <div className="w-full h-5 bg-transparent border-2 border-black p-[2px] overflow-hidden">
              <div 
                className="h-full bg-[#FFD833] border-r-2 border-black" 
                style={{ width: `${(stats.xp / stats.maxXp) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Active Analytics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Analytics Item 1 */}
        <div className="bg-[#FFD833] border-4 border-black p-5 shadow-[4px_4px_0_0_#000000] flex flex-col justify-between h-36">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/60 border-b border-black/20 pb-1 flex justify-between">
            <span>METRIC //</span>
            <span>STREAK_STABILITY</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-5xl font-black text-black">{stats.currentStreak}</span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">DAYS</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-black">
            <Zap size={12} className="fill-black" />
            <span>DAILY ENGAGEMENT PROTOCOL ACTIVE</span>
          </div>
        </div>

        {/* Analytics Item 2 */}
        <div className="bg-[#A7F3D0] border-4 border-black p-5 shadow-[4px_4px_0_0_#000000] flex flex-col justify-between h-36">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/60 border-b border-black/20 pb-1 flex justify-between">
            <span>METRIC //</span>
            <span>OBJECTIVES_SYNCED</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-5xl font-black text-black">{stats.completedQuests}</span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">COMPLETED</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-black">
            <CheckCircle size={12} className="fill-black" />
            <span>ALL SUBMISSIONS TRANSMITTED</span>
          </div>
        </div>

        {/* Analytics Item 3 */}
        <div className="bg-[#38BDF8] border-4 border-black p-5 shadow-[4px_4px_0_0_#000000] flex flex-col justify-between h-36">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-black/60 border-b border-black/20 pb-1 flex justify-between">
            <span>METRIC //</span>
            <span>COMPLETION_RATE</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-5xl font-black text-black">
              {Math.round((stats.completedQuests / (stats.completedQuests + stats.pendingPayloads)) * 100)}%
            </span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-black">
            <AlertCircle size={12} className="fill-black" />
            <span>PENDING PAYLOADS: {stats.pendingPayloads}</span>
          </div>
        </div>
      </section>

      {/* 4. Live Payload Hub */}
      <section className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex flex-col gap-5">
        <div className="border-b-4 border-black pb-3 flex justify-between items-center">
          <h3 className="font-serif text-2xl font-black uppercase text-black tracking-tight">LIVE PAYLOAD HUB</h3>
          <span className="bg-[#FF3B30] text-black px-2 py-0.5 border border-black font-mono text-[8px] font-bold uppercase tracking-widest">
            ACTION REQUIRED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {outstandingAssignments.map((assignment) => (
            <div 
              key={assignment.id} 
              className="bg-[#F3F4F6] border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between h-44 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#000000] transition-all"
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] font-bold uppercase text-gray-500 tracking-wider">
                  {assignment.category}
                </span>
                <span className="bg-white border border-black px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase">
                  +{assignment.xp} XP
                </span>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold uppercase tracking-tight text-black line-clamp-1">
                  {assignment.title}
                </h4>
                <div className="mt-2.5 flex items-center gap-1.5 text-black">
                  <Clock size={14} className="stroke-[2.5px]" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-[#FFD833] border border-black px-1.5 py-0.5">
                    {getCountdown(assignment.due)}
                  </span>
                </div>
              </div>

              <div className="border-t border-dashed border-black/20 pt-2 flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                <span>STATUS: {assignment.status} SYNCED</span>
                <span className="text-[#38BDF8] font-bold">TRANSMIT &gt;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
