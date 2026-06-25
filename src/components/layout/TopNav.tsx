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
  communication: "SYS // COMMS_LINK"
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
    { view: 'notes', label: 'Note Ingester' }
  ]
};

export function TopNav({ currentView, setCurrentView, role, onLogout }: TopNavProps) {
  const [time, setTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="w-full bg-surface border-b-4 border-black z-50 sticky top-0 flex flex-col">
      {/* Tier 1 Header */}
      <div className="flex justify-between items-center w-full px-4 md:px-10 h-20 bg-surface">
        {/* Brand / Logo */}
        <button 
          onClick={() => setCurrentView('home')}
         className="flex items-center gap-2 px-2 py-1"
        >
          <img src="/favicon.svg" alt="EduSphere logo" className="h-10 w-10 object-contain" />
          <span className="font-serif text-xl sm:text-3xl font-black uppercase tracking-tighter select-none">
            EduSphere
          </span>
        </button>

        {/* Desktop Tabs (md:flex) */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {tabs.map((tab) => {
            const isActive = currentView === tab.view;
            return (
              <button
                key={tab.view}
                onClick={() => setCurrentView(tab.view)}
                className={`font-mono text-xs uppercase tracking-widest px-3 py-2 border-2 rounded-none whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#FFD833] text-black border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] font-bold' 
                    : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-[#FFD833]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Desktop Actions (md:flex) */}
        <div className="hidden md:flex items-center gap-2 md:gap-4">
          <div className="hidden lg:flex items-center gap-2 border-2 border-black bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <span className="w-2 h-2 bg-emerald-500 animate-pulse inline-block border border-black"></span>
            <span className="text-black font-bold">ONLINE</span>
            <span className="text-gray-400">//</span>
            <span className="text-black font-bold">{time}</span>
          </div>
          <button 
            aria-label="Notifications"
            title="Notifications"
            className="text-on-surface-variant hover:text-on-surface border-2 border-transparent hover:border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none p-2 rounded-none flex items-center justify-center"
          >
            <Bell size={20} />
          </button>
          <button 
            aria-label="Settings"
            title="Settings"
            className="text-on-surface-variant hover:text-on-surface border-2 border-transparent hover:border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none p-2 rounded-none flex items-center justify-center"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={onLogout}
            aria-label="Logout"
            title="Logout"
            className="text-white bg-[#FF3B30] border-2 border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none p-2 rounded-none flex items-center justify-center"
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

        {/* Mobile Toggle Button (< md) */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="border-2 border-black bg-[#FFD833] text-black px-3 py-1.5 font-mono text-xs uppercase tracking-widest font-black rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            {isMenuOpen ? '[ CLOSE_MENU ]' : '[ NAV_MENU ]'}
          </button>
        </div>
      </div>

      {/* Tier 2 Mobile Dropdown Panel */}
      <div 
        className={`md:hidden overflow-hidden transition-[max-height] duration-200 ease-in-out bg-surface border-t-2 border-black ${
          isMenuOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className="p-4 flex flex-col gap-4">
          {/* Navigation Links in 2x2 grid or list depending on size */}
          <div className="grid grid-cols-2 gap-2 border-b-2 border-black pb-4">
            {tabs.map((tab) => {
              const isActive = currentView === tab.view;
              return (
                <button
                  key={tab.view}
                  onClick={() => {
                    setCurrentView(tab.view);
                    setIsMenuOpen(false);
                  }}
                  className={`font-mono text-[10px] sm:text-xs uppercase tracking-widest px-2 py-3 border-2 rounded-none text-center whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#FFD833] text-black border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] font-bold' 
                      : 'border-black text-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-[#FFD833]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* User actions / settings row */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2 border-2 border-black bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span className="w-2 h-2 bg-emerald-500 animate-pulse inline-block border border-black"></span>
              <span className="text-black font-bold">{time}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                aria-label="Notifications"
                className="text-black border-2 border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none p-2 rounded-none flex items-center justify-center"
              >
                <Bell size={18} />
              </button>
              <button 
                aria-label="Settings"
                className="text-black border-2 border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none p-2 rounded-none flex items-center justify-center"
              >
                <Settings size={18} />
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onLogout();
                }}
                aria-label="Logout"
                className="text-white bg-[#FF3B30] border-2 border-black hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none p-2 rounded-none flex items-center justify-center"
              >
                <LogOut size={18} />
              </button>
              <div className="w-9 h-9 rounded-none bg-secondary overflow-hidden border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZXUFLYBtv-tRHA6wW9oAHItHJiXq969tC_Kprve0Zx21kmHyt9pFdnvFGF5amrkdTpZfuCQSlWDJLULcoqk7sj2z_jLpxd4HarpkqZFmgTXYD_wH1_3RiBlMAiGsoi__PSWJwHK6UTWuogR5T0U0vNcdYO30LkTH0FHThwt4-yTWCVmpHXbcRFZO4clE0aDwsNJluimh7APlKIoE8AaE9S8YypODas3DE1lBRBWcRUujVfHSf7ENYoBkxYX92gBBBg0Su5s5tq84"
                  alt="User avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
