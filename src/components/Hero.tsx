import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  Drill, 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Layers,
  Radio,
  Clock,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  projectNote: string;
  location: string;
  tags: string[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1600&q=85',
    title: 'Hydraulic Rotary Bored Piling in Action',
    projectNote: "Pile Built Up at PGCIL's 765kV KMTL & L&T Krishna River Bank",
    location: 'L&T / PGCIL High-Voltage Power Corridors',
    tags: ['L&T Partnership', 'PGCIL 765kV KMTL', 'IS 2911 Piling Standard']
  },
  {
    id: 'slide-2',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=85',
    title: 'Sheet Piling & Deep Excavation Shoring',
    projectNote: 'Interlocking Sheet Pile Driving & Shoring at Jindal India Ltd (WB)',
    location: 'Jindal India Limited (JINDAL) Plant, West Bengal',
    tags: ['Sheet Piling', 'Deep Pit Shoring', 'JINDAL India Ltd (WB)']
  },
  {
    id: 'slide-3',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
    title: 'Heavy Machine Foundations & Triple Pot Vessel Substructures',
    projectNote: 'TATA Industrial Civil Packages & Triple Pot Foundation at JIL WB & SUNLIGHT',
    location: 'TATA Projects, JINDAL & SUNLIGHT Industrial Hubs',
    tags: ['TATA Projects', 'SUNLIGHT Group', 'Triple Pot Substructures']
  },
  {
    id: 'slide-4',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85',
    title: 'Active Industrial Substructures & Bored Piling',
    projectNote: 'Precision Machine Slabs at Ceratizit India & Piling at Ruchi Infra, Haldia',
    location: 'Ceratizit India & Ruchi Infra Services (Haldia, Purba Medinipur)',
    tags: ['Current Project: Ceratizit India', 'Current Project: Ruchi Infra Haldia', 'Vibration-Isolated Slabs']
  },
  {
    id: 'slide-5',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=85',
    title: 'PEB Structural Foundations & Commercial Logistics Hubs',
    projectNote: 'Shreeji Propack PEB Plant & Ganesh Complex Ranihati Logistics Warehouse',
    location: 'Shreeji Propack & Ganesh Complex (Ranihati, Howrah, WB)',
    tags: ['Current Project: Shreeji Propack', 'Current Project: Ganesh Complex Ranihati', 'PEB Industrial Slabs']
  },
  {
    id: 'slide-6',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
    title: 'Stadium Deep Piling & High-Mast Tower Footings',
    projectNote: 'Deep Foundation Piling & Grandstand Substructures at RG Baruah Nehru Stadium',
    location: 'RG Baruah Nehru Stadium Complex',
    tags: ['Current Project: RG Baruah Stadium', 'High-Mast Tower Piles', 'Sports Infrastructure']
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 4500; // 4.5 seconds per slide
  const PROGRESS_INTERVAL = 50; // update progress every 50ms

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  // Auto-slide effect with progress tracking
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((curr) => (curr + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(progressTimer);
  }, [isPlaying, isHovered, currentSlideIndex]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  };

  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 sm:pt-32 pb-16 flex flex-col justify-between overflow-hidden bg-[#e2e8f0]">
      {/* Background Graphic & Dynamic Blur Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Dynamic ambient backdrop syncing with active slide */}
        <img
          key={activeSlide.id}
          src={activeSlide.imageUrl}
          alt={activeSlide.title}
          className="w-full h-full object-cover object-center opacity-15 filter blur-sm contrast-125 transition-opacity duration-1000 scale-105"
        />
        
        {/* Clean Light Grey Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#e2e8f0]/95 via-[#e2e8f0]/90 to-[#e2e8f0]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#dbe2ea] via-transparent to-[#e2e8f0]/85" />
        
        {/* Industrial Engineering Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e140_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e140_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Core Message & Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-800 text-xs sm:text-sm font-black tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                ESTD. 2013 • HALDIA, WEST BENGAL
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-300 text-slate-700 text-xs font-bold shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                Specialized Piling &amp; Civil Contractor
              </span>
            </div>

            {/* Company Name & Tagline */}
            <div className="space-y-2.5">
              <div className="inline-block">
                <h2 className="text-xs sm:text-sm uppercase tracking-widest text-amber-800 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30 font-black font-['Space_Grotesk']">
                  SRI SJ CONSTRUCTION PRIVATE LIMITED
                </h2>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.3rem] font-black text-slate-950 tracking-tight leading-[1.1] font-['Space_Grotesk']">
                Strong Foundations. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
                  Reliable Construction.
                </span>
              </h1>
            </div>

            {/* Introduction Narrative */}
            <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed font-medium">
              <strong className="text-slate-950">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong> is an established engineering contractor based in 
              <strong className="text-slate-950"> Haldia, Sutahata, Nandarampur, West Bengal (721635)</strong>. 
              We execute high-capacity bored cast-in-situ piling, sheet piling, EHV transmission tower footings, and heavy industrial machine substructures across India.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenQuoteModal}
                id="hero-quote-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#projects"
                id="hero-projects-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm sm:text-base border border-slate-300 hover:border-slate-400 shadow-sm transition-all duration-200"
              >
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>View Done Projects</span>
              </a>

              <a
                href="#contact"
                id="hero-contact-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-sm transition-all duration-200"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Contact Desk</span>
              </a>
            </div>

            {/* Proven Clients Credentials Strip */}
            <div className="pt-3 border-t border-slate-300/80">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">
                Major Clients &amp; Ongoing Project Partnerships:
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-800">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-950 font-black shadow-xs">L&amp;T</span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-950 font-black shadow-xs">TATA</span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-950 font-black shadow-xs">JINDAL</span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-950 font-black shadow-xs">SUNLIGHT</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 shadow-xs">PGCIL</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-xs">Ceratizit India</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-xs">Ruchi Infra Haldia</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-xs">Shreeji Propack</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-xs">RG Baruah Nehru Stadium</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-xs">Ganesh Complex Ranihati</span>
              </div>
            </div>

            {/* Registered Name Proper End of Point */}
            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All operations executed by <strong className="text-slate-900">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong></span>
            </div>
          </div>

          {/* Right Column: LIVE AUTO-CHANGING IMAGE SHOWCASE (5 cols) */}
          <div 
            className="lg:col-span-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="rounded-3xl bg-white border-2 border-slate-200/90 shadow-2xl overflow-hidden relative group">
              
              {/* Top Live Feed Header Bar */}
              <div className="p-3.5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-600/90 text-white text-[10px] font-black tracking-wider uppercase shadow-xs animate-pulse">
                    <Radio className="w-3 h-3 animate-spin" />
                    <span>LIVE SITE FEED</span>
                  </div>
                  <span className="text-xs font-bold text-slate-300 truncate font-['Space_Grotesk']">
                    SRI SJ CONSTRUCTION PVT LTD
                  </span>
                </div>

                {/* Play / Pause Toggle & Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? "Pause auto slide" : "Play auto slide"}
                    className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors cursor-pointer"
                    title={isPlaying ? "Pause rotation" : "Play rotation"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>

                  <div className="text-[11px] text-amber-400 font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    0{currentSlideIndex + 1}/0{HERO_SLIDES.length}
                  </div>
                </div>
              </div>

              {/* Dynamic Live Image Stage */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-900">
                {HERO_SLIDES.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    
                    {/* Shadow overlay for high contrast text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                    
                    {/* Active Project Overlay Banner on Image */}
                    <div className="absolute bottom-3 left-3 right-3 z-20 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950 shadow-md">
                          Verified Project
                        </span>
                        <span className="text-[10px] font-bold text-slate-200 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-xs border border-slate-700">
                          {slide.location}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-white font-['Space_Grotesk'] leading-snug drop-shadow-md">
                        {slide.title}
                      </h3>

                      <p className="text-xs text-amber-300 font-medium line-clamp-1 drop-shadow-xs">
                        {slide.projectNote}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Left & Right Slide Navigation Arrows */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous live project image"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-all shadow-md cursor-pointer border border-white/20 backdrop-blur-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next live project image"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-all shadow-md cursor-pointer border border-white/20 backdrop-blur-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Live Animated Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 z-30">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Thumbnail Selector & Slide Details */}
              <div className="p-4 bg-white border-t border-slate-200 space-y-3">
                
                {/* Thumbnails Row */}
                <div className="grid grid-cols-5 gap-2">
                  {HERO_SLIDES.map((slide, idx) => {
                    const isCurrent = idx === currentSlideIndex;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => handleSelectSlide(idx)}
                        className={`relative rounded-lg overflow-hidden h-12 sm:h-14 border-2 transition-all cursor-pointer ${
                          isCurrent 
                            ? 'border-amber-500 ring-2 ring-amber-500/30 scale-102' 
                            : 'border-slate-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={slide.imageUrl} 
                          alt={`Thumbnail ${idx + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                        {isCurrent && (
                          <div className="absolute inset-0 bg-amber-500/20" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Slide Tags & End of Point Proper Name Note */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {activeSlide.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f0f4f8] text-slate-700 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider">
                    SRI SJ CONSTRUCTION PRIVATE LIMITED
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* CENTER POINT / MIDDLE POINT: BIG STATISTICAL HEADLINE SECTION */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 md:my-12 w-full">
        <div className="w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-amber-500/50">
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs sm:text-sm font-black uppercase tracking-widest font-['Space_Grotesk']">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              COMPANY TRACK RECORD &amp; EXECUTION SCALE
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium">
              Proven civil engineering and deep foundation achievements across industrial and infrastructure projects
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* 100+ Clients */}
            <div className="bg-slate-900/90 hover:bg-slate-800/90 transition-all p-5 sm:p-6 rounded-2xl border-2 border-amber-500/30 text-center flex flex-col items-center justify-center shadow-lg group hover:border-amber-500">
              <div className="text-4xl sm:text-6xl md:text-7xl font-black text-amber-400 font-['Space_Grotesk'] tracking-tight drop-shadow-md group-hover:scale-105 transition-transform">
                100+
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-extrabold uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                CLIENTS
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
                L&amp;T, TATA, JINDAL, PGCIL
              </div>
            </div>

            {/* 500+ Projects */}
            <div className="bg-slate-900/90 hover:bg-slate-800/90 transition-all p-5 sm:p-6 rounded-2xl border-2 border-amber-500/30 text-center flex flex-col items-center justify-center shadow-lg group hover:border-amber-500">
              <div className="text-4xl sm:text-6xl md:text-7xl font-black text-amber-400 font-['Space_Grotesk'] tracking-tight drop-shadow-md group-hover:scale-105 transition-transform">
                500+
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-extrabold uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                PROJECTS
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
                Completed &amp; Live Sites
              </div>
            </div>

            {/* 200+ Employees */}
            <div className="bg-slate-900/90 hover:bg-slate-800/90 transition-all p-5 sm:p-6 rounded-2xl border-2 border-emerald-500/30 text-center flex flex-col items-center justify-center shadow-lg group hover:border-emerald-400">
              <div className="text-4xl sm:text-6xl md:text-7xl font-black text-emerald-400 font-['Space_Grotesk'] tracking-tight drop-shadow-md group-hover:scale-105 transition-transform">
                200+
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-extrabold uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                EMPLOYEES
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
                Engineers &amp; Rig Operators
              </div>
            </div>

            {/* 10000+ Piles */}
            <div className="bg-slate-900/90 hover:bg-slate-800/90 transition-all p-5 sm:p-6 rounded-2xl border-2 border-cyan-400/30 text-center flex flex-col items-center justify-center shadow-lg group hover:border-cyan-400">
              <div className="text-4xl sm:text-6xl md:text-7xl font-black text-cyan-300 font-['Space_Grotesk'] tracking-tight drop-shadow-md group-hover:scale-105 transition-transform">
                10,000+
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-extrabold uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                PILES
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
                Cast-in-situ &amp; Driven Piling
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

