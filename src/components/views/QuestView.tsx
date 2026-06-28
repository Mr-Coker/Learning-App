import React, { useState } from 'react';
import { HelpCircle, CheckCircle, Eye } from 'lucide-react';

export interface QuestStep {
  stepNumber: number;
  title: string;
  instruction: string;
  hint: string;
  expectedOutcome: string;
}

interface QuestViewProps {
  steps: QuestStep[];
}

export function QuestView({ steps }: QuestViewProps) {
  // Store visibility of hints and outcomes per step
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [revealedOutcomes, setRevealedOutcomes] = useState<Record<number, boolean>>({});

  const toggleHint = (stepNum: number) => {
    setRevealedHints(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  const revealOutcome = (stepNum: number) => {
    setRevealedOutcomes(prev => ({
      ...prev,
      [stepNum]: true
    }));
  };

  return (
    <div className="w-full space-y-6">
      <div className="border-b-2 border-black pb-2">
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-black flex items-center gap-2">
          <CheckCircle size={14} className="text-black" />
          <span>PROCEDURAL_GUIDE // {steps.length} STEPS DETECTED</span>
        </h3>
      </div>

      <div className="relative border-l-4 border-black ml-4 pl-6 space-y-8">
        {steps
          .sort((a, b) => a.stepNumber - b.stepNumber)
          .map((step) => {
            const isHintShown = !!revealedHints[step.stepNumber];
            const isOutcomeShown = !!revealedOutcomes[step.stepNumber];

            return (
              <div key={step.stepNumber} className="relative group">
                {/* Stepper Node Indicator */}
                <div className="absolute -left-[38px] top-1.5 w-6 h-6 bg-[#FFD833] border-2 border-black flex items-center justify-center font-mono text-[10px] font-black text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all">
                  {step.stepNumber}
                </div>

                <div className="border-2 border-black p-5 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)] space-y-3.5">
                  <div className="flex flex-wrap justify-between items-center gap-2 border-b border-gray-200 pb-2">
                    <h4 className="font-serif text-lg font-black uppercase tracking-tight text-black">
                      {step.title}
                    </h4>
                    <span className="font-mono text-[8px] bg-black text-white px-2 py-0.5 uppercase tracking-wider font-bold">
                      STEP {step.stepNumber}
                    </span>
                  </div>

                  <p className="font-sans text-sm text-gray-700 leading-relaxed">
                    {step.instruction}
                  </p>

                  {/* Hint Toggle UI Section */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleHint(step.stepNumber)}
                      className="font-mono text-[9px] font-black uppercase text-black border border-black bg-[#F3F4F6] px-2 py-1.5 flex items-center gap-1.5 hover:bg-[#FFF3C4] active:translate-x-[0.5px] active:translate-y-[0.5px] cursor-pointer transition-colors"
                    >
                      <HelpCircle size={11} />
                      <span>{isHintShown ? 'HIDE HINT //' : 'SHOW HINT //'}</span>
                    </button>

                    {/* Smooth Transition Panel */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isHintShown ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="bg-[#FFEBA3] border-l-4 border-[#FFCC00] p-3 font-mono text-[10px] uppercase font-bold text-black/80">
                        {step.hint}
                      </div>
                    </div>
                  </div>

                  {/* Expected Outcome Section */}
                  <div className="border-t border-gray-200 pt-3 mt-4 space-y-2">
                    <span className="font-mono text-[8px] font-bold text-gray-500 uppercase block tracking-wider">
                      EXPECTED OUTCOME //
                    </span>

                    <div className="relative rounded-none overflow-hidden border border-black min-h-[60px]">
                      {/* Mask/Blur Overlay */}
                      {!isOutcomeShown && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-10 flex items-center justify-center p-2">
                          <button
                            type="button"
                            onClick={() => revealOutcome(step.stepNumber)}
                            className="border-2 border-black bg-black text-[#00FF88] px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-widest font-black rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer flex items-center gap-1.5 transition-all"
                          >
                            <Eye size={12} />
                            <span>I am done, show outcome</span>
                          </button>
                        </div>
                      )}

                      <div className={`p-4 bg-gray-50 font-mono text-xs uppercase tracking-wide text-black transition-all ${
                        !isOutcomeShown ? 'filter blur-sm select-none opacity-40' : 'opacity-100'
                      }`}>
                        {step.expectedOutcome}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
