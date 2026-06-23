import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  PlayCircle,
  FileText,
  ArrowLeft,
  GraduationCap,
  Layers,
  Lock
} from 'lucide-react';
import { useState } from 'react';

/* ─── Data Model ────────────────────────────────────────────────────── */

interface TopicResource {
  id: string;
  title: string;
  type: 'note' | 'video';
  duration?: string;   // e.g. "12 min" for videos
  locked?: boolean;
}

interface Subject {
  id: string;
  name: string;
  color: string;       // bg color for cards
  topics: TopicResource[];
}

interface ClassGrade {
  id: string;
  label: string;
  tag: string;         // monospaced tag label
  subjects: Subject[];
}

const LIBRARY_DATA: ClassGrade[] = [
  {
    id: 'basic-7',
    label: 'Basic 7',
    tag: 'JHS_01',
    subjects: [
      {
        id: 'b7-math',
        name: 'Mathematics',
        color: '#FFD833',
        topics: [
          { id: 'b7-m-1', title: 'Introduction to Integers', type: 'note' },
          { id: 'b7-m-2', title: 'Basic Operations on Integers', type: 'video', duration: '14 min' },
          { id: 'b7-m-3', title: 'Fractions and Decimals', type: 'note' },
          { id: 'b7-m-4', title: 'Ratios and Proportions', type: 'video', duration: '18 min' },
          { id: 'b7-m-5', title: 'Introduction to Algebra', type: 'note' },
          { id: 'b7-m-6', title: 'Perimeter and Area', type: 'video', duration: '11 min', locked: true },
        ]
      },
      {
        id: 'b7-science',
        name: 'Integrated Science',
        color: '#A7F3D0',
        topics: [
          { id: 'b7-s-1', title: 'The Scientific Method', type: 'note' },
          { id: 'b7-s-2', title: 'Classification of Living Things', type: 'video', duration: '16 min' },
          { id: 'b7-s-3', title: 'Matter and Its Properties', type: 'note' },
          { id: 'b7-s-4', title: 'Forces and Motion', type: 'video', duration: '20 min' },
          { id: 'b7-s-5', title: 'The Human Body Systems', type: 'note', locked: true },
        ]
      },
      {
        id: 'b7-english',
        name: 'English Language',
        color: '#38BDF8',
        topics: [
          { id: 'b7-e-1', title: 'Parts of Speech', type: 'note' },
          { id: 'b7-e-2', title: 'Sentence Structures', type: 'video', duration: '10 min' },
          { id: 'b7-e-3', title: 'Reading Comprehension Strategies', type: 'note' },
          { id: 'b7-e-4', title: 'Narrative Writing', type: 'video', duration: '15 min' },
        ]
      },
      {
        id: 'b7-ict',
        name: 'ICT',
        color: '#C4B5FD',
        topics: [
          { id: 'b7-i-1', title: 'Introduction to Computers', type: 'note' },
          { id: 'b7-i-2', title: 'Computer Hardware & Software', type: 'video', duration: '12 min' },
          { id: 'b7-i-3', title: 'Introduction to Algorithms', type: 'note' },
          { id: 'b7-i-4', title: 'Using Productivity Tools', type: 'video', duration: '18 min', locked: true },
        ]
      },
      {
        id: 'b7-social',
        name: 'Social Studies',
        color: '#FCA5A5',
        topics: [
          { id: 'b7-ss-1', title: 'Our Environment', type: 'note' },
          { id: 'b7-ss-2', title: 'The Family and Community', type: 'video', duration: '13 min' },
          { id: 'b7-ss-3', title: 'Maps and Directions', type: 'note' },
        ]
      }
    ]
  },
  {
    id: 'basic-8',
    label: 'Basic 8',
    tag: 'JHS_02',
    subjects: [
      {
        id: 'b8-math',
        name: 'Mathematics',
        color: '#FFD833',
        topics: [
          { id: 'b8-m-1', title: 'Linear Equations in One Variable', type: 'note' },
          { id: 'b8-m-2', title: 'Graphs of Linear Functions', type: 'video', duration: '16 min' },
          { id: 'b8-m-3', title: 'Angles and Triangles', type: 'note' },
          { id: 'b8-m-4', title: 'Statistics and Data Handling', type: 'video', duration: '14 min' },
          { id: 'b8-m-5', title: 'Sets and Venn Diagrams', type: 'note', locked: true },
        ]
      },
      {
        id: 'b8-science',
        name: 'Integrated Science',
        color: '#A7F3D0',
        topics: [
          { id: 'b8-s-1', title: 'Photosynthesis and Respiration', type: 'note' },
          { id: 'b8-s-2', title: 'Chemical Reactions', type: 'video', duration: '19 min' },
          { id: 'b8-s-3', title: 'Energy and Work', type: 'note' },
          { id: 'b8-s-4', title: 'The Solar System', type: 'video', duration: '22 min' },
        ]
      },
      {
        id: 'b8-english',
        name: 'English Language',
        color: '#38BDF8',
        topics: [
          { id: 'b8-e-1', title: 'Tenses and Verb Forms', type: 'note' },
          { id: 'b8-e-2', title: 'Persuasive Writing', type: 'video', duration: '14 min' },
          { id: 'b8-e-3', title: 'Poetry Analysis', type: 'note' },
          { id: 'b8-e-4', title: 'Oral Communication Skills', type: 'video', duration: '11 min' },
        ]
      },
      {
        id: 'b8-ict',
        name: 'ICT',
        color: '#C4B5FD',
        topics: [
          { id: 'b8-i-1', title: 'Networking Fundamentals', type: 'note' },
          { id: 'b8-i-2', title: 'Introduction to Programming', type: 'video', duration: '20 min' },
          { id: 'b8-i-3', title: 'Internet Safety and Ethics', type: 'note' },
        ]
      },
      {
        id: 'b8-social',
        name: 'Social Studies',
        color: '#FCA5A5',
        topics: [
          { id: 'b8-ss-1', title: "Ghana's Independence Struggle", type: 'note' },
          { id: 'b8-ss-2', title: 'Government and Democracy', type: 'video', duration: '17 min' },
          { id: 'b8-ss-3', title: 'Trade and Economic Systems', type: 'note' },
        ]
      }
    ]
  },
  {
    id: 'basic-9',
    label: 'Basic 9',
    tag: 'JHS_03',
    subjects: [
      {
        id: 'b9-math',
        name: 'Mathematics',
        color: '#FFD833',
        topics: [
          { id: 'b9-m-1', title: 'Quadratic Equations', type: 'note' },
          { id: 'b9-m-2', title: 'Trigonometry Basics', type: 'video', duration: '22 min' },
          { id: 'b9-m-3', title: 'Probability and Chance', type: 'note' },
          { id: 'b9-m-4', title: 'Vectors and Transformations', type: 'video', duration: '18 min' },
          { id: 'b9-m-5', title: 'Mensuration: Circles & Solids', type: 'note' },
          { id: 'b9-m-6', title: 'BECE Preparation Review', type: 'video', duration: '30 min', locked: true },
        ]
      },
      {
        id: 'b9-science',
        name: 'Integrated Science',
        color: '#A7F3D0',
        topics: [
          { id: 'b9-s-1', title: 'Electricity and Magnetism', type: 'note' },
          { id: 'b9-s-2', title: 'Genetics and Heredity', type: 'video', duration: '18 min' },
          { id: 'b9-s-3', title: 'Acids, Bases and Salts', type: 'note' },
          { id: 'b9-s-4', title: 'Ecology and the Environment', type: 'video', duration: '15 min' },
        ]
      },
      {
        id: 'b9-english',
        name: 'English Language',
        color: '#38BDF8',
        topics: [
          { id: 'b9-e-1', title: 'Essay Writing Techniques', type: 'note' },
          { id: 'b9-e-2', title: 'Summary and Comprehension', type: 'video', duration: '16 min' },
          { id: 'b9-e-3', title: 'Literature: Prose and Drama', type: 'note' },
          { id: 'b9-e-4', title: 'Oral Presentation Skills', type: 'video', duration: '12 min' },
        ]
      },
      {
        id: 'b9-ict',
        name: 'ICT',
        color: '#C4B5FD',
        topics: [
          { id: 'b9-i-1', title: 'Web Design Basics', type: 'note' },
          { id: 'b9-i-2', title: 'Database Concepts', type: 'video', duration: '20 min' },
          { id: 'b9-i-3', title: 'Flowcharts and Pseudocode', type: 'note' },
          { id: 'b9-i-4', title: 'BECE ICT Prep', type: 'video', duration: '25 min', locked: true },
        ]
      },
      {
        id: 'b9-social',
        name: 'Social Studies',
        color: '#FCA5A5',
        topics: [
          { id: 'b9-ss-1', title: 'Globalisation and Trade', type: 'note' },
          { id: 'b9-ss-2', title: 'Human Rights and Civic Duties', type: 'video', duration: '14 min' },
          { id: 'b9-ss-3', title: 'Population and Migration', type: 'note' },
          { id: 'b9-ss-4', title: 'BECE Social Studies Revision', type: 'video', duration: '28 min', locked: true },
        ]
      }
    ]
  }
];

/* ─── Component ─────────────────────────────────────────────────────── */

type LibraryScreen = 'grades' | 'subjects' | 'topics';

export function LibraryView() {
  const [screen, setScreen] = useState<LibraryScreen>('grades');
  const [expandedGrade, setExpandedGrade] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<ClassGrade | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleGradeToggle = (gradeId: string) => {
    setExpandedGrade(prev => (prev === gradeId ? null : gradeId));
  };

  const handleSubjectClick = (grade: ClassGrade, subject: Subject) => {
    setSelectedGrade(grade);
    setSelectedSubject(subject);
    setScreen('topics');
  };

  const handleBack = () => {
    if (screen === 'topics') {
      setScreen('grades');
      setSelectedSubject(null);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-10 hide-scrollbar pb-24 md:pb-10 max-w-6xl mx-auto w-full bg-white select-none">

      {/* ═══════════════════════════════════════════════════════════════
           SCREEN: TOPIC LISTING (Notes & Videos for a subject)
         ═══════════════════════════════════════════════════════════════ */}
      {screen === 'topics' && selectedGrade && selectedSubject ? (
        <div className="space-y-8">
          {/* Back navigation */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:translate-x-[-2px] transition-transform" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
              RETURN_TO_LIBRARY
            </span>
          </button>

          {/* Header */}
          <div className="border-b-4 border-black pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
                {selectedGrade.tag} // {selectedSubject.name.toUpperCase()}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none">
                {selectedSubject.name}
              </h1>
              <p className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">
                {selectedGrade.label} &middot; {selectedSubject.topics.length} Resources
              </p>
            </div>
            <div
              className="px-4 py-2 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
              style={{ backgroundColor: selectedSubject.color }}
            >
              <span className="font-mono text-[9px] font-bold text-black uppercase tracking-widest">
                {selectedSubject.topics.filter(t => t.type === 'note').length} NOTES &middot; {selectedSubject.topics.filter(t => t.type === 'video').length} VIDEOS
              </span>
            </div>
          </div>

          {/* Topic Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedSubject.topics.map((topic) => (
              <div
                key={topic.id}
                className={`border-2 border-black rounded-none p-5 flex items-start gap-4 transition-all duration-100 relative overflow-hidden
                  ${topic.locked
                    ? 'opacity-50 pointer-events-none'
                    : 'cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]'
                  }
                  shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                `}
                style={{ backgroundColor: topic.locked ? '#F3F4F6' : selectedSubject.color + '30' }}
              >
                {/* Locked overlay */}
                {topic.locked && (
                  <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                    <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <Lock size={16} className="text-black" />
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-10 h-10 border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                  style={{ backgroundColor: selectedSubject.color }}
                >
                  {topic.type === 'note' ? (
                    <FileText size={18} className="text-black" />
                  ) : (
                    <PlayCircle size={18} className="text-black" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-mono text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 border border-black
                      ${topic.type === 'note' ? 'bg-white text-black' : 'bg-black text-white'}
                    `}>
                      {topic.type === 'note' ? 'NOTE' : 'VIDEO'}
                    </span>
                    {topic.duration && (
                      <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider">
                        {topic.duration}
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-base md:text-lg font-bold uppercase tracking-tight text-black truncate">
                    {topic.title}
                  </h4>
                </div>

                <ChevronRight size={16} className="text-gray-400 flex-shrink-0 mt-3" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ═══════════════════════════════════════════════════════════════
             SCREEN: GRADE LIST with Subject Dropdowns
           ═══════════════════════════════════════════════════════════════ */
        <div className="space-y-10">
          {/* Page Header */}
          <div className="border-b-4 border-black pb-6">
            <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-2">
              NODE // CURRICULUM_ARCHIVE
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none">
              Library
            </h1>
            <p className="font-sans text-sm text-gray-600 mt-3 leading-relaxed max-w-xl">
              Browse all available classes and subjects. Select a subject to access its full collection of notes and video modules.
            </p>
          </div>

          {/* Grade Accordion Cards */}
          <div className="space-y-6">
            {LIBRARY_DATA.map((grade) => {
              const isExpanded = expandedGrade === grade.id;

              return (
                <div
                  key={grade.id}
                  className={`border-2 border-black rounded-none overflow-hidden transition-all duration-100
                    ${isExpanded
                      ? 'shadow-[6px_6px_0_0_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]'
                      : 'shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                    }
                  `}
                >
                  {/* Grade Header Button */}
                  <button
                    onClick={() => handleGradeToggle(grade.id)}
                    className={`w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer transition-colors
                      ${isExpanded ? 'bg-[#FFD833]' : 'bg-[#F3F4F6] hover:bg-gray-200'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 border-2 border-black flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                        ${isExpanded ? 'bg-white' : 'bg-white'}
                      `}>
                        <GraduationCap size={24} className="text-black" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
                          {grade.label}
                        </h2>
                        <span className="font-mono text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                          {grade.tag} // {grade.subjects.length} SUBJECTS
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      size={24}
                      className={`text-black transition-transform duration-200 flex-shrink-0
                        ${isExpanded ? 'rotate-180' : ''}
                      `}
                    />
                  </button>

                  {/* Subject List Dropdown */}
                  {isExpanded && (
                    <div className="border-t-2 border-black bg-white p-4 md:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {grade.subjects.map((subject) => (
                          <button
                            key={subject.id}
                            onClick={() => handleSubjectClick(grade, subject)}
                            className="border-2 border-black rounded-none p-4 text-left transition-all duration-100 cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] shadow-[2px_2px_0_0_rgba(0,0,0,1)] group"
                            style={{ backgroundColor: subject.color }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="w-8 h-8 bg-white border border-black flex items-center justify-center">
                                <Layers size={14} className="text-black" />
                              </div>
                              <ChevronRight size={14} className="text-black group-hover:translate-x-1 transition-transform" />
                            </div>
                            <h3 className="font-serif text-lg font-bold uppercase tracking-tight text-black mb-1">
                              {subject.name}
                            </h3>
                            <span className="font-mono text-[8px] font-bold text-black/70 uppercase tracking-widest">
                              {subject.topics.length} RESOURCES
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
