import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Shield, Sparkles, Terminal, ArrowRight, UserCheck, AlertTriangle } from 'lucide-react';
import { UserRole } from '../../types';

interface RegisterPageProps {
  onRegisterSuccess: (email: string) => void;
  onNavigateToLogin: () => void;
}

export function RegisterPage({ onRegisterSuccess, onNavigateToLogin }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('LEARNER');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const register = useMutation(api.users.registerUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('ERROR: USER_NAME IS EMPTY');
      return;
    }
    if (!email.trim()) {
      setError('ERROR: USER_EMAIL IS EMPTY');
      return;
    }
    if (!password.trim()) {
      setError('ERROR: ACCESS_KEY IS EMPTY');
      return;
    }

    setIsLoading(true);
    setLogs(['> INITIALIZING SECURE REGISTRATION PROTOCOL...']);

    setTimeout(() => {
      setLogs(prev => [...prev, '> RESOLVING NODE: EDUSPHERE.CENTRAL.API']);
    }, 250);

    setTimeout(() => {
      setLogs(prev => [...prev, '> VALIDATING UNIQUE ENDPOINT CREDENTIALS...']);
    }, 500);

    // After 750ms, run the mutation
    setTimeout(async () => {
      try {
        setLogs(prev => [...prev, '> WRITING ENCRYPTED CREDENTIALS TO DATABASE...']);
        await register({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password,
          role: role,
        });

        setLogs(prev => [...prev, '> ACCOUNT SUCCESSFULLY DEPLOYED. INITIALIZING AUTO-LOGIN...']);
        
        setTimeout(() => {
          setIsLoading(false);
          onRegisterSuccess(email.trim().toLowerCase());
        }, 500);
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message || 'REGISTRATION FAILED: UNKNOWN SYSTEM ERROR');
      }
    }, 750);
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
            REGISTRATION_STATUS // ACTIVE
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
            NEW_NODE_CREATION
          </div>
          
          {/* Header */}
          <div className="text-center mb-8 border-b-4 border-black pb-4">
            <h1 className="font-serif text-4xl md:text-5xl font-black tracking-tighter uppercase text-black">
              CREATE NODE
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-600 mt-2">
              REGISTRATION // PROTOCOL
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black flex justify-between">
                <span>NODE_NAME //</span>
                <span className="text-gray-400">FULL_NAME</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                disabled={isLoading}
                placeholder="ENTER FULL NAME"
                className="w-full bg-white border-2 border-black rounded-none p-3 font-sans text-sm font-semibold uppercase text-black placeholder-gray-400 focus:outline-none focus:bg-[#FFF3C4] transition-colors"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black flex justify-between">
                <span>USER_PAYLOAD //</span>
                <span className="text-gray-400">EMAIL_ADDRESS</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                disabled={isLoading}
                placeholder="ENTER EMAIL ADDRESS"
                className="w-full bg-white border-2 border-black rounded-none p-3 font-sans text-sm font-semibold uppercase text-black placeholder-gray-400 focus:outline-none focus:bg-[#FFF3C4] transition-colors"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col space-y-1.5">
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

            {/* User Role Selection */}
            <div className="flex flex-col space-y-1.5">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black flex justify-between">
                <span>ASSIGNED_ROLE //</span>
                <span className="text-gray-400">LEARNER_VS_TRANSMITTER</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('LEARNER')}
                  disabled={isLoading}
                  className={`border-2 border-black rounded-none py-2 px-3 font-mono text-[10px] font-bold uppercase cursor-pointer transition-all duration-100 ${
                    role === 'LEARNER' 
                      ? 'bg-[#38BDF8] text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' 
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  LEARNER
                </button>
                <button
                  type="button"
                  onClick={() => setRole('TRANSMITTER')}
                  disabled={isLoading}
                  className={`border-2 border-black rounded-none py-2 px-3 font-mono text-[10px] font-bold uppercase cursor-pointer transition-all duration-100 ${
                    role === 'TRANSMITTER' 
                      ? 'bg-[#A7F3D0] text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' 
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  TRANSMITTER
                </button>
              </div>
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

            {/* Submit & Switch Actions */}
            {!isLoading && (
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#FFD833] border-2 border-black rounded-none py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-black flex items-center justify-center gap-2 cursor-pointer transition-all duration-100 ease-in-out hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                >
                  <span>REGISTER NODE</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="w-full bg-white border-2 border-black rounded-none py-2 font-mono text-[9px] font-bold uppercase text-black hover:bg-gray-100 transition-colors"
                >
                  ALREADY REGISTERED? PROCEED TO LOGIN
                </button>
              </div>
            )}
          </form>
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
