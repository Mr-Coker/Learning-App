import { useState, useEffect } from 'react';
import { 
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import { ViewState, AppRole } from '../../types';

interface TopNavProps {
  currentView: ViewState;
  setCurrentView: (v: ViewState) => void;
  role: AppRole;
  onLogout: () => void;
}

const viewLabels: Record<ViewState, string> = {
  home: "SYS // DASHBOARD",
  chat: "SYS // COMMS_LINK",
  assignments: "SYS // QUEST_LOG",
  notes: "SYS // TRANSMISSIONS",
  library: "SYS // DATA_HUB",
  teacher: "SYS // TEACHER_CONSOLE",
  admin: "SYS // ADMIN_CONSOLE"
};

const roleTabs: Record<AppRole, Array<{ view: ViewState; label: string }>> = {
  student: [
    { view: 'home', label: 'Dashboard' },
    { view: 'assignments', label: 'Quests' },
    { view: 'notes', label: 'Notes' },
    { view: 'library', label: 'Library' }
  ],
  teacher: [
    { view: 'home', label: 'Facilitator Dashboard' },
    { view: 'chat', label: 'Communications Hub' }
  ],
  admin: [
    { view: 'home', label: 'System Overview' },
    { view: 'assignments', label: 'Class Roster' },
    { view: 'library', label: 'Financial Terminal' }
  ]
};

export function TopNav({ currentView, setCurrentView, role, onLogout }: TopNavProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const tabs = roleTabs[role] || [];

  return (
    <header className="flex justify-between items-center w-full px-4 md:px-10 py-4 min-h-[5rem] bg-surface border-b-4 border-black z-50 sticky top-0 flex-shrink-0 flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <div className="bg-black text-white px-3 py-1 font-mono text-xs uppercase tracking-widest inline-block border-2 border-black">
          {viewLabels[currentView] || 'SYS // TERMINAL'}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4 flex-wrap">
        {tabs.map((tab) => {
          const isActive = currentView === tab.view;
          return (
            <button
              key={tab.view}
              onClick={() => setCurrentView(tab.view)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border-2 rounded-none ${
                isActive 
                  ? 'bg-[#FFD833] text-black border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] font-bold' 
                  : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none hover:bg-[#FFD833]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <div className="hidden lg:flex items-center gap-2 border-2 border-black bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
          <span className="w-2 h-2 bg-emerald-500 animate-pulse inline-block border border-black"></span>
          <span className="text-black font-bold">ONLINE</span>
          <span className="text-gray-400">//</span>
          <span className="text-black font-bold">{time}</span>
        </div>
        <button 
          aria-label="Notifications"
          title="Notifications"
          className="text-on-surface-variant hover:text-on-surface border-2 border-transparent hover:border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none p-2 rounded-none flex items-center justify-center"
        >
          <Bell size={20} />
        </button>
        <button 
          aria-label="Settings"
          title="Settings"
          className="text-on-surface-variant hover:text-on-surface border-2 border-transparent hover:border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none p-2 rounded-none flex items-center justify-center"
        >
          <Settings size={20} />
        </button>
        <button
          onClick={onLogout}
          aria-label="Logout"
          title="Logout"
          className="text-white bg-[#FF3B30] border-2 border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none p-2 rounded-none flex items-center justify-center"
        >
          <LogOut size={20} />
        </button>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-none bg-secondary overflow-hidden border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZXUFLYBtv-tRHA6wW9oAHItHJiXq969tC_Kprve0Zx21kmHyt9pFdnvFGF5amrkdTpZfuCQSlWDJLULcoqk7sj2z_jLpxd4HarpkqZFmgTXYD_wH1_3RiBlMAiGsoi__PSWJwHK6UTWuogR5T0U0vNcdYO30LkTH0FHThwt4-yTWCVmpHXbcRFZO4clE0aDwsNJluimh7APlKIoE8AaE9S8YypODas3DE1lBRBWcRUujVfHSf7ENYoBkxYX92gBBBg0Su5s5tq84"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
}
