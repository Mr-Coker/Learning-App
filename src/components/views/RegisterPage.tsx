import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Shield, Terminal, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';

interface RegisterPageProps {
  onRegisterSuccess: (email: string) => void;
  onNavigateToLogin: () => void;
}

export function RegisterPage({ onRegisterSuccess, onNavigateToLogin }: RegisterPageProps) {
  // Step 1 states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Step management
  const [step, setStep] = useState<1 | 2>(1);

  // Step 2 states
  const [classLevel, setClassLevel] = useState('Basic 9');
  const [activeCurriculumTracks, setActiveCurriculumTracks] = useState<string[]>([]);
  const [focusSubjects, setFocusSubjects] = useState<string[]>([]);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const register = useMutation(api.users.registerUser);

  const availableSubjects = [
    { code: 'MATH01', name: 'Computational Mathematics' },
    { code: 'PHYS02', name: 'Quantum Mechanics' },
    { code: 'CYBER03', name: 'Advanced Cybernetics' },
    { code: 'ENG04', name: 'Technical Communications' },
  ];

  const handleNextStep = (e: React.FormEvent) => {
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

    setStep(2);
  };

  const handleFocusSubjectChange = (subject: string) => {
    setFocusSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    );
  };

  const handleCurriculumTrackChange = (track: string) => {
    setActiveCurriculumTracks(prev =>
      prev.includes(track) ? prev.filter(t => t !== track) : [...prev, track]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setIsLoading(true);
    setLogs(['> INITIALIZING SECURE REGISTRATION PROTOCOL...']);

    setTimeout(() => {
      setLogs(prev => [...prev, '> RESOLVING NODE: EDUSPHERE.CENTRAL.API']);
    }, 200);

    setTimeout(() => {
      setLogs(prev => [...prev, '> VALIDATING UNIQUE ENDPOINT ONBOARDING METRICS...']);
    }, 400);

    setTimeout(async () => {
      try {
        setLogs(prev => [...prev, '> WRITING TAILORED PROFILE TO SYSTEM DIRECTORY...']);
        
        await register({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password,
          role: 'student',
          classLevel: classLevel,
          focusSubjects: focusSubjects,
          activeCurriculumTracks: activeCurriculumTracks,
        });

        setLogs(prev => [...prev, '> PROFILE SYNCHRONIZED. INITIATING WORKSPACE DEPLOYMENT...']);
        
        setTimeout(() => {
          setIsLoading(false);
          onRegisterSuccess(email.trim().toLowerCase());
        }, 400);
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message || 'REGISTRATION FAILED: UNKNOWN DATABASE ACCESS VIOLATION');
      }
    }, 600);
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
        <div className="w-full max-w-md bg-[#F3F4F6] border-4 border-black rounded-none p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative">
          
          {/* Corner Decors */}
          <div className="absolute -top-3.5 -left-3.5 bg-white border-2 border-black px-1.5 py-0.5 font-mono text-[8px] font-bold text-black uppercase tracking-wider select-none z-20">
            {step === 1 ? 'NEW_NODE_CREATION' : 'ONBOARDING_METRICS'}
          </div>
          
          {/* Header */}
          <div className="text-center mb-6 border-b-4 border-black pb-4">
            <h1 className="font-serif text-3xl md:text-4xl font-black tracking-tighter uppercase text-black">
              {step === 1 ? 'CREATE NODE' : 'METRIC SETUP'}
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-600 mt-2">
              REGISTRATION // STEP {step} OF 2
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-4">
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
                  placeholder="••••••••••••"
                  className="w-full bg-white border-2 border-black rounded-none p-3 font-sans text-sm font-semibold text-black placeholder-gray-400 focus:outline-none focus:bg-[#FFF3C4] transition-colors"
                />
              </div>



              {error && (
                <div className="bg-[#FF3B30] text-black border-2 border-black p-3 rounded-none flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wide shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <AlertTriangle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#FFD833] border-2 border-black rounded-none py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-black flex items-center justify-center gap-2 cursor-pointer transition-all duration-100 ease-in-out hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                >
                  <span>NEXT STEP</span>
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
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student Custom Fields */}
              <>
                <div className="flex flex-col space-y-1.5">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                    Current Academic Class //
                  </label>
                  <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black focus:outline-none focus:bg-[#FFF3C4]"
                  >
                    <option value="Basic 7">Basic 7</option>
                    <option value="Basic 8">Basic 8</option>
                    <option value="Basic 9">Basic 9</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                    BECE Revision Framework: Select all curriculum tiers you need to review/access //
                  </label>
                  <div className="bg-white border-2 border-black p-3 space-y-2">
                    {['Basic 7', 'Basic 8', 'Basic 9'].map((track) => (
                      <label key={track} className="flex items-center gap-2 cursor-pointer font-mono text-[10px] uppercase text-black font-bold">
                        <input
                          type="checkbox"
                          checked={activeCurriculumTracks.includes(track)}
                          onChange={() => handleCurriculumTrackChange(track)}
                          disabled={isLoading}
                          className="w-4 h-4 border-2 border-black rounded-none bg-white accent-black cursor-pointer"
                        />
                        <span>{track} Curriculum</span>
                      </label>
                    ))}
                  </div>
                  <div className="border-2 border-black bg-black text-white p-3 font-mono text-[9px] uppercase tracking-wider leading-relaxed">
                    [ BECE_PREP_MODE: Accessing foundational topics from lower classes is highly recommended for exam candidates. ]
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                    SUBJECT FOCUS REGISTER //
                  </label>
                  <div className="bg-white border-2 border-black p-3 space-y-2 max-h-36 overflow-y-auto">
                    {availableSubjects.map((sub) => (
                      <label key={sub.code} className="flex items-center gap-2 cursor-pointer font-mono text-[10px] uppercase text-black font-bold">
                        <input
                          type="checkbox"
                          checked={focusSubjects.includes(sub.code)}
                          onChange={() => handleFocusSubjectChange(sub.code)}
                          disabled={isLoading}
                          className="w-4 h-4 border-2 border-black rounded-none bg-white accent-black cursor-pointer"
                        />
                        <span>{sub.code} - {sub.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>

              {error && (
                <div className="bg-[#FF3B30] text-black border-2 border-black p-3 rounded-none flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wide shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <AlertTriangle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {isLoading && (
                <div className="bg-black text-[#A7F3D0] border-2 border-black p-3 rounded-none font-mono text-[9px] space-y-1 overflow-hidden h-24 flex flex-col justify-end">
                  {logs.map((log, idx) => (
                    <div key={idx} className="truncate select-none">{log}</div>
                  ))}
                </div>
              )}

              {!isLoading && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-white border-2 border-black rounded-none py-3 font-mono text-xs font-bold uppercase tracking-widest text-black flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-gray-100"
                  >
                    <ArrowLeft size={14} />
                    <span>BACK</span>
                  </button>

                  <button
                    type="submit"
                    className="bg-[#FFD833] border-2 border-black rounded-none py-3 font-mono text-xs font-bold uppercase tracking-widest text-black flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                  >
                    <span>SUBMIT</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </form>
          )}
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
