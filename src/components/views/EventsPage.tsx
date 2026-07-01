import { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Layers, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  category: 'Academic' | 'Cultural' | 'Professional';
  pillLabel: string;
  date: string;
  location: string;
  blurb: string;
  bgColor: string;
  patternStyle: string;
  imageLabel: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: '1',
    title: 'ORBITAL OBSERVATORY EXCURSION',
    category: 'Academic',
    pillLabel: 'EXCURSION',
    date: 'JULY 14, 2026',
    location: 'NATIONAL SPACE CENTRE',
    blurb: 'A scientific journey to Node 1 to capture real-time planetary telemetry and study stellar alignment protocols.',
    bgColor: 'bg-[#38BDF8]',
    patternStyle: 'radial-dots',
    imageLabel: 'OBSERVATORY_TELEMETRY'
  },
  {
    id: '2',
    title: 'LIBERATION JUBILEE CELEBRATION',
    category: 'Cultural',
    pillLabel: 'CELEBRATION',
    date: 'MARCH 6, 2026',
    location: 'MAIN ASSEMBLY PLAZA',
    blurb: 'Annual national sovereignty festival featuring traditional choreographies, historical archives, and student debates.',
    bgColor: 'bg-[#FFD833]',
    patternStyle: 'diagonal-stripes',
    imageLabel: 'CULTURAL_HERITAGE'
  },
  {
    id: '3',
    title: 'SYS_ADMIN CAREER DAY',
    category: 'Professional',
    pillLabel: 'CAREER DAY',
    date: 'OCTOBER 22, 2026',
    location: 'CYBER LABS & TECH SUITES',
    blurb: 'Connect with cybersecurity specialists, software architects, and tech innovators routing future pathways.',
    bgColor: 'bg-[#00FF88]',
    patternStyle: 'grid-lines',
    imageLabel: 'CAREER_PORTAL_CORE'
  },
  {
    id: '4',
    title: 'ANNUAL SCIENCE & TECH FAIR',
    category: 'Academic',
    pillLabel: 'EXCURSION',
    date: 'NOVEMBER 12, 2026',
    location: 'INNOVATION CENTRE',
    blurb: 'Students showcase interactive data pipelines, algorithmic engines, and physics simulators built on the platform.',
    bgColor: 'bg-[#A7F3D0]',
    patternStyle: 'diagonal-stripes',
    imageLabel: 'SCIENCE_FAIR_ARCHIVE'
  },
  {
    id: '5',
    title: 'NEO-BRUTALIST ART DISPLAY',
    category: 'Cultural',
    pillLabel: 'EXHIBITION',
    date: 'DECEMBER 05, 2026',
    location: 'CREATIVE COMMONS',
    blurb: 'Exposing digital interfaces, high-contrast layouts, and physical sculptures built with geometric alignment rules.',
    bgColor: 'bg-[#FFF3C4]',
    patternStyle: 'radial-dots',
    imageLabel: 'DESIGN_GALLERY'
  },
  {
    id: '6',
    title: 'ALUMNI CONVERGENCE PROTOCOL',
    category: 'Professional',
    pillLabel: 'NETWORKING',
    date: 'JANUARY 18, 2027',
    location: 'AUDITORIUM HALL B',
    blurb: 'An operational networking link for scholars to bridge academic outcomes with real-world career assignments.',
    bgColor: 'bg-[#E0F2FE]',
    patternStyle: 'grid-lines',
    imageLabel: 'NETWORKING_NODE'
  }
];

export function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Academic' | 'Cultural' | 'Professional'>('All');

  const filteredEvents = EVENTS_DATA.filter(event => 
    activeCategory === 'All' ? true : event.category === activeCategory
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Header Block */}
      <header className="border-4 border-black p-6 md:p-10 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] relative">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-block bg-[#00FF88] border-2 border-black px-3 py-1 font-mono text-[10px] font-bold text-black uppercase tracking-widest shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
            ARCHIVES // SCHEDULE
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-black uppercase text-black leading-none">
            CAMPUS EVENTS &<br />
            <span className="bg-[#FFD833] border-4 border-black px-3 inline-block my-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)] -rotate-1">
              EXCURSIONS
            </span>
          </h1>
          <p className="font-mono text-xs uppercase tracking-wider text-gray-700 max-w-2xl leading-relaxed">
            &gt; Discover the dynamic activities programmed at EduSphere. From academic explorations to cultural celebrations, these events connect theoretical pipelines to real-world experience.
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="flex flex-wrap items-center gap-3 border-4 border-black p-4 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        <span className="font-mono text-xs font-black uppercase tracking-widest text-black flex items-center gap-2 mr-2">
          <Layers size={14} /> FILTER_NODE:
        </span>
        {(['All', 'Academic', 'Cultural', 'Professional'] as const).map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-mono text-xs font-black uppercase tracking-widest px-4 py-2 border-2 border-black transition-all cursor-pointer ${
                isActive 
                  ? 'bg-black text-white shadow-none' 
                  : 'bg-white text-black hover:bg-[#FFD833] shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
              }`}
            >
              {category.toUpperCase()}
            </button>
          );
        })}
      </section>

      {/* Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <div 
            key={event.id}
            className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
          >
            <div>
              {/* Event Imagery Placeholder */}
              <div className={`w-full h-44 ${event.bgColor} border-4 border-black mb-5 relative overflow-hidden flex flex-col justify-between p-4`}>
                {/* Decorative Grid Lines / Dots */}
                {event.patternStyle === 'radial-dots' && (
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
                      backgroundSize: '12px 12px'
                    }}
                  />
                )}
                {event.patternStyle === 'diagonal-stripes' && (
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 8px)',
                      backgroundSize: '8px 8px'
                    }}
                  />
                )}
                {event.patternStyle === 'grid-lines' && (
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                      backgroundSize: '16px 16px'
                    }}
                  />
                )}
                <div className="z-10 flex justify-between items-start w-full">
                  <span className="bg-white border-2 border-black px-2 py-0.5 font-mono text-[8px] font-bold text-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                    TELEMETRY_LINK
                  </span>
                  <Sparkles size={16} className="text-black stroke-[2]" />
                </div>
                <div className="z-10 bg-black text-white p-2 border-2 border-black font-mono text-[8px] font-black uppercase tracking-widest truncate shadow-[2px_2px_0_0_rgba(0,0,0,1)] w-fit max-w-full">
                  {event.imageLabel}
                </div>
              </div>

              {/* Category Pill */}
              <div className="bg-[#FFD833] border-2 border-black px-2.5 py-1 text-[9px] font-black uppercase font-mono tracking-widest text-black w-fit shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                {event.pillLabel}
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl font-black uppercase tracking-tight text-black mt-4 mb-2 leading-tight">
                {event.title}
              </h3>

              {/* Blurb */}
              <p className="font-mono text-xs text-gray-700 leading-relaxed mb-6">
                {event.blurb}
              </p>
            </div>

            {/* Meta and CTA Footer */}
            <div className="border-t-2 border-black pt-4 space-y-4">
              <div className="flex flex-col gap-1.5 font-mono text-[9px] font-bold text-black uppercase">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-black" />
                  <span>DATE: {event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-black shrink-0" />
                  <span className="truncate">LOC: {event.location}</span>
                </div>
              </div>

              <button className="w-full bg-[#00FF88] border-2 border-black py-2.5 font-mono text-xs font-black uppercase tracking-widest text-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2">
                INITIATE PROTOCOL <ArrowRight size={14} className="stroke-[3]" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
