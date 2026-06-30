import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Zap, 
  ArrowRight, 
  Cpu, 
  Database, 
  MessageSquare,
  Star,
  Github,
  Menu,
  X,
  Sparkles,
  Info,
  DollarSign,
  User,
  Heart,
  Globe,
  Compass
} from 'lucide-react';

interface LandingPageProps {
  onEnterPortal: (toRegister?: boolean) => void;
}

type ModalType = 'pricing' | 'help' | null;

export function LandingPage({ onEnterPortal }: LandingPageProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-white flex flex-col justify-between relative overflow-x-hidden select-none"
      style={{
        backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* 1. Top Nav Layout Container */}
      <nav className="border-b-4 border-black bg-white px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        {/* Left Room: Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-[#FFD833] border-2 border-black p-1.5 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            <span className="font-mono text-xs font-black uppercase text-black">
              EDUSPHERE //
            </span>
          </div>
        </div>

        {/* Middle Room: Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('methodology')}
            className="font-mono text-xs font-bold uppercase tracking-widest text-black hover:underline hover:underline-offset-4 decoration-4 transition-all"
          >
            FEATURES
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="font-mono text-xs font-bold uppercase tracking-widest text-black hover:underline hover:underline-offset-4 decoration-4 transition-all"
          >
            PRICING
          </button>
          <button 
            onClick={() => setActiveModal('help')}
            className="font-mono text-xs font-bold uppercase tracking-widest text-black hover:underline hover:underline-offset-4 decoration-4 transition-all"
          >
            HELP & SUPPORT
          </button>
        </div>

        {/* Right Room: Icons + Primary CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(0,0,0,1)] transition-all"
          >
            <Github size={16} className="text-black" />
          </a>
          <button 
            onClick={() => onEnterPortal(true)}
            className="bg-[#00FF88] border-2 border-black px-4 py-2 font-mono text-xs font-black uppercase tracking-widest text-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(0,0,0,1)] transition-all cursor-pointer"
          >
            START QUEST // FREE
          </button>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(0,0,0,1)] transition-all"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown Matrix */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b-4 border-black bg-white p-6 space-y-4 animate-brutalist-dropdown z-40 relative">
          <button 
            onClick={() => scrollToSection('methodology')}
            className="block w-full text-left font-mono text-xs font-black uppercase tracking-widest text-black py-2 border-b-2 border-dashed border-gray-200"
          >
            FEATURES
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); scrollToSection('pricing'); }}
            className="block w-full text-left font-mono text-xs font-black uppercase tracking-widest text-black py-2 border-b-2 border-dashed border-gray-200"
          >
            PRICING
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); setActiveModal('help'); }}
            className="block w-full text-left font-mono text-xs font-black uppercase tracking-widest text-black py-2 border-b-2 border-dashed border-gray-200"
          >
            HELP & SUPPORT
          </button>
          <div className="flex gap-4 pt-2">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white border-2 border-black p-2 flex-1 flex justify-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
            >
              <Github size={16} />
            </a>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); onEnterPortal(true); }}
              className="bg-[#00FF88] border-2 border-black px-4 py-2 flex-[2] font-mono text-xs font-black uppercase tracking-widest text-black text-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
            >
              START QUEST // FREE
            </button>
          </div>
        </div>
      )}

      {/* Main Hero & Bento Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 my-12 z-10 max-w-6xl mx-auto w-full gap-16">
        
        {/* Hero Section */}
        <section className="text-center space-y-8 w-full max-w-4xl relative">
          {/* Decorative tag */}
          <div className="inline-block bg-[#00FF88] border-2 border-black px-3 py-1 font-mono text-[10px] font-bold text-black uppercase tracking-widest shadow-[2px_2px_0_0_rgba(0,0,0,1)] -rotate-1 mb-2">
            PROTOCOL // EDUCATION_EVOLVED_2026
          </div>
          
          <h1 className="font-serif text-5xl md:text-8xl font-black tracking-tighter uppercase text-black leading-none">
            EDUCATION UNLOCKED.<br />
            <span className="bg-[#FFD833] border-4 border-black px-4 inline-block my-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)] transform rotate-1">
              QUESTS CONQUERED.
            </span>
          </h1>

          <p className="font-mono text-sm md:text-base uppercase tracking-wider text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed">
            &gt; A gamified curriculum engine built to transform passive reading into active, XP-rewarded skill acquisition. No manual submissions. Real-time telemetry.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onEnterPortal(true)}
              className="w-full sm:w-auto bg-[#00FF88] border-3 border-black px-8 py-4 font-mono text-sm font-black uppercase tracking-widest text-black flex items-center justify-center gap-3 cursor-pointer shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all duration-100"
            >
              <span>START LEARNING // GO TO PORTAL</span>
              <ArrowRight size={18} className="stroke-[3]" />
            </button>
            
            <button
              onClick={() => onEnterPortal(false)}
              className="w-full sm:w-auto bg-white border-3 border-black px-8 py-4 font-mono text-sm font-black uppercase tracking-widest text-black flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(0,0,0,1)] transition-all duration-100"
            >
              <span>SIGN IN</span>
            </button>
          </div>

          {/* Floater Badge (Neo-brutalist visual element) */}
          <div className="hidden lg:block absolute -top-8 -right-8 bg-[#A7F3D0] border-2 border-black p-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rotate-12">
            <div className="flex items-center gap-1.5">
              <Star size={16} className="fill-[#FFD833] stroke-black" />
              <span className="font-mono text-[9px] font-black text-black">100% BECE READY</span>
            </div>
          </div>
        </section>

        {/* Core Feature Pills Section */}
        <section className="w-full flex flex-wrap justify-center gap-4 md:gap-6">
          <div className="bg-[#FFF3C4] border-2 border-black px-4 py-2.5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center gap-3">
            <Cpu size={18} className="text-black" />
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              NO MANUAL SUBMISSIONS
            </span>
          </div>
          <div className="bg-[#E0F2FE] border-2 border-black px-4 py-2.5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center gap-3">
            <MessageSquare size={18} className="text-black" />
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              INSTANT ERROR EXPLANATIONS
            </span>
          </div>
          <div className="bg-[#DCFCE7] border-2 border-black px-4 py-2.5 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center gap-3">
            <Database size={18} className="text-black" />
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              CONVEX REAL-TIME DB
            </span>
          </div>
        </section>

        {/* Bento Grid Methodology Layout */}
        <section id="methodology" className="w-full space-y-6 pt-8">
          <div className="border-b-4 border-black pb-2">
            <h2 className="font-serif text-3xl font-black uppercase tracking-tight text-black">
              THE METHODOLOGY PIPELINE
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
              Three interconnected phases driving student comprehension.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Box 1: Library Study */}
            <div className="bg-white border-3 border-black p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex flex-col justify-between min-h-[280px] group hover:bg-[#FFF] hover:translate-y-[-2px] transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#FFD833] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                  <BookOpen size={24} className="text-black" />
                </div>
                <div className="space-y-2">
                  <div className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    PHASE_01 // THEORY
                  </div>
                  <h3 className="font-serif text-2xl font-black uppercase tracking-tight text-black">
                    Library Study
                  </h3>
                  <p className="font-mono text-xs text-gray-700 leading-relaxed">
                    Explore curated text libraries containing target academic curricula. Dive deep into theory without distracting visual noise or irrelevant context.
                  </p>
                </div>
              </div>
              <div className="border-t-2 border-black pt-4 mt-6 flex items-center justify-between font-mono text-[9px] font-bold text-black uppercase">
                <span>CURRICULUM MODULES</span>
                <span className="bg-black text-white px-2 py-0.5">READY</span>
              </div>
            </div>

            {/* Bento Box 2: Hands-on Quest Steps */}
            <div className="bg-white border-3 border-black p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex flex-col justify-between min-h-[280px] group hover:bg-[#FFF] hover:translate-y-[-2px] transition-all relative">
              {/* Hot tag label */}
              <div className="absolute top-4 right-4 bg-[#FF3B30] text-white border-2 border-black px-2 py-0.5 font-mono text-[8px] font-black uppercase tracking-wider rotate-6">
                INTERACTIVE
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#38BDF8] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                  <Compass size={24} className="text-black" />
                </div>
                <div className="space-y-2">
                  <div className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    PHASE_02 // APPLICATION
                  </div>
                  <h3 className="font-serif text-2xl font-black uppercase tracking-tight text-black">
                    Interactive Quests
                  </h3>
                  <p className="font-mono text-xs text-gray-700 leading-relaxed">
                    Move past reading with interactive steps. Decode instructions, use hidden hints when stuck, and dynamically experiment to build muscle memory.
                  </p>
                </div>
              </div>
              <div className="border-t-2 border-black pt-4 mt-6 flex items-center justify-between font-mono text-[9px] font-bold text-black uppercase">
                <span>HIDDEN HINTS PROMPT</span>
                <span className="bg-[#38BDF8] px-2 py-0.5">ACTIVE</span>
              </div>
            </div>

            {/* Bento Box 3: Multiple-Choice Quizzes */}
            <div className="bg-white border-3 border-black p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex flex-col justify-between min-h-[280px] group hover:bg-[#FFF] hover:translate-y-[-2px] transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#00FF88] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                  <Zap size={24} className="text-black" />
                </div>
                <div className="space-y-2">
                  <div className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    PHASE_03 // VERIFICATION
                  </div>
                  <h3 className="font-serif text-2xl font-black uppercase tracking-tight text-black">
                    XP Rewards & Quizzes
                  </h3>
                  <p className="font-mono text-xs text-gray-700 leading-relaxed">
                    Test your understanding with real-time feedback quizzes. Earn experience points (XP) to climb the student leaderboards and prove curriculum mastery.
                  </p>
                </div>
              </div>
              <div className="border-t-2 border-black pt-4 mt-6 flex items-center justify-between font-mono text-[9px] font-bold text-black uppercase">
                <span>XP REWARDS TELEMETRY</span>
                <span className="bg-[#00FF88] px-2 py-0.5">LIVE</span>
              </div>
            </div>

          </div>
        </section>

        {/* Pricing Table Section */}
        <section id="pricing" className="w-full space-y-8 pt-8">
          <div className="border-b-4 border-black pb-2">
            <h2 className="font-serif text-3xl font-black uppercase tracking-tight text-black">
              PRICING PLANS
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-gray-500">
              Select your academic acceleration pace. All metrics in Ghana Cedis (GH₵).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            
            {/* Tier 1: Weekly Sprint */}
            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex flex-col justify-between min-h-[380px] hover:translate-y-[-2px] transition-all">
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                    TIER_01 // PACING
                  </div>
                  <h3 className="font-serif text-2xl font-black uppercase tracking-tight text-black">
                    Weekly Sprint
                  </h3>
                </div>

                <div className="border-y-2 border-black py-4 flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-black text-black">GH₵ 20</span>
                  <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-wider">/ week</span>
                </div>

                <p className="font-mono text-xs text-gray-700 leading-relaxed">
                  Perfect for flexible tracking and targeted lesson review blocks.
                </p>

                <ul className="space-y-2.5 font-mono text-[11px] uppercase tracking-wide text-black font-bold">
                  <li className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#00FF88] border border-black inline-block"></span>
                    <span>Full Library Reading blocks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#00FF88] border border-black inline-block"></span>
                    <span>Step-by-Step Quests with active hints</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#00FF88] border border-black inline-block"></span>
                    <span>Instant MCQs & Real-time XP tracking</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onEnterPortal(true)}
                className="w-full bg-white hover:bg-gray-100 border-2 border-black py-3 font-mono text-xs font-black uppercase tracking-widest text-black text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all mt-8"
              >
                START SPRINT // GO
              </button>
            </div>

            {/* Tier 2: Monthly Mastery */}
            <div className="bg-[#FFF3C4] border-4 border-black p-6 md:p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex flex-col justify-between min-h-[380px] hover:translate-y-[-2px] transition-all relative">
              {/* Floating Best Value Badge */}
              <div className="absolute -top-4 -right-4 bg-[#FFD833] text-black border-2 border-black px-2 py-1 font-mono text-[8px] font-black uppercase tracking-wider rotate-6 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                BEST VALUE //
              </div>

              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                    TIER_02 // MASTERY
                  </div>
                  <h3 className="font-serif text-2xl font-black uppercase tracking-tight text-black">
                    Monthly Mastery
                  </h3>
                </div>

                <div className="border-y-2 border-black py-4 flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-black text-black">GH₵ 100</span>
                  <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-wider">/ month</span>
                </div>

                <p className="font-mono text-xs text-gray-700 leading-relaxed">
                  Continuous pipeline access. Saves GH₵ 20 compared to weekly pacing.
                </p>

                <ul className="space-y-2.5 font-mono text-[11px] uppercase tracking-wide text-black font-bold">
                  <li className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#00FF88] border border-black inline-block"></span>
                    <span>Full Library Reading blocks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#00FF88] border border-black inline-block"></span>
                    <span>Step-by-Step Quests with active hints</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#00FF88] border border-black inline-block"></span>
                    <span>Instant MCQs & Real-time XP tracking</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onEnterPortal(true)}
                className="w-full bg-[#00FF88] border-2 border-black py-3 font-mono text-xs font-black uppercase tracking-widest text-black text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all mt-8"
              >
                ACQUIRE ACCESS PASS // SAVE
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* Decorative Footer Status Bar */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center z-10 border-t-4 border-black p-6 bg-white gap-4">
        <div className="flex flex-wrap items-center gap-2 justify-center">
          <span className="font-mono text-[9px] font-bold text-black uppercase tracking-wider">
            EDUSPHERE // THE NEXT-GEN LEARNING GATEWAY
          </span>
          <span className="bg-[#FFD833] border border-black px-1.5 py-0.5 font-mono text-[8px] font-bold text-black">
            EST. 2026
          </span>
        </div>
        <div className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-wider">
          PLATFORM CORE // CONNECTED via SECURE ORBITAL BEACON
        </div>
      </footer>

      {/* Interactive Neo-Brutalist Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative select-none">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute -top-4 -right-4 bg-[#FF3B30] text-white border-2 border-black p-1.5 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all"
            >
              <X size={16} className="stroke-[3]" />
            </button>

            {/* Modal Title */}
            <div className="border-b-4 border-black pb-4 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#FFD833] border-2 border-black px-2 py-0.5 font-mono text-[9px] font-black uppercase text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] mb-3">
                {activeModal === 'pricing' ? <DollarSign size={10} /> : <HelpCircle size={10} />}
                <span>{activeModal === 'pricing' ? 'ORBITAL_METRICS // PRICING' : 'SECURE_GATEWAY // SUPPORT'}</span>
              </div>
              <h2 className="font-serif text-3xl font-black uppercase tracking-tight text-black">
                {activeModal === 'pricing' ? 'Plan Allocation' : 'Help Desk & Telemetry'}
              </h2>
            </div>

            {/* Modal Content */}
            {activeModal === 'pricing' ? (
              <div className="space-y-4 font-mono text-xs">
                <div className="border-2 border-black p-4 bg-[#FFF3C4] shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-black uppercase text-sm">LEARNER PASS</span>
                    <span className="bg-black text-[#00FF88] px-2 py-0.5 font-black text-[10px]">$0 // FREE</span>
                  </div>
                  <p className="text-gray-700 text-[11px] uppercase leading-relaxed">
                    Access to all interactive quests, libraries, study notes, live leaderboards, and instant error telemetry.
                  </p>
                </div>

                <div className="border-2 border-black p-4 bg-[#E2F5FF] shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-black uppercase text-sm">TRANSMITTER SUITE</span>
                    <span className="bg-black text-[#38BDF8] px-2 py-0.5 font-black text-[10px]">$0 // FREE</span>
                  </div>
                  <p className="text-gray-700 text-[11px] uppercase leading-relaxed">
                    Designed for instructors. Access custom quest creators, automated grading metrics, student logs, and role assigners.
                  </p>
                </div>

                <button 
                  onClick={() => { setActiveModal(null); onEnterPortal(true); }}
                  className="w-full bg-[#00FF88] border-2 border-black py-3 font-mono text-xs font-black uppercase text-black text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all mt-4"
                >
                  ACQUIRE FREE ACCESS PASS NOW
                </button>
              </div>
            ) : (
              <div className="space-y-4 font-mono text-xs">
                <p className="text-gray-700 uppercase leading-relaxed text-[11px] mb-4">
                  Need help navigating the EduSphere learning network? Connect through our dedicated support terminals:
                </p>

                <div className="border-2 border-black p-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                  <span className="font-bold">DOCUMENTATION HUB</span>
                  <a href="#docs" className="bg-[#38BDF8] border border-black px-2 py-0.5 text-[10px] font-bold">docs.edusphere.net</a>
                </div>

                <div className="border-2 border-black p-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                  <span className="font-bold">EMAIL PROTOCOL</span>
                  <a href="mailto:support@edusphere.net" className="bg-[#A7F3D0] border border-black px-2 py-0.5 text-[10px] font-bold">support@edusphere.net</a>
                </div>

                <div className="border-2 border-black p-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                  <span className="font-bold">COMMUNITY TERMINAL</span>
                  <span className="text-[10px] font-bold text-gray-500">DISCORD SERVER // INCOMING</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
