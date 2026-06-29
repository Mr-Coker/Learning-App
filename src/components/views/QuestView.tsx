import React, { useState } from 'react';
import { HelpCircle, CheckCircle, Eye, AlertTriangle, Check, X, Lock } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export interface QuestStep {
  stepNumber: number;
  title: string;
  instruction: string;
  hint: string;
  expectedOutcome: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  xpValue: number;
}

interface QuestViewProps {
  steps?: QuestStep[];
  quizQuestions?: QuizQuestion[];
  userEmail?: string;
  onQuestComplete?: () => void;
  onNavigateToLibrary?: () => void;
  onNavigateToNotes?: () => void;
}

export function QuestView({ 
  steps = [], 
  quizQuestions = [], 
  userEmail = '', 
  onQuestComplete,
  onNavigateToLibrary,
  onNavigateToNotes
}: QuestViewProps) {
  const awardQuestXp = useMutation(api.users.awardQuestXp);

  if (!steps || steps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-4 border-black bg-[#F3F4F6] shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-xl mx-auto my-12">
        <div className="w-16 h-16 bg-[#FFD833] border-4 border-black flex items-center justify-center rounded-none mb-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] animate-pulse">
          <Lock size={32} className="text-black" />
        </div>
        <h2 className="font-serif text-2xl font-black uppercase text-black mb-4 tracking-tight">
          Quest Vault Locked
        </h2>
        <p className="font-sans text-sm text-gray-700 leading-relaxed max-w-md font-semibold">
          You must choose a lesson from your Library first. Finish studying the content and hit <strong className="text-black font-bold">"I AM DONE LEARNING // TAKE THE QUEST"</strong> at the bottom of the page to unlock this section!
        </p>
      </div>
    );
  }

  // Store visibility of hints and outcomes per step
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [revealedOutcomes, setRevealedOutcomes] = useState<Record<number, boolean>>({});

  // Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, boolean>>({});
  const [awardedXpMap, setAwardedXpMap] = useState<Record<string, boolean>>({});
  const [submittingMap, setSubmittingMap] = useState<Record<string, boolean>>({});
  const [hasCompletedLogged, setHasCompletedLogged] = useState(false);

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

  const allStepsRevealed = (steps?.length ?? 0) > 0 && steps?.every(step => !!revealedOutcomes[step.stepNumber]);
  const isFinished = (quizQuestions?.length ?? 0) > 0 && quizQuestions?.every(q => selectedAnswers[q.id] !== undefined);
  const correctCount = quizQuestions.filter(q => selectedAnswers[q.id] === q.correctAnswerIndex).length;
  const scorePercentage = quizQuestions.length > 0 ? (correctCount / quizQuestions.length) * 100 : 0;
  const isPassed = scorePercentage >= 70;

  const handleSelectOption = async (questionId: string, optionIndex: number, correctIndex: number, xpValue: number) => {
    // If already correctly answered, block further interactions
    if (correctAnswers[questionId]) return;
    if (isFinished) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));

    const isCorrect = optionIndex === correctIndex;
    setCorrectAnswers(prev => ({
      ...prev,
      [questionId]: isCorrect
    }));

    if (isCorrect && userEmail && !awardedXpMap[questionId]) {
      setSubmittingMap(prev => ({ ...prev, [questionId]: true }));
      try {
        await awardQuestXp({
          email: userEmail,
          xp: xpValue,
        });
        setAwardedXpMap(prev => ({
          ...prev,
          [questionId]: true
        }));
      } catch (err) {
        console.error("Failed to award quest XP:", err);
      } finally {
        setSubmittingMap(prev => ({ ...prev, [questionId]: false }));
      }
    }
  };

  const handleResetQuest = () => {
    setSelectedAnswers({});
    setCorrectAnswers({});
    setAwardedXpMap({});
    setRevealedHints({});
    setRevealedOutcomes({});
    setHasCompletedLogged(false);
  };

  const handleSuccessContinue = () => {
    if (onQuestComplete) {
      onQuestComplete();
    }
    if (onNavigateToLibrary) {
      onNavigateToLibrary();
    }
  };

  const handleReviewReturn = () => {
    handleResetQuest();
    if (onNavigateToNotes) {
      onNavigateToNotes();
    } else if (onNavigateToLibrary) {
      onNavigateToLibrary();
    }
  };

  // Trigger completion callback if passed
  React.useEffect(() => {
    if (isFinished && isPassed && onQuestComplete && !hasCompletedLogged) {
      onQuestComplete();
      setHasCompletedLogged(true);
    }
  }, [isFinished, isPassed, onQuestComplete, hasCompletedLogged]);

  return (
    <div className="w-full space-y-10">
      {/* 1. Procedural Steps Guide */}
      <div className="space-y-6">
        <div className="border-b-2 border-black pb-2">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-black flex items-center gap-2">
            <CheckCircle size={14} className="text-black" />
            <span>PROCEDURAL_GUIDE // {steps?.length ?? 0} STEPS DETECTED</span>
          </h3>
        </div>

        <div className="relative border-l-4 border-black ml-4 pl-6 space-y-8">
          {[...(steps ?? [])]
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

      {/* 2. Interactive Multiple Choice Quiz Component */}
      {allStepsRevealed && (quizQuestions?.length ?? 0) > 0 && (
        <div className="space-y-6 pt-6 border-t-4 border-black">
          <div className="border-b-2 border-black pb-2 flex justify-between items-center">
            <h3 className="font-mono text-xs font-black uppercase tracking-widest text-black flex items-center gap-2">
              <CheckCircle size={14} className="text-[#00FF88] stroke-[3px]" />
              <span>QUEST_EVALUATION_PORTAL //</span>
            </h3>
            <span className={`font-mono text-[9px] border border-black px-2 py-0.5 font-bold uppercase tracking-wider ${
              isFinished 
                ? (isPassed ? 'bg-[#00FF88] text-black' : 'bg-red-500 text-white') 
                : 'bg-[#FFD833] text-black'
            }`}>
              {isFinished 
                ? (isPassed ? 'SUCCESS: SECURED' : 'FAILED: RE-STUDY REQUIRED') 
                : 'QUIZ ACTIVE'}
            </span>
          </div>

          <div className="space-y-6">
            {quizQuestions?.map((q, qIndex) => {
              const selectedIdx = selectedAnswers[q.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = correctAnswers[q.id];
              const isAwarded = awardedXpMap[q.id];
              const isSubmitting = submittingMap[q.id];

              return (
                <div 
                  key={q.id}
                  className="border-4 border-black p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left space-y-4"
                >
                  <div className="flex justify-between items-start gap-4 border-b border-gray-200 pb-2">
                    <span className="font-mono text-xs font-bold text-gray-500">Q{qIndex + 1} //</span>
                    <span className="font-mono text-[9px] bg-black text-[#FFD833] px-2 py-0.5 uppercase tracking-wider font-bold">
                      {q.xpValue} XP
                    </span>
                  </div>

                  <p className="font-serif text-base font-black text-black leading-snug">
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {q.options.map((option, idx) => {
                      const isSelected = selectedIdx === idx;
                      let optionStyle = "bg-white hover:bg-gray-50 text-black";

                      if (isSelected) {
                        if (optionIndexCorrect(q.id, idx, q.correctAnswerIndex)) {
                          optionStyle = "bg-[#A7F3D0] text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]";
                        } else {
                          optionStyle = "bg-[#FCA5A5] text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isFinished || isCorrect || isSubmitting}
                          onClick={() => handleSelectOption(q.id, idx, q.correctAnswerIndex, q.xpValue)}
                          className={`border-2 border-black p-3.5 text-left font-mono text-xs uppercase transition-all flex items-center justify-between cursor-pointer rounded-none font-bold active:translate-x-[0.5px] active:translate-y-[0.5px] ${optionStyle} disabled:cursor-not-allowed`}
                        >
                          <span>{option}</span>
                          {isSelected && optionIndexCorrect(q.id, idx, q.correctAnswerIndex) && <Check size={14} className="text-black" />}
                          {isSelected && !optionIndexCorrect(q.id, idx, q.correctAnswerIndex) && <X size={14} className="text-black" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Incorrect Explanation Card */}
                  {isAnswered && !isCorrect && (
                    <div className="bg-[#FFF3C4] border-2 border-black p-4 mt-3 flex items-start gap-3 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <AlertTriangle size={18} className="text-black flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] font-black uppercase text-black block">EXPLANATION //</span>
                        <p className="font-sans text-xs text-gray-700 leading-relaxed font-semibold">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* XP Reward Notification */}
                  {isAwarded && (
                    <div className="bg-[#A7F3D0] border border-black p-3 text-[10px] font-mono text-black font-black uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-black" />
                      <span>Verified: +{q.xpValue} XP synchronised to active user data!</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Quiz Results & Routing Card Modal */}
      {isFinished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-2xl border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] ${
            isPassed 
              ? 'bg-[#00FF88] text-black animate-pop-bounce' 
              : 'bg-white border-red-500 text-black animate-shake border-r-8 border-b-8'
          }`}>
            {isPassed ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b-2 border-black pb-4">
                  <CheckCircle size={32} className="text-black stroke-[3px]" />
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight">
                      QUEST SUCCESSFUL //
                    </h3>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest bg-black text-[#00FF88] px-2 py-0.5">
                      PASSING METRIC SECURED
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <span className="font-mono text-[10px] font-bold text-gray-500 uppercase block">SCORE ACHIEVED</span>
                    <span className="font-serif text-2xl font-black text-black">{scorePercentage.toFixed(0)}%</span>
                    <span className="font-sans text-xs text-gray-600 block mt-1">({correctCount} of {quizQuestions.length} correct)</span>
                  </div>
                  <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <span className="font-mono text-[10px] font-bold text-gray-500 uppercase block">XP AWARDED</span>
                    <span className="font-serif text-2xl font-black text-black">
                      +{quizQuestions.reduce((acc, q) => acc + (selectedAnswers[q.id] === q.correctAnswerIndex ? q.xpValue : 0), 0)} XP
                    </span>
                    <span className="font-sans text-xs text-gray-600 block mt-1">synchronized to profile</span>
                  </div>
                </div>

                <p className="font-sans text-sm text-black/85 leading-relaxed font-semibold">
                  Congratulations! You have demonstrated core competency in this topic. Your metrics have been successfully logged to the orbital telemetry node.
                </p>

                <button
                  type="button"
                  onClick={handleSuccessContinue}
                  className="w-full sm:w-auto border-2 border-black bg-[#FFD833] text-black px-6 py-3 font-mono text-xs uppercase tracking-widest font-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>CONTINUE TO NEXT TOPIC //</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b-2 border-red-500 pb-4">
                  <AlertTriangle size={32} className="text-red-500 stroke-[2px]" />
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight text-red-500">
                      MASTER CHECK INCOMPLETE //
                    </h3>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest bg-red-500 text-white px-2 py-0.5">
                      REVIEW STATE TRIGGERED
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-red-50 border-2 border-red-500 p-4 shadow-[4px_4px_0_0_rgba(239,68,68,1)]">
                    <span className="font-mono text-[10px] font-bold text-red-700 uppercase block">SCORE ACHIEVED</span>
                    <span className="font-serif text-2xl font-black text-red-600">{scorePercentage.toFixed(0)}%</span>
                    <span className="font-sans text-xs text-red-700 block mt-1">({correctCount} of {quizQuestions.length} correct, 70% required)</span>
                  </div>
                  <div className="bg-red-50 border-2 border-red-500 p-4 shadow-[4px_4px_0_0_rgba(239,68,68,1)]">
                    <span className="font-mono text-[10px] font-bold text-red-700 uppercase block">XP SECURED</span>
                    <span className="font-serif text-2xl font-black text-red-600">0 XP</span>
                    <span className="font-sans text-xs text-red-700 block mt-1">complete the quest to secure XP</span>
                  </div>
                </div>

                <p className="font-sans text-sm text-gray-800 leading-relaxed font-semibold">
                  MASTER CHECK INCOMPLETE: Let's reinforce your understanding! Head back to the lesson deck to secure your core metrics before tackling this quest again.
                </p>

                <button
                  type="button"
                  onClick={handleReviewReturn}
                  className="w-full sm:w-auto border-2 border-black bg-black text-[#FFD833] px-6 py-3 font-mono text-xs uppercase tracking-widest font-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>RETURN TO LIBRARY // RE-STUDY</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to determine if a option selection is correct
function optionIndexCorrect(questionId: string, optionIndex: number, correctIndex: number) {
  return optionIndex === correctIndex;
}
