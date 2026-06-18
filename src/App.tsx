import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { BottomNav } from './components/layout/BottomNav';
import { HomeView } from './components/views/HomeView';
import { ChatView } from './components/views/ChatView';
import { AssignmentsView } from './components/views/AssignmentsView';
import { NotesView } from './components/views/NotesView';
import { ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <TopNav currentView={currentView} setCurrentView={setCurrentView} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 flex flex-col min-h-0 bg-background pb-16 lg:pb-0">
          {currentView === 'home' && <HomeView />}
          {currentView === 'chat' && <ChatView />}
          {currentView === 'assignments' && <AssignmentsView />}
          {currentView === 'notes' && <NotesView />}
        </main>
      </div>
      
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}
