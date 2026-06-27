import {
  Type,
  MinusSquare,
  Bookmark,
  Save,
  ChevronDown,
  Terminal,
  Cpu,
  Layers,
  Search,
  ListOrdered,
  BrainCircuit
} from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useState } from 'react';
import { staticCurriculumNotes as curriculumNotes } from '../../data/curriculumNotes';

interface NotesViewProps {
  activeNoteId: string | null;
  onBack: () => void;
}

export function NotesView({ activeNoteId, onBack }: NotesViewProps) {
  const [textSize, setTextSize] = useState<number>(14); // in pixels
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('IDLE'); // IDLE, SAVING, SAVED
  const [searchAccordionActive, setSearchAccordionActive] = useState<boolean>(false);

  // Robotics View Interactive State
  const [selectedApp, setSelectedApp] = useState<string>('Manufacturing');
  const [simMission, setSimMission] = useState<string>('space');
  const [simAppearance, setSimAppearance] = useState<string>('rugged');
  const [simSafety, setSimSafety] = useState<boolean>(true);
  const [simStatus, setSimStatus] = useState<'IDLE' | 'COMPUTING' | 'SUCCESS' | 'FAILURE'>('IDLE');
  const [simFeedback, setSimFeedback] = useState<string>('');

  // Spreadsheet Simulator Interactive State
  const [ssCells, setSsCells] = useState<Record<string, string>>({
    A1: 'Name', B1: 'Score', C1: 'Bonus',
    A2: 'Alex', B2: '85', C2: '=B2+5',
    A3: 'Sarah', B3: '90', C3: '=B3+5',
    A4: 'Average', B4: '=AVERAGE(B2:B3)', C4: '=AVERAGE(C2:C3)'
  });
  const [ssActiveCell, setSsActiveCell] = useState<string>('A1');
  const [ssFormulaInput, setSsFormulaInput] = useState<string>('Name');

  // Web Technologies Credibility Simulator Interactive State
  const [webPreset, setWebPreset] = useState<string>('edu');
  const [webUrl, setWebUrl] = useState<string>('https://state-university.edu/research/climate');
  const [webDomain, setWebDomain] = useState<string>('.edu');
  const [webAuthor, setWebAuthor] = useState<string>('Dr. Sarah Jenkins (Climatologist)');
  const [webAds, setWebAds] = useState<string>('None (Sponsored by University)');
  const [webUpdated, setWebUpdated] = useState<string>('2 weeks ago');
  const [webAccess, setWebAccess] = useState<string>('Fully Free & Accessible');
  const [webStatus, setWebStatus] = useState<'IDLE' | 'COMPUTING' | 'SUCCESS'>('IDLE');
  const [webResult, setWebResult] = useState<{
    score: number;
    rating: string;
    color: string;
    details: string;
  } | null>(null);

  // Health & Safety Workstation Simulator Interactive State
  const [hsPosture, setHsPosture] = useState<string>('good'); // good, hunched, slouch
  const [hsBreaks, setHsBreaks] = useState<string>('regular'); // regular, occasional, none
  const [hsLoad, setHsLoad] = useState<number>(1500); // wattage load: 500 to 4500
  const [hsDaisyChain, setHsDaisyChain] = useState<boolean>(false);
  const [hsBlockAdaptor, setHsBlockAdaptor] = useState<boolean>(false);
  const [hsDangerSigns, setHsDangerSigns] = useState<string>('none'); // none, hot_plastic, sparks, frayed_wires
  const [hsAudioLevel, setHsAudioLevel] = useState<number>(50); // volume: 0 to 100
  const [hsStatus, setHsStatus] = useState<'IDLE' | 'COMPUTING' | 'SUCCESS'>('IDLE');
  const [hsReport, setHsReport] = useState<{
    ergoScore: number;
    elecScore: number;
    riskLevel: string;
    riskColor: string;
    riskFeedback: string;
  } | null>(null);

  const getCellsInRange = (rangeStr: string): string[] => {
    const parts = rangeStr.split(':');
    if (parts.length !== 2) return [rangeStr];
    const start = parts[0];
    const end = parts[1];
    const startCol = start.charCodeAt(0);
    const startRow = parseInt(start.slice(1));
    const endCol = end.charCodeAt(0);
    const endRow = parseInt(end.slice(1));
    
    const cells = [];
    for (let c = Math.min(startCol, endCol); c <= Math.max(startCol, endCol); c++) {
      for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
        cells.push(String.fromCharCode(c) + r);
      }
    }
    return cells;
  };

  const evaluateCell = (cellId: string, data: Record<string, string>, visited = new Set<string>()): string => {
    const val = data[cellId] || '';
    if (!val.startsWith('=')) {
      return val;
    }
    if (visited.has(cellId)) {
      return '#REF!';
    }
    visited.add(cellId);

    try {
      const formula = val.slice(1).toUpperCase().trim();
      
      if (formula.startsWith('SUM(') && formula.endsWith(')')) {
        const rangeStr = formula.slice(4, -1);
        const cells = getCellsInRange(rangeStr);
        let sum = 0;
        for (const c of cells) {
          const parsed = parseFloat(evaluateCell(c, data, new Set(visited)));
          if (!isNaN(parsed)) sum += parsed;
        }
        return sum.toString();
      }
      
      if (formula.startsWith('AVERAGE(') && formula.endsWith(')')) {
        const rangeStr = formula.slice(8, -1);
        const cells = getCellsInRange(rangeStr);
        let sum = 0;
        let count = 0;
        for (const c of cells) {
          const parsed = parseFloat(evaluateCell(c, data, new Set(visited)));
          if (!isNaN(parsed)) {
            sum += parsed;
            count++;
          }
        }
        return count > 0 ? (sum / count).toFixed(1) : '0';
      }

      const match = formula.match(/^([A-C][1-4])\s*([\+\-\*\/])\s*([A-C][1-4])$/);
      if (match) {
        const cell1 = match[1];
        const op = match[2];
        const cell2 = match[3];
        const val1 = parseFloat(evaluateCell(cell1, data, new Set(visited)));
        const val2 = parseFloat(evaluateCell(cell2, data, new Set(visited)));
        if (isNaN(val1) || isNaN(val2)) return '#VALUE!';
        switch (op) {
          case '+': return (val1 + val2).toString();
          case '-': return (val1 - val2).toString();
          case '*': return (val1 * val2).toString();
          case '/': return val2 !== 0 ? (val1 / val2).toString() : '#DIV/0!';
        }
      }

      return '#NAME?';
    } catch (e) {
      return '#ERROR!';
    }
  };

  const handleSelectCell = (cellId: string) => {
    setSsActiveCell(cellId);
    setSsFormulaInput(ssCells[cellId] || '');
  };

  const handleCellChange = (cellId: string, val: string) => {
    const updated = { ...ssCells, [cellId]: val };
    setSsCells(updated);
    if (ssActiveCell === cellId) {
      setSsFormulaInput(val);
    }
  };

  const handleFormulaBarChange = (val: string) => {
    setSsFormulaInput(val);
    setSsCells(prev => ({ ...prev, [ssActiveCell]: val }));
  };

  const loadScenario = (type: string) => {
    if (type === 'grades') {
      setSsCells({
        A1: 'Name', B1: 'Score', C1: 'Bonus',
        A2: 'Alex', B2: '85', C2: '=B2+5',
        A3: 'Sarah', B3: '90', C3: '=B3+5',
        A4: 'Average', B4: '=AVERAGE(B2:B3)', C4: '=AVERAGE(C2:C3)'
      });
      setSsActiveCell('A1');
      setSsFormulaInput('Name');
    } else if (type === 'budget') {
      setSsCells({
        A1: 'Item', B1: 'Budgeted', C1: 'Actual',
        A2: 'Food', B2: '150', C2: '130',
        A3: 'Books', B3: '80', C3: '95',
        A4: 'Total', B4: '=SUM(B2:B3)', C4: '=SUM(C2:C3)'
      });
      setSsActiveCell('A1');
      setSsFormulaInput('Item');
    } else {
      setSsCells({
        A1: '', B1: '', C1: '',
        A2: '', B2: '', C2: '',
        A3: '', B3: '', C3: '',
        A4: '', B4: '', C4: ''
      });
      setSsActiveCell('A1');
      setSsFormulaInput('');
    }
  };

  const loadWebPreset = (preset: string) => {
    setWebPreset(preset);
    setWebStatus('IDLE');
    setWebResult(null);
    if (preset === 'edu') {
      setWebUrl('https://state-university.edu/research/climate');
      setWebDomain('.edu');
      setWebAuthor('Dr. Sarah Jenkins (Climatologist)');
      setWebAds('None (Sponsored by University)');
      setWebUpdated('2 weeks ago');
      setWebAccess('Fully Free & Accessible');
    } else if (preset === 'spam') {
      setWebUrl('http://get-free-gaming-coins.blogspot.com.ru/claim');
      setWebDomain('.blogspot.com.ru');
      setWebAuthor('Anonymous User983');
      setWebAds('Extensive (Pop-ups, banner ads, redirects)');
      setWebUpdated('Never updated (created 2021)');
      setWebAccess('Requires signing up for external offers and fees');
    } else if (preset === 'vintage') {
      setWebUrl('http://geocities.com/siliconvalley/retro-games');
      setWebDomain('.com (Geocities archive)');
      setWebAuthor('RetroGamer99');
      setWebAds('Minimal (Archived page banners)');
      setWebUpdated('Last updated July 1998 (12 dead links)');
      setWebAccess('Free, but requires legacy browser plugins for audio');
    } else if (preset === 'commercial') {
      setWebUrl('https://globalnews-network.com/sponsored/health-tips');
      setWebDomain('.com');
      setWebAuthor('Sponsored Content Desk (Ad agency)');
      setWebAds('Moderate (Ads disguised as news articles)');
      setWebUpdated('Today');
      setWebAccess('Free, but pops up newsletter subscribe prompt');
    }
  };

  const runWebEvaluation = () => {
    setWebStatus('COMPUTING');
    setTimeout(() => {
      let score = 0;
      let rating = 'SUSPICIOUS';
      let color = '#FFD833'; // Yellow
      let details = '';

      if (webPreset === 'edu') {
        score = 95;
        rating = 'HIGHLY CREDIBLE (TRUSTWORTHY)';
        color = '#A7F3D0'; // Emerald Green
        details = 'EXCELLENT: .edu domain indicates official academic publishing. Dr. Jenkins is a qualified researcher (Authority). The content is free of ads (Objectivity), recently updated (Currency), and fully free to access (Coverage).';
      } else if (webPreset === 'spam') {
        score = 15;
        rating = 'CRITICAL RISK (UNRELIABLE)';
        color = '#FCA5A5'; // Red
        details = 'DANGER: Unqualified anonymous author. Shady domain extension. Masked commercial motive filled with invasive ads (no Objectivity). Outdated and contains paywalls/hidden cost links (poor Coverage). Fails all 5 credibility criteria.';
      } else if (webPreset === 'vintage') {
        score = 55;
        rating = 'LIMITED VALUE (OUTDATED)';
        color = '#FDBA74'; // Orange
        details = 'CAUTION: Highly outdated information (Currency) and contains multiple dead links. Free to access, but some parts are broken due to plugin requirements. Good for historical retro gaming archive, but not for modern technical or scientific facts.';
      } else if (webPreset === 'commercial') {
        score = 70;
        rating = 'MODERATE BIAS (USE WITH CAUTION)';
        color = '#FFD833'; // Yellow
        details = 'NOTE: High currency and professional layout, but objectivity is compromised due to sponsored content/ads. Verified company desk, but aims to sell or market products. Cross-reference with independent non-commercial sources.';
      }

      setWebResult({ score, rating, color, details });
      setWebStatus('SUCCESS');
    }, 1200);
  };

  const runHealthSafetyCheck = () => {
    setHsStatus('COMPUTING');
    setTimeout(() => {
      // 1. Calculate Ergonomics Score (Max 100)
      let ergoScore = 100;
      let ergoDeductions: string[] = [];

      if (hsPosture === 'hunched') {
        ergoScore -= 30;
        ergoDeductions.push("Hunched posture increases strain on back, neck, and shoulders.");
      } else if (hsPosture === 'slouch') {
        ergoScore -= 40;
        ergoDeductions.push("Slouching or crossing legs reduces joint natural alignment and muscular balance.");
      }

      if (hsBreaks === 'occasional') {
        ergoScore -= 15;
        ergoDeductions.push("Occasional breaks only partially defend against mental fatigue and stress.");
      } else if (hsBreaks === 'none') {
        ergoScore -= 35;
        ergoDeductions.push("Failing to take regular breaks triggers mental fatigue, stress, and higher error rates.");
      }

      if (hsAudioLevel > 80) {
        ergoScore -= 15;
        ergoDeductions.push(`High audio volume (${hsAudioLevel}%) can cause long-term hearing impairment.`);
      }

      // 2. Calculate Electrical Safety Score (Max 100)
      let elecScore = 100;
      let elecDeductions: string[] = [];

      if (hsLoad > 3000) {
        elecScore -= 30;
        elecDeductions.push(`Socket wattage load exceeds safe limit of 3000W (${hsLoad}W). Risk of plugs overheating!`);
      }
      if (hsDaisyChain) {
        elecScore -= 25;
        elecDeductions.push("Daisy-chaining extension leads increases fire risks and wall plug overheating.");
      }
      if (hsBlockAdaptor) {
        elecScore -= 20;
        elecDeductions.push("Block adaptors often lack internal safety fuses and are unsafe to use.");
      }
      if (hsDangerSigns !== 'none') {
        elecScore -= 45;
        if (hsDangerSigns === 'hot_plastic') {
          elecDeductions.push("CRITICAL danger: Smell of hot melting plastic detected!");
        } else if (hsDangerSigns === 'sparks') {
          elecDeductions.push("CRITICAL danger: Sparks or scorch marks observed around sockets!");
        } else if (hsDangerSigns === 'frayed_wires') {
          elecDeductions.push("CRITICAL danger: Damaged or exposed colored wires inside leads!");
        }
      }

      ergoScore = Math.max(0, ergoScore);
      elecScore = Math.max(0, elecScore);

      // Determine risk levels
      let riskLevel = 'LOW RISK (SAFE WORKSTATION)';
      let riskColor = '#A7F3D0'; // green
      if (ergoScore < 50 || elecScore < 50) {
        riskLevel = 'CRITICAL HAZARD (IMMEDIATE ACTION REQUIRED)';
        riskColor = '#FCA5A5'; // red
      } else if (ergoScore < 80 || elecScore < 80) {
        riskLevel = 'WARNING (SAFETY IMPROVEMENTS NEEDED)';
        riskColor = '#FFD833'; // yellow
      }

      // Compile feedback
      let feedbackLines = [];
      if (ergoDeductions.length > 0) {
        feedbackLines.push("ERGONOMIC CHALLENGES:");
        ergoDeductions.forEach(d => feedbackLines.push(`• ${d}`));
      } else {
        feedbackLines.push("✓ Workstation ergonomics & posture follow ideal safety guidelines.");
      }
      feedbackLines.push("");
      if (elecDeductions.length > 0) {
        feedbackLines.push("ELECTRICAL PRECAUTIONS:");
        elecDeductions.forEach(d => feedbackLines.push(`• ${d}`));
      } else {
        feedbackLines.push("✓ Electrical connections & load levels are safe.");
      }

      setHsReport({
        ergoScore,
        elecScore,
        riskLevel,
        riskColor,
        riskFeedback: feedbackLines.join("\n")
      });
      setHsStatus('SUCCESS');
    }, 1200);
  };

  const noteData = useQuery(
    api.notesIngestion.getNoteDetails,
    activeNoteId ? { noteId: activeNoteId as Id<"notes"> } : 'skip'
  );

  const handleSave = () => {
    setSaveStatus('SAVING');
    setTimeout(() => {
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('IDLE'), 2000);
    }, 1000);
  };

  const runMission = () => {
    setSimStatus('COMPUTING');
    setSimFeedback('');
    
    setTimeout(() => {
      if (simMission === 'space') {
        if (simAppearance !== 'rugged') {
          setSimStatus('FAILURE');
          setSimFeedback('MISSION FAILURE: Asteroid mining requires heavy armor. Your non-rugged robot suffered mechanical failure due to high thermal/radiation stress and hostile dust. (Reference: Technology Reliability)');
        } else {
          setSimStatus('SUCCESS');
          setSimFeedback('MISSION SUCCESS! Your rugged planetary explorer safely traversed asteroids, collected samples, and sustained zero structural damage.');
        }
      } else if (simMission === 'healthcare') {
        if (!simSafety) {
          setSimStatus('FAILURE');
          setSimFeedback('CRITICAL ERROR: The medical robot lacked soft-touch skin and collision guards. It posed immediate safety risks (laceration hazards) to the patient. (Reference: Safety Risks)');
        } else if (simAppearance === 'rugged') {
          setSimStatus('FAILURE');
          setSimFeedback('PATIENT REJECTION: The cold, heavy industrial rugged design terrified patients in rehabilitation, raising stress levels. (Reference: Training Demands & Patient Trust)');
        } else {
          setSimStatus('SUCCESS');
          setSimFeedback('MISSION SUCCESS! The utility assistant robot administered medication, monitored vital signs, and assisted in surgery with complete safety.');
        }
      } else if (simMission === 'assembly') {
        if (simAppearance === 'human') {
          setSimStatus('FAILURE');
          setSimFeedback('PRODUCTION TIMEOUT: Humanoid designs are too complex for assembly lines. The robot suffered servo wear and high maintenance costs, halting the line. (Reference: Ongoing Costs & Maintenance)');
        } else {
          setSimStatus('SUCCESS');
          setSimFeedback('MISSION SUCCESS! The industrial robotic arms welded and painted car chassis on the assembly line with extreme speed and precision.');
        }
      } else if (simMission === 'service') {
        if (simAppearance === 'human') {
          setSimStatus('FAILURE');
          setSimFeedback('VISITOR DISCOMFORT: The humanoid receptionist triggered the Uncanny Valley effect, causing fear and hesitation among children and mall visitors. (Reference: The Uncanny Valley Effect)');
        } else if (!simSafety) {
          setSimStatus('FAILURE');
          setSimFeedback('HAZARD DETECTED: The robot had sharp structural corners. A child bumped into it and suffered a minor laceration. (Reference: Safety Risks)');
        } else {
          setSimStatus('SUCCESS');
          setSimFeedback('MISSION SUCCESS! The friendly screen-based kiosk robot guided visitors, provided directions, and answered queries efficiently.');
        }
      }
    }, 1200);
  };

  if (!activeNoteId) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-white min-h-[400px] w-full">
        <div className="border-4 border-black bg-black text-[#FFD833] p-8 font-mono text-xs font-bold uppercase tracking-widest text-center shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-w-xl">
          [ NO_ACTIVE_TRANSMISSION: PLEASE_SELECT_A_LESSON_NOTE_FROM_THE_LIBRARY ]
        </div>
      </div>
    );
  }

  if (noteData === undefined) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="border-4 border-black bg-black text-[#FFD833] p-8 font-mono text-xs font-bold uppercase tracking-widest text-center shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          [ LOADING_AND_DECRYPTING_CURRICULUM_DATA... ]
        </div>
      </div>
    );
  }

  const fullLessonContent = curriculumNotes.find(
    (n) => n.id === noteData?.staticLookupKey || (noteData?.staticLookupKey === 'intro-spreadsheets' && n.id === 'spreadsheet-basics')
  );

  const contentBlocksToRender = fullLessonContent ? fullLessonContent.contentBlocks : [];

  if (!noteData || !fullLessonContent || contentBlocksToRender.length === 0) {
    return <div className="p-6 border-4 border-black font-bold uppercase">[ TRANSMISSION_EMPTY: SEED REAL CHUNK DATA VIA ADMIN ]</div>;
  }

  const dbNoteToc = noteData?.staticLookupKey === 'algorithm-basics'
    ? [
        { id: "what-is-algorithm", label: "I. Definition & Analogy" },
        { id: "characteristics", label: "II. Key Characteristics" },
        { id: "constructs", label: "III. Programming Constructs" },
        { id: "computational-concepts", label: "IV. Abstraction & Decomposition" },
        { id: "examples", label: "V. Practical Algorithms" }
      ]
    : noteData?.staticLookupKey === 'robotics-basics'
    ? [
        { id: "robotics-definitions", label: "I. Robot & Robotics" },
        { id: "robotics-applications", label: "II. Applications" },
        { id: "robotics-challenges", label: "III. Challenges & Risks" },
        { id: "robotics-interactive", label: "IV. Mission Simulator" }
      ]
    : (noteData?.staticLookupKey === 'spreadsheet-basics' || noteData?.staticLookupKey === 'intro-spreadsheets')
    ? [
        { id: "spreadsheet-definition", label: "I. What is a Spreadsheet?" },
        { id: "spreadsheet-uses", label: "II. Common Uses" },
        { id: "spreadsheet-interface", label: "III. Interface Features" },
        { id: "spreadsheet-cells", label: "IV. Cells & Operations" },
        { id: "spreadsheet-editing", label: "V. Editing Actions" },
        { id: "spreadsheet-interactive", label: "VI. Cell Simulator" }
      ]
    : noteData?.staticLookupKey === 'web-technologies-basics'
    ? [
        { id: "vle-definition", label: "I. What is a VLE?" },
        { id: "vle-features", label: "II. VLE Features" },
        { id: "vle-importance", label: "III. VLE Importance" },
        { id: "open-learning", label: "IV. Open Learning Sites" },
        { id: "evaluating-web", label: "V. Evaluating Web Pages" },
        { id: "web-interactive", label: "VI. Credibility Evaluator" }
      ]
    : noteData?.staticLookupKey === 'computer-safety-basics'
    ? [
        { id: "hs-ergonomics", label: "I. Ergonomics & Posture" },
        { id: "hs-breaks", label: "II. Importance of Breaks" },
        { id: "hs-tools", label: "III. Supportive Tools" },
        { id: "hs-audio", label: "IV. Audio Settings" },
        { id: "hs-electrical", label: "V. Electrical Safety" },
        { id: "hs-interactive", label: "VI. Workstation Simulator" }
      ]
    : contentBlocksToRender
        ?.map((block: any, idx: number) => {
          if (block.heading) {
            return { id: `block-${idx}`, label: block.heading };
          }
          return null;
        })
        .filter((item: any): item is { id: string; label: string } => item !== null) || [];

  return (
    <div className="flex-1 flex overflow-hidden relative w-full h-full bg-white select-none">
      {/* Table of Contents & Topic Selector Sidebar (Left Column) */}
      <aside className="hidden md:block w-72 p-6 overflow-y-auto border-r border-outline-variant bg-[#F3F4F6] flex-shrink-0 h-full flex flex-col justify-between">
        <div className="space-y-8">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-black hover:bg-black hover:text-white px-3 py-2 border-2 border-black rounded-none font-mono text-[9px] uppercase tracking-wider transition-all duration-100 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] bg-white w-full justify-center"
          >
            ← RETURN_TO_LIBRARY
          </button>
          {/* Topic Details Info */}
          <div className="space-y-4">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Current Transmission //</h3>
            {noteData ? (
              <div className="p-3 border-2 border-black bg-[#A7F3D0] shadow-[2px_2px_0_0_rgba(0,0,0,1)] flex flex-col gap-1 text-left">
                <span className="font-mono text-[8px] font-bold text-emerald-800 uppercase tracking-widest">
                  PAYLOAD
                </span>
                <span className="font-serif text-xs font-black uppercase text-black leading-tight break-words">
                  {noteData.title}
                </span>
              </div>
            ) : (
              <div className="p-3 border-2 border-black bg-gray-200 font-mono text-[9px] font-bold uppercase text-gray-500 animate-pulse text-left">
                LOADING TITLE...
              </div>
            )}
          </div>

          <hr className="border-t-2 border-dashed border-black/30" />

          {/* Contents Index */}
          <div className="space-y-4 text-left">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Contents</h3>
            <ul className="space-y-2 font-mono text-[10px] uppercase tracking-widest">
              {dbNoteToc.length > 0 ? (
                dbNoteToc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-black transition-colors block py-2 border-l-2 border-transparent hover:border-black pl-4 text-gray-600 font-bold"
                    >
                      {item.label}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 font-mono text-[8px]">[ NO SECTION HEADINGS ]</li>
              )}
            </ul>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-8 pt-4 border-t border-black/10 font-mono text-[8px] text-gray-400 uppercase tracking-widest space-y-1 text-left">
          <div>NODE // NOTES_VIEW</div>
          <div>STATUS // {noteData ? 'COMPILED' : 'SYNCING'}</div>
        </div>
      </aside>

      {/* Reading Canvas (Right Column) */}
      <article className="flex-1 p-4 md:p-10 max-w-4xl mx-auto w-full relative overflow-y-auto h-full pb-20 md:pb-10">

        {/* Floating Toolbar */}
        <div className="fixed top-24 right-4 md:right-10 z-15 flex flex-col gap-2 bg-[#F3F4F6] border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-2 rounded-none">
          <button
            onClick={() => setTextSize(prev => Math.min(prev + 2, 24))}
            className="text-black hover:bg-black hover:text-white p-2 rounded-none border border-transparent hover:border-black transition-colors cursor-pointer"
            title="Increase Text Size"
          >
            <Type size={16} />
          </button>
          <button
            onClick={() => setTextSize(prev => Math.max(prev - 2, 12))}
            className="text-black hover:bg-black hover:text-white p-2 rounded-none border border-transparent hover:border-black transition-colors cursor-pointer"
            title="Decrease Text Size"
          >
            <MinusSquare size={16} />
          </button>

          <div className="w-full h-px bg-black my-1"></div>

          <button
            onClick={() => setIsBookmarked(prev => !prev)}
            className={`p-2 rounded-none border border-transparent hover:border-black transition-all cursor-pointer
              ${isBookmarked ? 'bg-[#38BDF8] text-black border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' : 'text-black hover:bg-black hover:text-white'}
            `}
            title="Bookmark"
          >
            <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
          </button>

          <button
            onClick={handleSave}
            disabled={saveStatus !== 'IDLE'}
            className={`p-2 rounded-none border border-transparent hover:border-black transition-all cursor-pointer disabled:opacity-50
              ${saveStatus === 'SAVED' ? 'bg-[#A7F3D0] text-black border-black' : 'text-black hover:bg-black hover:text-white'}
            `}
            title="Save Note"
          >
            {saveStatus === 'SAVING' ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full block"></span>
            ) : (
              <Save size={16} />
            )}
          </button>
        </div>

        {/* Mobile Info Bar */}
        <div className="md:hidden mb-6 flex flex-col gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-black hover:bg-black hover:text-white px-3 py-2 border-2 border-black rounded-none font-mono text-[9px] uppercase tracking-wider transition-all duration-100 cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] bg-white justify-center"
          >
            ← RETURN_TO_LIBRARY
          </button>
          {noteData && (
            <div className="p-3 border-2 border-black bg-[#A7F3D0] font-mono text-[9px] font-bold uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
              VIEWING: {noteData.title}
            </div>
          )}
        </div>

        {/* Content Canvas */}
        <div className="mt-4 md:mt-0 space-y-16" style={{ fontSize: `${textSize}px` }}>
          {noteData ? (
            noteData.staticLookupKey === 'algorithm-basics' ? (
              /* ==========================================
                 REDESIGNED GORGEOUS ALGORITHM NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left" id="algorithms-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_01 // COMPUTER SCIENCE
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none">
                    Introduction to Algorithms
                  </h1>
                </div>

                {/* Section 1: What is an Algorithm */}
                <div className="space-y-4" id="what-is-algorithm">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                    <Terminal size={20} />
                    1. What is an Algorithm?
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose">
                    An <strong className="text-black font-black">algorithm</strong> is a finite set of instructions, commands, or a step-by-step procedure carried out in a specific order to solve logical, mathematical, or real-world problems.
                  </p>

                  {/* Concept box: Analogy */}
                  <div className="bg-[#38BDF8] border-2 border-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
                    <h4 className="font-mono text-[9px] font-bold text-black uppercase tracking-wider mb-2">Real-World Analogy //</h4>
                    <p className="font-sans text-sm text-black leading-relaxed">
                      A cooking recipe is a classic analogy. It outlines step-by-step instructions, taking inputs (raw ingredients) to produce a specific output (the finished meal).
                    </p>
                  </div>

                  {/* Grid Components */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="border border-black p-4 bg-white">
                      <span className="font-mono text-[9px] font-bold text-gray-500 block mb-1">PROBLEM //</span>
                      <p className="font-sans text-xs text-black">A real-world instance or issue requiring a program or set of instructions.</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <span className="font-mono text-[9px] font-bold text-gray-500 block mb-1">INPUT //</span>
                      <p className="font-sans text-xs text-black">The necessary and desired values provided to the algorithm.</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <span className="font-mono text-[9px] font-bold text-gray-500 block mb-1">PROCESSING UNIT //</span>
                      <p className="font-sans text-xs text-black">The component (like the CPU) that executes the input to produce outcomes.</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <span className="font-mono text-[9px] font-bold text-gray-500 block mb-1">OUTPUT //</span>
                      <p className="font-sans text-xs text-black">The final outcome or result produced by the program.</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Characteristics */}
                <div className="space-y-4 pt-6" id="characteristics">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                    <Cpu size={20} />
                    2. Key Characteristics
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose">
                    To be effective, any computer algorithm must possess the following structural traits:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[9px] font-black text-black">INPUT / OUTPUT</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Requires some input values (non-zero) and results in one or more outcomes.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[9px] font-black text-black">UNAMBIGUITY</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Instructions must be perfectly clear, straightforward, and unambiguous.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[9px] font-black text-black">FINITENESS</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Must have a limited, countable number of instructions (it must end).</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[9px] font-black text-black">LANGUAGE INDEPENDENT</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Instructions must be generic enough to run on any programming syntax.</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Programming Constructs */}
                <div className="space-y-4 pt-6" id="constructs">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                    <Layers size={20} />
                    3. Programming Constructs
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose">
                    Programs are built using three fundamental structures that dictate execution flow:
                  </p>

                  <div className="space-y-6">
                    {/* Sequence */}
                    <div className="border-2 border-black rounded-none p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#FFD833] border border-black font-mono text-[8px] font-bold px-1.5 py-0.5">I</span>
                        <h4 className="font-serif text-lg font-bold text-black uppercase">SEQUENCE</h4>
                      </div>
                      <p className="font-sans text-xs text-gray-600 leading-relaxed">
                        The most basic construct where instructions occur and execute one after another in order. The computer runs code line-by-line, from top to bottom.
                      </p>
                    </div>

                    {/* Selection */}
                    <div className="border-2 border-black rounded-none p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#38BDF8] border border-black font-mono text-[8px] font-bold px-1.5 py-0.5">II</span>
                        <h4 className="font-serif text-lg font-bold text-black uppercase">SELECTION</h4>
                      </div>
                      <p className="font-sans text-xs text-gray-600 leading-relaxed">
                        Determines which path a program takes depending on whether a condition is met. Achieved using <code className="px-1 bg-gray-100 border font-mono">IF</code> statement selections.
                      </p>
                    </div>

                    {/* Iteration */}
                    <div className="border-2 border-black rounded-none p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#A7F3D0] border border-black font-mono text-[8px] font-bold px-1.5 py-0.5">III</span>
                        <h4 className="font-serif text-lg font-bold text-black uppercase">ITERATION (LOOPING)</h4>
                      </div>
                      <p className="font-sans text-xs text-gray-600 leading-relaxed">
                        The repeated execution of a specific section of code while a program is running. A loop repeats a set of steps as many times as required without code duplication.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Computational Concepts */}
                <div className="space-y-4 pt-6" id="computational-concepts">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                    <BrainCircuit size={20} />
                    4. Key Computational Concepts
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Abstraction */}
                    <div className="border-2 border-black p-6 bg-[#FFD833] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-3">
                      <h4 className="font-serif text-xl font-bold uppercase text-black">ABSTRACTION</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        The process of hiding background details or unnecessary implementation complexities so users only see the required information.
                      </p>
                      <div className="bg-white/80 p-3 border border-black text-[10px] font-sans leading-relaxed text-black/80">
                        <strong>Example:</strong> When using a washing machine, you simply put in clothes. You don't need to know the engineering mechanisms.
                      </div>
                    </div>

                    {/* Decomposition */}
                    <div className="border-2 border-black p-6 bg-[#A7F3D0] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-3">
                      <h4 className="font-serif text-xl font-bold uppercase text-black">DECOMPOSITION</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        The process of breaking down a large, complex problem into smaller, more manageable parts.
                      </p>
                      <div className="bg-white/80 p-3 border border-black text-[10px] font-sans leading-relaxed text-black/80">
                        <strong>Why it matters:</strong> Smaller parts are easier to design, test, and solve. Problems are harder to resolve on a CPU without this step.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-black/30 to-transparent"></div>

                {/* Section 5: Practical Examples */}
                <div className="space-y-6 pt-6" id="examples">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                    <ListOrdered size={20} />
                    5. Practical Examples & Applications
                  </h2>

                  {/* Multiplication */}
                  <div className="border-2 border-black p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-4">
                    <h4 className="font-serif text-lg font-bold text-black uppercase tracking-tight">A. Simple Multiplication Plan</h4>
                    <p className="font-sans text-xs text-gray-600">A step-by-step plan to multiply two numbers and display the result:</p>
                    
                    <div className="bg-[#F3F4F6] border border-black p-4 font-mono text-xs space-y-1.5 text-black">
                      <div>STEP 1 // Start</div>
                      <div>STEP 2 // Declare three integers: x, y, and z</div>
                      <div>STEP 3 // Define the values of x and y</div>
                      <div>STEP 4 // Multiply the values of x and y</div>
                      <div>STEP 5 // Store the result of Step 4 into z</div>
                      <div>STEP 6 // Print z</div>
                      <div>STEP 7 // End</div>
                    </div>
                  </div>

                  {/* Linear Search */}
                  <div 
                    className={`border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none overflow-hidden transition-all
                      ${searchAccordionActive ? 'bg-[#F3F4F6]' : 'bg-white'}
                    `} 
                  >
                    <button 
                      onClick={() => setSearchAccordionActive(prev => !prev)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-serif text-lg font-bold uppercase text-black flex items-center gap-4">
                        <Search size={18} className="text-black" />
                        B. Linear Search Walkthrough
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-black transition-transform duration-200
                          ${searchAccordionActive ? 'transform rotate-180' : ''}
                        `} 
                      />
                    </button>
                    
                    {searchAccordionActive && (
                      <div className="border-t-2 border-black p-6 md:p-8 space-y-6 font-sans text-sm text-gray-700 leading-loose bg-white">
                        <p>
                          <strong>Linear Search</strong> is the simplest sequential searching method, where you start at one end of a list and check every single element one by one until the desired item (the "key") is found.
                        </p>
                        
                        <div className="border-l-4 border-black pl-4 py-2 space-y-2">
                          <div className="font-mono text-xs font-bold text-black">VISUAL WALKTHROUGH //</div>
                          <div className="font-mono text-xs text-gray-600">Given array: arr[] = [10, 50, 30, 70, 80, 20, 90, 40] and Target Key = 30</div>
                          <ol className="list-decimal list-inside space-y-2 pl-2 font-mono text-[11px] mt-2 text-black">
                            <li>Compare Key (30) with arr[0] (10) &rarr; Not equal. Move to next.</li>
                            <li>Compare Key (30) with arr[1] (50) &rarr; Not equal. Move to next.</li>
                            <li>Compare Key (30) with arr[2] (30) &rarr; <span className="bg-[#A7F3D0] border border-black px-1 font-bold">Match found!</span> Yields success and returns index 2.</li>
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </section>
            ) : noteData.staticLookupKey === 'robotics-basics' ? (
              /* ==========================================
                 GORGEOUS INTERACTIVE ROBOTICS NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left animate-fadeIn" id="robotics-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_02 // COMPUTING SCIENCE
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    Introduction to Robotics
                  </h1>
                </div>

                {/* Section 1: Definitions */}
                <div className="space-y-4" id="robotics-definitions">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Terminal size={20} />
                    1. Definitions & Fundamentals
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Robotics is an interdisciplinary branch of computer science and engineering focused on creating automated machines that can assist and substitute for humans in diverse environments.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="border-4 border-black p-6 bg-[#38BDF8] shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none text-left">
                      <span className="font-mono text-[10px] font-black text-black block mb-2">TERM // ROBOT</span>
                      <p className="font-sans text-sm text-black leading-relaxed">
                        An automated machine designed to execute specific tasks with speed, precision, and little to no human intervention.
                      </p>
                    </div>
                    <div className="border-4 border-black p-6 bg-[#FFD833] shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none text-left">
                      <span className="font-mono text-[10px] font-black text-black block mb-2">FIELD // ROBOTICS</span>
                      <p className="font-sans text-sm text-black leading-relaxed">
                        The technical field that deals directly with the design, engineering, construction, and operation of robots.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Applications and Uses in Society */}
                <div className="space-y-4 pt-6" id="robotics-applications">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Cpu size={20} />
                    2. Applications in Modern Society
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Robotic systems significantly impact modern industries by automating operations, reducing operating overheads, and increasing safety. Select a sector below to inspect its operational model:
                  </p>

                  {/* Interactive Tab bar */}
                  <div className="flex flex-wrap gap-2 border-b-4 border-black pb-4">
                    {[
                      { name: 'Manufacturing', color: '#FFD833' },
                      { name: 'Transportation', color: '#38BDF8' },
                      { name: 'Healthcare', color: '#A7F3D0' },
                      { name: 'Agriculture', color: '#C4B5FD' },
                      { name: 'Construction', color: '#FCA5A5' },
                      { name: 'Space Exploration', color: '#FDA4AF' },
                      { name: 'Service Industry', color: '#93C5FD' },
                      { name: 'Military & Defense', color: '#FDBA74' }
                    ].map((tab) => (
                      <button
                        key={tab.name}
                        onClick={() => setSelectedApp(tab.name)}
                        className={`px-3 py-1.5 font-mono text-[10px] font-bold uppercase border-2 border-black rounded-none cursor-pointer transition-all duration-700
                          ${selectedApp === tab.name 
                            ? 'bg-black text-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]' 
                            : 'bg-white text-black hover:bg-gray-100'
                          }
                        `}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content Display */}
                  <div className="border-4 border-black p-6 bg-[#F3F4F6] shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none min-h-[160px] flex flex-col justify-between text-left">
                    <div>
                      <h4 className="font-serif text-xl font-black uppercase text-black mb-2">{selectedApp}</h4>
                      <p className="font-sans text-sm text-gray-800 leading-relaxed">
                        {selectedApp === 'Manufacturing' && "Used to automate repetitive tasks on assembly lines, such as welding and painting, to increase productivity and quality."}
                        {selectedApp === 'Transportation' && "Implemented in self-driving cars, drones, and autonomous vehicles to reduce traffic congestion and improve overall safety."}
                        {selectedApp === 'Healthcare' && "Assists medical professionals with surgical procedures, patient rehabilitation, monitoring vital signs, and administering medication."}
                        {selectedApp === 'Agriculture' && "Deployed to handle crop planting, harvesting, growth monitoring, and lowering labor expenses."}
                        {selectedApp === 'Construction' && "Automates physically demanding, labor-intensive tasks like bricklaying and concrete pouring."}
                        {selectedApp === 'Space Exploration' && "Used to safely explore hostile environments such as other planets, moons, and asteroids."}
                        {selectedApp === 'Service Industry' && "Utilized in banks, hotels, and malls to guide customers, provide information, and answer general queries."}
                        {selectedApp === 'Military & Defense' && "Deployed for high-risk operations including surveillance, reconnaissance, and bomb disposal."}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-black/10 flex gap-4 font-mono text-[9px] text-gray-500 uppercase">
                      <div>TARGET CLASS // JHS_BASIC_9</div>
                      <div>UTILITY TYPE // AUTOMATION</div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Prospects and Challenges */}
                <div className="space-y-4 pt-6" id="robotics-challenges">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    3. Key Prospects & Practical Challenges
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Deploying robotics systems (especially in schools and service environments) introduces critical challenges that designers must anticipate:
                  </p>

                  <div className="space-y-4 text-left">
                    <div className="border-2 border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[10px] font-black text-black">TRAINING DEMANDS //</span>
                      <p className="font-sans text-xs text-gray-600 mt-1">Tutors require proper training to use robots as teaching aids, and untrained learners may struggle to interact with the technology effectively.</p>
                    </div>

                    <div className="border-2 border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[10px] font-black text-black">ONGOING COSTS & MAINTENANCE //</span>
                      <p className="font-sans text-xs text-gray-600 mt-1">Industrial setups face continuing maintenance, operational, and cybersecurity protection expenses. High maintenance costs limit the widespread deployment of educational robots.</p>
                    </div>

                    <div className="border-2 border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[10px] font-black text-black">TECHNOLOGY RELIABILITY //</span>
                      <p className="font-sans text-xs text-gray-600 mt-1">As mechanical devices, robots are prone to failures at any time, making their long-term integrity a constant challenge.</p>
                    </div>

                    {/* Accent box: Uncanny Valley */}
                    <div className="border-4 border-black p-6 bg-[#A7F3D0] shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                      <h4 className="font-serif text-lg font-black text-black uppercase mb-1">The "Uncanny Valley" Effect</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        Educational robots built with human-like appearances can evoke fear or discomfort in students, which can actively impede the learning process.
                      </p>
                    </div>

                    <div className="border-2 border-black p-5 bg-[#FCA5A5] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[10px] font-black text-black">SAFETY RISKS //</span>
                      <p className="font-sans text-xs text-black mt-1">Physical hazards, such as robots built with sharp edges, can cause severe harm or lacerations to young children, discouraging them from using the technology.</p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Interactive Mission Simulator */}
                <div className="space-y-6 pt-6 text-left" id="robotics-interactive">
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                        <BrainCircuit size={22} />
                        4. Interactive Mission Simulator
                      </h2>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                        Design a Robot and Test it in Different Environments
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {/* Select Mission */}
                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[10px] font-bold uppercase text-black">1. Choose Mission //</label>
                          <select
                            value={simMission}
                            onChange={(e) => setSimMission(e.target.value)}
                            className="bg-white border-2 border-black p-2 font-mono text-xs font-bold uppercase focus:outline-none"
                          >
                            <option value="space">Deep Space Asteroid Mining</option>
                            <option value="healthcare">Precision Healthcare Surgery Assistant</option>
                            <option value="assembly">Car Chassis Assembly Line Welding</option>
                            <option value="service">Shopping Mall Information Guide</option>
                          </select>
                        </div>

                        {/* Select Appearance */}
                        <div className="flex flex-col space-y-1">
                          <label className="font-mono text-[10px] font-bold uppercase text-black">2. Robot Appearance //</label>
                          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                            {[
                              { id: 'rugged', label: 'Rugged' },
                              { id: 'utility', label: 'Utility' },
                              { id: 'human', label: 'Humanoid' }
                            ].map(opt => (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => setSimAppearance(opt.id)}
                                className={`flex-1 py-2 px-1 text-center font-mono text-[9px] border-2 border-black uppercase font-bold cursor-pointer
                                  ${simAppearance === opt.id ? 'bg-[#FFD833] text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]' : 'bg-white text-black hover:bg-gray-100'}
                                `}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Safety Guards */}
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="safetyGuards"
                            checked={simSafety}
                            onChange={(e) => setSimSafety(e.target.checked)}
                            className="w-4 h-4 accent-black cursor-pointer"
                          />
                          <label htmlFor="safetyGuards" className="font-mono text-[10px] font-bold uppercase text-black cursor-pointer">
                            Install Soft Skin & Rounded Collision Guards
                          </label>
                        </div>
                      </div>

                      {/* Display Settings Summary */}
                      <div className="border-2 border-black bg-[#F3F4F6] p-4 flex flex-col justify-between">
                        <div className="font-mono text-[10px] space-y-2 text-black">
                          <div className="font-bold border-b border-black/10 pb-1">CURRENT DESIGN PROFILE:</div>
                          <div>MISSION: <span className="font-bold text-sky-600 uppercase">{simMission}</span></div>
                          <div>ARMOR/SHELL: <span className="font-bold text-amber-600 uppercase">{simAppearance}</span></div>
                          <div>SAFETY GUARDS: <span className={`font-bold ${simSafety ? 'text-emerald-600' : 'text-rose-600'}`}>{simSafety ? "INSTALLED" : "NONE"}</span></div>
                        </div>

                        <button
                          type="button"
                          onClick={runMission}
                          disabled={simStatus === 'COMPUTING'}
                          className="w-full bg-black text-white hover:bg-[#FFD833] hover:text-black border-2 border-black font-mono text-xs font-bold uppercase py-2 cursor-pointer transition-colors mt-4 disabled:opacity-50"
                        >
                          {simStatus === 'COMPUTING' ? 'SIMULATING TRANSIT...' : 'RUN MISSION SIMULATION'}
                        </button>
                      </div>
                    </div>

                    {/* Simulator Result Readout */}
                    {simStatus !== 'IDLE' && (
                      <div className="mt-4 border-4 border-black p-5">
                        {simStatus === 'COMPUTING' ? (
                          <div className="flex items-center gap-3 font-mono text-xs font-black uppercase text-black">
                            <span className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full block" />
                            <span>COMPUTING SYSTEM MATCH & RELIABILITY READOUTS...</span>
                          </div>
                        ) : simStatus === 'SUCCESS' ? (
                          <div className="space-y-2">
                            <div className="bg-[#A7F3D0] border-2 border-black px-2 py-1 inline-block font-mono text-[9px] font-bold text-black uppercase">
                              MISSION SUCCESS
                            </div>
                            <p className="font-sans text-sm text-black leading-relaxed font-bold">{simFeedback}</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="bg-[#FCA5A5] border-2 border-black px-2 py-1 inline-block font-mono text-[9px] font-bold text-black uppercase">
                              MISSION FAILURE
                            </div>
                            <p className="font-sans text-sm text-black leading-relaxed font-bold">{simFeedback}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ) : (noteData.staticLookupKey === 'spreadsheet-basics' || noteData.staticLookupKey === 'intro-spreadsheets') ? (
              /* ==========================================
                 GORGEOUS INTERACTIVE SPREADSHEETS NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left animate-fadeIn" id="spreadsheets-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_03 // INFORMATION TECHNOLOGY
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    Introduction to Spreadsheets
                  </h1>
                </div>

                {/* Section 1: Definition */}
                <div className="space-y-4" id="spreadsheet-definition">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Terminal size={20} />
                    1. What is a Spreadsheet?
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    A <strong className="text-black font-black">spreadsheet</strong> is a digital file made of rows and columns that help sort, organize, and arrange data efficiently, as well as calculate numerical data.
                  </p>

                  <div className="bg-[#38BDF8] border-4 border-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none text-left">
                    <h4 className="font-mono text-[10px] font-bold text-black uppercase tracking-wider mb-2">Unique Capability //</h4>
                    <p className="font-sans text-sm text-black leading-relaxed">
                      What makes it unique is its distinct ability to calculate values using mathematical formulas and the data stored inside cells.
                    </p>
                  </div>

                  <div className="border border-black p-4 bg-white mt-4 text-left">
                    <span className="font-mono text-[9px] font-bold text-gray-500 block mb-1">COMMON EXAMPLES //</span>
                    <p className="font-sans text-xs text-black">
                      Microsoft Excel, Google Sheets, VisiCalc, iWork Numbers, Lotus 1-2-3, LibreOffice, and OpenOffice.
                    </p>
                  </div>
                </div>

                {/* Section 2: Common Uses */}
                <div className="space-y-4 pt-6" id="spreadsheet-uses">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Cpu size={20} />
                    2. Common Uses of Spreadsheet Applications
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Spreadsheet applications are deployed across different domains to track, manage, and model numerical information:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <span className="font-mono text-[9px] font-black text-black">FINANCE</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Budgets, bank accounts, taxes, invoices, receipts, billing, and forecasting.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <span className="font-mono text-[9px] font-black text-black">SCHOOL & GRADES</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Track student scores, calculate averages, identify grades and students who need help.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <span className="font-mono text-[9px] font-black text-black">SPORTS STATISTICS</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Track scores, player goals, averages, and entire team rosters.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <span className="font-mono text-[9px] font-black text-black">FORMS & FIGURES</span>
                      <p className="font-sans text-xs text-gray-700 mt-1">Inventory tracking, time tables, performance quizzes, and building visual representations like pie/bar charts.</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Interface Features */}
                <div className="space-y-4 pt-6" id="spreadsheet-interface">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    3. Features of the MS-Excel Interface
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Navigating a spreadsheet requires understanding the layout workspace. The two core aspects are Navigation Tabs and Layout Components:
                  </p>

                  <div className="space-y-6">
                    <div className="border-4 border-black p-6 bg-[#C4B5FD] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                      <h4 className="font-serif text-lg font-black text-black uppercase mb-3">Main Navigation Tabs</h4>
                      <ul className="space-y-2 text-xs text-black font-semibold leading-relaxed">
                        <li><strong>Home:</strong> Font controls, text alignment, cell styling, insertion/deletion.</li>
                        <li><strong>Insert:</strong> Add charts, graphs, images, shapes, equations, headers & footers.</li>
                        <li><strong>Page Layout:</strong> Worksheet themes, page margins, and orientation.</li>
                        <li><strong>Formulas:</strong> Access to functions, library, and formula auditing.</li>
                        <li><strong>Data:</strong> Sort & filter tools, data validation, and external data importing.</li>
                        <li><strong>Review:</strong> Proofreading, spell-check, and workbook protection/comments.</li>
                        <li><strong>View:</strong> Adjust zoom levels, window arrangement, display options.</li>
                      </ul>
                    </div>

                    <div className="border-4 border-black p-6 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                      <h4 className="font-serif text-lg font-black text-black uppercase mb-3">Essential Layout Components</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold leading-relaxed">
                        <div><strong>Workbook:</strong> The entire spreadsheet file containing one or more worksheets.</div>
                        <div><strong>Worksheet:</strong> The grid of columns and rows where you enter and calculate data.</div>
                        <div><strong>Columns:</strong> Vertical cells, labeled with letters A to Z (up to XFD).</div>
                        <div><strong>Rows:</strong> Horizontal cells, numbered 1 to 1,048,576.</div>
                        <div><strong>Name Box:</strong> Displays the cell address of the currently selected cell.</div>
                        <div><strong>Formula Bar:</strong> Allows directly viewing and editing cell contents or formulas.</div>
                        <div><strong>Sheet Tab:</strong> Located at the bottom to switch, add, rename, or delete worksheets.</div>
                        <div><strong>Status Bar:</strong> Sits at the absolute bottom, displaying modes and zoom levels.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Cells & Operations */}
                <div className="space-y-4 pt-6" id="spreadsheet-cells">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <BrainCircuit size={20} />
                    4. Understanding Cells & Cell Operations
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Cells are the basic atomic units of a spreadsheet where calculations occur:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="border-2 border-black p-5 bg-[#FFD833] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">CELL ADDRESSING</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        A cell is formed by the intersection of a row and column. Its address is the Column Letter followed by Row Number (e.g., cell B2).
                      </p>
                    </div>

                    <div className="border-2 border-black p-5 bg-[#A7F3D0] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">CELL RANGE</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        A block or collection of multiple adjacent cells. Denoted with a colon between start and end coordinates (e.g., A1:C4).
                      </p>
                    </div>
                  </div>

                  <div className="border-2 border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                    <span className="font-mono text-[9px] font-bold text-gray-500 uppercase block">VALID CELL DATA TYPES //</span>
                    <ul className="list-disc list-inside text-xs text-gray-700 mt-2 space-y-1.5 font-semibold">
                      <li><strong>Text & Labels:</strong> Letters, names, words, and labels.</li>
                      <li><strong>Numerical Values:</strong> Pure numbers, currency, percentages, or dates.</li>
                      <li><strong>Formulas:</strong> Math expressions (must begin with <code className="px-1 bg-gray-100 border font-mono">=</code>) to compute values dynamically.</li>
                    </ul>
                  </div>
                </div>

                {/* Section 5: Step-by-Step Editing */}
                <div className="space-y-4 pt-6" id="spreadsheet-editing">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <ListOrdered size={20} />
                    5. Step-by-Step Worksheet Editing Actions
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Properly manipulating spreadsheet content is crucial to avoid shifting errors:
                  </p>

                  <div className="space-y-4 text-left">
                    <div className="border-2 border-black p-4 bg-white">
                      <h4 className="font-mono text-xs font-black text-black">CLEARING CONTENTS vs. DELETING CELLS</h4>
                      <p className="font-sans text-xs text-gray-600 mt-1">
                        <strong>Clearing Content:</strong> Empties the cell values (Home &rarr; Clear &rarr; Clear Contents). The cell's physical position remains empty.
                      </p>
                      <p className="font-sans text-xs text-gray-600 mt-1">
                        <strong>Deleting Cells:</strong> Completely deletes the structural cell, causing cells below or to the right to shift up/left to fill the gap.
                      </p>
                    </div>

                    <div className="border-2 border-black p-4 bg-[#F3F4F6]">
                      <h4 className="font-mono text-xs font-black text-black">COPYING vs. CUTTING</h4>
                      <p className="font-sans text-xs text-gray-600 mt-1">
                        <strong>Copy & Paste (Ctrl + C & Ctrl + V):</strong> Duplicates cell values and formulas.
                      </p>
                      <p className="font-sans text-xs text-gray-600 mt-1">
                        <strong>Cut & Paste (Ctrl + X & Ctrl + V):</strong> Relocates cell values/formulas, deleting the source.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 6: Interactive Cell Simulator */}
                <div className="space-y-6 pt-6 text-left" id="spreadsheet-interactive">
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                        <BrainCircuit size={22} />
                        6. Cell & Formula Simulator
                      </h2>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                        Interactive Spreadsheet Simulator - Try writing formulas like =A2+B2 or =SUM(B2:B3)
                      </p>
                    </div>

                    {/* Presets / Control deck */}
                    <div className="flex flex-wrap gap-2 border-b-2 border-black pb-4">
                      <button
                        onClick={() => loadScenario('grades')}
                        className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase border-2 border-black bg-[#FFD833] text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                      >
                        Load "Student Grades" Scenario
                      </button>
                      <button
                        onClick={() => loadScenario('budget')}
                        className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase border-2 border-black bg-[#38BDF8] text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                      >
                        Load "Monthly Budget" Scenario
                      </button>
                      <button
                        onClick={() => loadScenario('clear')}
                        className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                      >
                        Clear Spreadsheet
                      </button>
                    </div>

                    {/* Formula Bar UI */}
                    <div className="border-2 border-black p-2 bg-[#F3F4F6] flex items-center gap-2 font-mono text-xs">
                      <span className="bg-black text-[#FFD833] px-2 py-1 font-bold">
                        {ssActiveCell}
                      </span>
                      <span className="font-serif italic font-bold text-gray-500 px-1">fx</span>
                      <input
                        type="text"
                        value={ssFormulaInput}
                        onChange={(e) => handleFormulaBarChange(e.target.value)}
                        placeholder="Enter value or formula (e.g. =SUM(B2:B3))"
                        className="flex-1 bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none focus:bg-[#FFF3C4]"
                      />
                    </div>

                    {/* The Grid */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border-2 border-black text-left font-mono">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-black w-12 h-8 text-center text-xs font-black uppercase bg-gray-200"></th>
                            <th className="border border-black px-2 h-8 text-center text-xs font-black uppercase bg-gray-200">A</th>
                            <th className="border border-black px-2 h-8 text-center text-xs font-black uppercase bg-gray-200">B</th>
                            <th className="border border-black px-2 h-8 text-center text-xs font-black uppercase bg-gray-200">C</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3, 4].map((rowNum) => (
                            <tr key={rowNum}>
                              <td className="border border-black h-8 text-center text-xs font-black uppercase bg-gray-200 w-12">
                                {rowNum}
                              </td>
                              {['A', 'B', 'C'].map((colLetter) => {
                                const cellId = `${colLetter}${rowNum}`;
                                const isSelected = ssActiveCell === cellId;
                                const rawValue = ssCells[cellId] || '';
                                const evaluated = evaluateCell(cellId, ssCells);
                                return (
                                  <td
                                    key={cellId}
                                    onClick={() => handleSelectCell(cellId)}
                                    className={`border border-black h-12 p-0 relative cursor-text min-w-[120px] transition-all
                                      ${isSelected ? 'bg-[#FFF3C4] border-2 border-black shadow-inner' : 'bg-white hover:bg-gray-50'}
                                    `}
                                  >
                                    {isSelected ? (
                                      <input
                                        type="text"
                                        value={ssFormulaInput}
                                        onChange={(e) => handleFormulaBarChange(e.target.value)}
                                        className="w-full h-full border-0 outline-none text-xs font-mono font-bold text-black px-2 uppercase bg-transparent"
                                        autoFocus
                                      />
                                    ) : (
                                      <div className="px-2 py-1 text-xs font-mono font-bold text-black truncate w-full h-full flex flex-col justify-between">
                                        <span className="text-black">{evaluated}</span>
                                        {rawValue.startsWith('=') && (
                                          <span className="text-[7px] text-gray-400 block font-normal text-right self-end select-none">
                                            {rawValue}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-[#A7F3D0] border-2 border-black p-4 text-[10px] font-mono leading-relaxed text-emerald-950">
                      <strong>Pro-tip:</strong> Click any cell above, type a value or a formula, then click another cell to see it evaluate. Formulas must start with <strong>=</strong> (e.g. <code>=SUM(B2:B3)</code>, <code>=AVERAGE(B2:B3)</code>, or <code>=A2+B2</code>).
                    </div>
                  </div>
                </div>
              </section>
            ) : noteData.staticLookupKey === 'web-technologies-basics' ? (
              /* ==========================================
                 GORGEOUS INTERACTIVE WEB TECHNOLOGIES NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left animate-fadeIn" id="web-technologies-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_04 // DIGITAL CITIZENSHIP
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    Web Technologies & VLEs
                  </h1>
                </div>

                {/* Section 1: What is a VLE */}
                <div className="space-y-4" id="vle-definition">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Terminal size={20} />
                    1. What is a Virtual Learning Environment (VLE)?
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    A <strong className="text-black font-black">Virtual Learning Environment (VLE)</strong> is a collaborative platform that enables better learning delivery. It helps educators work more efficiently and allows students to complete schoolwork from anywhere.
                  </p>

                  <div className="bg-[#38BDF8] border-4 border-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none text-left">
                    <h4 className="font-mono text-[10px] font-bold text-black uppercase tracking-wider mb-2">Core Purpose //</h4>
                    <p className="font-sans text-sm text-black leading-relaxed">
                      A VLE serves to digitize and expand the physical classroom, enabling teachers to manage materials, assign work, and collaborate with learners beyond school hours.
                    </p>
                  </div>
                </div>

                {/* Section 2: VLE Features */}
                <div className="space-y-4 pt-6" id="vle-features">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Cpu size={20} />
                    2. Typical Features of a VLE
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    VLE applications integrate various technological features to mimic and improve traditional education structures:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Web & Mobile Apps</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Allow learners to access courses from anywhere at any time on multiple devices.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Collaborative Tools</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Includes virtual classrooms, email, discussion forums, wikis, blogs, and interactive leaderboards.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Innovative Lesson Delivery</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Utilizes gamified learning elements and flipped classrooms (reversing traditional homework first).</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Dual Learning Mode</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Combines synchronous (real-time virtual meetings) with asynchronous (independent study) tracks.</p>
                    </div>
                  </div>

                  <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left mt-2">
                    <span className="font-mono text-[9px] font-bold text-gray-500 uppercase block">OFFLINE LEARNING CAPABILITIES //</span>
                    <p className="font-sans text-xs text-black mt-1 leading-relaxed">
                      Allows creation of electronic records offline when internet access is poor or unstable. These records automatically synchronize with the central system once a working internet connection is restored.
                    </p>
                  </div>
                </div>

                {/* Section 3: VLE Importance */}
                <div className="space-y-4 pt-6" id="vle-importance">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    3. Importance of a VLE
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Adopting a VLE yields significant benefits for educational institutions, teachers, and learners alike:
                  </p>

                  <div className="space-y-3 text-left">
                    <div className="border border-black p-4 bg-white flex gap-3 items-start">
                      <span className="font-mono text-xs font-black bg-[#FFD833] border border-black px-2 py-0.5">01</span>
                      <div>
                        <strong>Track Learner Performance Easily</strong>
                        <p className="font-sans text-xs text-gray-600 mt-0.5">Electronic records and auto-assessments allow teachers to monitor student progress and submissions instantly.</p>
                      </div>
                    </div>

                    <div className="border border-black p-4 bg-white flex gap-3 items-start">
                      <span className="font-mono text-xs font-black bg-[#FFD833] border border-black px-2 py-0.5">02</span>
                      <div>
                        <strong>Deliver Content Consistently</strong>
                        <p className="font-sans text-xs text-gray-600 mt-0.5">The same high-quality materials are accessible to all students simultaneously and can be updated instantly.</p>
                      </div>
                    </div>

                    <div className="border border-black p-4 bg-white flex gap-3 items-start">
                      <span className="font-mono text-xs font-black bg-[#FFD833] border border-black px-2 py-0.5">03</span>
                      <div>
                        <strong>Save Cost & Time</strong>
                        <p className="font-sans text-xs text-gray-600 mt-0.5">Educational materials are created once and shared digitally, removing heavy paper printing and distribution costs.</p>
                      </div>
                    </div>

                    <div className="border border-black p-4 bg-white flex gap-3 items-start">
                      <span className="font-mono text-xs font-black bg-[#FFD833] border border-black px-2 py-0.5">04</span>
                      <div>
                        <strong>Encourage Collaboration & Community</strong>
                        <p className="font-sans text-xs text-gray-600 mt-0.5">Forums, shared blogs, and message boards build a virtual sense of community and support peer tutoring.</p>
                      </div>
                    </div>

                    <div className="border border-black p-4 bg-white flex gap-3 items-start">
                      <span className="font-mono text-xs font-black bg-[#FFD833] border border-black px-2 py-0.5">05</span>
                      <div>
                        <strong>Promote Flexible, Student-Centered Learning</strong>
                        <p className="font-sans text-xs text-gray-600 mt-0.5">Students learn at their own pace, re-review complex topics, and study around individual schedules.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Open Learning Websites */}
                <div className="space-y-4 pt-6" id="open-learning">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <BrainCircuit size={20} />
                    4. Use of Open Learning Websites
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Open learning websites democratize education by offering quality academic courses online at a fraction of the cost of traditional universities:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong>Khan Academy</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">A non-profit providing free, world-class education covering kindergarten to early college levels.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong>edX</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Founded by Harvard and MIT; global non-profit providing university-level courses using open-source platforms.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong>Coursera</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Features university partners offering formal courses, professional specializations, and digital degrees.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong>Udemy</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">A global education marketplace where content creators curate and sell their own educational courses.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong>TED-Ed</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">TED's youth arm that utilizes original animations and enables teachers to build interactive lesson wrappers.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong>Codecademy</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">An interactive online portal focusing specifically on programming languages and modern tech topics.</p>
                    </div>
                  </div>
                </div>

                {/* Section 5: Evaluating Web Pages */}
                <div className="space-y-4 pt-6" id="evaluating-web">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <ListOrdered size={20} />
                    5. Evaluating Web Pages (The 5 Core Criteria)
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Unlike books or peer-reviewed journals, content published on the internet does not have strict, universal quality control guidelines. It is vital to evaluate pages using these five core criteria:
                  </p>

                  <div className="space-y-4 text-left">
                    <div className="border-2 border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[10px] font-black text-black">I. ACCURACY //</span>
                      <p className="font-sans text-xs text-gray-600 mt-1">Who wrote the page? Is the person qualified? Can you contact them via email or address to verify statements?</p>
                    </div>

                    <div className="border-2 border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[10px] font-black text-black">II. AUTHORITY //</span>
                      <p className="font-sans text-xs text-gray-600 mt-1">Which institution published the document? What are their credentials? Check the URL domain: preferred domains include <strong>.edu</strong>, <strong>.gov</strong>, and <strong>.org</strong>.</p>
                    </div>

                    <div className="border-2 border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[10px] font-black text-black">III. OBJECTIVITY / CREDIBILITY //</span>
                      <p className="font-sans text-xs text-gray-600 mt-1">What goals or objectives does the site meet? Is the page a mask for advertising? (If so, it might be heavily biased).</p>
                    </div>

                    {/* Accent box: Currency */}
                    <div className="border-4 border-black p-6 bg-[#C4B5FD] shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                      <h4 className="font-serif text-lg font-black text-black uppercase mb-1">IV. Currency / Current Status</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        When was the site produced and last updated? Are there dead links (broken links) on the page? A page with broken links is often abandoned and outdated.
                      </p>
                    </div>

                    <div className="border-2 border-black p-5 bg-[#FCA5A5] shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span className="font-mono text-[10px] font-black text-black">V. COVERAGE / FUNCTIONALITY //</span>
                      <p className="font-sans text-xs text-black mt-1">Can you view the information properly without being restricted by fees, paywalls, outdated browser requirements, or special software?</p>
                    </div>
                  </div>
                </div>

                {/* Section 6: Interactive Credibility Evaluator */}
                <div className="space-y-6 pt-6 text-left" id="web-interactive">
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                        <BrainCircuit size={22} />
                        6. Web Page Credibility Evaluator
                      </h2>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                        Interactive Credibility Simulator - Evaluate websites based on the 5 core criteria
                      </p>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap gap-2 border-b-2 border-black pb-4">
                      {[
                        { id: 'edu', name: 'University Climate Research (.edu)', color: '#A7F3D0' },
                        { id: 'spam', name: 'Free Game Coins Portal', color: '#FCA5A5' },
                        { id: 'vintage', name: 'Vintage Gaming Hub (1998)', color: '#FDBA74' },
                        { id: 'commercial', name: 'Sponsored Health Article', color: '#FFD833' }
                      ].map((presetItem) => (
                        <button
                          key={presetItem.id}
                          onClick={() => loadWebPreset(presetItem.id)}
                          className={`px-3 py-1.5 font-mono text-[10px] font-bold uppercase border-2 border-black transition-all cursor-pointer
                            ${webPreset === presetItem.id
                              ? 'bg-black text-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                              : 'bg-white text-black hover:bg-gray-100'
                            }
                          `}
                          style={{ borderColor: 'black' }}
                        >
                          {presetItem.name}
                        </button>
                      ))}
                    </div>

                    {/* Simulation Parameters Deck */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-2">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">PAGE METRICS</span>
                        <div><strong>URL:</strong> <span className="text-blue-700 underline break-all">{webUrl}</span></div>
                        <div><strong>Domain:</strong> <span className="bg-gray-200 px-1 border border-gray-300 font-bold">{webDomain}</span></div>
                        <div><strong>Author / Publisher:</strong> <span>{webAuthor}</span></div>
                      </div>

                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-2">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">FUNCTIONALITY & OBJECTIVITY</span>
                        <div><strong>Ads / Marketing:</strong> <span>{webAds}</span></div>
                        <div><strong>Last Updated:</strong> <span>{webUpdated}</span></div>
                        <div><strong>Access Requirements:</strong> <span>{webAccess}</span></div>
                      </div>
                    </div>

                    {/* Button trigger */}
                    <div className="flex justify-center">
                      <button
                        onClick={runWebEvaluation}
                        disabled={webStatus === 'COMPUTING'}
                        className="px-6 py-3 font-mono text-sm font-black uppercase border-4 border-black bg-[#FFD833] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer disabled:opacity-50"
                      >
                        {webStatus === 'COMPUTING' ? 'ANALYZING CREDIBILITY VECTOR...' : 'CALCULATE CREDIBILITY SCORE'}
                      </button>
                    </div>

                    {/* Simulation Output Display */}
                    {webStatus === 'SUCCESS' && webResult && (
                      <div className="border-4 border-black p-6 transition-all animate-fadeIn" style={{ backgroundColor: webResult.color }}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black pb-3 mb-4">
                          <h4 className="font-serif text-xl font-black uppercase text-black">EVALUATION REPORT</h4>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold uppercase text-black">CREDIBILITY SCORE:</span>
                            <span className="bg-black text-white px-3 py-1 font-mono text-lg font-black border-2 border-black shadow-[2px_2px_0_0_rgba(255,255,255,1)]">
                              {webResult.score}/100
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="inline-block bg-black text-white px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                            RATING: {webResult.rating}
                          </div>
                          <p className="font-sans text-sm text-black leading-relaxed font-bold">{webResult.details}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ) : noteData.staticLookupKey === 'computer-safety-basics' ? (
              /* ==========================================
                 GORGEOUS INTERACTIVE HEALTH & SAFETY NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left animate-fadeIn" id="health-safety-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_05 // WORKSTATION MANAGEMENT
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    Computer Health & Safety
                  </h1>
                </div>

                {/* Section 1: Workstation Health Risk Assessment & Posture */}
                <div className="space-y-4" id="hs-ergonomics">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Terminal size={20} />
                    1. Ergonomic Sitting Posture
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Good sitting posture respects the natural positioning of our joints and preserves muscular balance. Adopting proper posture avoids physical fatigue, strains, and repetitive injury risks.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-semibold text-xs text-black leading-relaxed">
                    <div className="border border-black p-4 bg-white">
                      <strong>Back & Shoulders</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Keep back straight, shoulders relaxed and back. Avoid rounding them forward. Set the monitor at eye level.</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <strong>Elbow Angle</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Position elbows to form a 90° – 100° angle (never less) relative to the keyboard.</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <strong>Knee Height</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Maintain knees at the height of the hips, forming a 90° – 100° angle with your torso.</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <strong>Legs & Feet</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Rest feet flat on the ground with legs relaxed at a 90° – 100° angle. Avoid crossing legs.</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Importance of Breaks */}
                <div className="space-y-4 pt-6" id="hs-breaks">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Cpu size={20} />
                    2. Importance of Taking Breaks
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    When dealing with high workloads or complex coding/writing tasks, taking regular breaks (micro-breaks, lunch breaks, and longer pauses) is vital to preserve both well-being and performance:
                  </p>

                  <div className="border-4 border-black p-6 bg-[#C4B5FD] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                    <h4 className="font-serif text-lg font-black text-black uppercase mb-3">Key Benefits of Breaks</h4>
                    <ul className="space-y-2 text-xs text-black font-semibold leading-relaxed">
                      <li><strong>Avoids Mental Fatigue:</strong> Prevents impairments in memory, concentration, and logic.</li>
                      <li><strong>Reduces Stress & Burnout:</strong> Helps regulate pressure, protecting motivation and mood.</li>
                      <li><strong>Recharges Mental Energy:</strong> Refreshes cognitive processes, restoring overall focus.</li>
                      <li><strong>Enhances Work Quality:</strong> Boosts problem-solving accuracy and reduces programming errors.</li>
                      <li><strong>Stimulates Creativity:</strong> Stepping away sparks new solutions and visual perspectives.</li>
                    </ul>
                  </div>
                </div>

                {/* Section 3: Supportive Tools */}
                <div className="space-y-4 pt-6" id="hs-tools">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    3. Supportive Postural Tools
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Adding simple accessories drastically lowers workstation occupational fatigue:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="border-2 border-black p-5 bg-[#38BDF8] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">DOCUMENT HOLDERS</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        Holds printed materials close to the monitor. Eliminates awkward neck twist and head postures, reducing headaches and eye strain.
                      </p>
                    </div>

                    <div className="border-2 border-black p-5 bg-[#FFD833] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">COMPUTER SPECTACLES</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        Special anti-glare eyeglasses that reduce screen glare, stopping you from leaning in or hunching over the screen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Audio Settings */}
                <div className="space-y-4 pt-6" id="hs-audio">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <BrainCircuit size={20} />
                    4. Audio Settings & Hearing Protection
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Setting safe volume thresholds on speakers and headphones protects against ear fatigue and hearing degradation. In Windows, this is configured via the Control Panel:
                  </p>

                  <div className="border border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left font-mono text-xs space-y-2">
                    <div className="font-bold text-gray-500 uppercase">VOLUME CONFIGURATION GUIDE //</div>
                    <ol className="list-decimal list-inside space-y-1.5 font-bold text-black">
                      <li>Search for and select <strong className="underline">Control Panel</strong> in the Windows search bar.</li>
                      <li>Select <strong className="underline">Sound</strong> from the list.</li>
                      <li>Select <strong className="underline">Properties</strong> for the active audio output device.</li>
                      <li>Navigate to the <strong className="underline">Levels tab</strong> to adjust and safely limit the volume slider.</li>
                    </ol>
                  </div>
                </div>

                {/* Section 5: Electrical Safety */}
                <div className="space-y-4 pt-6" id="hs-electrical">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <ListOrdered size={20} />
                    5. Electrical Safety & Socket Overloading
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Plugging too many appliances into one extension lead causes cords and wall plugs to overheat, creating severe fire hazards. Avoid these dangers with clean connection habits:
                  </p>

                  <div className="space-y-4 text-left">
                    <div className="border-2 border-black p-4 bg-white">
                      <h4 className="font-mono text-xs font-black text-black">EXTENSION LEAD RATINGS & LOAD</h4>
                      <p className="font-sans text-xs text-gray-600 mt-1">
                        Check the maximum amperage rating of your extension lead (most are 13A or less). Ensure the combined load of plugged appliances does not exceed this rating, or a maximum wattage of <strong>3000W</strong>.
                      </p>
                    </div>

                    <div className="border-2 border-black p-4 bg-[#F3F4F6]">
                      <h4 className="font-mono text-xs font-black text-black">NO DAISY-CHAINING</h4>
                      <p className="font-sans text-xs text-gray-600 mt-1">
                        Never plug one extension lead into another (daisy-chaining). Always use fused multiway bars instead of block adaptors, as block adaptors often lack fuses and overheat easily.
                      </p>
                    </div>

                    {/* Accent box: Danger Signs */}
                    <div className="border-4 border-black p-6 bg-[#FCA5A5] shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                      <h4 className="font-serif text-lg font-black text-black uppercase mb-2">Regular Danger Signs to Inspect</h4>
                      <ul className="list-disc list-inside text-xs text-black font-semibold space-y-1">
                        <li>Smell of hot, melting plastic.</li>
                        <li>Sparks or scorch marks on wall sockets or plugs.</li>
                        <li>Damaged, frayed, or exposed colored wires in power cords.</li>
                        <li>Fuses that repeatedly blow without reason.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 6: Interactive Workstation Safety Checker */}
                <div className="space-y-6 pt-6 text-left" id="hs-interactive">
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                        <BrainCircuit size={22} />
                        6. Workstation & Electrical Safety Simulator
                      </h2>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                        Interactive Safety Checker - Adjust workstation settings to check health and safety levels
                      </p>
                    </div>

                    {/* Simulation Parameters Deck */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                      {/* Ergonomic settings */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">ERGONOMICS & WORK HABITS</span>
                        
                        <div className="space-y-1">
                          <label className="font-bold block">Sitting Posture:</label>
                          <select 
                            value={hsPosture} 
                            onChange={(e) => { setHsPosture(e.target.value); setHsStatus('IDLE'); setHsReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="good">Good (Straight back, relaxed, screen eye level)</option>
                            <option value="hunched">Hunched (Leaning forward, hunched shoulders)</option>
                            <option value="slouch">Slouched (Arching lower back, legs crossed)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Taking Breaks:</label>
                          <select 
                            value={hsBreaks} 
                            onChange={(e) => { setHsBreaks(e.target.value); setHsStatus('IDLE'); setHsReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="regular">Regular Breaks (Micro-breaks & lunch breaks)</option>
                            <option value="occasional">Occasional Breaks (Few short breaks)</option>
                            <option value="none">No Breaks (Continuous computer use)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Audio Level (Speaker/Earpieces): {hsAudioLevel}%</label>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={hsAudioLevel} 
                            onChange={(e) => { setHsAudioLevel(parseInt(e.target.value)); setHsStatus('IDLE'); setHsReport(null); }}
                            className="w-full accent-black cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Electrical safety settings */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">ELECTRICAL SAFETY</span>
                        
                        <div className="space-y-1">
                          <label className="font-bold block">Wattage Load: {hsLoad}W</label>
                          <input 
                            type="range" 
                            min="500" 
                            max="4500" 
                            step="250"
                            value={hsLoad} 
                            onChange={(e) => { setHsLoad(parseInt(e.target.value)); setHsStatus('IDLE'); setHsReport(null); }}
                            className="w-full accent-black cursor-pointer"
                          />
                          <span className="text-[8px] text-gray-500 block">MAX SAFE LIMIT: 3000W</span>
                        </div>

                        <div className="flex flex-col gap-2 pt-1 font-bold">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={hsDaisyChain} 
                              onChange={(e) => { setHsDaisyChain(e.target.checked); setHsStatus('IDLE'); setHsReport(null); }}
                              className="accent-black border-2 border-black rounded-none cursor-pointer"
                            />
                            Daisy-chaining Leads (Extension into Extension)
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={hsBlockAdaptor} 
                              onChange={(e) => { setHsBlockAdaptor(e.target.checked); setHsStatus('IDLE'); setHsReport(null); }}
                              className="accent-black border-2 border-black rounded-none cursor-pointer"
                            />
                            Using Block Adaptors (Instead of Fused Multiway Bars)
                          </label>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Danger Signs Observed:</label>
                          <select 
                            value={hsDangerSigns} 
                            onChange={(e) => { setHsDangerSigns(e.target.value); setHsStatus('IDLE'); setHsReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="none">No Danger Signs</option>
                            <option value="hot_plastic">Smell of Hot Plastic</option>
                            <option value="sparks">Sparks / Scorch Marks</option>
                            <option value="frayed_wires">Damaged / Frayed / Exposed Wires</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Button trigger */}
                    <div className="flex justify-center">
                      <button
                        onClick={runHealthSafetyCheck}
                        disabled={hsStatus === 'COMPUTING'}
                        className="px-6 py-3 font-mono text-sm font-black uppercase border-4 border-black bg-[#FFD833] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer disabled:opacity-50"
                      >
                        {hsStatus === 'COMPUTING' ? 'COMPUTING SAFETY PROTOCOLS...' : 'RUN WORKSTATION SAFETY CHECK'}
                      </button>
                    </div>

                    {/* Simulation Output Display */}
                    {hsStatus === 'SUCCESS' && hsReport && (
                      <div className="border-4 border-black p-6 transition-all animate-fadeIn" style={{ backgroundColor: hsReport.riskColor }}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black pb-3 mb-4">
                          <h4 className="font-serif text-xl font-black uppercase text-black">SAFETY REPORT</h4>
                          <div className="flex items-center gap-4 font-mono text-xs font-bold text-black">
                            <span>ERGONOMICS: {hsReport.ergoScore}/100</span>
                            <span>ELECTRICAL: {hsReport.elecScore}/100</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="inline-block bg-black text-white px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                            STATUS: {hsReport.riskLevel}
                          </div>
                          <pre className="font-mono text-xs text-black leading-relaxed whitespace-pre-wrap font-bold bg-white/40 p-4 border border-black/10">
                            {hsReport.riskFeedback}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ) : (
              /* ==========================================
                 STANDARD FALLBACK DYNAMIC RENDERER
                 ========================================== */
              <section className="space-y-8" id="db-note">
                <div className="space-y-2 text-left">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block animate-pulse">
                    STATIC NOTE // {noteData.classLevel.toUpperCase()}
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    {noteData.title}
                  </h1>
                  <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2 text-left">
                    TARGET CLASS: {noteData.classLevel}
                  </p>
                </div>

                <div className="space-y-8 max-w-3xl">
                  {fullLessonContent && fullLessonContent.contentBlocks.map((block: any, idx: number) => {
                    switch (block.type) {
                      case 'challenge_callout':
                        return (
                          <div key={idx} id={`block-${idx}`}>
                            {block.heading && (
                              <h4 className="font-serif text-lg font-black uppercase tracking-tight text-black mb-2 text-left">
                                {block.heading}
                              </h4>
                            )}
                            <div className="bg-[#FFD833] border-4 border-black rounded-none p-5 my-6 text-black font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                              {block.body}
                            </div>
                          </div>
                        );
                      case 'bullet_point':
                        return (
                          <div key={idx} id={`block-${idx}`} className="text-left mb-4 pl-6 relative">
                            {block.heading && (
                              <h4 className="font-serif text-lg font-black uppercase tracking-tight text-black mb-2">
                                {block.heading}
                              </h4>
                            )}
                            <div className="flex items-start gap-2">
                              <span className="inline-block w-2 h-2 bg-black mt-2.5 rounded-none flex-shrink-0" />
                              <p className="text-base md:text-lg text-black leading-relaxed font-normal">
                                {block.body}
                              </p>
                            </div>
                          </div>
                        );
                      case 'text':
                      default:
                        return (
                          <div key={idx} id={`block-${idx}`}>
                            {block.heading && (
                              <h3 className="font-serif text-xl font-black uppercase tracking-tight text-black mb-2 text-left">
                                {block.heading}
                              </h3>
                            )}
                            <p className="text-base md:text-lg text-black leading-relaxed font-normal mb-4 text-left">
                              {block.body}
                            </p>
                          </div>
                        );
                    }
                  })}
                </div>
              </section>
            )
          ) : (
            <div className="flex items-center justify-center p-8">
              <div className="border-4 border-black bg-black text-[#FFD833] p-8 font-mono text-xs font-bold uppercase tracking-widest text-center shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                [ LOADING_AND_DECRYPTING_CURRICULUM_DATA... ]
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
