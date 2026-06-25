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
  admin: "SYS // ADMIN_CONSOLE",
  communication: "SYS // COMMS_LINK",
  admin_subjects: "SYS // SUBJECTS_CONSOLE"
};

const roleTabs: Record<AppRole, Array<{ view: ViewState; label: string }>> = {
  student: [
    { view: 'home', label: 'Dashboard' },
    { view: 'assignments', label: 'Quests' },
    { view: 'notes', label: 'Notes' },
    { view: 'library', label: 'Library' },
    { view: 'communication', label: 'Communication' }
  ],
  teacher: [
    { view: 'home', label: 'Facilitator Dashboard' },
    { view: 'chat', label: 'Communications Hub' }
  ],
  admin: [
    { view: 'home', label: 'System Overview' },
    { view: 'assignments', label: 'Class Roster' },
    { view: 'library', label: 'Financial Terminal' },
    { view: 'notes', label: 'Note Ingester' },
    { view: 'admin_subjects', label: 'Subjects Console' }
  ]
};

export function TopNav({ currentView, setCurrentView, role, onLogout }: TopNavProps) {
  const [time, setTime] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
  const currentLabel = viewLabels[currentView] || currentView.toUpperCase();

  return (
    <div className="w-full bg-surface border-b-4 border-black z-50 sticky top-0 flex flex-col">
      {/* Navbar visible row */}
      <div className="flex justify-between items-center w-full px-4 md:px-10 h-20 bg-surface relative">
        
        {/* 1. Branding Wrapper */}
        <button 
          onClick={() => {
            setCurrentView('home');
            setIsDropdownOpen(false);
          }}
          className="flex items-center gap-2 px-2 py-1 cursor-pointer bg-transparent border-0"
        >
          <img src="/favicon.svg" alt="EduSphere logo" className="h-10 w-10 object-contain" />
          <span className="font-serif text-xl sm:text-3xl font-black uppercase tracking-tighter select-none text-black">
            EduSphere
          </span>
        </button>

        {/* 2. Active Dropdown Trigger */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="border-2 border-black bg-[#FFD833] text-black px-4 py-2 font-mono text-xs md:text-sm uppercase tracking-widest font-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer flex items-center gap-2 select-none"
          >
            <span>[ {currentLabel} ]</span>
            <span>▾</span>
          </button>
          
          {/* Dropdown Overlay Panel */}
          {isDropdownOpen && (
            <div className="rounded-none border-2 border-black bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] z-50 absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[240px] flex flex-col">
              {tabs.map((tab) => {
                const isActive = currentView === tab.view;
                return (
                  <button
                    key={tab.view}
                    onClick={() => {
                      setCurrentView(tab.view);
                      setIsDropdownOpen(false);
                    }}
                    className={`font-mono text-xs uppercase tracking-widest p-4 border-b-2 border-black last:border-b-0 text-left cursor-pointer ${
                      isActive 
                        ? 'bg-black text-white font-bold' 
                        : 'bg-white text-black hover:bg-[#FFD833] font-medium'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Action Badges (Anchored cleanly on right margin) */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:flex items-center gap-2 border-2 border-black bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <span className="w-2 h-2 bg-emerald-500 animate-pulse inline-block border border-black"></span>
            <span className="text-black font-bold">ONLINE</span>
            <span className="text-gray-400">//</span>
            <span className="text-black font-bold">{time}</span>
          </div>
          <button 
            aria-label="Notifications"
            title="Notifications"
            className="text-on-surface-variant hover:text-on-surface border-2 border-transparent hover:border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none p-2 rounded-none flex items-center justify-center cursor-pointer"
          >
            <Bell size={20} className="text-black" />
          </button>
          <button 
            aria-label="Settings"
            title="Settings"
            className="text-on-surface-variant hover:text-on-surface border-2 border-transparent hover:border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none p-2 rounded-none flex items-center justify-center cursor-pointer"
          >
            <Settings size={20} className="text-black" />
          </button>
          <button
            onClick={onLogout}
            aria-label="Logout"
            title="Logout"
            className="text-white bg-[#FF3B30] border-2 border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none p-2 rounded-none flex items-center justify-center cursor-pointer"
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

      </div>
    </div>
  );
}
