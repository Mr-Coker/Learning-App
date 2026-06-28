import { 
  ArrowLeft, 
  Check,
  AlertCircle,
  Loader2,
  FileCheck
} from 'lucide-react';
import { useState } from 'react';
import { QuestView, QuestStep, QuizQuestion } from './QuestView';

interface Quest {
  id: number;
  category: string;
  title: string;
  due: string;
  status: string;
  xp: number;
  details: string;
  steps?: QuestStep[];
  quizQuestions?: QuizQuestion[];
}

interface AssignmentsViewProps {
  userEmail?: string;
}

export function AssignmentsView({ userEmail = '' }: AssignmentsViewProps) {
  const questsData: Quest[] = [
    { 
      id: 1, 
      category: "Mathematics", 
      title: "Algebra 101: Quadratics", 
      due: "Today, 11:59 PM", 
      status: "80%", 
      xp: 50,
      details: "Solve multi-variable quadratic equations, analyze vertex positions, and calculate trajectories. Ensure all steps are written out in point-slope and vertex formats.",
      steps: [
        {
          stepNumber: 1,
          title: "Rearrange Equation",
          instruction: "Move all terms to one side of the equation to set it to zero (ax^2 + bx + c = 0).",
          hint: "Subtract the right-hand constant from both sides.",
          expectedOutcome: "The equation is formatted as 2x^2 + 5x - 12 = 0"
        },
        {
          stepNumber: 2,
          title: "Factor the Quadratic",
          instruction: "Identify two numbers that multiply to a*c (-24) and add to b (5), then factor by grouping.",
          hint: "The numbers are 8 and -3.",
          expectedOutcome: "(2x - 3)(x + 4) = 0"
        },
        {
          stepNumber: 3,
          title: "Find the Roots",
          instruction: "Set each factored term to zero and solve for x.",
          hint: "Set 2x - 3 = 0 and x + 4 = 0.",
          expectedOutcome: "x = 1.5 or x = -4"
        }
      ],
      quizQuestions: [
        {
          id: "q1_1",
          question: "Which core algorithmic concept is representing sequential execution order (running instructions one after another)?",
          options: ["Sequence", "Selection", "Iteration", "Decomposition"],
          correctAnswerIndex: 0,
          explanation: "Sequence is the linear execution of actions one after another. Selection represents decisions, and Iteration represents loops.",
          xpValue: 15
        },
        {
          id: "q1_2",
          question: "In the algorithm note concepts, breaking a complex quadratic solution plan down into smaller sub-formulas is an example of:",
          options: ["Abstraction", "Sequence", "Decomposition", "Iteration"],
          correctAnswerIndex: 2,
          explanation: "Decomposition involves breaking a complex task into smaller, manageable sub-problems.",
          xpValue: 20
        }
      ]
    },
    { 
      id: 2, 
      category: "Sciences", 
      title: "Science Lab Report", 
      due: "Tomorrow, 5:00 PM", 
      status: "0%", 
      xp: 120,
      details: "Complete the kinetic energy and momentum laboratory write-up. Include hypothesis, tabulated velocity data, collision calculations, and a clear error analysis section.",
      steps: [
        {
          stepNumber: 1,
          title: "Record Initial Velocity",
          instruction: "Calculate the photogate sensor velocities prior to the momentum impact test.",
          hint: "Divide the cart distance by the blocker time.",
          expectedOutcome: "v_initial = 1.45 m/s"
        },
        {
          stepNumber: 2,
          title: "Calculate Post-Collision Kinetic Energy",
          instruction: "Compute the combined mass kinetic energy using KE = 0.5 * m * v^2.",
          hint: "Mass of cart A is 0.5kg, cart B is 0.5kg.",
          expectedOutcome: "KE_post = 0.52 Joules"
        }
      ],
      quizQuestions: [
        {
          id: "q2_1",
          question: "When grouping and ignoring irrelevant details to focus on kinetic calculations, which algorithm concept is active?",
          options: ["Abstraction", "Decomposition", "Selection", "Sequence"],
          correctAnswerIndex: 0,
          explanation: "Abstraction filters out the unnecessary complexity (unimportant details) to focus on key logical structures.",
          xpValue: 25
        }
      ]
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
  const [isFetchLoading, setIsFetchLoading] = useState(false);

  const handleQuestClick = (quest: Quest) => {
    if (quest.id === activeQuest.id) return;
    setIsFetchLoading(true);
    // Simulate loading quest data from backend API
    setTimeout(() => {
      setActiveQuest(quest);
      setIsFetchLoading(false);
    }, 450);
  };

  const handleQuestComplete = () => {
    // Update quest status to Done in UI state when all quiz questions are correct
    setQuests(prev => prev.map(q => {
      if (q.id === activeQuest.id) {
        return { ...q, status: "Done", due: "Completed" };
      }
      return q;
    }));
    setActiveQuest(prev => ({ ...prev, status: "Done", due: "Completed" }));
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row relative h-full w-full bg-white select-none overflow-hidden">
      {/* Left Column: Quest Selection List */}
      <aside className="w-full md:w-80 lg:w-90 bg-white p-6 overflow-y-auto flex-shrink-0 h-full border-r-2 border-black flex flex-col gap-6">
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
                    {isCompleted ? 'COMPLETED' : `DEADLINE // ${quest.due}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Right Column: Quest Brief & Submission Area */}
      <main className="flex-1 bg-white p-6 md:p-10 overflow-y-auto h-full relative">
        {isFetchLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-30 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-black animate-spin" />
          </div>
        )}

        <div className="max-w-3xl mx-auto h-full flex flex-col justify-between">
          
          {/* Top Section */}
          <div className="space-y-8 flex-1">
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
            </div>

            {/* Interactive Procedural Guide Stepper & Quizzes */}
            {activeQuest.steps && activeQuest.steps.length > 0 && (
              <div className="mt-6">
                <QuestView 
                  steps={activeQuest.steps} 
                  quizQuestions={activeQuest.quizQuestions}
                  userEmail={userEmail}
                  onQuestComplete={handleQuestComplete}
                />
              </div>
            )}
            
            {/* Quest Completed Success Panel */}
            {activeQuest.status === 'Done' && (
              <div className="bg-[#A7F3D0] border-4 border-black p-8 text-center flex flex-col items-center justify-center shadow-[6px_6px_0_0_rgba(0,0,0,1)] mt-8">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  <FileCheck size={24} className="text-black" />
                </div>
                <h4 className="font-serif text-2xl font-black uppercase text-black mb-1">EVALUATION COMPLETED</h4>
                <p className="font-mono text-[10px] uppercase tracking-widest text-black font-bold">ALL PROTOCOLS AND TEST CASES PASSED</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
