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
  BrainCircuit,
  ShoppingBag
} from 'lucide-react';
import { useQuery, useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useState } from 'react';
import { staticCurriculumNotes as curriculumNotes } from '../../data/curriculumNotes';

interface NotesViewProps {
  activeNoteId: string | null;
  onBack: () => void;
  onStartQuest: (questData: { steps: any[]; quizQuestions?: any[]; title: string }) => void;
}

export function NotesView({ activeNoteId, onBack, onStartQuest }: NotesViewProps) {
  const [textSize, setTextSize] = useState<number>(14); // in pixels
  const [activeTab, setActiveTab] = useState<'text' | 'video'>('text');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('IDLE'); // IDLE, SAVING, SAVED
  const [searchAccordionActive, setSearchAccordionActive] = useState<boolean>(false);

  // AI Dictionary State
  const [isDictionaryOpen, setIsDictionaryOpen] = useState<boolean>(false);
  const [lookupWordInput, setLookupWordInput] = useState<string>('');
  const [dictionaryLoading, setDictionaryLoading] = useState<boolean>(false);
  const [dictionaryResult, setDictionaryResult] = useState<string | null>(null);
  const [dictionaryError, setDictionaryError] = useState<string | null>(null);
  const lookupWordAction = useAction(api.dictionary.lookupWord);

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

  // Desktop Publishing (DTP) Flyer Builder Simulator Interactive State
  const [dtpTemplate, setDtpTemplate] = useState<string>('flyer'); // flyer, business_card, brochure
  const [dtpOrientation, setDtpOrientation] = useState<string>('Portrait'); // Portrait, Landscape
  const [dtpMargins, setDtpMargins] = useState<string>('Moderate'); // Narrow, Moderate, Wide, None
  const [dtpTextFit, setDtpTextFit] = useState<string>('Grow Box to Fit'); // Best Fit, Shrink on Overflow, Grow Box to Fit, Do not Autofit
  const [dtpPictureOption, setDtpPictureOption] = useState<string>('placeholder'); // picture, placeholder, none
  const [dtpDropCap, setDtpDropCap] = useState<boolean>(true);
  const [dtpLigatures, setDtpLigatures] = useState<boolean>(true);
  const [dtpSwash, setDtpSwash] = useState<boolean>(false);
  const [dtpColorTheme, setDtpColorTheme] = useState<string>('modern'); // modern, vintage, warm
  const [dtpStatus, setDtpStatus] = useState<'IDLE' | 'COMPUTING' | 'SUCCESS'>('IDLE');
  const [dtpReport, setDtpReport] = useState<{
    designScore: number;
    warnings: string[];
    feedback: string;
    efficiencyRating: string;
  } | null>(null);

  // Spreadsheet Formulas Simulator State
  const [ssfFormulaInput, setSsfFormulaInput] = useState<string>('=SUM(B2:B3)');
  const [ssfStatus, setSsfStatus] = useState<'IDLE' | 'COMPUTING' | 'SUCCESS'>('IDLE');
  const [ssfResult, setSsfResult] = useState<{
    value: string;
    isError: boolean;
    errorType: string | null;
    explanation: string;
  } | null>(null);

  // Search Engines Simulator State
  const [seQueryInput, setSeQueryInput] = useState<string>('gender AND Shakespeare');
  const [seEngineSelect, setSeEngineSelect] = useState<string>('google'); // google, duckduckgo
  const [seStatus, setSeStatus] = useState<'IDLE' | 'COMPUTING' | 'SUCCESS'>('IDLE');
  const [seResult, setSeResult] = useState<{
    matches: { title: string; desc: string; url: string }[];
    relevanceScore: number;
    trackersBlocked: number;
    privacyReport: string;
    profiledInterest: string;
  } | null>(null);

  // Artificial Intelligence Simulator State
  const [aiDataType, setAiDataType] = useState<string>('image'); // image, sensor, scan
  const [aiHiddenLayers, setAiHiddenLayers] = useState<number>(2); // 1, 2, 3
  const [aiTrainingEpochs, setAiTrainingEpochs] = useState<number>(500); // 100, 500, 1000
  const [aiLaserCoherent, setAiLaserCoherent] = useState<boolean>(true);
  const [aiSplitAngle, setAiSplitAngle] = useState<number>(45); // 30, 45, 60
  const [aiStatus, setAiStatus] = useState<'IDLE' | 'COMPUTING' | 'SUCCESS'>('IDLE');
  const [aiReport, setAiReport] = useState<{
    accuracy: number;
    trainingLoss: number;
    predictedLabel: string;
    neuralStatus: string;
    holoIntegrity: string;
  } | null>(null);

  // Animal Production Simulator State
  const [apLivestockType, setApLivestockType] = useState<string>('layers'); // broilers, layers, ruminants, pigs
  const [apCarbsRatio, setApCarbsRatio] = useState<number>(40); // % carbs
  const [apProteinRatio, setApProteinRatio] = useState<number>(30); // % protein
  const [apRoughageRatio, setApRoughageRatio] = useState<number>(20); // % roughage
  const [apSupplementRatio, setApSupplementRatio] = useState<number>(10); // % supplements
  const [apWaterOption, setApWaterOption] = useState<string>('sufficient'); // sufficient, inadequate, dehydrated
  const [apStatus, setApStatus] = useState<'IDLE' | 'COMPUTING' | 'SUCCESS'>('IDLE');
  const [apReport, setApReport] = useState<{
    nutritionalValue: number;
    healthOutcome: string;
    dehydrationRisk: string;
    deficiencies: string[];
  } | null>(null);

  // Energy Conversion Simulator State
  const [ecSource, setEcSource] = useState<string>('hydro'); // hydro, solar, wind, geo, fossil, nuclear
  const [ecSourceAvailability, setEcSourceAvailability] = useState<number>(80); // 0 to 100%
  const [ecGridLoad, setEcGridLoad] = useState<number>(100); // 50, 100, 150 MW
  const [ecHeatInput, setEcHeatInput] = useState<number>(500); // Joules
  const [ecStatus, setEcStatus] = useState<'IDLE' | 'COMPUTING' | 'SUCCESS'>('IDLE');
  const [ecReport, setEcReport] = useState<{
    powerGenerated: number;
    efficiency: number;
    co2Emissions: number;
    flowChart: string;
    gridStability: string;
    temperatureRise: number;
    calorimeterFeedback: string;
  } | null>(null);

  // Farming Systems Simulator State
  const [fsYear1Crop, setFsYear1Crop] = useState<string>('legume'); // legume, cereal, root, vegetable
  const [fsYear2Crop, setFsYear2Crop] = useState<string>('cereal');
  const [fsYear3Crop, setFsYear3Crop] = useState<string>('vegetable');
  const [fsYear4Crop, setFsYear4Crop] = useState<string>('root');
  const [fsAnimalCare, setFsAnimalCare] = useState<string>('intensive'); // intensive, extensive
  const [fsStatus, setFsStatus] = useState<'IDLE' | 'COMPUTING' | 'SUCCESS'>('IDLE');
  const [fsReport, setFsReport] = useState<{
    soilHealthScore: number;
    rotationCheck: string;
    manureValue: string;
    extensiveWarning: string;
    deficiencies: string[];
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

  const runDtpEvaluation = () => {
    setDtpStatus('COMPUTING');
    setTimeout(() => {
      let score = 100;
      let warnings: string[] = [];
      let feedback = "";

      // Posture/Layout guidelines evaluation
      if (dtpTemplate === 'business_card') {
        if (dtpOrientation === 'Portrait') {
          score -= 10;
          warnings.push("Layout caution: Most business cards are traditionally designed in Landscape orientation for standard cardholder storage.");
        }
        if (dtpMargins === 'Wide') {
          score -= 20;
          warnings.push("Margins too wide: Wide margins leave very little room for contact details on a small 3.5\" x 2.0\" card canvas.");
        }
      }

      if (dtpTemplate === 'brochure') {
        if (dtpOrientation === 'Portrait') {
          // Tri-fold brochures are usually landscape
          score -= 10;
          warnings.push("Orientation suggestion: Multi-panel brochures are typically designed in Landscape orientation for proper folding segments.");
        }
      }

      if (dtpTextFit === 'Do not Autofit') {
        score -= 20;
        warnings.push("Text warning: Without autofitting, text overflow can go unnoticed, resulting in cut-off sentences in the printed publication.");
      } else if (dtpTextFit === 'Grow Box to Fit') {
        if (dtpTemplate === 'business_card' || dtpTemplate === 'flyer') {
          score -= 10;
          warnings.push("Layout warning: Growing the text box automatically can shift other elements (like images or logos) off-screen or out of alignment.");
        }
      }

      if (dtpPictureOption === 'none') {
        score -= 15;
        warnings.push("Design warning: A publication with no illustrations or placeholders relies entirely on text, lowering visual communication appeal.");
      }

      // Typography embellishments
      let typographyBonus = 0;
      if (dtpDropCap) typographyBonus += 5;
      if (dtpLigatures) typographyBonus += 5;
      if (dtpSwash) typographyBonus += 5;
      score = Math.min(100, Math.max(0, score + typographyBonus));

      let efficiencyRating = 'EXCELLENT LAYOUT';
      if (score < 60) {
        efficiencyRating = 'POOR DESIGN CONFIGURATION';
      } else if (score < 85) {
        efficiencyRating = 'MODERATE DESIGN BALANCE';
      }

      feedback = warnings.length > 0
        ? "LAYOUT CORRECTIONS SUGGESTED:\n" + warnings.map(w => `• ${w}`).join("\n")
        : "✓ Perfect layout balance! The template meets all professional design and output guidelines.";

      setDtpReport({
        designScore: score,
        warnings,
        feedback,
        efficiencyRating
      });
      setDtpStatus('SUCCESS');
    }, 1200);
  };

  const runSsfEvaluation = () => {
    setSsfStatus('COMPUTING');
    setTimeout(() => {
      const formula = ssfFormulaInput.trim().toUpperCase();
      let valStr = "";
      let isError = false;
      let errorType = null;
      let explanation = "";

      if (!formula.startsWith('=')) {
        valStr = formula;
        explanation = "This is treated as pure text/label. Remember, all formulas and functions MUST begin with an equal sign (=) to calculate values.";
      } else {
        const expression = formula.slice(1).trim();

        if (expression.startsWith('SU(')) {
          isError = true;
          errorType = '#NAME?';
          explanation = "NAME ERROR: The function name is misspelled as SU. In Excel, the function to add cell ranges must be spelled exactly as SUM.";
        } else if (expression.includes('/0')) {
          isError = true;
          errorType = '#DIV/0!';
          explanation = "DIVISION BY ZERO: You attempted to divide a value by zero (or an empty cell). Use the IFERROR function to handle empty fields elegantly, e.g., =IFERROR(A2/B2, 0).";
        } else if (expression.includes('D4') || expression.includes('E5')) {
          isError = true;
          errorType = '#REF!';
          explanation = "REFERENCE ERROR: The formula refers to a cell that is missing or deleted. Lock references using absolute coordinates ($) or paste calculations as values before deletion.";
        } else if (expression.includes(' ') && !expression.includes('"') && !expression.includes("'")) {
          isError = true;
          errorType = '#NULL!';
          explanation = "NULL ERROR: A space was used instead of a comma (,) or a colon (:) separator between arguments. Ensure proper syntax in lists and ranges.";
        } else if (expression.includes('+A') || expression.includes('+"') || expression.includes('+TEXT')) {
          isError = true;
          errorType = '#VALUE!';
          explanation = "VALUE ERROR: You attempted an arithmetic operation using a text string instead of numeric data types. Check that all referenced cells contain numbers.";
        } else if (expression.startsWith('SUM(B2:B3)') || expression.startsWith('SUM(85,90)')) {
          valStr = "175";
          explanation = "✓ SUCCESS: SUM added B2 (85) and B3 (90) correctly.";
        } else if (expression.startsWith('AVERAGE(B2:B3)') || expression.startsWith('AVERAGE(85,90)')) {
          valStr = "87.5";
          explanation = "✓ SUCCESS: AVERAGE calculated the mean of B2 (85) and B3 (90).";
        } else if (expression.startsWith('RATE(')) {
          valStr = "6.5%";
          explanation = "✓ SUCCESS: RATE calculated the periodic loan interest rate correctly based on periods (nper), pmt, and pv.";
        } else if (expression.startsWith('COUNTIF(')) {
          valStr = "1";
          explanation = "✓ SUCCESS: COUNTIF checked the range and counted cells matching the logical condition.";
        } else {
          valStr = "Calculated Result";
          explanation = "✓ Formula compiled. Standard cell evaluation returned a successful numeric response.";
        }
      }

      setSsfResult({
        value: isError ? errorType! : valStr,
        isError,
        errorType,
        explanation
      });
      setSsfStatus('SUCCESS');
    }, 1200);
  };

  const runSeEvaluation = () => {
    setSeStatus('COMPUTING');
    setTimeout(() => {
      const query = seQueryInput.trim();
      const queryLower = query.toLowerCase();

      let matches: { title: string; desc: string; url: string }[] = [];
      let relevanceScore = 100;
      let trackersBlocked = 0;
      let privacyReport = "";
      let profiledInterest = "None";

      // Mock database of items to match
      const corpus = [
        { title: "Shakespeare's Sonnets & Gender Roles", desc: "A comprehensive study on literary analysis of gender representation in Hamlet and MacBeth.", tags: ["gender", "shakespeare"], url: "https://literature-studies.edu/shakespeare" },
        { title: "Modern Electric Cars & Auto Innovation", desc: "The definitive guide to new electric sedan battery systems, autopilot efficiency, and road safety.", tags: ["car", "automobile", "tesla"], url: "https://autonews.com/electric-cars" },
        { title: "Video Games: Industry Growth", desc: "Analyzing global gaming console sales, PC hardware developments, and competitive esport leagues.", tags: ["video games", "gaming"], url: "https://gamedev-report.org/industry" },
        { title: "Teenagers and Screen Time Studies", desc: "A psychological study investigating teenager habits, gaming time limits, and school grades.", tags: ["video games", "teenagers"], url: "https://familypsychology.org/teenagers-screen" },
        { title: "Marine Animal Cloning Experimentation", desc: "Research paper detailing the molecular duplication of jellyfish species in marine labs.", tags: ["animal cloning", "animal duplication", "jellyfish"], url: "https://marine-science.gov/cloning-jellyfish" },
        { title: "Sheep Cloning Progress Report", desc: "A retrospective review of somatic cell nuclear transfer techniques in domestic sheep cloning.", tags: ["animal cloning", "sheep"], url: "https://bioscience-reviews.com/sheep-dolly" }
      ];

      // Simple Boolean Parser
      corpus.forEach(item => {
        let isMatch = false;

        if (queryLower.includes('gender and shakespeare')) {
          if (item.tags.includes('gender') && item.tags.includes('shakespeare')) {
            isMatch = true;
          }
        } else if (queryLower.includes('car or automobile')) {
          if (item.tags.includes('car') || item.tags.includes('automobile')) {
            isMatch = true;
          }
        } else if (queryLower.includes('"video games" not teenagers') || queryLower.includes('video games not teenagers')) {
          if (item.tags.includes('video games') && !item.tags.includes('teenagers')) {
            isMatch = true;
          }
        } else if (queryLower.includes('jellyfish not sheep')) {
          if (item.tags.includes('jellyfish') && !item.tags.includes('sheep')) {
            isMatch = true;
          }
        } else {
          isMatch = item.tags.some(tag => queryLower.includes(tag)) || item.title.toLowerCase().includes(queryLower);
        }

        if (isMatch) {
          matches.push({ title: item.title, desc: item.desc, url: item.url });
        }
      });

      // Apply Search Engine characteristics
      if (seEngineSelect === 'google') {
        trackersBlocked = 0;
        profiledInterest = query.length > 3 ? query : "General Browsing";
        privacyReport = "WARNING: Search query recorded in 'My Activity' dashboard. Search history has been logged and synchronized with your Google profile for ad personalization and advertising networks.";
        relevanceScore = matches.length > 0 ? 98 : 30;
      } else {
        trackersBlocked = 8;
        profiledInterest = "None (Anonymous session)";
        privacyReport = "✓ SECURE: Search history was not recorded, no profiling tags were created, and 8 behavioral ad trackers were completely blocked on this search canvas.";
        relevanceScore = matches.length > 0 ? 92 : 25;
      }

      setSeResult({
        matches,
        relevanceScore,
        trackersBlocked,
        privacyReport,
        profiledInterest
      });
      setSeStatus('SUCCESS');
    }, 1200);
  };

  const runAiEvaluation = () => {
    setAiStatus('COMPUTING');
    setTimeout(() => {
      // Calculate neural network metrics
      let accuracy = 50;
      let trainingLoss = 0.8;
      let predictedLabel = "Unknown";
      let neuralStatus = "Underfitting";

      // Accuracy formula based on hidden layers and training epochs
      if (aiHiddenLayers === 2 && aiTrainingEpochs === 500) {
        accuracy = 88;
        trainingLoss = 0.18;
        neuralStatus = "Optimal Convergence";
      } else if (aiHiddenLayers >= 2 && aiTrainingEpochs === 1000) {
        accuracy = 97;
        trainingLoss = 0.04;
        neuralStatus = "Optimal Convergence";
      } else if (aiTrainingEpochs === 100) {
        accuracy = 62;
        trainingLoss = 0.45;
        neuralStatus = "Underfitting (Needs more epochs)";
      } else if (aiHiddenLayers === 1) {
        accuracy = 70;
        trainingLoss = 0.35;
        neuralStatus = "Limited Capability (Add layers)";
      } else {
        accuracy = 80;
        trainingLoss = 0.22;
        neuralStatus = "Converging";
      }

      if (aiDataType === 'image') {
        predictedLabel = accuracy > 75 ? "Classified: Domestic Cat (99% confidence)" : "Classified: Noise / Unsure";
      } else if (aiDataType === 'sensor') {
        predictedLabel = accuracy > 75 ? "Classified: Autonomous Navigation Path (Safe)" : "Classified: Sensor Calibration Error";
      } else {
        predictedLabel = accuracy > 75 ? "Classified: Coronary Artery Occlusion Detected" : "Classified: Unclear Scan Pattern";
      }

      // Calculate Holographic integrity
      let holoIntegrity = "Poor (Laser must be coherent to create light interference patterns)";
      if (aiLaserCoherent) {
        if (aiSplitAngle === 45) {
          holoIntegrity = "Excellent (Split reference/object beams properly aligned at 45°)";
        } else {
          holoIntegrity = "Moderate (Laser coherent, but beam split angle causes visual distortion)";
        }
      }

      setAiReport({
        accuracy,
        trainingLoss,
        predictedLabel,
        neuralStatus,
        holoIntegrity
      });
      setAiStatus('SUCCESS');
    }, 1200);
  };

  const runApEvaluation = () => {
    setApStatus('COMPUTING');
    setTimeout(() => {
      let nutritionalValue = 100;
      let healthOutcome = "Excellent Growth & Yield";
      let dehydrationRisk = "None";
      let deficiencies: string[] = [];

      const totalRatio = apCarbsRatio + apProteinRatio + apRoughageRatio + apSupplementRatio;

      // Verification of feed totals
      if (totalRatio !== 100) {
        nutritionalValue -= Math.abs(100 - totalRatio);
        deficiencies.push(`Feed composition ratio does not equal 100% (Current total: ${totalRatio}%). Ensure feed values align properly.`);
      }

      // Check livestock type rules
      if (apLivestockType === 'layers') {
        if (apSupplementRatio < 15) {
          nutritionalValue -= 20;
          deficiencies.push("Calcium / Mineral deficiency: Laying hens require higher supplement rations (min 15%) for robust eggshell synthesis.");
        }
        if (apProteinRatio < 20) {
          nutritionalValue -= 15;
          deficiencies.push("Protein deficiency: Laying hens need at least 20% protein to support steady egg production.");
        }
      } else if (apLivestockType === 'ruminants') {
        if (apRoughageRatio < 40) {
          nutritionalValue -= 30;
          deficiencies.push("Fiber deficiency: Ruminants (goats, sheep, cattle) require a high fiber diet (min 40% roughage/pasture/hay) for proper stomach fermentation.");
        }
      } else if (apLivestockType === 'broilers') {
        if (apProteinRatio < 25) {
          nutritionalValue -= 20;
          deficiencies.push("Protein deficiency: Growing broiler chickens require elevated protein levels (min 25%) to build meat tissue rapidly.");
        }
      }

      // Water condition checks
      if (apWaterOption === 'dehydrated') {
        nutritionalValue = Math.max(0, nutritionalValue - 50);
        dehydrationRisk = "CRITICAL DEHYDRATION";
        healthOutcome = "Severe dehydration. Metabolism and waste excretion systems have stalled. High mortality risk.";
      } else if (apWaterOption === 'inadequate') {
        nutritionalValue = Math.max(10, nutritionalValue - 20);
        dehydrationRisk = "MODERATE RISK";
        healthOutcome = "Livestock looks weak, thin, and displays drop in egg/milk yield due to inadequate fluid levels.";
      } else {
        dehydrationRisk = "None (Safe)";
      }

      if (nutritionalValue >= 85 && apWaterOption === 'sufficient') {
        healthOutcome = "Ideal feeding & hydration balance. Farm animals are healthy, growing, and achieving maximum yield/profit.";
      } else if (nutritionalValue >= 60 && apWaterOption === 'sufficient') {
        healthOutcome = "Suboptimal performance. Review feed composition to address minor nutritional gaps.";
      }

      setApReport({
        nutritionalValue: Math.max(0, nutritionalValue),
        healthOutcome,
        dehydrationRisk,
        deficiencies
      });
      setApStatus('SUCCESS');
    }, 1200);
  };

  const runEcEvaluation = () => {
    setEcStatus('COMPUTING');
    setTimeout(() => {
      let maxCapacity = 100; // MW
      let baseEfficiency = 40; // %
      let co2Emissions = 0; // Metric Tons per day
      let flowChart = "Potential -> Kinetic -> Mechanical -> Electrical";
      let gridStability = "Stable";

      if (ecSource === 'hydro') {
        maxCapacity = 160;
        baseEfficiency = 85;
        flowChart = "Potential Energy (Dam) -> Kinetic Energy (Flow) -> Mechanical (Turbine) -> Electrical (Generator)";
      } else if (ecSource === 'solar') {
        maxCapacity = 50;
        baseEfficiency = 20;
        flowChart = "Solar Photons -> Direct Electric Current (Semiconductor Photovoltaic Cell)";
      } else if (ecSource === 'wind') {
        maxCapacity = 80;
        baseEfficiency = 45;
        flowChart = "Kinetic Energy (Wind) -> Mechanical (Turbine Rotation) -> Electrical (Dynamo Generator)";
      } else if (ecSource === 'geo') {
        maxCapacity = 120;
        baseEfficiency = 65;
        flowChart = "Thermal Heat (Hot Core Rocks) -> Kinetic (Steam Pressure) -> Mechanical (Turbine) -> Electrical (Generator)";
      } else if (ecSource === 'fossil') {
        maxCapacity = 200;
        baseEfficiency = 38;
        co2Emissions = 450;
        flowChart = "Chemical Energy (Fossil Bonds) -> Thermal Heat (Boiler Combustion) -> Kinetic (Steam) -> Mechanical (Turbine) -> Electrical";
      } else if (ecSource === 'nuclear') {
        maxCapacity = 250;
        baseEfficiency = 42;
        flowChart = "Nuclear Energy (Atomic Fission) -> Thermal Heat (Core Water) -> Kinetic (Steam) -> Mechanical (Turbine) -> Electrical";
      }

      // Modify output based on availability
      const powerGenerated = Math.round(maxCapacity * (ecSourceAvailability / 100));
      const efficiency = Math.round(baseEfficiency * (0.8 + (ecSourceAvailability / 500)));

      if (powerGenerated < ecGridLoad) {
        gridStability = "CRITICAL BROWNOUT: Power generated is below the grid load requirements. Load shedding required.";
      } else if (powerGenerated > ecGridLoad + 50) {
        gridStability = "SURPLUS POWER: Grid capacity exceeds load. Directing excess energy to storage banks.";
      } else {
        gridStability = "GRID HEALTHY: Generation meets load demand perfectly.";
      }

      // Heat Sandbox: temperature rise depends on heat input (calorimeter)
      const temperatureRise = Math.round(ecHeatInput / 10);
      const calorimeterFeedback = `Heat Energy input: ${ecHeatInput} J. This active transfer of thermal energy raised the water thermometer reading by +${temperatureRise}°C. Note: The starting temperature does not change the heat energy transferred!`;

      setEcReport({
        powerGenerated,
        efficiency,
        co2Emissions: Math.round(co2Emissions * (ecSourceAvailability / 100)),
        flowChart,
        gridStability,
        temperatureRise,
        calorimeterFeedback
      });
      setEcStatus('SUCCESS');
    }, 1200);
  };

  const runFsEvaluation = () => {
    setFsStatus('COMPUTING');
    setTimeout(() => {
      let soilHealthScore = 100;
      let rotationCheck = "Planned rotation cycle follows all agricultural rules.";
      let manureValue = "Manure value: Animal droppings represent organic nutrients, boosting soil nitrogen and fertility.";
      let extensiveWarning = "";
      let deficiencies: string[] = [];

      const cropSeq = [fsYear1Crop, fsYear2Crop, fsYear3Crop, fsYear4Crop];

      // Rule 1: Must include leguminous crops
      if (!cropSeq.includes('legume')) {
        soilHealthScore -= 30;
        deficiencies.push("Legume Deficiency: Rotation lacks nitrogen-fixing legumes (like cowpea/groundnut) to naturally restore soil nitrates.");
      }

      // Rule 2: Alternate deep-rooted and shallow-rooted crops
      let deepShallowCheck = true;
      for (let i = 0; i < 3; i++) {
        const currentDeep = cropSeq[i] === 'root';
        const nextDeep = cropSeq[i + 1] === 'root';
        if (currentDeep === nextDeep) {
          deepShallowCheck = false;
        }
      }
      if (!deepShallowCheck) {
        soilHealthScore -= 20;
        deficiencies.push("Root Depth Rule Violated: Plan has consecutive deep-rooted or shallow-rooted crops. Shallow-rooted crops should follow deep-rooted crops (e.g. maize following yam) to distribute nutrient extraction layers.");
      }

      // Rule 3: Crops of the same family or species must not follow one another
      let sameTypeCheck = true;
      for (let i = 0; i < 3; i++) {
        if (cropSeq[i] === cropSeq[i + 1]) {
          sameTypeCheck = false;
        }
      }
      if (!sameTypeCheck) {
        soilHealthScore -= 25;
        deficiencies.push("Monoculture Trap: Identical crop classes follow one another in consecutive years. This depletes specific macronutrients rapidly and encourages pest buildup.");
      }

      // Mixed farming care warnings
      if (fsAnimalCare === 'extensive') {
        extensiveWarning = "WARNING: Free-roaming livestock (extensive system) trampled soil structures and consumed emerging crop seedlings, reducing harvest by -15%.";
        soilHealthScore = Math.max(0, soilHealthScore - 15);
      } else {
        extensiveWarning = "Intensive care selected. Animals kept in secure pens/cages. Complete security against crop trampling.";
      }

      if (soilHealthScore >= 80) {
        rotationCheck = "EXCELLENT PLAN: Crop rotation cycle prevents nutrient exhaustion, breaks pest lifecycles, and maintains high organic yield.";
      } else if (soilHealthScore >= 50) {
        rotationCheck = "SUBOPTIMAL YIELD: Farm experiences minor nutrient imbalances or elevated pest populations. Review crop family sequences.";
      } else {
        rotationCheck = "SOIL EXHAUSTION: High risk of crop failure. The rotation plan violates core agricultural laws.";
      }

      setFsReport({
        soilHealthScore: Math.max(0, soilHealthScore),
        rotationCheck,
        manureValue,
        extensiveWarning,
        deficiencies
      });
      setFsStatus('SUCCESS');
    }, 1200);
  };

  const noteData = useQuery(
    api.notesIngestion.getNoteDetails,
    activeNoteId ? { noteId: activeNoteId as Id<"notes"> } : 'skip'
  );

  const assignedQuest = useQuery(
    api.quests.getAssignedQuest,
    noteData?.subjectId && noteData?.classLevel && noteData?.staticLookupKey
      ? { 
          subjectId: noteData.subjectId, 
          classLevel: noteData.classLevel,
          staticLookupKey: noteData.staticLookupKey 
        }
      : 'skip'
  );

  const subjects = useQuery(api.admin.listSubjects);
  const matchedSubject = subjects?.find((s) => s._id === noteData?.subjectId);
  const subjectCode = matchedSubject?.code || "GENERAL";

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

  const handleDictionaryLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupWordInput.trim()) return;

    setDictionaryLoading(true);
    setDictionaryError(null);
    setDictionaryResult(null);

    // Build the pageContext string from current note details
    let activePageText = "";
    if (noteData?.title) {
      activePageText += noteData.title + "\n";
    }
    if (fullLessonContent?.contentBlocks) {
      activePageText += fullLessonContent.contentBlocks
        .map((block: any) => `${block.heading ? block.heading + ": " : ""}${block.body || ""}`)
        .join("\n");
    }

    try {
      const response = await lookupWordAction({ 
        word: lookupWordInput.trim(), 
        pageContext: activePageText 
      });
      setDictionaryResult(response.result);
    } catch (err: any) {
      console.error(err);
      setDictionaryError(err.message || 'FAILED TO LOOK UP WORD.');
    } finally {
      setDictionaryLoading(false);
    }
  };

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
            : noteData?.staticLookupKey === 'dtp-basics'
              ? [
                { id: "dtp-definition", label: "I. What is DTP?" },
                { id: "dtp-importance", label: "II. DTP Importance" },
                { id: "dtp-templates", label: "III. Template Actions" },
                { id: "dtp-ribbons", label: "IV. Publisher Ribbons" },
                { id: "dtp-fitting", label: "V. Text Fitting & Typos" },
                { id: "dtp-interactive", label: "VI. Flyer Builder" }
              ]
              : noteData?.staticLookupKey === 'spreadsheet-formulas-basics'
                ? [
                  { id: "ssf-definition", label: "I. Formulas vs. Functions" },
                  { id: "ssf-functions", label: "II. Built-In Functions" },
                  { id: "ssf-references", label: "III. Cell References" },
                  { id: "ssf-percentages", label: "IV. Percentage Methods" },
                  { id: "ssf-financial", label: "V. Loan Interest Rates" },
                  { id: "ssf-interactive", label: "VI. Formulas Simulator" }
                ]
                : noteData?.staticLookupKey === 'search-engines-basics'
                  ? [
                    { id: "se-techniques", label: "I. Search Techniques" },
                    { id: "se-boolean", label: "II. Boolean Searching" },
                    { id: "se-enhancements", label: "III. Search Enhancements" },
                    { id: "se-engines", label: "IV. Popular Search Engines" },
                    { id: "se-matrix", label: "V. Search Comparison" },
                    { id: "se-interactive", label: "VI. Query Simulator" }
                  ]
                  : noteData?.staticLookupKey === 'ai-basics'
                    ? [
                      { id: "ai-ann", label: "I. Neural Networks" },
                      { id: "ai-intelligence", label: "II. Comparing Intelligence" },
                      { id: "ai-differences", label: "III. Human vs. AI" },
                      { id: "ai-strong-weak", label: "IV. Strong vs. Weak AI" },
                      { id: "ai-hologram", label: "V. Holograms & MR" },
                      { id: "ai-interactive", label: "VI. Neural Sandbox" }
                    ]
                    : noteData?.staticLookupKey === 'animal-production-basics'
                      ? [
                        { id: "ap-definition", label: "I. Feed Definitions" },
                        { id: "ap-feed-class", label: "II. Feed Classification" },
                        { id: "ap-nutrients", label: "III. Nutrient Components" },
                        { id: "ap-usefulness", label: "IV. Importance of Water" },
                        { id: "ap-proportions", label: "V. Ration Proportions" },
                        { id: "ap-interactive", label: "VI. Feed Calculator" }
                      ]
                      : noteData?.staticLookupKey === 'energy-conversion-basics'
                        ? [
                          { id: "ec-intro", label: "I. Energy Concepts" },
                          { id: "ec-classification", label: "II. Renewable vs. Non-Renewable" },
                          { id: "ec-specific", label: "III. Specific Sources" },
                          { id: "ec-challenges", label: "IV. Source Challenges" },
                          { id: "ec-heat-temp", label: "V. Heat vs. Temperature" },
                          { id: "ec-interactive", label: "VI. Grid Simulator" }
                        ]
                        : noteData?.staticLookupKey === 'farming-systems-basics'
                          ? [
                            { id: "fs-intro", label: "I. Farming Systems" },
                            { id: "fs-mixed-farming", label: "II. Mixed Farming" },
                            { id: "fs-mixed-cropping", label: "III. Mixed Cropping" },
                            { id: "fs-intercropping", label: "IV. Inter-Cropping" },
                            { id: "fs-rotation", label: "V. Crop Rotation" },
                            { id: "fs-sustainability", label: "VI. Sustainability & Interdependence" },
                            { id: "fs-interactive", label: "VII. Rotation Sandbox" }
                          ]
                          : contentBlocksToRender
                            ?.map((block: any, idx: number) => {
                              if (block.heading) {
                                return { id: `block-${idx}`, label: block.heading };
                              }
                              return null;
                            })
                            .filter((item: any): item is { id: string; label: string } => item !== null) || [];

  const typographyMap = {
    title: `${textSize * 2.5}px`,
    h2: `${textSize * 1.8}px`,
    h3: `${textSize * 1.4}px`,
    h4: `${textSize * 1.2}px`,
    body: `${textSize}px`,
    meta: `${textSize * 0.75}px`,
  };

  return (
    <div className="flex-1 flex overflow-hidden relative w-full h-full bg-white select-none">
      <style>{`
        .dynamic-text-container h1 { font-size: ${typographyMap.title} !important; }
        .dynamic-text-container h2 { font-size: ${typographyMap.h2} !important; }
        .dynamic-text-container h3 { font-size: ${typographyMap.h3} !important; }
        .dynamic-text-container h4 { font-size: ${typographyMap.h4} !important; }
        .dynamic-text-container p, 
        .dynamic-text-container li, 
        .dynamic-text-container td,
        .dynamic-text-container th,
        .dynamic-text-container label,
        .dynamic-text-container select,
        .dynamic-text-container option,
        .dynamic-text-container input,
        .dynamic-text-container textarea { font-size: ${typographyMap.body} !important; }
        .dynamic-text-container .text-xs, 
        .dynamic-text-container .font-mono:not(.text-lg) { font-size: ${typographyMap.meta} !important; }
      `}</style>
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

        {/* View Tabs Selector */}
        <div className="flex border-4 border-black bg-white mb-6 p-1.5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-2 font-mono font-bold text-xs uppercase rounded-none border-2 transition-all cursor-pointer text-center
              ${activeTab === 'text'
                ? 'bg-[#FFD833] text-black border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-black border-transparent hover:bg-gray-100'
              }
              active:translate-x-0.5 active:translate-y-0.5
            `}
          >
            DOCUMENT_TEXT
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-2 font-mono font-bold text-xs uppercase rounded-none border-2 transition-all cursor-pointer text-center
              ${activeTab === 'video'
                ? 'bg-[#FF007F] text-white border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-black border-transparent hover:bg-gray-100'
              }
              active:translate-x-0.5 active:translate-y-0.5
            `}
          >
            VIDEO_LESSON
          </button>
        </div>

        {/* Content Canvas */}
        {activeTab === 'text' ? (
          <div className="mt-4 md:mt-0 space-y-16 dynamic-text-container" style={{ fontSize: `${textSize}px` }}>
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
            ) : noteData.staticLookupKey === 'dtp-basics' ? (
              /* ==========================================
                 GORGEOUS INTERACTIVE DESKTOP PUBLISHING NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left animate-fadeIn" id="dtp-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_06 // DIGITAL DESIGN & PRINT
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    Desktop Publishing (DTP)
                  </h1>
                </div>

                {/* Section 1: What is DTP */}
                <div className="space-y-4" id="dtp-definition">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Terminal size={20} />
                    1. What is Desktop Publishing?
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Desktop publishing (DTP) software is designed specifically for creating visual communications—such as brochures, business cards, greeting cards, web pages, posters, and flyers—for professional or personal printing, online or on-screen.
                  </p>

                  <div className="border border-black p-4 bg-white mt-4 text-left">
                    <span className="font-mono text-[9px] font-bold text-gray-500 block mb-1">COMMON EXAMPLES OF DTP SOFTWARE //</span>
                    <p className="font-sans text-xs text-black">
                      Adobe InDesign, Adobe FrameMaker, Adobe PageMaker, CorelDraw, Corel Ventura, LibreOffice Draw, Microsoft Publisher, QuarkXPress, and Page Stream.
                    </p>
                  </div>
                </div>

                {/* Section 2: Importance of DTP */}
                <div className="space-y-4 pt-6" id="dtp-importance">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Cpu size={20} />
                    2. Importance of Desktop Publishing
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    DTP software replaces traditional physical paste-up methods and streamlines the layout design pipeline:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Professional Design</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Allows creating documents with high design sophistication by combining text, photos, and graphical borders.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Visual Appeal</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Provides robust controls over typography, colors, and graphics to instantly capture the reader's attention.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Efficiency & Styles</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Speeds up production using reusable master templates, master pages, and paragraph styles.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Cost-Effective</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Empowers small companies and individuals to create professional layouts without high agency expenses.</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Template & File Actions */}
                <div className="space-y-4 pt-6" id="dtp-templates">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    3. Template Creation & Document Saving
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    DTP software features pre-designed layout templates to optimize design workflow:
                  </p>

                  <div className="space-y-6">
                    <div className="border border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <h4 className="font-serif text-lg font-black text-black uppercase mb-3">Creating from Template</h4>
                      <ol className="list-decimal list-inside text-xs text-black font-semibold space-y-1.5">
                        <li>Navigate to the **File tab** and select **New** to open the Backstage View.</li>
                        <li>Select the desired **Publication Type** (e.g., Flyers, Brochures).</li>
                        <li>Choose a template category (such as Microsoft Built-in designs).</li>
                        <li>Use the preview pane to customize colors, fonts, or company details.</li>
                        <li>Click **Create** to initialize the workspace.</li>
                      </ol>
                    </div>

                    <div className="border-4 border-black p-6 bg-[#38BDF8] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                      <h4 className="font-serif text-lg font-black text-black uppercase mb-2">Save vs. Save As</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                        <div>
                          <strong>Save:</strong>
                          <p className="mt-1 text-black/80">Updates and overwrites the active content of an existing, previously saved file on your disk.</p>
                        </div>
                        <div>
                          <strong>Save As:</strong>
                          <p className="mt-1 text-black/80">Creates a new instance of the file under a new name, in a new location, or inside a new directory folder.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Publisher Ribbons & Tabs */}
                <div className="space-y-4 pt-6" id="dtp-ribbons">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <BrainCircuit size={20} />
                    4. Publisher Ribbons & Layout Setup
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Publisher consolidates commands inside context-specific ribbons to simplify editing:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="border-2 border-black p-5 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-3">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">RIBON & TABS DIRECTORY</h4>
                      <ul className="space-y-1 text-xs font-semibold text-gray-700">
                        <li><strong>Home:</strong> Text styles, font sizing, alignments, and drawing boxes.</li>
                        <li><strong>Insert:</strong> Content items (pictures, placeholders, tables, shapes, headers).</li>
                        <li><strong>Page Design:</strong> Page setup (orientation, margins, and global color/font schemes).</li>
                        <li><strong>Review:</strong> Proofing, spelling audits, thesaurus, and translations.</li>
                        <li><strong>View:</strong> Navigation guides, page view styles (1-page or 2-page spreads), rulers.</li>
                      </ul>
                    </div>

                    <div className="border-2 border-black p-5 bg-[#FFD833] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-3">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">PAGE SETUP & MARGINS</h4>
                      <div className="space-y-2 text-xs text-black font-semibold">
                        <div>
                          <strong>Orientation:</strong>
                          <p className="text-black/80">Page Design &rarr; Orientation. Toggle between Portrait (taller than wide) and Landscape (wider than tall).</p>
                        </div>
                        <div>
                          <strong>Margins (Global):</strong>
                          <p className="text-black/80">Page Design &rarr; Margins. Choose presets like Wide, Moderate, Narrow, or None.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5: Text Fitting & Typography */}
                <div className="space-y-4 pt-6" id="dtp-fitting">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <ListOrdered size={20} />
                    5. Text Fitting, Linking & Typography
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Publications require fluid layout adjustments to prevent text cut-off, and embellishments to increase readability:
                  </p>

                  <div className="space-y-4 text-left">
                    <div className="border border-black p-4 bg-white">
                      <strong>Text Box Linking (Flow Control):</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">
                        Connect multiple text frames to handle text overflow automatically. Select the first text box &rarr; click <strong>Format tab</strong> &rarr; click <strong>Create Link</strong> &rarr; click on the secondary box.
                      </p>
                    </div>

                    <div className="border-2 border-black p-4 bg-[#F3F4F6]">
                      <h4 className="font-mono text-xs font-black text-black">TEXT FIT OPTIONS</h4>
                      <ul className="list-disc list-inside text-xs text-gray-700 mt-2 space-y-1 font-semibold">
                        <li><strong>Best Fit:</strong> Adjusts font size up or down to fill the box layout perfectly.</li>
                        <li><strong>Shrink Text on Overflow:</strong> Lowers the font size only if text spills over boundaries.</li>
                        <li><strong>Grow Text Box to Fit:</strong> Automatically expands the text box size (default).</li>
                        <li><strong>Do not Autofit:</strong> Applies no font or box resizing.</li>
                      </ul>
                    </div>

                    <div className="border border-black p-4 bg-white">
                      <strong>Typography Embellishments (Format Tab &rarr; Typography):</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">
                        Enhance textual style with advanced decorations: <strong>Drop Cap</strong> (enlarge first letter), <strong>Ligatures</strong> (fuse letter combinations), <strong>Swash</strong> (embellish capital letters), and <strong>Stylistic Alternates</strong> (alternate lowercase designs).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 6: Interactive Flyer Builder */}
                <div className="space-y-6 pt-6 text-left" id="dtp-interactive">
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                        <BrainCircuit size={22} />
                        6. Interactive Flyer / Publication Builder
                      </h2>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                        Interactive Publisher Simulator - Customize and compile your publication layout
                      </p>
                    </div>

                    {/* Simulation Parameters Deck */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                      {/* Page Setup */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">PAGE SETUP & SCHEME</span>

                        <div className="space-y-1">
                          <label className="font-bold block">Publication Type:</label>
                          <select
                            value={dtpTemplate}
                            onChange={(e) => { setDtpTemplate(e.target.value); setDtpStatus('IDLE'); setDtpReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="flyer">Event Flyer (8.5" x 11")</option>
                            <option value="brochure">Tri-fold Brochure (11" x 8.5")</option>
                            <option value="business_card">Business Card (3.5" x 2.0")</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Orientation:</label>
                          <select
                            value={dtpOrientation}
                            onChange={(e) => { setDtpOrientation(e.target.value); setDtpStatus('IDLE'); setDtpReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="Portrait">Portrait (Taller than wide)</option>
                            <option value="Landscape">Landscape (Wider than tall)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Margins:</label>
                          <select
                            value={dtpMargins}
                            onChange={(e) => { setDtpMargins(e.target.value); setDtpStatus('IDLE'); setDtpReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="Narrow">Narrow (0.25 in)</option>
                            <option value="Moderate">Moderate (0.5 in)</option>
                            <option value="Wide">Wide (1.0 in)</option>
                            <option value="None">None (0.0 in)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Color Theme:</label>
                          <select
                            value={dtpColorTheme}
                            onChange={(e) => { setDtpColorTheme(e.target.value); setDtpStatus('IDLE'); setDtpReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="modern">Modern Cyberpunk (Yellow/Teal)</option>
                            <option value="vintage">Vintage Retro (Peach/Orange)</option>
                            <option value="warm">Warm Editorial (Emerald/Cream)</option>
                          </select>
                        </div>
                      </div>

                      {/* Content & Typography */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">CONTENT & TYPOGRAPHY OPTIONS</span>

                        <div className="space-y-1">
                          <label className="font-bold block">Text Autofit Mode:</label>
                          <select
                            value={dtpTextFit}
                            onChange={(e) => { setDtpTextFit(e.target.value); setDtpStatus('IDLE'); setDtpReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="Best Fit">Best Fit (Auto adjust font)</option>
                            <option value="Shrink on Overflow">Shrink Text on Overflow</option>
                            <option value="Grow Box to Fit">Grow Text Box to Fit</option>
                            <option value="Do not Autofit">Do not Autofit (Risk overflow)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Illustration Tool:</label>
                          <select
                            value={dtpPictureOption}
                            onChange={(e) => { setDtpPictureOption(e.target.value); setDtpStatus('IDLE'); setDtpReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="picture">Insert Picture (Computer)</option>
                            <option value="placeholder">Picture Placeholder</option>
                            <option value="none">No Pictures</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-2 pt-1 font-bold">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={dtpDropCap}
                              onChange={(e) => { setDtpDropCap(e.target.checked); setDtpStatus('IDLE'); setDtpReport(null); }}
                              className="accent-black border-2 border-black rounded-none cursor-pointer"
                            />
                            Drop Cap (Enlarge first letter)
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={dtpLigatures}
                              onChange={(e) => { setDtpLigatures(e.target.checked); setDtpStatus('IDLE'); setDtpReport(null); }}
                              className="accent-black border-2 border-black rounded-none cursor-pointer"
                            />
                            Standard Ligatures (Fuses readable chars)
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={dtpSwash}
                              onChange={(e) => { setDtpSwash(e.target.checked); setDtpStatus('IDLE'); setDtpReport(null); }}
                              className="accent-black border-2 border-black rounded-none cursor-pointer"
                            />
                            Swash (Decorated capital letters)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Button trigger */}
                    <div className="flex justify-center">
                      <button
                        onClick={runDtpEvaluation}
                        disabled={dtpStatus === 'COMPUTING'}
                        className="px-6 py-3 font-mono text-sm font-black uppercase border-4 border-black bg-[#FFD833] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer disabled:opacity-50"
                      >
                        {dtpStatus === 'COMPUTING' ? 'COMPILING & RENDERING LAYOUT...' : 'COMPILE & RENDER PUBLICATION'}
                      </button>
                    </div>

                    {/* Simulation Output Display */}
                    {dtpStatus === 'SUCCESS' && dtpReport && (
                      <div className="border-4 border-black p-6 bg-[#F3F4F6] transition-all animate-fadeIn">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black pb-3 mb-4">
                          <h4 className="font-serif text-xl font-black uppercase text-black">RENDER PREVIEW</h4>
                          <div className="flex items-center gap-2 font-mono text-xs font-bold text-black">
                            <span>DESIGN SCORE:</span>
                            <span className="bg-black text-white px-2 py-0.5 font-mono text-sm font-black border border-black shadow-[1px_1px_0_0_rgba(255,255,255,1)]">
                              {dtpReport.designScore}/100
                            </span>
                          </div>
                        </div>

                        {/* Interactive Visual Canvas Mockup */}
                        <div className="flex justify-center py-4 bg-gray-200 border-2 border-dashed border-black mb-4">
                          <div
                            className={`border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-4 transition-all flex flex-col justify-between
                              ${dtpOrientation === 'Portrait' ? 'w-48 h-64' : 'w-64 h-48'}
                            `}
                            style={{
                              backgroundColor: dtpColorTheme === 'modern' ? '#FFF' : dtpColorTheme === 'vintage' ? '#FFF3C4' : '#F4EFE6',
                              borderColor: 'black'
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <span className="font-mono text-[6px] text-gray-500 uppercase tracking-widest">
                                DTP_RENDER // {dtpTemplate.toUpperCase()}
                              </span>
                              <span className="font-mono text-[6px] text-gray-400">
                                {dtpOrientation.toUpperCase()}
                              </span>
                            </div>

                            <div className="flex-1 my-2 flex flex-col gap-2 relative">
                              {/* Heading with drop cap */}
                              <div className="flex gap-1 items-start">
                                {dtpDropCap && (
                                  <span className="text-xl md:text-2xl font-serif font-black leading-none bg-black text-white px-1">
                                    A
                                  </span>
                                )}
                                <div className="flex-1 flex flex-col gap-1">
                                  <div className="h-2 bg-black w-3/4"></div>
                                  <div className="h-1 bg-black/60 w-full"></div>
                                </div>
                              </div>

                              {/* Picture Element */}
                              {dtpPictureOption === 'picture' && (
                                <div className="h-12 border-2 border-black bg-[#38BDF8] flex items-center justify-center relative overflow-hidden">
                                  <div className="w-4 h-4 rounded-full bg-[#FFD833] border border-black absolute -top-1 -right-1"></div>
                                  <span className="font-serif italic text-[8px] font-black text-black">IMAGE_OBJECT</span>
                                </div>
                              )}
                              {dtpPictureOption === 'placeholder' && (
                                <div className="h-12 border-2 border-dashed border-black bg-white flex items-center justify-center">
                                  <span className="font-mono text-[7px] text-gray-400">[ PICTURE_PLACEHOLDER ]</span>
                                </div>
                              )}

                              {/* Text Block */}
                              <div className="space-y-1">
                                <div className="h-1 bg-gray-400 w-full"></div>
                                <div className="h-1 bg-gray-400 w-11/12"></div>
                                <div className="h-1 bg-gray-400 w-4/5"></div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-black/10">
                              <span className="font-mono text-[5px] text-gray-400">MARGINS: {dtpMargins.toUpperCase()}</span>
                              <span className="font-serif italic text-[6px] font-bold text-black">{dtpSwash ? "✨ swash" : "gabriola"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="inline-block bg-black text-white px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                            RATING: {dtpReport.efficiencyRating}
                          </div>
                          <pre className="font-mono text-xs text-black leading-relaxed whitespace-pre-wrap font-bold bg-white p-4 border border-black/20">
                            {dtpReport.feedback}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ) : noteData.staticLookupKey === 'spreadsheet-formulas-basics' ? (
              /* ==========================================
                 GORGEOUS INTERACTIVE SPREADSHEET FORMULAS NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left animate-fadeIn" id="spreadsheet-formulas-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_07 // DATA MODELING & ANALYSIS
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    Formulas & Functions
                  </h1>
                </div>

                {/* Section 1: Formulas vs. Functions */}
                <div className="space-y-4" id="ssf-definition">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Terminal size={20} />
                    1. Formulas vs. Built-In Functions
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Although used interchangeably, formulas and functions represent distinct statement types inside spreadsheet engines:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="border-4 border-black p-6 bg-[#38BDF8] shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none text-left">
                      <span className="font-mono text-[10px] font-black text-black block mb-2">FORMULA (USER-DEFINED)</span>
                      <p className="font-sans text-sm text-black leading-relaxed">
                        A math equation written manually to compute values (e.g. <code>=A1+A2+A3</code>) using basic arithmetic operators like <strong>+</strong>, <strong>-</strong>, <strong>*</strong>, or <strong>/</strong>.
                      </p>
                    </div>
                    <div className="border-4 border-black p-6 bg-[#FFD833] shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none text-left">
                      <span className="font-mono text-[10px] font-black text-black block mb-2">FUNCTION (PREDEFINED)</span>
                      <p className="font-sans text-sm text-black leading-relaxed">
                        A pre-packaged, built-in formula already programmed inside the application (e.g. <code>=AVERAGE()</code> or <code>=SUM()</code>).
                      </p>
                    </div>
                  </div>

                  <div className="border border-black p-4 bg-white mt-4 text-left">
                    <span className="font-mono text-[9px] font-bold text-gray-500 block mb-1">SYNTAX RULE //</span>
                    <p className="font-sans text-xs text-black leading-relaxed">
                      A function must always start with an equal sign (<strong>=</strong>), followed by the specific function name, and arguments inside parentheses. Commas (<strong>,</strong>) separate independent inputs.
                    </p>
                  </div>
                </div>

                {/* Section 2: Built-In Functions */}
                <div className="space-y-4 pt-6" id="ssf-functions">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Cpu size={20} />
                    2. Common Built-In Functions
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Spreadsheet tools supply dedicated functions to calculate datasets:
                  </p>

                  <div className="space-y-3 font-semibold text-xs text-black leading-relaxed">
                    <div className="border border-black p-4 bg-white">
                      <strong>SUM & AVERAGE:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">SUM totals values in cell ranges. AVERAGE sums the range and divides it by the total count to return the arithmetic mean.</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <strong>COUNT & COUNTA:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">COUNT tallies cells containing numerical data. COUNTA tallies all non-blank cells (including empty strings).</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <strong>COUNTIF:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Counts cells in a range matching a logical criterion (e.g., <code>=COUNTIF(C5:C14, "&gt;1500")</code>).</p>
                    </div>
                    <div className="border border-black p-4 bg-white">
                      <strong>MAX & MIN:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Return the maximum and minimum values respectively within a specified range.</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Cell & Range References */}
                <div className="space-y-4 pt-6" id="ssf-references">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    3. Cell & Range References
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Referencing coordinates allows formulas to fetch values dynamically from other areas of the grid:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Cell Reference</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Combination of column letter and row number (e.g., cell B2).</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Range Reference</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">A block of cells marked with a colon between start/end points (e.g., A1:C2 containing 6 cells).</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Absolute Reference</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Uses dollar signs (e.g., <code>=$E$1</code>) to lock a coordinate constant when the formula is copied.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Fill Handle replication</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Drag the black cross in the bottom-right corner of a selected cell to copy formulas instantly.</p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Percentage Calculations */}
                <div className="space-y-4 pt-6" id="ssf-percentages">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <BrainCircuit size={20} />
                    4. Percentage Calculations
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Excel treats percentages as decimals (e.g., 0.3 equals 30%). Here are the key percentage calculations:
                  </p>

                  <div className="border-4 border-black p-6 bg-[#C4B5FD] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                    <h4 className="font-serif text-lg font-black text-black uppercase mb-3">Percentage Formulas</h4>
                    <ul className="space-y-2 text-xs text-black font-semibold leading-relaxed">
                      <li><strong>Find Percentage Form:</strong> <code>=(Value / Total) * 100</code>.</li>
                      <li><strong>Direct % of a Number:</strong> Multiply coordinates by the percentage sign directly (e.g., <code>=A2 * 20%</code>).</li>
                      <li><strong>Percentage Increase:</strong> Multiply base values by 1 + percentage (e.g., <code>=B14 * 1.07</code> for a 7% increase).</li>
                      <li><strong>Percentage Decrease:</strong> Multiply base values by 1 - percentage (e.g., <code>=B14 * 0.93</code> for a 7% decrease).</li>
                      <li><strong>Percentage Difference:</strong> <code>=((Current_Value - Past_Value) / Past_Value) * 100</code>.</li>
                    </ul>
                  </div>
                </div>

                {/* Section 5: Loan Interest Rates */}
                <div className="space-y-4 pt-6" id="ssf-financial">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <ListOrdered size={20} />
                    5. Loan Interest Rates (RATE Function)
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    The financial function <code>=RATE(nper, pmt, pv)</code> calculates interest rates based on constant periodic payments:
                  </p>

                  <div className="border border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left font-mono text-xs space-y-2">
                    <div className="font-bold text-gray-500 uppercase">RATE PARAMETERS //</div>
                    <ul className="list-disc list-inside space-y-1.5 font-bold text-black">
                      <li><strong>nper:</strong> Total number of payment periods for the loan.</li>
                      <li><strong>pmt:</strong> The constant payment made each period (entered as a negative number).</li>
                      <li><strong>pv:</strong> Present value or total loan principal amount.</li>
                      <li><strong>Tip:</strong> If periods are given in years, multiply the nper argument by 12 (e.g., <code>=RATE(C2*12, C3, C4)</code>) to calculate the monthly rate. Multiply the final rate result by 12 for the annual interest rate.</li>
                    </ul>
                  </div>
                </div>

                {/* Section 6: Interactive Formulas Simulator */}
                <div className="space-y-6 pt-6 text-left" id="ssf-interactive">
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                        <BrainCircuit size={22} />
                        6. Formulas & Function Evaluation Sandbox
                      </h2>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                        Interactive sandbox. Write a formula to calculate values, or trigger errors like #NAME?, #DIV/0!, #REF!, #NULL!, or #VALUE! to learn how to fix them.
                      </p>
                    </div>

                    {/* Quick exercises */}
                    <div className="flex flex-wrap gap-2 border-b-2 border-black pb-4">
                      {[
                        { label: 'Calculate SUM', formula: '=SUM(B2:B3)' },
                        { label: 'Calculate AVERAGE', formula: '=AVERAGE(B2:B3)' },
                        { label: 'Loan RATE', formula: '=RATE(36, -300, 10000)' },
                        { label: 'Trigger #NAME?', formula: '=SU(B2:B3)' },
                        { label: 'Trigger #DIV/0!', formula: '=B2/0' },
                        { label: 'Trigger #VALUE!', formula: '=B2+"TEXT"' },
                        { label: 'Trigger #REF!', formula: '=D4+E5' }
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => { setSsfFormulaInput(item.formula); setSsfStatus('IDLE'); setSsfResult(null); }}
                          className="px-2 py-1 font-mono text-[9px] font-bold uppercase border border-black bg-white text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Formula bar input */}
                    <div className="border-2 border-black p-2 bg-[#F3F4F6] flex items-center gap-2 font-mono text-xs">
                      <span className="font-serif italic font-bold text-gray-500 px-1">fx</span>
                      <input
                        type="text"
                        value={ssfFormulaInput}
                        onChange={(e) => { setSsfFormulaInput(e.target.value); setSsfStatus('IDLE'); setSsfResult(null); }}
                        placeholder="Write formula (e.g. =SUM(B2:B3) or =B2/0)"
                        className="flex-1 bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none focus:bg-[#FFF3C4]"
                      />
                    </div>

                    {/* Table values */}
                    <div className="border border-black p-4 bg-white text-xs font-mono">
                      <span className="font-bold text-gray-500 uppercase block mb-2">SANDBOX COORDINATES CELL VALUES</span>
                      <div className="grid grid-cols-2 gap-4">
                        <div><strong>Cell B2:</strong> <span className="bg-gray-100 px-1 border">85</span> (Score)</div>
                        <div><strong>Cell B3:</strong> <span className="bg-gray-100 px-1 border">90</span> (Score)</div>
                      </div>
                    </div>

                    {/* Run evaluation */}
                    <div className="flex justify-center">
                      <button
                        onClick={runSsfEvaluation}
                        disabled={ssfStatus === 'COMPUTING'}
                        className="px-6 py-3 font-mono text-sm font-black uppercase border-4 border-black bg-[#FFD833] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer disabled:opacity-50"
                      >
                        {ssfStatus === 'COMPUTING' ? 'COMPILING FORMULA VECTOR...' : 'EVALUATE FORMULA'}
                      </button>
                    </div>

                    {/* Output report */}
                    {ssfStatus === 'SUCCESS' && ssfResult && (
                      <div
                        className="border-4 border-black p-6 transition-all animate-fadeIn"
                        style={{ backgroundColor: ssfResult.isError ? '#FCA5A5' : '#A7F3D0' }}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black pb-3 mb-4">
                          <h4 className="font-serif text-xl font-black uppercase text-black">SANDBOX OUTPUT</h4>
                          <div className="flex items-center gap-2 font-mono text-xs font-bold text-black">
                            <span>RESULT:</span>
                            <span className="bg-black text-white px-2 py-0.5 font-mono text-sm font-black border border-black shadow-[1px_1px_0_0_rgba(255,255,255,1)]">
                              {ssfResult.value}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="inline-block bg-black text-white px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                            {ssfResult.isError ? 'ERROR ENCOUNTERED' : 'CALCULATION SUCCESS'}
                          </div>
                          <p className="font-sans text-sm text-black leading-relaxed font-bold">{ssfResult.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ) : noteData.staticLookupKey === 'search-engines-basics' ? (
              /* ==========================================
                 GORGEOUS INTERACTIVE SEARCH ENGINES NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left animate-fadeIn" id="search-engines-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_08 // WEB SEARCH & RETRIEVAL
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    Search Engines & Boolean Logic
                  </h1>
                </div>

                {/* Section 1: Effective Search Techniques */}
                <div className="space-y-4" id="se-techniques">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Terminal size={20} />
                    1. Keyword Searching & Strategies
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    When querying database systems or web sites, using deliberate searching tactics speeds up locating high-value information and discards unrelated noise.
                  </p>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    <strong>Keyword Searching:</strong> The most basic strategy. Users enter relevant words or phrases using natural language. The database engine parses all coordinates (such as document metadata, titles, or body contents) to return matches.
                  </p>
                </div>

                {/* Section 2: Boolean Searching */}
                <div className="space-y-4 pt-6" id="se-boolean">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Cpu size={20} />
                    2. Boolean Search Operators
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Boolean search is a logic-based strategy that utilizes operators (which must be <strong>CAPITALIZED</strong>) to refine search queries:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="border-4 border-black p-5 bg-[#38BDF8] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-xs font-black uppercase text-black block mb-2">AND</strong>
                      <p className="font-sans text-xs text-black/90">Narrows search results. Both terms connected by AND must appear in the source. (e.g. <code>gender AND Shakespeare</code>).</p>
                    </div>
                    <div className="border-4 border-black p-5 bg-[#FFD833] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-xs font-black uppercase text-black block mb-2">OR</strong>
                      <p className="font-sans text-xs text-black/90">Broadens search results. Finds synonyms or related topics where either word is present. (e.g. <code>car OR automobile</code>).</p>
                    </div>
                    <div className="border-4 border-black p-5 bg-[#A7F3D0] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-xs font-black uppercase text-black block mb-2">NOT</strong>
                      <p className="font-sans text-xs text-black/90">Excludes specified words or concepts from the search outputs. (e.g. <code>"video games" NOT teenagers</code>).</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Other Search Enhancements */}
                <div className="space-y-4 pt-6" id="se-enhancements">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    3. Other Search Enhancements
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Modern engines support advanced tools to lock down relevance and trace resources:
                  </p>

                  <div className="space-y-3 font-semibold text-xs text-black leading-relaxed">
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Phrase Searching (Quotation Marks):</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Surrounding terms in quotes (e.g., <code>"corporate social responsibility"</code>) forces the engine to locate matches with the exact word order.</p>
                    </div>
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Limiters / Filters:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">UI filters that restrict output results based on specific fields (e.g. Publication date, document type, language, or Full Text available).</p>
                    </div>
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Works Cited Lists / Reference Tracking:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Iterating through the bibliographies of verified papers to discover connected source material.</p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Understanding and Comparing Search Engines */}
                <div className="space-y-4 pt-6" id="se-engines">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <BrainCircuit size={20} />
                    4. Popular Search Engines
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    A search engine indexes the Web using automated spiders. Here are the core profiles of major search engines:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Google & Bing</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Largest engines globally. Collect extensively logged profile data to personalize query responses and target advertisements.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">DuckDuckGo & Brave Search</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Privacy-first. Do not store search history or profile users. Brave Search builds its own independent indexing crawler.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Ask.com</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Uses the 'ExpertRank' algorithm to order response sites by topic-specific community expertise rather than raw popularity.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-[10px] text-black block uppercase">Regional Giants</strong>
                      <p className="font-sans text-xs text-gray-700 mt-1">Yandex leads in Russia/Cyrillic areas. Baidu dominates in China with more than 600 million users.</p>
                    </div>
                  </div>
                </div>

                {/* Section 5: Comparison Matrix */}
                <div className="space-y-4 pt-6" id="se-matrix">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <ListOrdered size={20} />
                    5. Comparison Matrix at a Glance
                  </h2>

                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="bg-black text-white">
                          <th className="p-3 border border-black uppercase font-bold">Feature</th>
                          <th className="p-3 border border-black uppercase font-bold">Google / Bing</th>
                          <th className="p-3 border border-black uppercase font-bold">Yahoo</th>
                          <th className="p-3 border border-black uppercase font-bold">DuckDuckGo</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-black font-semibold">
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Results</td>
                          <td className="p-3 border border-black">Most accurate, AI-driven, personalized.</td>
                          <td className="p-3 border border-black">Powered by Bing; portal layout.</td>
                          <td className="p-3 border border-black">Relevant but less personalized.</td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Privacy</td>
                          <td className="p-3 border border-black text-red-600">Collects extensive query data.</td>
                          <td className="p-3 border border-black">Tracks info for services.</td>
                          <td className="p-3 border border-black text-green-600">Zero history logs or tracking.</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-black bg-gray-50 font-bold">Style</td>
                          <td className="p-3 border border-black">Clean, minimal interface.</td>
                          <td className="p-3 border border-black">Media-rich web portal.</td>
                          <td className="p-3 border border-black">Simple, clean layout.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 6: Interactive Search Queries Simulator */}
                <div className="space-y-6 pt-6 text-left" id="se-interactive">
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                        <BrainCircuit size={22} />
                        6. Boolean Query & Indexing Simulator
                      </h2>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                        Choose your search engine profile and write/run Boolean logic strings to match document index parameters
                      </p>
                    </div>

                    {/* Simulation Parameters Deck */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                      {/* Engine Profiles */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">ENGINE PROFILE CONFIGURATION</span>

                        <div className="space-y-1">
                          <label className="font-bold block">Search Engine:</label>
                          <select
                            value={seEngineSelect}
                            onChange={(e) => { setSeEngineSelect(e.target.value); setSeStatus('IDLE'); setSeResult(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="google">Google / Bing (Personalized & Ad Profiled)</option>
                            <option value="duckduckgo">DuckDuckGo / Brave (Privacy-First & Blocked Trackers)</option>
                          </select>
                        </div>

                        <div className="border border-black p-3 bg-white space-y-1 font-sans text-xs text-left">
                          <strong>Engine Details:</strong>
                          <p className="text-gray-600">
                            {seEngineSelect === 'google'
                              ? 'Google tracks query strings and links them to personal metrics to build interest tags.'
                              : 'DuckDuckGo enforces a localized session with zero tracking cookies and blocks hidden tracking agents.'}
                          </p>
                        </div>
                      </div>

                      {/* Query Editor */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">BOOLEAN QUERY COMPOSER</span>

                        <div className="space-y-2">
                          <label className="font-bold block">Quick Presets:</label>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              { label: 'AND Narrows', query: 'gender AND Shakespeare' },
                              { label: 'OR Broadens', query: 'car OR automobile' },
                              { label: 'NOT Excludes', query: '"video games" NOT teenagers' },
                              { label: 'Complex Combination', query: '"animal cloning" AND jellyfish NOT sheep' }
                            ].map((item) => (
                              <button
                                key={item.label}
                                onClick={() => { setSeQueryInput(item.query); setSeStatus('IDLE'); setSeResult(null); }}
                                className="px-2 py-0.5 border border-black bg-white font-bold uppercase text-[9px] hover:bg-black hover:text-white transition-colors cursor-pointer"
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Search Box:</label>
                          <input
                            type="text"
                            value={seQueryInput}
                            onChange={(e) => { setSeQueryInput(e.target.value); setSeStatus('IDLE'); setSeResult(null); }}
                            placeholder="Enter keywords or Boolean logic (AND, OR, NOT)"
                            className="w-full bg-white border border-black p-1 text-black font-bold focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Button trigger */}
                    <div className="flex justify-center">
                      <button
                        onClick={runSeEvaluation}
                        disabled={seStatus === 'COMPUTING'}
                        className="px-6 py-3 font-mono text-sm font-black uppercase border-4 border-black bg-[#FFD833] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer disabled:opacity-50"
                      >
                        {seStatus === 'COMPUTING' ? 'COMPILING INDEX VECTOR...' : 'EXECUTE SEARCH'}
                      </button>
                    </div>

                    {/* Simulation Output Display */}
                    {seStatus === 'SUCCESS' && seResult && (
                      <div className="border-4 border-black p-6 bg-[#F3F4F6] space-y-4 transition-all animate-fadeIn text-left">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black pb-3">
                          <h4 className="font-serif text-xl font-black uppercase text-black">SEARCH RESULTS</h4>
                          <div className="flex items-center gap-4 font-mono text-xs font-bold text-black">
                            <span>RELEVANCE: {seResult.relevanceScore}%</span>
                            <span>TRACKERS BLOCKED: {seResult.trackersBlocked}</span>
                          </div>
                        </div>

                        {/* Matching Documents List */}
                        <div className="space-y-3">
                          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">INDEXED DOCUMENTS FOUND ({seResult.matches.length}):</span>
                          {seResult.matches.length > 0 ? (
                            <div className="space-y-2">
                              {seResult.matches.map((match, idx) => (
                                <div key={idx} className="border-2 border-black p-3 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                                  <a href={match.url} target="_blank" rel="noopener noreferrer" className="font-serif text-sm font-bold text-blue-600 hover:underline block">
                                    {match.title}
                                  </a>
                                  <span className="font-mono text-[8px] text-gray-400 block">{match.url}</span>
                                  <p className="font-sans text-xs text-gray-600 mt-1">{match.desc}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="border border-black p-4 bg-white text-center italic text-xs text-gray-500">
                              No matching document indexes found. Ensure Boolean operators (AND, OR, NOT) are CAPITALIZED and terms exist in the metadata corpus.
                            </div>
                          )}
                        </div>

                        {/* Privacy Report */}
                        <div className="border-2 border-black p-4 bg-white space-y-3 text-left">
                          <span className="font-mono text-[9px] font-bold text-black uppercase block border-b border-black/10 pb-1">PRIVACY & SESSION INTEGRITY AUDIT</span>
                          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                            <div>
                              <strong>Profiled Interest:</strong>
                              <span className="block text-blue-600 font-bold uppercase mt-0.5">{seResult.profiledInterest}</span>
                            </div>
                            <div>
                              <strong>Session History:</strong>
                              <span className="block text-gray-700 font-bold uppercase mt-0.5">
                                {seEngineSelect === 'google' ? 'Logged to Cloud' : 'Cleared on Close'}
                              </span>
                            </div>
                          </div>
                          <pre className="font-mono text-xs text-black leading-relaxed whitespace-pre-wrap font-bold bg-[#F3F4F6] p-3 border border-black/10">
                            {seResult.privacyReport}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ) : noteData.staticLookupKey === 'ai-basics' ? (
              /* ==========================================
                 GORGEOUS INTERACTIVE ARTIFICIAL INTELLIGENCE NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left animate-fadeIn" id="ai-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_09 // COGNITIVE SYSTEMS & PROJECTIONS
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    Artificial Intelligence
                  </h1>
                </div>

                {/* Section 1: ANN */}
                <div className="space-y-4" id="ai-ann">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Terminal size={20} />
                    1. Artificial Neural Networks (ANN)
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    An Artificial Neural Network (neural network) is a computational model designed to mimic the way biological nerve cells function in the human brain.
                  </p>

                  <div className="border border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left space-y-3">
                    <h4 className="font-serif text-lg font-black uppercase text-black">Network Structural Layers</h4>
                    <ul className="space-y-2 text-xs font-semibold text-gray-700">
                      <li><strong>Input Layer:</strong> Receives raw datasets or pixels from external systems for the network to analyze or learn from.</li>
                      <li><strong>Hidden Layer(s):</strong> One or multiple internal processing layers that multiply inputs by mathematical weights to transform data into outputs.</li>
                      <li><strong>Output Layer:</strong> Delivers the final prediction vector or classification response.</li>
                    </ul>
                  </div>
                </div>

                {/* Section 2: Comparing Types of Intelligence */}
                <div className="space-y-4 pt-6" id="ai-intelligence">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Cpu size={20} />
                    2. Comparing Human, Animal, and Machine Intelligence
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    The cognitive sciences differentiate capabilities based on how beings and models process environments:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="border-2 border-black p-4 bg-[#38BDF8] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-xs font-black uppercase text-black block mb-2">Human</strong>
                      <p className="font-sans text-xs text-black/90">Scholarly ability to think, reason, solve numerical equations, adapt instantly, and perceive emotional/social cues.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#FFD833] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-xs font-black uppercase text-black block mb-2">Animal</strong>
                      <p className="font-sans text-xs text-black/90">Natural skills and instincts that allow living organisms to survive and adapt to specific habitats.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#A7F3D0] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-xs font-black uppercase text-black block mb-2">Artificial</strong>
                      <p className="font-sans text-xs text-black/90">Technology built to mock human cognitive processing by evaluating digital datasets.</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Human vs AI */}
                <div className="space-y-4 pt-6" id="ai-differences">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    3. Key Differences: Human vs. AI
                  </h2>

                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="bg-black text-white">
                          <th className="p-3 border border-black uppercase font-bold">Feature</th>
                          <th className="p-3 border border-black uppercase font-bold">Human Intelligence</th>
                          <th className="p-3 border border-black uppercase font-bold">Artificial Intelligence (AI)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-black font-semibold">
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Learning</td>
                          <td className="p-3 border border-black">Learns naturally from past mistakes.</td>
                          <td className="p-3 border border-black text-red-600">Learns strictly from training data.</td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Energy</td>
                          <td className="p-3 border border-black text-green-600">Highly efficient (runs on ~25W).</td>
                          <td className="p-3 border border-black text-red-600">Less efficient (modern systems run on ~2W).</td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Speed & Volume</td>
                          <td className="p-3 border border-black">Limited processing speed.</td>
                          <td className="p-3 border border-black text-green-600">Processes massive data volumes instantly.</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-black bg-gray-50 font-bold">Emotion</td>
                          <td className="p-3 border border-black text-green-600">Excellent self-awareness & empathy.</td>
                          <td className="p-3 border border-black">No emotional understanding or awareness.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: Strong AI vs Weak AI */}
                <div className="space-y-4 pt-6" id="ai-strong-weak">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <BrainCircuit size={20} />
                    4. Strong AI vs. Weak AI
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Computer science classifies AI models into two theoretical frameworks:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="border border-black p-5 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">STRONG ARTIFICIAL INTELLIGENCE</h4>
                      <p className="font-sans text-xs text-gray-700 leading-relaxed">
                        Theoretical form of machine intelligence where a system achieves true consciousness equal to humans. It can think freely, solve diverse problems, and adapt to different environmental changes. <em>(No current real-world examples exist).</em>
                      </p>
                    </div>
                    <div className="border border-black p-5 bg-[#FFD833] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">WEAK ARTIFICIAL INTELLIGENCE</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        Narrow AI with limited functionalities built to accomplish specific, pre-programmed tasks. They do not possess consciousness or self-awareness. Examples include automated quiz graders, smart assistant tools, and search engines.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 5: Holographic Tech & MR */}
                <div className="space-y-4 pt-6" id="ai-hologram">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <ListOrdered size={20} />
                    5. Holographic Technology & Mixed Reality (MR)
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Visual interfaces merge real environments with digital objects to allow interaction:
                  </p>

                  <div className="space-y-3 font-semibold text-xs text-black leading-relaxed">
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Hologram:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">A three-dimensional (3D) image created using laser light interference patterns. Unlike 2D layouts, holograms show depth, allowing viewers to see different angles.</p>
                    </div>
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Mixed Reality (MR):</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">A blend of real and virtual settings where physical and digital objects interact in real time using headsets (e.g. HoloLens, Magic Leap) or smartphones.</p>
                    </div>
                    <div className="border border-black p-4 bg-[#C4B5FD] text-left">
                      <strong>Applications of Holography:</strong>
                      <p className="font-sans text-xs text-black/80 mt-1">Medical organ mapping for surgeries, anti-counterfeit labels on banknotes, and holographic data storage (3D density storage).</p>
                    </div>
                  </div>
                </div>

                {/* Section 6: Interactive Neural Sandbox */}
                <div className="space-y-6 pt-6 text-left" id="ai-interactive">
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                        <BrainCircuit size={22} />
                        6. Neural Network & Hologram Projection Sandbox
                      </h2>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                        Configure hidden layers, train on custom data feeds, and split laser beams to test optical holographic projections
                      </p>
                    </div>

                    {/* Simulation Parameters Deck */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                      {/* Neural Net Config */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">A. NEURAL NETWORK CONFIGURATION</span>

                        <div className="space-y-1">
                          <label className="font-bold block">Input Data Feed:</label>
                          <select
                            value={aiDataType}
                            onChange={(e) => { setAiDataType(e.target.value); setAiStatus('IDLE'); setAiReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="image">Image Stream (Domestic Cat)</option>
                            <option value="sensor">Sensor Vectors (Autonomous Navigation)</option>
                            <option value="scan">Medical MRI (Coronary Artery Scan)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Hidden Layers:</label>
                          <select
                            value={aiHiddenLayers}
                            onChange={(e) => { setAiHiddenLayers(parseInt(e.target.value)); setAiStatus('IDLE'); setAiReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="1">1 Layer (12 units)</option>
                            <option value="2">2 Layers (128 units)</option>
                            <option value="3">3 Layers (1024 units)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Training Epochs:</label>
                          <select
                            value={aiTrainingEpochs}
                            onChange={(e) => { setAiTrainingEpochs(parseInt(e.target.value)); setAiStatus('IDLE'); setAiReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="100">100 Epochs (Fast training)</option>
                            <option value="500">500 Epochs (Recommended)</option>
                            <option value="1000">1000 Epochs (High convergence)</option>
                          </select>
                        </div>
                      </div>

                      {/* Holographic Setup */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">B. HOLOGRAPHIC BEAM CONFIG</span>

                        <div className="flex flex-col gap-2 pt-1 font-bold">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={aiLaserCoherent}
                              onChange={(e) => { setAiLaserCoherent(e.target.checked); setAiStatus('IDLE'); setAiReport(null); }}
                              className="accent-black border-2 border-black rounded-none cursor-pointer"
                            />
                            Coherent Laser Light Source
                          </label>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Beam Splitting Angle:</label>
                          <select
                            value={aiSplitAngle}
                            onChange={(e) => { setAiSplitAngle(parseInt(e.target.value)); setAiStatus('IDLE'); setAiReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="30">30 degrees (Sharp angle)</option>
                            <option value="45">45 degrees (Ideal alignment)</option>
                            <option value="60">60 degrees (Wide angle)</option>
                          </select>
                        </div>

                        <div className="border border-black p-3 bg-white space-y-1 font-sans text-xs text-left">
                          <strong>Splitting Method:</strong>
                          <p className="text-gray-600">Splits the coherent laser into a reference beam and object beam to capture interference patterns.</p>
                        </div>
                      </div>
                    </div>

                    {/* Button trigger */}
                    <div className="flex justify-center">
                      <button
                        onClick={runAiEvaluation}
                        disabled={aiStatus === 'COMPUTING'}
                        className="px-6 py-3 font-mono text-sm font-black uppercase border-4 border-black bg-[#FFD833] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer disabled:opacity-50"
                      >
                        {aiStatus === 'COMPUTING' ? 'PROCESSING NEURAL CONVERGENCE...' : 'TRAIN & PROJECT'}
                      </button>
                    </div>

                    {/* Simulation Output Display */}
                    {aiStatus === 'SUCCESS' && aiReport && (
                      <div className="border-4 border-black p-6 bg-[#F3F4F6] space-y-6 transition-all animate-fadeIn text-left text-xs font-mono">

                        {/* Part A: Neural Report */}
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black pb-3">
                            <h4 className="font-serif text-lg font-black uppercase text-black">A. NEURAL NETWORK TRAINING REPORT</h4>
                            <div className="flex items-center gap-4 font-mono text-xs font-bold text-black">
                              <span>ACCURACY: {aiReport.accuracy}%</span>
                              <span>LOSS: {aiReport.trainingLoss}</span>
                            </div>
                          </div>

                          <div className="space-y-2 font-mono text-xs text-left">
                            <div>
                              <strong>Model Status:</strong>
                              <span className="block text-blue-600 font-bold uppercase mt-0.5">{aiReport.neuralStatus}</span>
                            </div>
                            <div className="border-2 border-black p-3 bg-white font-sans font-bold text-left">
                              {aiReport.predictedLabel}
                            </div>
                          </div>
                        </div>

                        {/* Part B: Hologram Visual Representation */}
                        <div className="space-y-4 pt-4 border-t-2 border-black/10">
                          <h4 className="font-serif text-lg font-black uppercase text-black">B. HOLOGRAPHIC 3D PROJECTION PREVIEW</h4>

                          <div className="flex justify-center py-6 bg-black border-2 border-black relative overflow-hidden h-48">
                            {aiLaserCoherent ? (
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                {/* Visual Hologram Representation */}
                                <div
                                  className={`border-2 border-dashed border-cyan-400 rounded-full flex items-center justify-center transition-all animate-pulse duration-1000
                                    ${aiSplitAngle === 45 ? 'w-24 h-24 bg-cyan-500/10 text-cyan-400' : 'w-32 h-16 bg-cyan-500/5 text-cyan-500/60'}
                                  `}
                                >
                                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">
                                    {aiDataType === 'image' ? '🐱 3D_CAT' : aiDataType === 'sensor' ? '🤖 3D_ROBOT' : '❤️ 3D_HEART'}
                                  </span>
                                </div>
                                <span className="absolute bottom-2 font-mono text-[8px] text-cyan-400/80">COHERENT LIGHT INTERFERENCE DETECTED</span>
                              </div>
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 text-red-500 font-mono text-xs font-bold">
                                <span>[ PROJECTION FAILED ]</span>
                                <span className="text-[9px] text-red-500/60 mt-1 uppercase">Incoherent light source does not produce interferometry</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2 font-mono text-xs text-left">
                            <div>
                              <strong>Hologram Status:</strong>
                              <span className="block text-gray-700 font-bold uppercase mt-0.5">{aiReport.holoIntegrity}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              </section>
            ) : noteData.staticLookupKey === 'animal-production-basics' ? (
              /* ==========================================
                 GORGEOUS INTERACTIVE ANIMAL PRODUCTION NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left animate-fadeIn" id="ap-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_10 // LIVESTOCK PRODUCTION & NUTRIENT RATIONS
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    Animal Nutrition & Feeding
                  </h1>
                </div>

                {/* Section 1: Feed Definitions */}
                <div className="space-y-4" id="ap-definition">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Terminal size={20} />
                    1. Introduction to Animal Feeding and Commercial Animals
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Commercial livestock rearing requires farmers to understand feed schedules and correct ration formulations to achieve optimal economic returns.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="border border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-xs font-black uppercase text-black block mb-1">Commercial Animals</strong>
                      <p className="font-sans text-xs text-gray-600">Animals reared for business profit, including cattle, swine, fish, goats, fowl, and turkeys.</p>
                    </div>
                    <div className="border border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-xs font-black uppercase text-black block mb-1">Animal Feed</strong>
                      <p className="font-sans text-xs text-gray-600">Food mixes prepared by breeders to supply energy, support immune defense, and build body size.</p>
                    </div>
                    <div className="border border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left">
                      <strong className="font-mono text-xs font-black uppercase text-black block mb-1">Daily Ration</strong>
                      <p className="font-sans text-xs text-gray-600">The total weight of food allocated to an animal over a 24-hour window to satisfy nutrition needs.</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Feed Classification */}
                <div className="space-y-4 pt-6" id="ap-feed-class">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Cpu size={20} />
                    2. Classification of Animal Feed
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Animal feed is grouped into four distinct categories based on fiber density, digestibility, and starchy content:
                  </p>

                  <div className="space-y-3 font-semibold text-xs text-black leading-relaxed">
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Basal Feed (Energy Feed):</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Starchy grains and tubers high in carbohydrates but low in proteins. Fed to both ruminants and monogastrics (e.g. corn, millet, wheat, cassava).</p>
                    </div>
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Concentrates:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Highly digestible mixes rich in proteins, vitamins, and minerals but low in fiber. Usually fed to pigs and chickens (e.g. fish meal, soybean cake, oyster shells).</p>
                    </div>
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Roughages:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Bulky feedstuffs rich in cellulose and fiber, difficult for monogastrics to digest. Primarily fed to ruminants (e.g. fresh green grass pasture, silage, hay, straws).</p>
                    </div>
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Supplements:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Concentrated additives supplied to complete mineral/vitamin shortages (e.g. salt licks, bone meal, cottonseed cakes).</p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Nutrient Components */}
                <div className="space-y-4 pt-6" id="ap-nutrients">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    3. Major Nutrients in Animal Feeds
                  </h2>

                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="bg-black text-white">
                          <th className="p-3 border border-black uppercase font-bold">Nutrient</th>
                          <th className="p-3 border border-black uppercase font-bold">Main Functions</th>
                          <th className="p-3 border border-black uppercase font-bold">Common Sources</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-black font-semibold">
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Carbohydrates</td>
                          <td className="p-3 border border-black">Provides energy; fat conversion.</td>
                          <td className="p-3 border border-black">Cereals, tubers, wheat bran.</td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Proteins</td>
                          <td className="p-3 border border-black text-green-600">Growth, tissue repair, meat/egg synthesis.</td>
                          <td className="p-3 border border-black">Fish meal, copra, palm kernel cake.</td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Fats & Oils</td>
                          <td className="p-3 border border-black">Supplies 2x energy of carbs; retains heat.</td>
                          <td className="p-3 border border-black">Groundnut cake, palm oil.</td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Minerals</td>
                          <td className="p-3 border border-black">Skeletal formation, body fluid pH balance.</td>
                          <td className="p-3 border border-black">Salt licks, oyster shell meal.</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-black bg-gray-50 font-bold">Vitamins</td>
                          <td className="p-3 border border-black text-green-600">Promotes metabolic enzymes & immune health.</td>
                          <td className="p-3 border border-black">Vegetables, grasses, yellow corn.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: Importance of Feed and Water */}
                <div className="space-y-4 pt-6" id="ap-usefulness">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <ListOrdered size={20} />
                    4. Usefulness of Feed & Water
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Water is an essential body constituent representing over half of an animal's mass. Proper watering:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="border border-black p-5 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">IMPORTANCE OF BALANCED FEED</h4>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-gray-700 font-sans text-left">
                        <li>Fosters muscle expansion and tissue building.</li>
                        <li>Equips bodily systems to synthesize disease-fighting antibodies.</li>
                        <li>Boosts egg weight, wool density, and meat volumes to secure farmer profits.</li>
                      </ul>
                    </div>
                    <div className="border border-black p-5 bg-[#38BDF8] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">IMPORTANCE OF WATER RATIONS</h4>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-black/80 font-sans text-left">
                        <li>Solubilizes nutrients for simple assimilation in blood streams.</li>
                        <li>Redistributes inner heat through skin evaporation to regulate temperature.</li>
                        <li>Transports toxic metabolic wastes through urine and sweat excretion.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 5: Ration Proportions */}
                <div className="space-y-4 pt-6" id="ap-proportions">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <BrainCircuit size={20} />
                    5. Proportional Feed Requirements
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Ration content must change dynamically according to livestock breed, age, and purpose:
                  </p>

                  <div className="border border-black p-4 bg-[#FFD833] text-left font-sans text-xs leading-relaxed font-bold">
                    Pregnant / Lactating Animals need extra calcium and protein for progeny development. Laying hens need significantly more minerals (oyster shell licks) than broiler chickens to generate robust eggshells and avoid shell fractures.
                  </div>
                </div>

                {/* Section 6: Interactive Feed Calculator */}
                <div className="space-y-6 pt-6 text-left" id="ap-interactive">
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                        <ShoppingBag size={22} />
                        6. Livestock Ration Builder & Hydration Sandbox
                      </h2>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                        Adjust macronutrient percentages and select a water supply options to formulate a balanced 24-hour feed ration
                      </p>
                    </div>

                    {/* Simulation Parameters Deck */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                      {/* Ration Config */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">A. DIET FORMULATION RATIO</span>

                        <div className="space-y-1">
                          <label className="font-bold block">Target Livestock:</label>
                          <select
                            value={apLivestockType}
                            onChange={(e) => { setApLivestockType(e.target.value); setApStatus('IDLE'); setApReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="layers">Laying Hens (Egg Production)</option>
                            <option value="broilers">Broiler Chickens (Meat Yield)</option>
                            <option value="ruminants">Goats / Sheep (Ruminant Digestion)</option>
                            <option value="pigs">Growing Pigs (Monogastric omnivore)</option>
                          </select>
                        </div>

                        {/* Carb slider */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-bold">
                            <span>Basal / Carbohydrates (Maize):</span>
                            <span>{apCarbsRatio}%</span>
                          </div>
                          <input
                            type="range" min="0" max="100"
                            value={apCarbsRatio}
                            onChange={(e) => { setApCarbsRatio(parseInt(e.target.value)); setApStatus('IDLE'); setApReport(null); }}
                            className="w-full accent-black cursor-pointer"
                          />
                        </div>

                        {/* Protein slider */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-bold">
                            <span>Concentrates / Proteins (Fish Meal):</span>
                            <span>{apProteinRatio}%</span>
                          </div>
                          <input
                            type="range" min="0" max="100"
                            value={apProteinRatio}
                            onChange={(e) => { setApProteinRatio(parseInt(e.target.value)); setApStatus('IDLE'); setApReport(null); }}
                            className="w-full accent-black cursor-pointer"
                          />
                        </div>

                        {/* Roughages slider */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-bold">
                            <span>Roughage / Fibers (Hay/Pasture):</span>
                            <span>{apRoughageRatio}%</span>
                          </div>
                          <input
                            type="range" min="0" max="100"
                            value={apRoughageRatio}
                            onChange={(e) => { setApRoughageRatio(parseInt(e.target.value)); setApStatus('IDLE'); setApReport(null); }}
                            className="w-full accent-black cursor-pointer"
                          />
                        </div>

                        {/* Supplements slider */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-bold">
                            <span>Supplements (Oyster Shells):</span>
                            <span>{apSupplementRatio}%</span>
                          </div>
                          <input
                            type="range" min="0" max="100"
                            value={apSupplementRatio}
                            onChange={(e) => { setApSupplementRatio(parseInt(e.target.value)); setApStatus('IDLE'); setApReport(null); }}
                            className="w-full accent-black cursor-pointer"
                          />
                        </div>

                        <div className="text-center font-bold text-gray-700 bg-white p-2 border border-black/10">
                          Total Ration Mix: {apCarbsRatio + apProteinRatio + apRoughageRatio + apSupplementRatio}%
                        </div>
                      </div>

                      {/* Water Setup */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">B. HYDRATION SUPPLY</span>

                        <div className="space-y-1">
                          <label className="font-bold block">Water Options:</label>
                          <select
                            value={apWaterOption}
                            onChange={(e) => { setApWaterOption(e.target.value); setApStatus('IDLE'); setApReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="sufficient">Sufficient (Clean River/Pipe water)</option>
                            <option value="inadequate">Inadequate (Stale stream water)</option>
                            <option value="dehydrated">Dehydrated (Dry troughs)</option>
                          </select>
                        </div>

                        <div className="border border-black p-3 bg-white space-y-1 font-sans text-xs text-left">
                          <strong>Digestive Solvent Function:</strong>
                          <p className="text-gray-600">Water regulates metabolic systems, facilitates waste excretion, and promotes nutrient absorption in blood streams.</p>
                        </div>
                      </div>
                    </div>

                    {/* Button trigger */}
                    <div className="flex justify-center">
                      <button
                        onClick={runApEvaluation}
                        disabled={apStatus === 'COMPUTING'}
                        className="px-6 py-3 font-mono text-sm font-black uppercase border-4 border-black bg-[#FFD833] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer disabled:opacity-50"
                      >
                        {apStatus === 'COMPUTING' ? 'COMPUTING RATION ANALYSIS...' : 'VERIFY FEED & WATER RATION'}
                      </button>
                    </div>

                    {/* Simulation Output Display */}
                    {apStatus === 'SUCCESS' && apReport && (
                      <div className="border-4 border-black p-6 bg-[#F3F4F6] space-y-6 transition-all animate-fadeIn text-left text-xs font-mono">

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black pb-3">
                          <h4 className="font-serif text-lg font-black uppercase text-black">NUTRITIONAL YIELD AUDIT</h4>
                          <div className="flex items-center gap-4 font-mono text-xs font-bold text-black">
                            <span>INDEX: {apReport.nutritionalValue}/100</span>
                            <span>HYDRATION: <span className={apReport.dehydrationRisk.includes('CRITICAL') ? 'text-red-600' : 'text-green-600'}>{apReport.dehydrationRisk}</span></span>
                          </div>
                        </div>

                        <div className="space-y-2 font-mono text-xs text-left">
                          <div>
                            <strong>Physical Health Outcome:</strong>
                            <p className="font-sans text-xs text-black font-bold bg-white p-3 border-2 border-black mt-1 leading-relaxed text-left">{apReport.healthOutcome}</p>
                          </div>
                        </div>

                        {/* Deficiencies warning */}
                        {apReport.deficiencies.length > 0 && (
                          <div className="border-2 border-black p-4 bg-white space-y-2 text-left">
                            <span className="font-mono text-[9px] font-bold text-red-600 uppercase block border-b border-black/10 pb-1 text-left">DEFICIENCIES DETECTED</span>
                            <ul className="list-disc pl-4 space-y-1 text-xs text-gray-700 font-sans text-left">
                              {apReport.deficiencies.map((d, i) => (
                                <li key={i}>{d}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                </div>
              </section>
            ) : noteData.staticLookupKey === 'energy-conversion-basics' ? (
              /* ==========================================
                 GORGEOUS INTERACTIVE ENERGY CONVERSION & CONSERVATION NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left animate-fadeIn" id="ec-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_11 // ENERGY CONVERSION & THERMODYNAMIC CONCEPTS
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    Energy Conversion & Conservation
                  </h1>
                </div>

                {/* Section 1: Energy Concepts */}
                <div className="space-y-4" id="ec-intro">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Terminal size={20} />
                    1. Introduction to Energy and Energy Conversion
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Energy is the capacity to do work, measured in Joules (J). The Law of Conservation of Energy dictates that energy is never created or destroyed, but only transformed from one form to another.
                  </p>

                  <div className="border border-black p-5 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-left space-y-3">
                    <h4 className="font-serif text-lg font-black uppercase text-black">Why Convert Energy?</h4>
                    <ul className="space-y-2 text-xs font-semibold text-gray-700">
                      <li><strong>Versatility:</strong> Allows us to tap into various natural supplies (solar, wind, tides) instead of a single resource.</li>
                      <li><strong>Utility:</strong> Changes raw energy into highly useful formats (e.g. converting battery chemical potential to electrical currents, then light packets in a flashlight).</li>
                      <li><strong>Flexibility:</strong> Enables switching between sources based on availability, transport, and efficiency.</li>
                    </ul>
                  </div>
                </div>

                {/* Section 2: Renewable vs. Non-Renewable */}
                <div className="space-y-4 pt-6" id="ec-classification">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Cpu size={20} />
                    2. Renewable vs. Non-Renewable Energy Sources
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Energy sources fall into two categories based on how rapidly they replenish:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="border-2 border-black p-4 bg-[#A7F3D0] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left space-y-2">
                      <strong className="font-mono text-xs font-black uppercase text-black block border-b border-black pb-1">Renewable Sources (Inexhaustible)</strong>
                      <p className="font-sans text-xs text-black/90">Replenished naturally over short periods. Clean and environmentally friendly.</p>
                      <span className="block font-mono text-[10px] font-bold">Examples: Solar, Wind, Tidal, Hydropower, Geothermal, Biogas.</span>
                    </div>
                    <div className="border-2 border-black p-4 bg-[#FECACA] shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-left space-y-2">
                      <strong className="font-mono text-xs font-black uppercase text-black block border-b border-black pb-1">Non-Renewable Sources (Exhaustible)</strong>
                      <p className="font-sans text-xs text-black/90">Take millions of years to form. Exhausted once consumed.</p>
                      <span className="block font-mono text-[10px] font-bold">Examples: Fossil Fuels (Coal, Petroleum, Gas), Firewood, Nuclear (Uranium).</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Specific Sources */}
                <div className="space-y-4 pt-6" id="ec-specific">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    3. Specific Sources and Transformations
                  </h2>

                  <div className="space-y-3 font-semibold text-xs text-black leading-relaxed">
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Hydroelectric Power:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Water behind dams (Akosombo/Bui) converts Potential Energy to Kinetic Energy, spinning turbines (Mechanical) and generators (Electrical).</p>
                    </div>
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Solar Arrays:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">Silicon solar panels capture light photons and transform them directly into electrical currents.</p>
                    </div>
                    <div className="border border-black p-4 bg-white text-left">
                      <strong>Geothermal Heat:</strong>
                      <p className="font-sans text-xs text-gray-600 mt-1">High-pressure steam created by pumping water down to hot core rocks spins surface electricity generators.</p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Source Challenges */}
                <div className="space-y-4 pt-6" id="ec-challenges">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <ListOrdered size={20} />
                    4. Renewable Energy: Management Challenges
                  </h2>

                  <div className="overflow-x-auto border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="bg-black text-white">
                          <th className="p-3 border border-black uppercase font-bold">Source</th>
                          <th className="p-3 border border-black uppercase font-bold">Specific Management Challenges</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-black font-semibold">
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Solar</td>
                          <td className="p-3 border border-black text-red-600">High infrastructure costs; weather dependent (no output at night).</td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Wind</td>
                          <td className="p-3 border border-black text-red-600">Requires large land areas; noise pollution; unreliable winds.</td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="p-3 border border-black bg-gray-50 font-bold">Tidal</td>
                          <td className="p-3 border border-black text-red-600">High construction costs; can disrupt fishing and boat transport.</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-black bg-gray-50 font-bold">Hydro</td>
                          <td className="p-3 border border-black text-red-600">Vulnerable to droughts; risk of flooding if reservoirs overflow.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 5: Heat vs Temperature */}
                <div className="space-y-4 pt-6" id="ec-heat-temp">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <BrainCircuit size={20} />
                    5. Heat vs. Temperature
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Though related, heat and temperature are separate thermodynamic variables:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="border border-black p-5 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">HEAT ENERGY (J)</h4>
                      <p className="font-sans text-xs text-gray-600 leading-relaxed">
                        A form of thermal energy that actively transfers from a warmer body to a colder body as a result of a temperature difference. Measured with a <strong>calorimeter</strong>.
                      </p>
                    </div>
                    <div className="border border-black p-5 bg-[#FFD833] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">TEMPERATURE (°C / K)</h4>
                      <p className="font-sans text-xs text-black leading-relaxed">
                        A measure of the degree of hotness or coldness of a body (its internal kinetic energy). Can be measured at any time with a <strong>thermometer</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 6: Interactive Grid Simulator */}
                <div className="space-y-6 pt-6 text-left" id="ec-interactive">
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                        <Cpu size={22} />
                        6. Grid Power Station & Calorimeter Sandbox
                      </h2>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                        Choose generator technologies, adjust resource availability, and heat water to visualize thermal energy transfer
                      </p>
                    </div>

                    {/* Simulation Parameters Deck */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                      {/* Grid setup */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">A. POWER GENERATION SETUPS</span>

                        <div className="space-y-1">
                          <label className="font-bold block">Power Technology:</label>
                          <select
                            value={ecSource}
                            onChange={(e) => { setEcSource(e.target.value); setEcStatus('IDLE'); setEcReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="hydro">Hydroelectric Dam (Akosombo)</option>
                            <option value="solar">Solar PV Panel Array</option>
                            <option value="wind">Wind Turbine Farm</option>
                            <option value="geo">Geothermal Steam Plant</option>
                            <option value="fossil">Fossil Fuel (Coal/Gas Boiler)</option>
                            <option value="nuclear">Nuclear Fission Reactor</option>
                          </select>
                        </div>

                        {/* Availability slider */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-bold">
                            <span>Resource Availability (Drought / Cloud / Wind):</span>
                            <span>{ecSourceAvailability}%</span>
                          </div>
                          <input
                            type="range" min="0" max="100"
                            value={ecSourceAvailability}
                            onChange={(e) => { setEcSourceAvailability(parseInt(e.target.value)); setEcStatus('IDLE'); setEcReport(null); }}
                            className="w-full accent-black cursor-pointer"
                          />
                        </div>

                        {/* Load requirements */}
                        <div className="space-y-1">
                          <label className="font-bold block">Target Grid Load Demand:</label>
                          <select
                            value={ecGridLoad}
                            onChange={(e) => { setEcGridLoad(parseInt(e.target.value)); setEcStatus('IDLE'); setEcReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="50">50 Megawatts (Low Demand)</option>
                            <option value="100">100 Megawatts (Normal Demand)</option>
                            <option value="150">150 Megawatts (Peak Demand)</option>
                          </select>
                        </div>
                      </div>

                      {/* Calorimeter Setup */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">B. THERMAL CALORIMETER SANDBOX</span>

                        <div className="space-y-1">
                          <div className="flex justify-between font-bold">
                            <span>Heat Energy Added (Joules):</span>
                            <span>{ecHeatInput} J</span>
                          </div>
                          <input
                            type="range" min="0" max="1000" step="100"
                            value={ecHeatInput}
                            onChange={(e) => { setEcHeatInput(parseInt(e.target.value)); setEcStatus('IDLE'); setEcReport(null); }}
                            className="w-full accent-black cursor-pointer"
                          />
                        </div>

                        <div className="border border-black p-3 bg-white space-y-1 font-sans text-xs text-left">
                          <strong>Active Heat Transfer:</strong>
                          <p className="text-gray-600">Adjust the Joules slider to transfer heat energy. Observe how the thermometer records temperature increases while total energy remains conserved.</p>
                        </div>
                      </div>
                    </div>

                    {/* Button trigger */}
                    <div className="flex justify-center">
                      <button
                        onClick={runEcEvaluation}
                        disabled={ecStatus === 'COMPUTING'}
                        className="px-6 py-3 font-mono text-sm font-black uppercase border-4 border-black bg-[#FFD833] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer disabled:opacity-50"
                      >
                        {ecStatus === 'COMPUTING' ? 'SIMULATING POWER EXCHANGE...' : 'RUN GENERATION SIMULATION'}
                      </button>
                    </div>

                    {/* Simulation Output Display */}
                    {ecStatus === 'SUCCESS' && ecReport && (
                      <div className="border-4 border-black p-6 bg-[#F3F4F6] space-y-6 transition-all animate-fadeIn text-left text-xs font-mono">

                        {/* Part A: Power Station report */}
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black pb-3">
                            <h4 className="font-serif text-lg font-black uppercase text-black">A. GRID POWER AUDIT REPORT</h4>
                            <div className="flex items-center gap-4 font-mono text-xs font-bold text-black">
                              <span>GENERATED: {ecReport.powerGenerated} MW</span>
                              <span>EFFICIENCY: {ecReport.efficiency}%</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <strong>Energy Transformation Path:</strong>
                              <span className="block text-blue-600 font-bold uppercase mt-0.5 leading-relaxed">{ecReport.flowChart}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                              <div>
                                <strong>Grid Stability:</strong>
                                <span className={`block font-bold mt-0.5 uppercase ${ecReport.gridStability.includes('CRITICAL') ? 'text-red-600' : 'text-green-600'}`}>{ecReport.gridStability}</span>
                              </div>
                              <div>
                                <strong>CO2 Emissions:</strong>
                                <span className={`block font-bold mt-0.5 uppercase ${ecReport.co2Emissions > 100 ? 'text-red-600' : 'text-green-600'}`}>
                                  {ecReport.co2Emissions} Tons / Day
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Part B: Calorimeter report */}
                        <div className="space-y-4 pt-4 border-t-2 border-black/10">
                          <h4 className="font-serif text-lg font-black uppercase text-black">B. CALORIMETER TEMPERATURE READOUT</h4>

                          <div className="flex items-center gap-6 bg-white border-2 border-black p-4">
                            {/* Thermometer Visual representation */}
                            <div className="w-6 h-28 bg-gray-200 border-2 border-black rounded-full relative flex items-end p-0.5">
                              <div
                                className="w-full bg-red-600 rounded-full transition-all duration-500"
                                style={{ height: `${Math.min(100, Math.max(10, ecReport.temperatureRise))}%` }}
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <strong>Thermometer Indicator:</strong>
                              <span className="block font-bold text-red-600 text-lg">+{ecReport.temperatureRise}°C</span>
                              <p className="font-sans text-xs text-gray-700 leading-relaxed">{ecReport.calorimeterFeedback}</p>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              </section>
            ) : noteData.staticLookupKey === 'farming-systems-basics' ? (
              /* ==========================================
                 GORGEOUS INTERACTIVE FARMING SYSTEMS NOTE VIEW
                 ========================================== */
              <section className="space-y-8 text-left animate-fadeIn" id="fs-note">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                    MODULE_12 // FARMING SYSTEMS & ENVIRONMENTAL SUSTAINABILITY
                  </span>
                  <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none text-left">
                    Farming Systems
                  </h1>
                </div>

                {/* Section 1: Intro */}
                <div className="space-y-4" id="fs-intro">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Terminal size={20} />
                    1. Introduction to Farming Systems
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    A farming system refers to all the different methods used by a breeder or grower to yield agricultural outputs. Adopted methods depend on land availability, soil fertility, farmer skills, and funds.
                  </p>
                </div>

                {/* Section 2: Mixed Farming */}
                <div className="space-y-4 pt-6" id="fs-mixed-farming">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Cpu size={20} />
                    2. Mixed Farming
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    A system that involves the simultaneous cultivation of crops and the rearing of farm animals on the same piece of land.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="border border-black p-5 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">ADVANTAGES</h4>
                      <ul className="list-disc pl-4 space-y-2 text-xs text-gray-700 font-sans text-left font-semibold">
                        <li><strong>Feed from Crop Residues:</strong> Waste plant materials supply nutrients for animals.</li>
                        <li><strong>Organic Fertilizer:</strong> Animal dung/droppings enrich and fertilize the soil.</li>
                        <li><strong>Reduced Production Costs:</strong> Free availability of feed and manure cuts input expenses.</li>
                        <li><strong>Farm Power / Labour:</strong> Animals like cattle can plough land and cart produce.</li>
                        <li><strong>Continuous Income:</strong> Multiple sources of income throughout the year.</li>
                      </ul>
                    </div>
                    <div className="border border-black p-5 bg-[#FECACA] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">DISADVANTAGES</h4>
                      <ul className="list-disc pl-4 space-y-2 text-xs text-black/80 font-sans text-left font-semibold">
                        <li><strong>Crop Destruction:</strong> Animals may feed on and destroy crops while moving around.</li>
                        <li><strong>Divided Attention:</strong> The farmer must split focus between crops and animals.</li>
                        <li><strong>Labour Intensive:</strong> Requires a lot of work, often needing hired farmhands.</li>
                        <li><strong>High Skill Requirement:</strong> Requires extensive knowledge to prevent total failure.</li>
                        <li><strong>Year-Round Work:</strong> Activities take place continuously, offering no downtime.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 3: Mixed Cropping */}
                <div className="space-y-4 pt-6" id="fs-mixed-cropping">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    3. Mixed Cropping
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Growing two or more crops randomly on the same plot at the same time, without any definite row arrangement or spacing.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="border border-black p-5 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">ADVANTAGES</h4>
                      <ul className="list-disc pl-4 space-y-2 text-xs text-gray-700 font-sans text-left font-semibold">
                        <li><strong>Adequate Nutrient Use:</strong> Different root depths absorb nutrients at varying levels.</li>
                        <li><strong>Continuous Harvest:</strong> Different crops mature and are harvested at different times.</li>
                        <li><strong>Pest/Disease Reduction:</strong> Difficult for pests and diseases to spread quickly across mixed species.</li>
                        <li><strong>Improved Fertility:</strong> Inclusion of legumes helps fix nitrogen into the soil.</li>
                        <li><strong>Security Against Failure:</strong> If one crop fails due to pests, others survive.</li>
                      </ul>
                    </div>
                    <div className="border border-black p-5 bg-[#FECACA] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">DISADVANTAGES</h4>
                      <ul className="list-disc pl-4 space-y-2 text-xs text-black/80 font-sans text-left font-semibold">
                        <li><strong>No Mechanization:</strong> It is impossible to use machines/equipment due to random planting.</li>
                        <li><strong>Expensive Inputs:</strong> Different crops may require different, specialized fertilizers.</li>
                        <li><strong>Time-Consuming:</strong> Monitoring multiple types of crops demands significant time.</li>
                        <li><strong>Harvesting Difficulties:</strong> Mixed maturity times make harvesting complicated.</li>
                        <li><strong>Resource Competition:</strong> Crops compete heavily for nutrients, water, light, and space.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 4: Inter-Cropping */}
                <div className="space-y-4 pt-6" id="fs-intercropping">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <ListOrdered size={20} />
                    4. Inter-Cropping
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Cultivating two or more crops in clear, systematic rows, planting early-maturing varieties before late-maturing crops.
                  </p>
                  <div className="border border-black p-4 bg-[#C4B5FD] text-left font-sans text-xs font-bold leading-relaxed mb-4">
                    Example: Planting maize seeds, followed after germination by cassava sticks. Also, growing fast-maturing plantains next to young cocoa seedlings to provide vital temporary shade.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="border border-black p-5 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">ADVANTAGES</h4>
                      <ul className="list-disc pl-4 space-y-2 text-xs text-gray-700 font-sans text-left font-semibold">
                        <li><strong>Increased Productivity:</strong> More than one food crop is harvested from a single unit area of land.</li>
                        <li><strong>Easy Fertilizer Application:</strong> The well-defined nature of the farm allows for targeted application.</li>
                        <li><strong>Easy Pest & Disease Control:</strong> Managed spacing makes pest control straightforward.</li>
                        <li><strong>Easy Harvesting:</strong> Different crops can be harvested easily from the same field.</li>
                      </ul>
                    </div>
                    <div className="border border-black p-5 bg-[#FECACA] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">DISADVANTAGES</h4>
                      <ul className="list-disc pl-4 space-y-2 text-xs text-black/80 font-sans text-left font-semibold">
                        <li><strong>Nutrient Competition:</strong> Crops compete for the same soil nutrients at the same place.</li>
                        <li><strong>High Input Demand:</strong> Requires more water and fertilizer to ensure all crops develop well.</li>
                        <li><strong>Mechanization Limits:</strong> Specialized machines cannot easily harvest two different crops at once.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 5: Crop Rotation */}
                <div className="space-y-4 pt-6" id="fs-rotation">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <BrainCircuit size={20} />
                    5. Planned Crop Rotation
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    Growing different classes of crops on the same plot in a planned sequence over successive seasons.
                  </p>

                  <div className="border border-black p-5 bg-[#F3F4F6] space-y-3 text-left font-mono text-xs">
                    <span className="font-bold text-black block border-b border-black/10 pb-1">ROTATION DESIGN PRINCIPLES:</span>
                    <ol className="list-decimal pl-5 space-y-1 font-sans text-gray-700 font-bold">
                      <li>Always include a leguminous nitrogen-fixing crop (cowpea/groundnut) to enrich soil nitrates.</li>
                      <li>Alternate shallow-rooted crops with deep-rooted crops (e.g. follow yam with maize).</li>
                      <li>Never plant crops of the same family consecutively (prevents specific nutrient depletion).</li>
                      <li>Never plant crops sharing identical pest vulnerabilities back-to-back.</li>
                    </ol>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left pt-2">
                    <div className="border border-black p-5 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">ADVANTAGES</h4>
                      <ul className="list-disc pl-4 space-y-2 text-xs text-gray-700 font-sans text-left font-semibold">
                        <li><strong>Pest and Pathogen Control:</strong> Breaks the lifecycle of pests since the same host crop isn't replanted.</li>
                        <li><strong>Efficient Nutrient Use:</strong> Prevents soil nutrients from being overused by a single crop type.</li>
                        <li><strong>Increased Yield:</strong> Harvesting different crops at different times maximizes total land yield.</li>
                        <li><strong>Soil Improvements:</strong> Enhances fertility and actively helps to control soil erosion.</li>
                      </ul>
                    </div>
                    <div className="border border-black p-5 bg-[#FECACA] shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-2">
                      <h4 className="font-serif text-lg font-bold uppercase text-black">DISADVANTAGES</h4>
                      <ul className="list-disc pl-4 space-y-2 text-xs text-black/80 font-sans text-left font-semibold">
                        <li><strong>Large Land Requirement:</strong> Requires a substantial plot of land to cycle through 4 distinct crops.</li>
                        <li><strong>High Knowledge Requirement:</strong> Inadequate knowledge of crop behaviors can cause total farm failure.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 6: Sustainability & Interdependence */}
                <div className="space-y-4 pt-6" id="fs-sustainability">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3 text-left">
                    <Layers size={20} />
                    6. System Sustainability & Component Interdependence
                  </h2>
                  <p className="font-sans text-gray-700 leading-loose text-left">
                    All components of a farming system—land, crops, and animals—play critical roles in supporting and sustaining one another:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-xs">
                    <div className="border border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] space-y-2">
                      <strong className="font-mono text-black uppercase block border-b border-black/10 pb-1">Land Supports Crops & Animals</strong>
                      <ul className="list-disc pl-4 space-y-1 text-gray-600 font-sans">
                        <li>Provides vital physical anchorage for plant roots to grow upright.</li>
                        <li>Stores essential nutrients and water required for plant cellular respiration.</li>
                        <li>Yields vegetation for forage feeds and hosts insects that serve as poultry protein.</li>
                      </ul>
                    </div>
                    <div className="border border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] space-y-2">
                      <strong className="font-mono text-black uppercase block border-b border-black/10 pb-1">Animals Support Land & Crops</strong>
                      <ul className="list-disc pl-4 space-y-1 text-gray-600 font-sans">
                        <li>Droppings (faeces and urine) act as rich organic manures, restoring depleted soil fertility.</li>
                        <li>Beasts of burden (like cattle) provide farm power to plough soil and cart crops post-harvest.</li>
                      </ul>
                    </div>
                    <div className="border border-black p-4 bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] space-y-2">
                      <strong className="font-mono text-black uppercase block border-b border-black/10 pb-1">Crops Support Land & Animals</strong>
                      <ul className="list-disc pl-4 space-y-1 text-gray-600 font-sans">
                        <li>Roots bind loose soil particles together, preventing heavy water/wind erosion.</li>
                        <li>Tall canopy crops provide shade protection for delicate seedlings and roaming animals.</li>
                        <li>Crop residues left on soil surface act as mulch to retain moisture, suppress weeds, and enrich soil.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section 7: Interactive Rotation Sandbox */}
                <div className="space-y-6 pt-6 text-left" id="fs-interactive">
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] space-y-6">
                    <div className="space-y-1">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tight text-black flex items-center gap-3">
                        <ShoppingBag size={22} />
                        7. Farm Ecosystem & Crop Rotation Planner
                      </h2>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                        Design a 4-year crop sequence and select livestock care systems to test sustainability and soil health outcomes
                      </p>
                    </div>

                    {/* Simulation Parameters Deck */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
                      {/* Rotation Cycle */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">A. 4-YEAR ROTATION PLANNER</span>

                        <div className="space-y-1">
                          <label className="font-bold block">Year 1 Crop:</label>
                          <select
                            value={fsYear1Crop}
                            onChange={(e) => { setFsYear1Crop(e.target.value); setFsStatus('IDLE'); setFsReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="legume">Legume (Nitrogen-Fixing Cowpea)</option>
                            <option value="cereal">Cereal (Heavy Feeder Maize)</option>
                            <option value="root">Root Crop (Deep Rooted Cassava)</option>
                            <option value="vegetable">Leafy Vegetable (Shallow Cabbage)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Year 2 Crop:</label>
                          <select
                            value={fsYear2Crop}
                            onChange={(e) => { setFsYear2Crop(e.target.value); setFsStatus('IDLE'); setFsReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="legume">Legume (Nitrogen-Fixing Cowpea)</option>
                            <option value="cereal">Cereal (Heavy Feeder Maize)</option>
                            <option value="root">Root Crop (Deep Rooted Cassava)</option>
                            <option value="vegetable">Leafy Vegetable (Shallow Cabbage)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Year 3 Crop:</label>
                          <select
                            value={fsYear3Crop}
                            onChange={(e) => { setFsYear3Crop(e.target.value); setFsStatus('IDLE'); setFsReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="legume">Legume (Nitrogen-Fixing Cowpea)</option>
                            <option value="cereal">Cereal (Heavy Feeder Maize)</option>
                            <option value="root">Root Crop (Deep Rooted Cassava)</option>
                            <option value="vegetable">Leafy Vegetable (Shallow Cabbage)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-bold block">Year 4 Crop:</label>
                          <select
                            value={fsYear4Crop}
                            onChange={(e) => { setFsYear4Crop(e.target.value); setFsStatus('IDLE'); setFsReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="legume">Legume (Nitrogen-Fixing Cowpea)</option>
                            <option value="cereal">Cereal (Heavy Feeder Maize)</option>
                            <option value="root">Root Crop (Deep Rooted Cassava)</option>
                            <option value="vegetable">Leafy Vegetable (Shallow Cabbage)</option>
                          </select>
                        </div>
                      </div>

                      {/* Mixed Farming interdependence */}
                      <div className="border-2 border-black p-4 bg-[#F3F4F6] space-y-4">
                        <span className="font-bold text-black uppercase block border-b border-black pb-1 mb-2 bg-black text-white px-2 py-0.5">B. MIXED LIVESTOCK CARE</span>

                        <div className="space-y-1">
                          <label className="font-bold block">Livestock System:</label>
                          <select
                            value={fsAnimalCare}
                            onChange={(e) => { setFsAnimalCare(e.target.value); setFsStatus('IDLE'); setFsReport(null); }}
                            className="w-full bg-white border border-black p-1 text-black font-bold uppercase focus:outline-none"
                          >
                            <option value="intensive">Intensive Care (Cages / Pens)</option>
                            <option value="extensive">Extensive System (Free Roaming)</option>
                          </select>
                        </div>

                        <div className="border border-black p-3 bg-white space-y-1 font-sans text-xs text-left">
                          <strong>Interdependence Cycle:</strong>
                          <p className="text-gray-600">Animals supply organic manure droppings to enrich soil, and crop residues supply nutrients back as animal feed.</p>
                        </div>
                      </div>
                    </div>

                    {/* Button trigger */}
                    <div className="flex justify-center">
                      <button
                        onClick={runFsEvaluation}
                        disabled={fsStatus === 'COMPUTING'}
                        className="px-6 py-3 font-mono text-sm font-black uppercase border-4 border-black bg-[#FFD833] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer disabled:opacity-50"
                      >
                        {fsStatus === 'COMPUTING' ? 'EVALUATING ECOLOGICAL YIELD...' : 'VERIFY ROTATION & CARE CYCLE'}
                      </button>
                    </div>

                    {/* Simulation Output Display */}
                    {fsStatus === 'SUCCESS' && fsReport && (
                      <div className="border-4 border-black p-6 bg-[#F3F4F6] space-y-6 transition-all animate-fadeIn text-left text-xs font-mono">

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-black pb-3">
                          <h4 className="font-serif text-lg font-black uppercase text-black">SOIL HEALTH & YIELD AUDIT</h4>
                          <div className="flex items-center gap-4 font-mono text-xs font-bold text-black">
                            <span>INDEX: {fsReport.soilHealthScore}/100</span>
                          </div>
                        </div>

                        <div className="space-y-3 text-left">
                          <div>
                            <strong>Rotation Feasibility:</strong>
                            <p className="font-sans text-xs text-black font-bold bg-white p-3 border-2 border-black mt-1 leading-relaxed text-left">{fsReport.rotationCheck}</p>
                          </div>
                          <div>
                            <strong>Mixed Farming Feedback:</strong>
                            <span className="block text-gray-700 mt-1">{fsReport.manureValue}</span>
                            <span className={`block font-bold mt-1 uppercase ${fsReport.extensiveWarning.includes('WARNING') ? 'text-red-600' : 'text-green-600'}`}>
                              {fsReport.extensiveWarning}
                            </span>
                          </div>
                        </div>

                        {/* Deficiencies warning */}
                        {fsReport.deficiencies.length > 0 && (
                          <div className="border-2 border-black p-4 bg-white space-y-2 text-left">
                            <span className="font-mono text-[9px] font-bold text-red-600 uppercase block border-b border-black/10 pb-1 text-left">CRITICAL PROBLEMS DETECTED</span>
                            <ul className="list-disc pl-4 space-y-1 text-xs text-gray-700 font-sans text-left">
                              {fsReport.deficiencies.map((d, i) => (
                                <li key={i}>{d}</li>
                              ))}
                            </ul>
                          </div>
                        )}

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

          {/* "Test Me" action button transition pipeline */}
          <div className="mt-12 pt-6 border-t-4 border-black flex flex-col items-center gap-4">
            {assignedQuest === null ? (
              <div className="relative group">
                <button
                  disabled
                  className="px-8 py-4 font-mono text-sm font-black uppercase border-4 border-black bg-gray-300 text-gray-500 shadow-[4px_4px_0_0_rgba(0,0,0,1)] cursor-not-allowed select-none"
                >
                  I AM DONE LEARNING // TAKE THE QUEST
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-[#FFD833] text-[10px] font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                  Quest Coming Soon
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (assignedQuest) {
                    onStartQuest({
                      steps: assignedQuest.steps || [],
                      quizQuestions: assignedQuest.quizQuestions || [],
                      title: assignedQuest.title,
                    });
                  }
                }}
                disabled={!assignedQuest}
                className="px-8 py-4 font-mono text-sm font-black uppercase border-4 border-black bg-[#00FF88] text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer select-none"
              >
                {assignedQuest === undefined ? 'LOADING QUEST LINK...' : 'I AM DONE LEARNING // TAKE THE QUEST'}
              </button>
            )}
          </div>
          </div>
        ) : (
          noteData && (
            <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none text-left">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">
                  VIDEO_TRANSMISSION // {noteData.videoUrl ? 'CONNECTED' : 'MOCK_STREAM'}
                </span>
                <span className="bg-[#FF007F] text-white border-2 border-black font-mono text-[10px] font-bold px-2 py-0.5 rounded-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] uppercase font-mono">
                  {noteData.classLevel || "UNASSIGNED LEVEL"} // {subjectCode || "GENERAL"}
                </span>
              </div>
              
              <h2 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4">
                {noteData.videoTitle || "UNTITLED LESSON VIDEO"}
              </h2>
              
              {/* Video Canvas Frame */}
              <div className="aspect-video bg-black border-4 border-black relative flex flex-col justify-between rounded-none overflow-hidden group mb-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                {noteData.videoUrl ? (
                  <iframe
                    src={noteData.videoUrl}
                    title={noteData.videoTitle || 'Lesson Video'}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <>
                    {/* Visual grid / background inside black screen */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                      backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                      backgroundSize: '16px 16px'
                    }}></div>
                    
                    {/* Simulated playback visual */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#FFD833] gap-4">
                      <button className="w-16 h-16 bg-[#FFD833] border-4 border-black flex items-center justify-center text-black rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] cursor-pointer hover:bg-white transition-all transform active:translate-x-0.5 active:translate-y-0.5">
                        <span className="border-y-[10px] border-y-transparent border-l-[16px] border-l-black ml-1"></span>
                      </button>
                      <span className="font-mono text-xs uppercase tracking-widest font-black bg-black/80 px-3 py-1 border border-white/20 text-white">
                        Click to Stream Lesson Transmission
                      </span>
                    </div>

                    {/* Simulated HUD elements */}
                    <div className="z-10 p-4 w-full flex justify-between font-mono text-[10px] text-gray-400 uppercase tracking-widest pointer-events-none font-mono">
                      <div>CAM // 01</div>
                      <div>STATUS // OFFLINE</div>
                    </div>

                    {/* Video controls footer */}
                    <div className="z-10 bg-black/95 border-t-2 border-white p-3 flex items-center justify-between font-mono text-[10px] text-white">
                      <div className="flex items-center gap-4">
                        <span className="text-white font-bold cursor-pointer">PLAY</span>
                        <span className="text-white font-bold cursor-pointer">MUTE</span>
                        <span className="text-gray-500">00:00 / 00:00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FFD833]">1080P</span>
                        <span className="border border-white px-1">SD</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="border-2 border-black p-4 bg-gray-50 rounded-none mb-4">
                <h4 className="font-mono text-xs font-bold text-black uppercase tracking-wider mb-2 font-mono">Lesson Overview //</h4>
                <p className="font-sans text-sm font-bold text-black mt-2">
                  This video lesson covers the complete core curriculum requirements for {noteData.title}. Use the left navigation panel to browse corresponding text notes and textbook block modules.
                </p>
              </div>
            </div>
          )
        )}
      </article>

      {/* AI Dictionary Widget */}
      {isDictionaryOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 border-4 border-black bg-white shadow-[4px_4px_0_0_#000] p-4 font-mono z-50 text-black">
          <div className="flex justify-between items-center border-b-4 border-black pb-2 mb-3 bg-black text-white px-2 py-1">
            <span className="font-bold tracking-wider text-xs">📖 KID-DICTIONARY //</span>
            <button 
              onClick={() => setIsDictionaryOpen(false)}
              className="font-bold text-xs hover:text-[#00FF88] transition-colors cursor-pointer"
            >
              [X]
            </button>
          </div>

          <form onSubmit={handleDictionaryLookup} className="flex gap-2 mb-3">
            <input
              type="text"
              value={lookupWordInput}
              onChange={(e) => setLookupWordInput(e.target.value)}
              placeholder="TYPE UNKNOWN WORD HERE..."
              className="flex-1 border-2 border-black p-2 text-xs font-mono uppercase bg-gray-50 focus:bg-white focus:outline-none placeholder:text-gray-400 text-black"
            />
            <button
              type="submit"
              className="border-2 border-black bg-[#FFD833] shadow-[2px_2px_0_0_#000] px-3 py-1 font-bold text-xs cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
            >
              GO
            </button>
          </form>

          {dictionaryLoading && (
            <div className="border-2 border-black p-3 bg-[#FF99DD] animate-pulse text-xs font-bold text-center uppercase tracking-wider shadow-[2px_2px_0_0_#000] text-black">
              DICTIONARY IS SEARCHING...
            </div>
          )}

          {dictionaryError && (
            <div className="border-2 border-black p-3 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_0_#000]">
              {dictionaryError}
            </div>
          )}

          {dictionaryResult && (
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
              <div className="text-[11px] leading-relaxed whitespace-pre-wrap font-mono uppercase tracking-wide border-2 border-black p-3 bg-gray-50 shadow-[2px_2px_0_0_#000] text-black">
                {dictionaryResult}
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setIsDictionaryOpen(!isDictionaryOpen)}
        className="fixed bottom-6 right-6 border-2 border-black bg-[#00FF88] shadow-[4px_4px_0_0_#000] p-3 font-mono font-bold tracking-wider z-50 cursor-pointer select-none active:translate-x-0.5 active:translate-y-0.5 transition-transform text-black text-xs"
      >
        📖 DICTIONARY
      </button>
    </div>
  );
}
