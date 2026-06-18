import { 
  ArrowLeft, 
  Award, 
  FileText, 
  UploadCloud, 
  Rocket, 
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function AssignmentsView() {
  return (
    <div className="flex-1 flex flex-col md:flex-row relative h-full w-full">
      {/* Left Sidebar: Active Quests */}
      <aside className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-outline-variant/20 bg-surface-container-low h-auto md:h-full sticky top-0 overflow-y-auto flex-shrink-0">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-geist text-xl md:text-2xl font-bold text-on-surface">Active Quests</h2>
            <span className="bg-surface-container-highest text-primary font-geist text-xs px-2 py-1 rounded-full">3 Pending</span>
          </div>
          
          <div className="flex flex-col gap-4">
            
            {/* Quest Card 1 (Active/Selected) */}
            <div className="bg-surface-container border border-primary/50 rounded-xl p-4 md:p-5 card-glow-teal relative overflow-hidden group cursor-pointer shadow-[0_0_15px_rgba(76,214,255,0.1)]">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="text-xs font-geist text-tertiary mb-1 block uppercase tracking-wider font-semibold">Mathematics</span>
                  <h3 className="font-sans text-lg text-primary-fixed font-bold">Algebra 101: Quadratics</h3>
                  <p className="text-on-surface-variant font-sans text-sm mt-1">Due: Today, 11:59 PM</p>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10 shadow-[0_0_10px_rgba(164,230,255,0.3)] shrink-0">
                  <AlertCircle size={14} className="text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1 flex-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[80%] shadow-[0_0_10px_rgba(164,230,255,0.8)]"></div>
                </div>
                <span className="font-geist text-xs text-on-surface-variant">80%</span>
              </div>
            </div>

            {/* Quest Card 2 */}
            <div className="bg-surface-container border border-outline-variant/20 rounded-xl p-4 md:p-5 hover:border-outline-variant/50 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-geist text-secondary mb-1 block uppercase tracking-wider font-semibold">Sciences</span>
                  <h3 className="font-sans text-lg text-on-surface group-hover:text-primary-fixed transition-colors font-medium">Science Lab Report</h3>
                  <p className="text-on-surface-variant font-sans text-sm mt-1">Due: Tomorrow, 5:00 PM</p>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center group-hover:border-outline transition-colors shrink-0">
                </div>
              </div>
            </div>

            {/* Quest Card 3 */}
            <div className="bg-surface-container border border-outline-variant/20 rounded-xl p-4 md:p-5 hover:border-outline-variant/50 transition-colors cursor-pointer group opacity-70">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-geist text-outline mb-1 block uppercase tracking-wider font-semibold">Literature</span>
                  <h3 className="font-sans text-lg text-on-surface group-hover:text-primary-fixed transition-colors line-through font-medium">Essay Draft</h3>
                  <p className="text-outline font-sans text-sm mt-1">Submitted</p>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-tertiary-fixed flex items-center justify-center bg-tertiary/10 shrink-0">
                  <CheckCircle size={14} className="text-tertiary-fixed" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto w-full">
        <div className="max-w-4xl mx-auto pb-10">
          
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/20 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ArrowLeft size={18} className="text-primary" />
                <span className="font-geist text-sm text-primary cursor-pointer hover:underline font-medium">Back to Tracker</span>
              </div>
              <h1 className="font-geist text-3xl md:text-5xl font-bold text-on-surface mb-2 tracking-tight">Submit Quest</h1>
              <p className="font-sans text-lg text-on-surface-variant">Algebra 101: Quadratic Equations Masterclass</p>
            </div>
            
            {/* Rewards Card */}
            <div className="bg-surface-container-high border border-outline-variant/30 rounded-xl p-4 flex items-center gap-4 shadow-lg min-w-[200px]">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shadow-[0_0_15px_rgba(125,1,177,0.4)] border border-secondary/30">
                <Award size={24} className="text-secondary fill-secondary" />
              </div>
              <div>
                <span className="font-geist text-xs font-medium text-secondary tracking-widest uppercase">Rewards</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-geist text-2xl text-primary font-bold">+50</span>
                  <span className="font-geist text-sm text-primary font-medium">XP</span>
                </div>
                <p className="font-geist text-xs text-on-surface mt-1">Math Whiz Badge</p>
              </div>
            </div>
          </div>

          {/* Instructions / Description */}
          <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/20 mb-10 shadow-md">
            <h3 className="font-geist text-lg font-semibold text-on-surface mb-2 flex items-center gap-2">
              <FileText size={20} className="text-tertiary" />
              Mission Briefing
            </h3>
            <p className="font-sans text-base text-on-surface-variant mb-4">
              Upload your completed worksheet for the Quadratic Equations module. Ensure all steps are shown for full XP. Accepted formats: PDF, JPG, PNG. Max size: 25MB.
            </p>
            <div className="flex gap-2">
              <span className="bg-surface-container-highest px-3 py-1 rounded-full font-geist text-xs text-outline border border-outline-variant/50 font-medium">PDF</span>
              <span className="bg-surface-container-highest px-3 py-1 rounded-full font-geist text-xs text-outline border border-outline-variant/50 font-medium">JPG</span>
            </div>
          </div>

          {/* Drag-and-Drop File Uploader */}
          <div className="upload-portal rounded-2xl p-[2px] mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="upload-portal-inner rounded-xl border-2 border-dashed border-outline-variant/50 h-64 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-surface-container-high/50 p-6 text-center group/portal">
              
              {/* Default State */}
              <div className="default-text flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4 border border-outline-variant/30 shadow-inner group-hover/portal:scale-110 transition-transform">
                  <UploadCloud size={32} className="text-primary" />
                </div>
                <h4 className="font-geist text-xl md:text-2xl font-semibold text-on-surface mb-2">Drop payload here</h4>
                <p className="font-sans text-base text-on-surface-variant">or click to browse local files</p>
              </div>
              
              {/* Hover State */}
              <div className="ready-text flex-col items-center w-full">
                <div className="w-16 h-16 mx-auto rounded-full bg-tertiary/10 flex items-center justify-center mb-4 border border-tertiary shadow-[0_0_20px_rgba(50,214,201,0.4)] animate-pulse">
                  <Rocket size={32} className="text-tertiary" />
                </div>
                <h4 className="font-geist text-xl md:text-2xl mb-2 tracking-wide font-bold">READY TO UPLOAD! 🚀</h4>
                <p className="font-sans text-base opacity-80">Release to deploy files</p>
              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button className="px-6 py-3 rounded-lg font-geist text-sm text-on-surface-variant hover:text-on-surface border border-transparent hover:bg-surface-variant/50 transition-colors font-medium">
              Save Draft
            </button>
            <button className="neon-border-btn px-8 py-3 rounded-lg font-geist text-sm font-bold text-primary flex items-center justify-center gap-2">
              Submit Assignment
              <Send size={16} />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
