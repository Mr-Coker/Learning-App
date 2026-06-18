import { 
  Home, 
  MessageSquare, 
  ClipboardList, 
  Radar,
  FileText
} from 'lucide-react';
import { ViewState } from '../../types';

interface BottomNavProps {
  currentView: ViewState;
  setCurrentView: (v: ViewState) => void;
}

export function BottomNav({ currentView, setCurrentView }: BottomNavProps) {
  return (
    <nav className="lg:hidden flex justify-around items-center h-16 px-4 pb-safe bg-surface-container-lowest/90 backdrop-blur-2xl fixed bottom-0 w-full z-50 rounded-t-xl border-t border-primary/20 shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
      <button 
        onClick={() => setCurrentView('home')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'home' ? 'text-primary font-bold scale-110 animate-pulse' : 'text-on-surface-variant opacity-70 hover:opacity-100'}`}
      >
        <Home size={22} className={currentView === 'home' ? 'fill-primary' : ''} />
        <span className="font-geist text-[10px] mt-1 tracking-wide uppercase">Home</span>
      </button>
      
      <button 
        onClick={() => setCurrentView('chat')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'chat' ? 'text-primary font-bold scale-110 animate-pulse' : 'text-on-surface-variant opacity-70 hover:opacity-100'}`}
      >
        <MessageSquare size={22} className={currentView === 'chat' ? 'fill-primary' : ''} />
        <span className="font-geist text-[10px] mt-1 tracking-wide uppercase">Chat</span>
      </button>
      
      <button 
        onClick={() => setCurrentView('assignments')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'assignments' ? 'text-primary font-bold scale-110 animate-pulse' : 'text-on-surface-variant opacity-70 hover:opacity-100'}`}
      >
        <ClipboardList size={22} className={currentView === 'assignments' ? 'fill-primary text-background' : ''} />
        <span className="font-geist text-[10px] mt-1 tracking-wide uppercase">Quests</span>
      </button>

      <button 
        onClick={() => setCurrentView('notes')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'notes' ? 'text-primary font-bold scale-110 animate-pulse' : 'text-on-surface-variant opacity-70 hover:opacity-100'}`}
      >
        <FileText size={22} className={currentView === 'notes' ? 'fill-primary text-background' : ''} />
        <span className="font-geist text-[10px] mt-1 tracking-wide uppercase">Notes</span>
      </button>
    </nav>
  );
}
