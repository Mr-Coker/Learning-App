import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { CheckCircle2, AlertTriangle, Database } from 'lucide-react';
import { questRegistry } from '../../data/questRegistry';

export function QuestIngester() {
  const subjects = useQuery(api.admin.listSubjects);
  const assignQuest = useMutation(api.admin.assignQuestRegistryKey);

  // Form states
  const [classLevel, setClassLevel] = useState('Basic 9');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [selectedRegistryKey, setSelectedRegistryKey] = useState<string>('');

  // Status & Telemetry
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [deployedQuestId, setDeployedQuestId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedSubjectId) {
      setErrorMsg('ERROR: SUBJECT NODE SELECTION REQUIRED');
      return;
    }
    if (!selectedRegistryKey) {
      setErrorMsg('ERROR: QUEST/QUIZ BLUEPRINT SELECTION REQUIRED');
      return;
    }

    setStatus('processing');

    try {
      const questId = await assignQuest({
        subjectId: selectedSubjectId as Id<"subjects">,
        classLevel,
        questRegistryKey: selectedRegistryKey,
      });

      setDeployedQuestId(questId);
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'SYSTEM_INGESTION_FAILURE: CHECK TELEMETRY LOGS');
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative select-none space-y-10">
      <div className="absolute -top-4 -left-4 bg-[#FF3B30] border-2 border-black px-2 py-1 font-mono text-[9px] font-bold text-white uppercase tracking-wider">
        QUEST_ALLOCATION_DECK
      </div>

      <div className="border-b-4 border-black pb-4 text-left">
        <h2 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
          QUEST & QUIZ ALLOCATOR
        </h2>
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-1">
          Link Static Quest/Quiz Blueprints to Live Subject Classrooms
        </p>
      </div>

      {status === 'processing' ? (
        /* Loader */
        <div className="flex flex-col items-center justify-center py-16 gap-6 bg-gray-50 border-2 border-black">
          <div className="w-full bg-black text-[#FFD833] border-y-4 border-black overflow-hidden py-3 relative">
            <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono text-xs font-black uppercase tracking-widest">
              <span>[ DEPLOYING_QUEST_MAP: LINKING BLUEPRINT TO CLASSROOM... ]</span>
              <span>[ SYNCHRONIZING_PRACTICAL_STEPS... ]</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-[#FFD833] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-4 h-4 bg-[#38BDF8] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 bg-[#A7F3D0] border-2 border-black animate-brutalist-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="font-mono text-[10px] text-black font-bold uppercase tracking-wider">
            [ DEPLOYING_QUEST_PIPELINE... ]
          </span>
        </div>
      ) : status === 'success' ? (
        /* Success Screen */
        <div className="bg-[#A7F3D0] border-4 border-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col items-center gap-4 text-center">
          <CheckCircle2 size={40} className="text-black" />
          <div>
            <h3 className="font-mono text-xs font-black uppercase tracking-widest text-black">
              QUEST DEPLOYED SUCCESSFULLY
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-wider text-black/75 mt-1">
              Classroom linked to blueprint: "{selectedRegistryKey}"
            </p>
          </div>
          <div className="font-mono text-[8px] bg-white border border-black px-2 py-1 text-black font-bold uppercase">
            QUEST_DB_ID // {deployedQuestId}
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="border-2 border-black bg-black text-white hover:bg-white hover:text-black font-mono text-[10px] uppercase font-bold py-2 px-4 transition-colors cursor-pointer"
          >
            ASSIGN ANOTHER QUEST
          </button>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit} className="space-y-5 border-4 border-black rounded-none bg-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Target Class Level */}
            <div className="flex flex-col space-y-1.5 text-left">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                TARGET CLASS LEVEL //
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black focus:outline-none focus:bg-[#FFF3C4]"
              >
                <option value="Basic 7">Basic 7</option>
                <option value="Basic 8">Basic 8</option>
                <option value="Basic 9">Basic 9</option>
              </select>
            </div>

            {/* Target Subject Dropdown */}
            <div className="flex flex-col space-y-1.5 text-left">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                TARGET SUBJECT //
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black focus:outline-none focus:bg-[#FFF3C4]"
              >
                <option value="">SELECT SUBJECT NODE</option>
                {subjects?.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.code} - {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Blueprint Selection */}
          <div className="flex flex-col space-y-1.5 text-left">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-black flex justify-between">
              <span>CHOOSE QUEST/QUIZ BLUEPRINT //</span>
              <span className="text-gray-400">REQUIRED</span>
            </label>
            <select
              value={selectedRegistryKey}
              onChange={(e) => setSelectedRegistryKey(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-none p-3 font-mono text-xs font-bold uppercase text-black focus:outline-none focus:bg-[#FFF3C4]"
            >
              <option value="">SELECT BLUEPRINT KEY</option>
              {Object.keys(questRegistry).map((key) => {
                const quest = questRegistry[key];
                return (
                  <option key={key} value={key}>
                    {key.toUpperCase()} -- ({quest.title})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="bg-[#FF3B30] text-black border-2 border-black p-3 rounded-none flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wide shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
              <AlertTriangle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FFD833] border-2 border-black rounded-none py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-black flex items-center justify-center gap-2 cursor-pointer transition-all duration-100 ease-in-out hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
          >
            <span>DEPLOY QUEST PIPELINE</span>
            <Database size={14} />
          </button>
        </form>
      )}
    </div>
  );
}
