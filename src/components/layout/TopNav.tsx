import { 
  Bell, 
  Settings, 
  Menu
} from 'lucide-react';
import { ViewState } from '../../types';

interface TopNavProps {
  currentView: ViewState;
  setCurrentView: (v: ViewState) => void;
  toggleSidebar: () => void;
}

export function TopNav({ currentView, setCurrentView, toggleSidebar }: TopNavProps) {
  return (
    <header className="hidden md:flex justify-between items-center w-full px-4 md:px-10 h-20 bg-surface border-b-4 border-black z-50 sticky top-0 flex-shrink-0 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden text-on-surface-variant hover:text-on-surface"
        >
          <Menu size={24} />
        </button>
        <div className="font-serif text-3xl md:text-4xl font-black tracking-tighter uppercase text-on-surface">
          EduSphere
        </div>
      </div>
      
      <div className="hidden md:flex gap-6 h-full items-end pb-3">
        <button 
          onClick={() => setCurrentView('home')} 
          className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 px-2 rounded-none py-1 border-2 border-transparent ${currentView === 'home' ? 'bg-primary text-on-primary border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]' : 'text-on-surface-variant hover:text-on-surface hover:border-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]'}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setCurrentView('assignments')}
          className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 px-2 rounded-none py-1 border-2 border-transparent ${currentView === 'assignments' ? 'bg-primary text-on-primary border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]' : 'text-on-surface-variant hover:text-on-surface hover:border-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]'}`}
        >
          Quests
        </button>
        <button 
          onClick={() => setCurrentView('notes')}
          className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 px-2 rounded-none py-1 border-2 border-transparent ${currentView === 'notes' ? 'bg-primary text-on-primary border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]' : 'text-on-surface-variant hover:text-on-surface hover:border-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]'}`}
        >
          Notes
        </button>
        <button className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors duration-300 px-2 py-1 rounded-none border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
          Library
        </button>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button className="text-on-surface-variant hover:text-on-surface border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] p-2 rounded-none transition-all duration-300 flex items-center justify-center">
          <Bell size={20} />
        </button>
        <button className="text-on-surface-variant hover:text-on-surface border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] p-2 rounded-none transition-all duration-300 flex items-center justify-center">
          <Settings size={20} />
        </button>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-none bg-secondary overflow-hidden border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZXUFLYBtv-tRHA6wW9oAHItHJiXq969tC_Kprve0Zx21kmHyt9pFdnvFGF5amrkdTpZfuCQSlWDJLULcoqk7sj2z_jLpxd4HarpkqZFmgTXYD_wH1_3RiBlMAiGsoi__PSWJwHK6UTWuogR5T0U0vNcdYO30LkTH0FHThwt4-yTWCVmpHXbcRFZO4clE0aDwsNJluimh7APlKIoE8AaE9S8YypODas3DE1lBRBWcRUujVfHSf7ENYoBkxYX92gBBBg0Su5s5tq84" 
            alt="Student avatar" 
          />
        </div>
      </div>
    </header>
  );
}
