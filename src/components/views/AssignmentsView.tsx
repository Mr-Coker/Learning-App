import { 
  ArrowLeft, 
  Award, 
  FileText, 
  UploadCloud, 
  Rocket, 
  Send,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useState } from 'react';

export function AssignmentsView() {
  const quests = [
    { id: 1, category: "Mathematics", title: "Algebra 101: Quadratics", due: "Today, 11:59 PM", status: "80%", xp: 50 },
    { id: 2, category: "Sciences", title: "Science Lab Report", due: "Tomorrow, 5:00 PM", status: "0%", xp: 120 },
    { id: 3, category: "Literature", title: "Essay Draft", due: "Submitted", status: "Done", xp: 0 }
  ];

  const [activeQuest, setActiveQuest] = useState(quests[0]);
  const [loading, setLoading] = useState(false);

  const handleQuestClick = (quest: typeof quests[0]) => {
    setLoading(true);
    // Simulate dynamic fetching of quest details based on user interaction
    setTimeout(() => {
      setActiveQuest(quest);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row relative h-full w-full">
      {/* Left Sidebar: Active Quests */}
      <aside className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-outline-variant bg-surface-container-low h-auto md:h-full sticky top-0 md:relative overflow-y-auto flex-shrink-0 z-20 max-h-[40vh] md:max-h-full">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-black uppercase text-on-surface tracking-tighter">Active Quests</h2>
            <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface border-1 border-black px-2 py-1 bg-surface-container-high shadow-[2px_2px_0_0_rgba(0,0,0,1)]">3 Pending</span>
          </div>
          
          <div className="flex flex-col gap-4">
            {quests.map((quest) => (
              <div 
                key={quest.id}
                onClick={() => handleQuestClick(quest)}
                className={`border-2 rounded-none p-6 relative overflow-hidden group cursor-pointer transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] ${activeQuest.id === quest.id ? 'bg-surface-container-high border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]' : 'bg-surface-container-low border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]'} ${quest.status === 'Done' ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">{quest.category}</span>
                    <h3 className={`font-serif text-xl uppercase font-bold tracking-tight ${activeQuest.id === quest.id ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface transition-all'} ${quest.status === 'Done' ? 'line-through' : ''}`}>
                      {quest.title}
                    </h3>
                    <p className="text-on-surface-variant font-sans text-xs mt-2">{quest.status === 'Done' ? 'Submitted' : `Due: ${quest.due}`}</p>
                  </div>
                  <div className={`w-6 h-6 border-1 flex items-center justify-center shrink-0 ${activeQuest.id === quest.id ? 'border-black bg-primary shadow-[2px_2px_0_0_rgba(0,0,0,1)]' : 'border-black bg-surface group-hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]'} transition-all`}>
                    {quest.status === 'Done' ? (
                      <CheckCircle size={12} className="text-on-surface-variant" />
                    ) : quest.status !== '0%' ? (
                      <AlertCircle size={12} className="text-on-surface-variant" />
                    ) : null}
                  </div>
                </div>
                {quest.status !== '0%' && quest.status !== 'Done' && (
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-[1px] flex-1 bg-outline-variant relative">
                      <div className="absolute inset-y-0 left-0 bg-on-surface" style={{ width: quest.status }}></div>
                    </div>
                    <span className="font-mono text-[10px] text-on-surface">{quest.status}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto w-full relative z-10">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-30">
            <Loader2 className="w-8 h-8 text-on-surface-variant animate-spin" />
          </div>
        ) : null}
        <div className="max-w-4xl mx-auto pb-10">
          
          {/* Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant pb-8 mt-4 md:mt-0">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ArrowLeft size={16} className="text-on-surface-variant" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors">Back</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black uppercase text-on-surface mb-4 tracking-tighter">Submit<br/><span className="text-on-surface-variant tracking-tight">Analysis</span></h1>
              <p className="font-sans text-sm text-on-surface-variant uppercase tracking-[0.2em]">{activeQuest.title}</p>
            </div>
            
            {/* Rewards Card */}
            {activeQuest.xp > 0 && (
              <div className="border-2 border-black rounded-none p-6 flex flex-col items-center gap-2 min-w-[160px] relative overflow-hidden shadow-[px_px_0_0_rgba(0,0,0,1)] bg-surface-container-high">
                <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
                <span className="font-mono text-[10px] text-on-surface-variant tracking-widest uppercase">Acquisition</span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-serif text-3xl text-on-surface font-black">{activeQuest.xp}</span>
                  <span className="font-mono text-xs text-on-surface-variant">XP</span>
                </div>
              </div>
            )}
          </div>

          {/* Instructions / Description */}
          <div className="rounded-none p-6 md:p-8 border-2 border-black mb-10 bg-surface-container-highest shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-6 flex items-center gap-2">
              <FileText size={14} />
              Protocol Briefing
            </h3>
            <p className="font-sans text-sm text-on-surface-variant mb-6 leading-relaxed">
              Upload your completed analysis for the {activeQuest.category} module. Make sure to adhere strictly to the established guidelines. Accepted formats: PDF, JPG, PNG. Max size: 25MB.
            </p>
            <div className="flex gap-3">
              <span className="font-mono text-[10px] px-3 py-1 text-on-surface border-1 border-black bg-surface shadow-[2px_2px_0_0_rgba(0,0,0,1)]">PDF</span>
              <span className="font-mono text-[10px] px-3 py-1 text-on-surface border-1 border-black bg-surface shadow-[2px_2px_0_0_rgba(0,0,0,1)]">JPG</span>
            </div>
          </div>

          {/* Drag-and-Drop File Uploader */}
          <div className="upload-portal mb-12">
            <div className="upload-portal-inner rounded-none border-4 border-dashed border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] h-56 md:h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container p-6 text-center group/portal">
              
              {/* Default State */}
              <div className="default-text flex flex-col items-center">
                <div className="w-12 h-12 border-2 border-black flex items-center justify-center mb-4 md:mb-6 group-hover/portal:scale-110 transition-transform bg-primary shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <UploadCloud size={20} className="text-on-primary" />
                </div>
                <h4 className="font-serif text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-2">Drop payload here</h4>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white">or click to browse</p>
              </div>
              
              {/* Hover State */}
              <div className="ready-text flex-col items-center w-full">
                <div className="w-12 h-12 mx-auto bg-primary border-2 border-black flex items-center justify-center mb-4 md:mb-6 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <Rocket size={20} className="text-on-primary" />
                </div>
                <h4 className="font-serif text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-2">Ready to upload</h4>
              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button className="px-8 py-3 rounded-none font-mono text-[10px] uppercase tracking-widest text-on-surface border-1 border-black hover:bg-surface-container hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
              Save Draft
            </button>
            <button className="px-8 py-3 rounded-none font-mono text-[10px] uppercase tracking-widest text-on-primary bg-primary border-1 border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2">
              Transmit
              <Send size={14} />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
