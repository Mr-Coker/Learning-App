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
    <header className="flex justify-between items-center w-full px-4 md:px-10 h-20 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-md shadow-primary/5 z-50 sticky top-0 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden text-on-surface-variant hover:text-on-surface"
        >
          <Menu size={24} />
        </button>
        <div className="font-geist text-2xl md:text-3xl font-bold text-primary-container dark:text-primary tracking-tight">
          EduSphere
        </div>
      </div>
      
      <div className="hidden md:flex gap-6 h-full items-end pb-3">
        <button 
          onClick={() => setCurrentView('home')} 
          className={`font-geist font-medium text-sm tracking-wide transition-all duration-300 px-2 rounded-md py-1 ${currentView === 'home' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5 pb-1 border-b-2 border-transparent'}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setCurrentView('assignments')}
          className={`font-geist font-medium text-sm tracking-wide transition-all duration-300 px-2 rounded-md py-1 ${currentView === 'assignments' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5 pb-1 border-b-2 border-transparent'}`}
        >
          Quests
        </button>
        <button 
          onClick={() => setCurrentView('notes')}
          className={`font-geist font-medium text-sm tracking-wide transition-all duration-300 px-2 rounded-md py-1 ${currentView === 'notes' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5 pb-1 border-b-2 border-transparent'}`}
        >
          Notes
        </button>
        <button className="font-geist font-medium text-sm tracking-wide text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/5 duration-300 px-2 py-1 rounded-md pb-1 border-b-2 border-transparent">
          Library
        </button>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button className="text-primary hover:bg-white/5 p-2 rounded-full transition-all duration-300 flex items-center justify-center">
          <Bell size={20} />
        </button>
        <button className="text-primary hover:bg-white/5 p-2 rounded-full transition-all duration-300 flex items-center justify-center">
          <Settings size={20} />
        </button>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary-container">
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
