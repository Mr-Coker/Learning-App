import { 
  Home, 
  MessageSquare, 
  ClipboardList, 
  FileText,
  BookOpen
} from 'lucide-react';
import { ViewState } from '../../types';

interface BottomNavProps {
  currentView: ViewState;
  setCurrentView: (v: ViewState) => void;
}

export function BottomNav({ currentView, setCurrentView }: BottomNavProps) {
  return (
    <nav className="md:hidden flex justify-around items-center h-16 px-4 pb-safe bg-surface fixed bottom-0 w-full z-50 border-t-4 border-black">
      <button 
        onClick={() => setCurrentView('home')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'home' ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-on-surface'}`}
      >
        <Home size={22} />
        <span className="font-mono text-[10px] mt-1 tracking-widest uppercase">Home</span>
      </button>
      
      <button 
        onClick={() => setCurrentView('chat')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'chat' ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-on-surface'}`}
      >
        <MessageSquare size={22} />
        <span className="font-mono text-[10px] mt-1 tracking-widest uppercase">Chat</span>
      </button>
      
      <button 
        onClick={() => setCurrentView('assignments')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'assignments' ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-on-surface'}`}
      >
        <ClipboardList size={22} />
        <span className="font-mono text-[10px] mt-1 tracking-widest uppercase">Quests</span>
      </button>

      <button 
        onClick={() => setCurrentView('notes')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'notes' ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-on-surface'}`}
      >
        <FileText size={22} />
        <span className="font-mono text-[10px] mt-1 tracking-widest uppercase">Notes</span>
      </button>

      <button 
        onClick={() => setCurrentView('library')}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${currentView === 'library' ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-on-surface'}`}
      >
        <BookOpen size={22} />
        <span className="font-mono text-[10px] mt-1 tracking-widest uppercase">Library</span>
      </button>
    </nav>
  );
}
