import React, { useState } from 'react';
import { Shield, Sparkles, Terminal, ArrowRight, UserCheck, AlertTriangle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Preset accounts for one-click high-fidelity testing
  const presets = [
    { user: 'scholar@edusphere.net', label: 'SCHOLAR_DEMO' },
    { user: 'admin@edusphere.net', label: 'STAFF_DEMO' }
  ];

  const handlePresetClick = (email: string) => {
    setUsername(email);
    setPassword('orbital_access_key_2026');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('ERROR: USER_PAYLOAD IS EMPTY');
      return;
    }
    if (!password.trim()) {
      setError('ERROR: ACCESS_KEY IS EMPTY');
      return;
    }

    setIsLoading(true);
    setLogs(['> INITIALIZING CONNECTION TO ORBITAL BEACON...']);

    // Simulate connection logs for high-fidelity interactive feel
    setTimeout(() => {
      setLogs(prev => [...prev, '> RESOLVING NODE: EDUSPHERE.CENTRAL.API']);
    }, 250);

    setTimeout(() => {
      setLogs(prev => [...prev, '> INJECTING SECURITY CREDENTIALS...']);
    }, 500);

    setTimeout(() => {
      setLogs(prev => [...prev, '> ACCESS GRANTED. SYNCHRONIZING FILESYSTEM...']);
    }, 750);

    setTimeout(() => {
      onLogin(username);
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen w-full bg-white flex flex-col justify-between p-6 relative overflow-hidden select-none"
      style={{
        backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* Decorative top header status bar */}
      <div className="w-full flex justify-between items-center z-10 border-b-4 border-black pb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#A7F3D0] border-2 border-black rounded-none"></div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
            SYSTEM_STATUS // ONLINE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-black" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
            SECURE_PORT // 3000
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center my-8 z-10">
        <div className="w-full max-w-md bg-[#F3F4F6] border-2 border-black rounded-none p-6 md:p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] relative">
          
          {/* Corner Decors */}
          <div className="absolute -top-3.5 -left-3.5 bg-white border-2 border-black px-1.5 py-0.5 font-mono text-[8px] font-bold text-black uppercase tracking-wider select-none z-20">
            SECURE_NODE
          </div>
          
          {/* Header */}
          <div className="text-center mb-8 border-b-4 border-black pb-4">
            <h1 className="font-serif text-4xl md:text-5xl font-black tracking-tighter uppercase text-black">
              EDUSPHERE LOGIN
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-600 mt-2">
              VERIFICATION_PROTOCOL // REQUIRED
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username/Email Input Container */}
            <div className="flex flex-col space-y-2">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black flex justify-between">
                <span>USER_PAYLOAD //</span>
                <span className="text-gray-400">EMAIL_OR_USERNAME</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                disabled={isLoading}
                placeholder="ENTER USERNAME OR EMAIL"
                className="w-full bg-white border-2 border-black rounded-none p-3 font-sans text-sm font-semibold uppercase text-black placeholder-gray-400 focus:outline-none focus:bg-[#FFF3C4] transition-colors"
              />
            </div>

            {/* Password Input Container */}
            <div className="flex flex-col space-y-2">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black flex justify-between">
                <span>ACCESS_KEY //</span>
                <span className="text-gray-400">PASSWORD</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                disabled={isLoading}
                placeholder="••••••••••••"
                className="w-full bg-white border-2 border-black rounded-none p-3 font-sans text-sm font-semibold text-black placeholder-gray-400 focus:outline-none focus:bg-[#FFF3C4] transition-colors"
              />
            </div>

            {/* Simulated Error Alert */}
            {error && (
              <div className="bg-[#FF3B30] text-black border-2 border-black p-3 rounded-none flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wide shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Simulated Loading Console */}
            {isLoading && (
              <div className="bg-black text-[#A7F3D0] border-2 border-black p-3 rounded-none font-mono text-[9px] space-y-1 overflow-hidden h-24 flex flex-col justify-end">
                {logs.map((log, idx) => (
                  <div key={idx} className="truncate select-none">{log}</div>
                ))}
              </div>
            )}

            {/* Primary Action Submit Button */}
            {!isLoading && (
              <button
                type="submit"
                className="w-full bg-[#FFD833] border-2 border-black rounded-none py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-black flex items-center justify-center gap-2 cursor-pointer transition-all duration-100 ease-in-out hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
              >
                <span>ENTER ORBIT</span>
                <ArrowRight size={14} />
              </button>
            )}
          </form>

          {/* Quick presets for testers */}
          <div className="mt-8 pt-6 border-t-2 border-dashed border-black">
            <span className="font-mono text-[8px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
              SIMULATED_ACCOUNTS // CLICK_TO_FILL
            </span>
            <div className="grid grid-cols-2 gap-3">
              {presets.map((preset) => (
                <button
                  key={preset.user}
                  type="button"
                  onClick={() => handlePresetClick(preset.user)}
                  disabled={isLoading}
                  className="bg-white border border-black rounded-none py-1.5 px-2 font-mono text-[9px] font-bold uppercase text-black hover:bg-[#38BDF8] active:bg-[#A7F3D0] cursor-pointer transition-colors text-left flex items-center justify-between"
                >
                  <span>{preset.label}</span>
                  <UserCheck size={10} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative footer status bar */}
      <div className="w-full flex justify-between items-center z-10 border-t-4 border-black pt-4">
        <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-black uppercase tracking-wider">
          <span>MADE FOR</span>
          <span className="bg-[#FFD833] border border-black px-1 py-0.5">NEO_STUDENTS</span>
        </div>
        <div className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-wider">
          EDUSPHERE // PROTOCOL_V1.0
        </div>
      </div>
    </div>
  );
}
