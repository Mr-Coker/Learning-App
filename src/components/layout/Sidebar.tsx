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
  FileText
} from 'lucide-react';
import { ViewState } from '../../types';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (v: ViewState) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (o: boolean) => void;
}

export function Sidebar({ currentView, setCurrentView, sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-surface-container border-r border-outline-variant/20 shadow-xl z-50 py-6 gap-2 flex flex-col flex-shrink-0
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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/30 overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzzGpxMYza-1NVm-5JhpWs4FQ3DISUaaUulZOTZgamdTC9EAwS59g7arS6jyTBp09sv8qxlkFtOkAJOAeJHPMLjromOFg8h3GcA-zGbFh0IO9g4TLXD0bO2Uzl2EEpAPF-S0tJWL76ZmKbonWrxAbalQK-zjjT1FQuaMJm5dk-II5w73xKJcS-wr-zlimWwlGngZcPRLKLawuPUXPQZDqnprjE9L-Un4aMPtdUXhN_oU8_5wChP0PCLXqd2rDCh3G9598qD6z3yow" 
                alt="EduSphere Logo" 
              />
            </div>
            <h2 className="font-geist text-xl font-semibold text-primary">Learning Hub</h2>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <p className="font-geist text-sm text-on-surface-variant font-medium">Rank: Gold Scholar</p>
          </div>
        </div>

        <div className="px-6 mb-6">
          <button className="w-full bg-primary-container text-on-primary-container font-geist text-sm py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(76,214,255,0.4)] transition-all flex items-center justify-center gap-2 font-bold shadow-[0_0_10px_rgba(76,214,255,0.2)]">
            <Plus size={18} strokeWidth={3} />
            New Quest
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-1">
          <a
            onClick={() => { setCurrentView('home'); setSidebarOpen(false); }}
            className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-all rounded-xl mx-2 ${currentView === 'home' ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(76,214,255,0.3)] font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 font-medium'}`}
          >
             <Home size={20} className={currentView === 'home' ? 'fill-primary text-background' : ''} />
             <span className="font-geist text-sm">Home</span>
          </a>

          <a
            onClick={() => { setCurrentView('chat'); setSidebarOpen(false); }}
            className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-all rounded-xl mx-2 ${currentView === 'chat' ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(76,214,255,0.3)] font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 font-medium'}`}
          >
             <MessageSquare size={20} className={currentView === 'chat' ? 'fill-primary text-background' : ''} />
             <span className="font-geist text-sm">Chat</span>
          </a>

          <a
            onClick={() => { setCurrentView('assignments'); setSidebarOpen(false); }}
            className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-all rounded-xl mx-2 ${currentView === 'assignments' ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(76,214,255,0.3)] font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 font-medium'}`}
          >
             <ClipboardList size={20} className={currentView === 'assignments' ? 'fill-primary text-background' : ''} />
             <span className="font-geist text-sm">Assignments</span>
          </a>

          <a
            onClick={() => { setCurrentView('notes'); setSidebarOpen(false); }}
            className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-all rounded-xl mx-2 ${currentView === 'notes' ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(76,214,255,0.3)] font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 font-medium'}`}
          >
             <FileText size={20} className={currentView === 'notes' ? 'fill-primary text-background' : ''} />
             <span className="font-geist text-sm">Notes</span>
          </a>

          <a className="flex items-center gap-4 px-6 py-3 cursor-pointer text-on-surface-variant hover:text-on-surface mx-2 hover:bg-surface-variant/50 transition-all rounded-xl font-medium group">
             <BarChart2 size={20} className="group-hover:text-primary transition-colors" />
             <span className="font-geist text-sm">Metrics</span>
          </a>

          <a className="flex items-center gap-4 px-6 py-3 cursor-pointer text-on-surface-variant hover:text-on-surface mx-2 hover:bg-surface-variant/50 transition-all rounded-xl font-medium group">
             <Users size={20} className="group-hover:text-primary transition-colors" />
             <span className="font-geist text-sm">Parents</span>
          </a>
        </nav>

        <div className="mt-auto px-4 pt-4 border-t border-outline-variant/20 space-y-1 mx-2 mb-20 lg:mb-0">
          <a className="flex items-center gap-4 py-2 px-4 cursor-pointer text-on-surface-variant hover:text-on-surface transition-all rounded-lg font-medium group hover:bg-surface-variant/50">
             <HelpCircle size={20} />
             <span className="font-geist text-sm">Help</span>
          </a>
          <a className="flex items-center gap-4 py-2 px-4 cursor-pointer text-on-surface-variant hover:text-error transition-all rounded-lg font-medium group hover:bg-surface-variant/50">
             <LogOut size={20} className="group-hover:text-error transition-colors" />
             <span className="font-geist text-sm group-hover:text-error transition-colors">Logout</span>
          </a>
        </div>
      </aside>
    </>
  );
}
