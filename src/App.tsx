import { useState, useEffect } from 'react';
import { TopNav } from './components/layout/TopNav';
import { HomeView } from './components/views/HomeView';
import { ChatView } from './components/views/ChatView';
import { AssignmentsView } from './components/views/AssignmentsView';
import { NotesView } from './components/views/NotesView';
import { LibraryView } from './components/views/LibraryView';
import { TeacherDashboard } from './components/views/TeacherDashboard';
import { AdminDashboard } from './components/views/AdminDashboard';
import { LoginPage } from './components/views/LoginPage';
import { RegisterPage } from './components/views/RegisterPage';
import { ViewState, AppRole } from './types';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

function LoadingState() {
  return (
    <div 
      className="min-h-screen w-full bg-[#FFD833] flex flex-col justify-between p-6 relative overflow-hidden select-none"
      style={{
        backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Top Border Bar */}
      <div className="w-full flex justify-between items-center z-10 border-b-4 border-black pb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-black border-2 border-black rounded-none"></div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
            BOOT_SEQUENCE // INITIALIZED
          </span>
        </div>
        <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
          NODE // ACCESS_CHECK
        </div>
      </div>

      {/* Main Loader Core */}
      <div className="flex-1 flex flex-col items-center justify-center my-8 z-10 gap-8">
        {/* The Thick Black Marquee */}
        <div className="w-full max-w-2xl bg-black text-[#FFD833] border-4 border-black overflow-hidden py-3 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative">
          <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono text-xs font-black uppercase tracking-widest">
            <span>SYNCHRONIZING USER DATABASE NODE // AUTHORIZING SECURITY PROTOCOLS // ESTABLISHING ORBITAL TELEMETRY LINK // </span>
            <span>SYNCHRONIZING USER DATABASE NODE // AUTHORIZING SECURITY PROTOCOLS // ESTABLISHING ORBITAL TELEMETRY LINK // </span>
          </div>
        </div>

        {/* Center Panel with custom energetic Neo-brutalist indicator */}
        <div className="w-full max-w-md bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex flex-col items-center gap-6 relative">
          <div className="absolute -top-4 -left-4 bg-[#38BDF8] border-2 border-black px-2 py-1 font-mono text-[8px] font-bold text-black uppercase tracking-wider">
            SYSTEM_LOAD
          </div>

          {/* Energetic animated indicator: 4 square block grids bouncing aggressively */}
          <div className="flex gap-2 p-4 bg-gray-100 border-2 border-black">
            <div className="w-6 h-6 bg-[#FFD833] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-6 h-6 bg-[#38BDF8] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-6 h-6 bg-[#A7F3D0] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-6 h-6 bg-[#FF3B30] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl font-black uppercase tracking-tighter text-black">
              CHECKING DATABASE ROLES
            </h2>
            <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 animate-pulse">
              &gt; Handshaking with central API gateway...
            </p>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="w-full flex justify-between items-center z-10 border-t-4 border-black pt-4">
        <div className="font-mono text-[9px] font-bold text-black uppercase tracking-wider">
          EDUSPHERE // COGNITIVE_NODE_SECURE
        </div>
        <div className="font-mono text-[9px] font-bold text-black uppercase tracking-wider">
          EST. 2026
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('edusphere_email') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('edusphere_email'));
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [showRegister, setShowRegister] = useState(false);

  // Synchronized Convex real-time state for user profile/role
  const user = useQuery(api.users.getCurrentUserRole, userEmail ? { email: userEmail } : 'skip');

  // Guard values derived directly from Convex state
  const isQueryLoading = isLoggedIn && user === undefined;
  const isUserAuthenticated = isLoggedIn && user !== undefined && user !== null;
  const userRole: AppRole | undefined = isUserAuthenticated ? (user.role as AppRole) : undefined;

  // Handle title updates dynamically based on the role and view state
  useEffect(() => {
    if (!isLoggedIn || !user) {
      document.title = "EduSphere // Verification Required";
      return;
    }

    if (user.role === 'teacher') {
      document.title = "EDUSPHERE // TEACHER_CONSOLE";
    } else if (user.role === 'admin') {
      document.title = "EDUSPHERE // ADMIN_CONSOLE";
    } else {
      const tabLabels: Record<ViewState, string> = {
        home: "EDUSPHERE // DASHBOARD",
        chat: "EDUSPHERE // COMMS_LINK",
        assignments: "EDUSPHERE // QUESTS",
        notes: "EDUSPHERE // TRANSMISSIONS",
        library: "EDUSPHERE // DATA_HUB",
        teacher: "EDUSPHERE // TEACHER_CONSOLE",
        admin: "EDUSPHERE // ADMIN_CONSOLE"
      };

      document.title = tabLabels[currentView] || "EduSphere // Terminal";
    }
  }, [currentView, isLoggedIn, user]);

  // Self-healing effect: if a user is logged in locally but the backend returns null (invalid/deleted node), logout.
  useEffect(() => {
    if (isLoggedIn && user === null) {
      handleLogout();
    }
  }, [user, isLoggedIn]);

  const handleLogin = (email: string) => {
    localStorage.setItem('edusphere_email', email);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('edusphere_email');
    setIsLoggedIn(false);
    setUserEmail('');
    setCurrentView('home');
    setShowRegister(false);
  };

  // Render Loader screen during real-time queries
  if (isQueryLoading) {
    return <LoadingState />;
  }

  // Render Authentication Views if not validated
  if (!isUserAuthenticated) {
    if (showRegister) {
      return (
        <RegisterPage 
          onRegisterSuccess={(email) => handleLogin(email)} 
          onNavigateToLogin={() => setShowRegister(false)} 
        />
      );
    }
    return (
      <LoginPage 
        onLogin={handleLogin} 
        onNavigateToRegister={() => setShowRegister(true)} 
      />
    );
  }

  if (userRole === 'student' || userRole === 'teacher' || userRole === 'admin') {
    return (
      <div className="min-h-screen w-full flex flex-col bg-[#F0F0F0] overflow-hidden">
        <TopNav 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          role={userRole} 
          onLogout={handleLogout} 
        />
        
        <div className="flex flex-1 overflow-hidden relative">
          <main className="flex-1 w-full overflow-y-auto px-4 md:px-8 py-6">
            {userRole === 'student' && (
              <>
                {currentView === 'home' && <HomeView userEmail={userEmail} />}
                {currentView === 'chat' && <ChatView />}
                {currentView === 'assignments' && <AssignmentsView />}
                {currentView === 'notes' && <NotesView />}
                {currentView === 'library' && <LibraryView />}
              </>
            )}
            {userRole === 'teacher' && (
              <TeacherDashboard 
                userEmail={userEmail} 
                onLogout={handleLogout} 
                currentView={currentView} 
              />
            )}
            {userRole === 'admin' && (
              <AdminDashboard 
                userEmail={userEmail} 
                onLogout={handleLogout} 
                currentView={currentView} 
              />
            )}
          </main>
        </div>
      </div>
    );
  }

  // In case of an unrecognized role, render Login fallback
  return (
    <LoginPage 
      onLogin={handleLogin} 
      onNavigateToRegister={() => setShowRegister(true)} 
    />
  );
}
