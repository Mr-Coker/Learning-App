import { 
  ArrowLeft, 
  UploadCloud, 
  Rocket, 
  Send,
  Check,
  AlertCircle,
  Loader2,
  FileCheck,
  X
} from 'lucide-react';
import { useState, useRef } from 'react';

interface Quest {
  id: number;
  category: string;
  title: string;
  due: string;
  status: string;
  xp: number;
  details: string;
}

export function AssignmentsView() {
  const questsData: Quest[] = [
    { 
      id: 1, 
      category: "Mathematics", 
      title: "Algebra 101: Quadratics", 
      due: "Today, 11:59 PM", 
      status: "80%", 
      xp: 50,
      details: "Solve multi-variable quadratic equations, analyze vertex positions, and calculate trajectories. Ensure all steps are written out in point-slope and vertex formats."
    },
    { 
      id: 2, 
      category: "Sciences", 
      title: "Science Lab Report", 
      due: "Tomorrow, 5:00 PM", 
      status: "0%", 
      xp: 120,
      details: "Complete the kinetic energy and momentum laboratory write-up. Include hypothesis, tabulated velocity data, collision calculations, and a clear error analysis section."
    },
    { 
      id: 3, 
      category: "Literature", 
      title: "Essay Draft", 
      due: "Submitted", 
      status: "Done", 
      xp: 0,
      details: "Submit the final draft of your comparative literature essay evaluating neo-modernist poetry. The analysis must cover structure, tone shifts, and metric rhythm."
    }
  ];

  const [quests, setQuests] = useState<Quest[]>(questsData);
  const [activeQuest, setActiveQuest] = useState<Quest>(quests[0]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | { name: string; size: number } | null>(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleQuestClick = (quest: Quest) => {
    if (quest.id === activeQuest.id) return;
    setIsFetchLoading(true);
    // Simulate loading quest data from backend API
    setTimeout(() => {
      setActiveQuest(quest);
      setIsFetchLoading(false);
    }, 450);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFile({ name: file.name, size: file.size });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile({ name: file.name, size: file.size });
    }
  };

  const triggerFileBrowser = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleTransmit = () => {
    if (!uploadedFile) return;
    setIsTransmitting(true);
    
    // Simulate API transmission to Convex backend / system storage
    setTimeout(() => {
      setIsTransmitting(false);
      
      // Update quest status to Done in UI state
      setQuests(prev => prev.map(q => {
        if (q.id === activeQuest.id) {
          return { ...q, status: "Done", due: "Submitted" };
        }
        return q;
      }));
      
      // Update current active view local status
      setActiveQuest(prev => ({ ...prev, status: "Done", due: "Submitted" }));
      setUploadedFile(null);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row relative h-full w-full bg-white select-none overflow-hidden">
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        className="hidden" 
        accept=".pdf,.jpg,.jpeg,.png"
      />

      {/* Left Column: Quest Selection List */}
      <aside className="w-full md:w-80 lg:w-90 bg-white p-6 overflow-y-auto flex-shrink-0 h-full flex flex-col gap-6">
        <div className="flex items-center justify-between border-b-2 border-dashed border-black pb-4">
          <h2 className="font-serif text-2xl font-black uppercase text-black tracking-tighter">Quest Canvas</h2>
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-black border border-black px-2 py-0.5 bg-[#A7F3D0] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            {quests.filter(q => q.status !== 'Done').length} PENDING
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {quests.map((quest) => {
            const isActive = activeQuest.id === quest.id;
            const isCompleted = quest.status === 'Done';

            return (
              <div
                key={quest.id}
                onClick={() => handleQuestClick(quest)}
                className={`border-2 border-black rounded-none p-4 cursor-pointer relative transition-all duration-100 select-none
                  ${isActive 
                    ? 'bg-[#FFD833] translate-x-[-2px] translate-y-[-2px] shadow-[6px_6px_0_0_rgba(0,0,0,1)]' 
                    : 'bg-[#F3F4F6] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                  }
                  ${isCompleted ? 'opacity-60' : ''}
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-gray-600">
                    {quest.category}
                  </span>
                  {isCompleted ? (
                    <div className="w-5 h-5 bg-black flex items-center justify-center rounded-none border border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)]">
                      <Check size={12} className="text-white stroke-[3px]" />
                    </div>
                  ) : quest.status !== '0%' ? (
                    <div className="w-5 h-5 bg-[#38BDF8] flex items-center justify-center rounded-none border border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)]">
                      <AlertCircle size={12} className="text-black" />
                    </div>
                  ) : null}
                </div>

                <h3 className={`font-serif text-lg font-bold uppercase tracking-tight text-black mb-3
                  ${isCompleted ? 'line-through' : ''}
                `}>
                  {quest.title}
                </h3>

                {/* Inline completion progress indicator (only show if active and not fully completed) */}
                {isActive && !isCompleted && quest.status !== '0%' && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold text-black uppercase tracking-wider">
                      <span>Sync Progress</span>
                      <span>{quest.status}</span>
                    </div>
                    <div className="w-full h-2 bg-white/60 border border-black rounded-none p-[1px] overflow-hidden">
                      <div 
                        className="h-full bg-black" 
                        style={{ width: quest.status }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Due status details */}
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-gray-500">
                    {isCompleted ? 'TRANSMITTED' : `DEADLINE // ${quest.due}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Right Column: Quest Brief & Submission Area */}
      <main className="flex-1 bg-white border-l-4 border-black p-6 md:p-10 overflow-y-auto h-full relative">
        {isFetchLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-30 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-black animate-spin" />
          </div>
        )}

        <div className="max-w-3xl mx-auto h-full flex flex-col justify-between">
          
          {/* Top Section */}
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 border-b-4 border-black pb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors cursor-pointer w-fit">
                  <ArrowLeft size={14} />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest">RETURN_TO_ORBIT</span>
                </div>
                
                <h1 className="font-serif text-4xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none">
                  {activeQuest.title}
                </h1>
                
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8] font-bold">
                  PROTOCOL_TARGET // {activeQuest.category.toUpperCase()}
                </p>
              </div>

              {/* Rewards Card */}
              {activeQuest.xp > 0 && (
                <div className="bg-[#FFD833] border-2 border-black rounded-none p-4 flex flex-col items-center justify-center min-w-[120px] shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                  <span className="font-mono text-[8px] font-bold text-black uppercase tracking-widest">INCENTIVE</span>
                  <span className="font-mono text-xl font-black text-black tracking-tight mt-1">+{activeQuest.xp} XP</span>
                </div>
              )}
            </div>

            {/* Protocol Briefing */}
            <div className="bg-[#F3F4F6] border-2 border-black p-6 rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-4">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                PROTOCOL_BRIEFING //
              </h3>
              <p className="font-sans text-sm text-gray-700 leading-relaxed">
                {activeQuest.details}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 border border-black bg-white shadow-[1px_1px_0_0_rgba(0,0,0,1)]">PDF</span>
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 border border-black bg-white shadow-[1px_1px_0_0_rgba(0,0,0,1)]">JPG / PNG</span>
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 border border-black bg-white shadow-[1px_1px_0_0_rgba(0,0,0,1)]">MAX 25MB</span>
              </div>
            </div>
          </div>

          {/* Bottom Section: Drag-and-Drop Portal */}
          <div className="mt-10 mb-10 flex-1 flex flex-col justify-end">
            {activeQuest.status === 'Done' ? (
              <div className="bg-[#A7F3D0] border-4 border-black p-8 text-center flex flex-col items-center justify-center h-56 md:h-64 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <FileCheck size={24} className="text-black" />
                </div>
                <h4 className="font-serif text-2xl font-black uppercase text-black mb-1">TRANSMISSION SECURED</h4>
                <p className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">QUEST OBJECTIVE COMPLETED</p>
              </div>
            ) : (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileBrowser}
                className={`w-full h-56 md:h-64 border-4 rounded-none flex flex-col items-center justify-center cursor-pointer p-6 text-center transition-all select-none
                  ${isDragOver 
                    ? 'bg-[#A7F3D0] border-solid border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]' 
                    : 'bg-[#F3F4F6] border-dashed border-black hover:bg-gray-100 hover:border-solid shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                  }
                `}
              >
                {uploadedFile ? (
                  <div className="flex flex-col items-center max-w-md w-full p-4 bg-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    <div className="w-10 h-10 bg-[#38BDF8] border border-black flex items-center justify-center mb-3">
                      <FileCheck size={18} className="text-black" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-black uppercase tracking-wider truncate max-w-xs block mb-1">
                      {uploadedFile.name}
                    </span>
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest mb-3">
                      Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    <button 
                      onClick={handleRemoveFile}
                      className="flex items-center gap-1.5 px-3 py-1 border border-black bg-white hover:bg-red-100 font-mono text-[8px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      <X size={10} /> Discard Payload
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className={`w-12 h-12 border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-transform duration-200
                      ${isDragOver ? 'scale-110 bg-white rotate-6' : 'bg-[#FFD833]'}
                    `}>
                      {isDragOver ? (
                        <Rocket size={20} className="text-black animate-pulse" />
                      ) : (
                        <UploadCloud size={20} className="text-black" />
                      )}
                    </div>
                    
                    <h4 className="font-serif text-xl md:text-2xl font-black uppercase tracking-tight text-black mb-1.5">
                      {isDragOver ? 'READY TO UPLOAD' : 'DROP PAYLOAD HERE'}
                    </h4>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      {isDragOver ? 'RELEASE TO INJECT FILE' : 'OR CLICK TO BROWSE LOCAL SYSTEM'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {activeQuest.status !== 'Done' && (
            <div className="flex flex-col sm:flex-row justify-end gap-4 border-t-2 border-black pt-6">
              <button 
                onClick={() => setUploadedFile(null)}
                disabled={isTransmitting || !uploadedFile}
                className="px-6 py-3 border-2 border-black bg-white hover:bg-gray-100 font-mono text-[10px] font-bold uppercase tracking-widest text-black transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                Clear
              </button>
              <button 
                onClick={handleTransmit}
                disabled={isTransmitting || !uploadedFile}
                className="px-8 py-3 border-2 border-black bg-[#FFD833] hover:bg-[#ffe366] font-mono text-[10px] font-bold uppercase tracking-widest text-black transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {isTransmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <span>TRANSMIT PAYLOAD</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
