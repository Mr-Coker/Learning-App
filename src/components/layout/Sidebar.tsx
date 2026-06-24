import { 
  Home,
  MessageSquare,
  ClipboardList,
  BarChart2,
  Users,
  HelpCircle,
  LogOut,
  Plus,
  X,
  FileText,
  BookOpen
} from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ViewState } from '../../types';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (v: ViewState) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (o: boolean) => void;
  onLogout: () => void;
}

export function Sidebar({ currentView, setCurrentView, sidebarOpen, setSidebarOpen, onLogout }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-surface-container border-r-4 border-black z-50 py-6 gap-2 flex flex-col flex-shrink-0
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Mobile close button */}
          <button 
            onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 lg:hidden text-on-surface-variant hover:text-on-surface"
        >
          <X size={24} />
        </button>

        <div className="px-6 mb-6">
          <div className="border-2 border-black bg-[#FFD833] text-black p-4 font-serif text-2xl font-black tracking-tighter uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 text-center">
            EDUSPHERE
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 bg-black"></span>
            <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Rank: Gold Scholar</p>
          </div>
        </div>

        <div className="px-6 mb-5">
          <button className="w-full border-1 border-black bg-surface text-on-surface font-mono text-[10px] uppercase tracking-widest py-3 rounded-none hover:bg-primary shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2">
            <Plus size={14} />
            New Quest
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-2">
          <a
            onClick={() => { setCurrentView('home'); setSidebarOpen(false); }}
            className={`flex items-center gap-4 px-6 py-3 mx-2 cursor-pointer transition-all border-1 rounded-none ${currentView === 'home' ? 'text-on-surface border-black bg-surface-container shadow-[4px_4px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container border-transparent hover:border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'}`}
          >
            <Home size={18} />
            <span className="font-mono text-[10px] uppercase tracking-widest mt-1">Home</span>
          </a>

          <a
            onClick={() => { setCurrentView('chat'); setSidebarOpen(false); }}
            className={`flex items-center gap-4 px-6 py-3 mx-2 cursor-pointer transition-all border-1 rounded-none ${currentView === 'chat' ? 'text-on-surface border-black bg-surface-container shadow-[4px_4px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container border-transparent hover:border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'}`}
          >
            <MessageSquare size={18} />
            <span className="font-mono text-[10px] uppercase tracking-widest mt-1">Chat</span>
          </a>

          <a
            onClick={() => { setCurrentView('assignments'); setSidebarOpen(false); }}
            className={`flex items-center gap-4 px-6 py-3 mx-2 cursor-pointer transition-all border-1 rounded-none ${currentView === 'assignments' ? 'text-on-surface border-black bg-surface-container shadow-[4px_4px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container border-transparent hover:border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'}`}
          >
            <ClipboardList size={18} />
            <span className="font-mono text-[10px] uppercase tracking-widest mt-1">Assignments</span>
          </a>

          <a
            onClick={() => { setCurrentView('notes'); setSidebarOpen(false); }}
            className={`flex items-center gap-4 px-6 py-3 mx-2 cursor-pointer transition-all border-1 rounded-none ${currentView === 'notes' ? 'text-on-surface border-black bg-surface-container shadow-[4px_4px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container border-transparent hover:border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'}`}
              >
            <FileText size={18} />
            <span className="font-mono text-[10px] uppercase tracking-widest mt-1">Notes</span>
          </a>

          <a
            onClick={() => { setCurrentView('library'); setSidebarOpen(false); }}
            className={`flex items-center gap-4 px-6 py-3 mx-2 cursor-pointer transition-all border-1 rounded-none ${currentView === 'library' ? 'text-on-surface border-black bg-surface-container shadow-[4px_4px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container border-transparent hover:border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'}`}
          >
            <BookOpen size={18} />
            <span className="font-mono text-[10px] uppercase tracking-widest mt-1">Library</span>
          </a>

          <a className="flex items-center gap-4 px-6 py-3 mx-2 cursor-pointer text-on-surface-variant hover:text-on-surface transition-all border-1 border-transparent rounded-none hover:bg-surface-container hover:border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]">
            <BarChart2 size={18} />
            <span className="font-mono text-[10px] uppercase tracking-widest mt-1">Metrics</span>
          </a>

          <a className="flex items-center gap-4 px-6 py-3 mx-2 cursor-pointer text-on-surface-variant hover:text-on-surface transition-all border-1 border-transparent rounded-none hover:bg-surface-container hover:border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]">
            <Users size={18} />
            <span className="font-mono text-[10px] uppercase tracking-widest mt-1">Parents</span>
          </a>
        </nav>

        <div className="mt-auto px-4 pt-4 border-t border-outline-variant space-y-1 mx-2 mb-20 lg:mb-0">
          <a className="flex items-center gap-4 py-2 px-4 cursor-pointer text-on-surface-variant hover:text-on-surface transition-all font-medium group">
            <HelpCircle size={16} />
            <span className="font-mono text-[10px] uppercase tracking-widest mt-1">Help</span>
          </a>
          <a
            onClick={onLogout}
            className="flex items-center gap-4 py-2 px-4 cursor-pointer text-on-surface-variant hover:text-on-surface transition-all font-medium group"
          >
            <LogOut size={16} />
            <span className="font-mono text-[10px] uppercase tracking-widest mt-1">Logout</span>
          </a>
        </div>
      </aside>
    </>
  );
}
