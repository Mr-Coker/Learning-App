import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { BottomNav } from './components/layout/BottomNav';
import { HomeView } from './components/views/HomeView';
import { ChatView } from './components/views/ChatView';
import { AssignmentsView } from './components/views/AssignmentsView';
import { NotesView } from './components/views/NotesView';
import { LoginPage } from './components/views/LoginPage';
import { ViewState } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setCurrentView('home');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <TopNav currentView={currentView} setCurrentView={setCurrentView} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 flex flex-col min-h-0 bg-background pb-16 md:pb-0">
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
