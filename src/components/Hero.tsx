import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { OfficialCompanyEmblem } from './Logo';
import { TOP_BACKGROUND_PHOTOS, TopBackgroundSlide } from '../data/heroSlidesData';
import riverPilingHero from '../assets/images/river_piling_hero_1788334233850.jpg';
import { getStoredPhotosMap } from '../services/photoStorageService';
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
  Sparkles,
  Maximize2,
  X,
  Gauge,
  Camera,
  UploadCloud,
  Check
} from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onOpenPhotosModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onOpenPhotosModal }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slideDuration, setSlideDuration] = useState<number>(4500); // 4.5s per photo for smooth transitions and Ken Burns zoom effect
  const [fullscreenPhoto, setFullscreenPhoto] = useState<TopBackgroundSlide | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customPhotosMap, setCustomPhotosMap] = useState<Record<string, string>>({});
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  const PROGRESS_INTERVAL = 40; // update progress smoothly every 40ms

  // Load custom stored photos from IndexedDB
  const loadStoredPhotos = async () => {
    try {
      const map = await getStoredPhotosMap();
      setCustomPhotosMap(map);
    } catch (e) {
      console.warn('Could not load custom photos:', e);
    }
  };

  useEffect(() => {
    loadStoredPhotos();

    const handlePhotosUpdated = () => {
      loadStoredPhotos();
    };

    window.addEventListener('sri_sj_photos_updated', handlePhotosUpdated);
    return () => window.removeEventListener('sri_sj_photos_updated', handlePhotosUpdated);
  }, []);

  // Filter slides and substitute custom original images if available
  const baseSlides = TOP_BACKGROUND_PHOTOS.map(s => {
    const fileNum = s.stepNumber + 1;
    const filename = `IMG-20260902-WA${String(fileNum).padStart(4, '0')}.jpg`;
    return {
      ...s,
      imageUrl: customPhotosMap[s.id] || s.imageUrl,
      isOriginalCustom: Boolean(customPhotosMap[s.id]),
      filename
    };
  });

  const displaySlides = selectedCategory === 'all' 
    ? baseSlides 
    : baseSlides.filter(s => s.category === selectedCategory);

  const activeSlide = displaySlides[currentSlideIndex] || displaySlides[0] || baseSlides[0];

  // Auto-slide effect with 2-second timer (or custom duration)
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((curr) => (curr + 1) % displaySlides.length);
          return 0;
        }
        return prev + (PROGRESS_INTERVAL / slideDuration) * 100;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(progressTimer);
  }, [isPlaying, isHovered, currentSlideIndex, slideDuration, displaySlides.length]);

  // Keep thumbnail in view when slide changes
  useEffect(() => {
    if (thumbnailScrollRef.current) {
      const activeThumb = thumbnailScrollRef.current.children[currentSlideIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentSlideIndex]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % displaySlides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
    setProgress(0);
  };

  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentSlideIndex(0);
    setProgress(0);
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 sm:pt-32 pb-16 flex flex-col justify-between overflow-hidden bg-black text-white">
      {/* TOP BACKGROUND: Smooth Full-Screen Crossfade Background with Automatic Zoom & Transitions */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {displaySlides.map((slide, index) => {
          const isCurrent = index === currentSlideIndex;
          const isZoomIn = index % 2 === 0;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isCurrent ? 'opacity-40' : 'opacity-0'
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className={`w-full h-full object-cover object-center filter contrast-125 brightness-95 ${
                  isCurrent ? (isZoomIn ? 'animate-kenburns-in' : 'animate-kenburns-out') : 'scale-100'
                }`}
                loading={index < 4 ? "eager" : "lazy"}
              />
            </div>
          );
        })}
        
        {/* Deep Black Gradient Overlays for pristine text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-950/20 via-transparent to-transparent" />
        
        {/* Industrial Precision Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731610_1px,transparent_1px),linear-gradient(to_bottom,#f9731610_1px,transparent_1px)] bg-[size:36px_36px]" />
        

      </div>

      {/* Top Background Live Status Bar Banner */}
      <div className="hidden relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 pb-3 w-full">
        <div className="hidden flex flex-wrap items-center justify-between gap-3 p-2.5 sm:px-4 rounded-xl bg-black/60 border border-zinc-800 backdrop-blur-md">
          
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
            </span>
            <span className="text-xs font-black uppercase text-orange-400 font-['Space_Grotesk'] tracking-wider">
              TOP BACKGROUND SLIDESHOW:
            </span>
            <span className="text-xs font-bold text-white">
              Step {String(currentSlideIndex + 1).padStart(2, '0')} of {String(displaySlides.length).padStart(2, '0')}
            </span>
            <span className="hidden md:inline-block text-zinc-600">•</span>
            <span className="hidden md:inline-block text-xs font-medium text-zinc-300 truncate max-w-md">
              {activeSlide.title} ({activeSlide.location})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Badge / Toggle (2s Default) */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-300 bg-zinc-900/90 px-2.5 py-1 rounded-lg border border-zinc-800">
              <Clock className="w-3 h-3 text-orange-400" />
              <span className="text-orange-400 font-black">2.0s</span>
              <span className="text-zinc-400">/step</span>
            </div>

            {/* Play / Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-2.5 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500 text-orange-400 hover:text-black text-xs font-bold transition-all border border-orange-500/40 flex items-center gap-1 cursor-pointer"
              title={isPlaying ? "Pause auto-rotation" : "Resume 2s rotation"}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 md:pt-4 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Header, Tagline, Introduction Narrative, Actions, Clients & Footer details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Company Brand Header */}
            <div className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl bg-[#0e0e12] border border-zinc-800 shadow-xl backdrop-blur-sm max-w-xl">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg bg-white shadow-sm border border-zinc-700 p-1 overflow-hidden">
                <OfficialCompanyEmblem className="w-full h-full" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="text-base sm:text-lg font-black text-white font-['Space_Grotesk'] leading-none">
                    SRI <span className="text-orange-500">SJ</span> CONSTRUCTIONS
                  </h2>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40">
                    PVT LTD
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-medium">
                  Haldia, West Bengal (721635) • GSTIN: <span className="font-mono font-bold text-orange-400">19ABPCS8304J1ZQ</span>
                </p>
              </div>
            </div>

            {/* Headline Tagline */}
            <div className="relative py-2 max-w-2xl select-none">
              {/* Premium Construction Industrial Underlay Accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0d0d12]/80 to-transparent rounded-2xl border border-zinc-800/80 -z-10 shadow-2xl flex items-center overflow-hidden">
                {/* Industrial grid details */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731606_1px,transparent_1px),linear-gradient(to_bottom,#f9731606_1px,transparent_1px)] bg-[size:10px_10px]" />
                {/* Glowing Left Steel Pillar */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-500 via-amber-400 to-orange-600" />
              </div>
              
              <div className="pl-5 pr-4 py-4 sm:py-5 space-y-2">
                <span className="text-[10px] font-black tracking-[0.25em] text-orange-500 uppercase block leading-none">
                  HEAVY FOUNDATION SPECIALISTS
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-black tracking-tight leading-[1.2] font-['Space_Grotesk'] text-white">
                  <span className="relative inline-flex items-center px-4 py-2 rounded-xl border-2 border-orange-500/80 shadow-[0_10px_35px_rgba(249,115,22,0.35)] mr-2 overflow-hidden align-middle group">
                    {/* Construction Site Background Photo Under The Letters */}
                    <span
                      className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700 group-hover:scale-110 filter brightness-[0.45] contrast-125 saturate-125 pointer-events-none"
                      style={{ backgroundImage: `url(${riverPilingHero})` }}
                      aria-hidden="true"
                    />
                    {/* High-contrast semi-transparent protective dark scrim */}
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-black/85 via-zinc-950/75 to-orange-950/80 pointer-events-none"
                      aria-hidden="true"
                    />
                    {/* Industrial hazard safety tape trim under the letters */}
                    <span
                      className="absolute bottom-0 inset-x-0 h-1 bg-[repeating-linear-gradient(45deg,#f97316,#f97316_8px,#09090b_8px,#09090b_16px)] opacity-95 pointer-events-none"
                      aria-hidden="true"
                    />
                    {/* Crisp high-contrast lettering */}
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-400 font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      Strong Foundations.
                    </span>
                  </span>
                  <span className="block mt-2 text-zinc-100 font-extrabold text-2xl sm:text-3xl lg:text-[2.25rem] tracking-tight leading-none">
                    Reliable Construction.
                  </span>
                </h1>
              </div>
            </div>

            {/* Introduction Narrative */}
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed font-normal">
              <strong className="text-white font-bold">SRI SJ CONSTRUCTIONS PRIVATE LIMITED</strong> is an established engineering contractor based in 
              <strong className="text-orange-400 font-semibold"> Haldia, Sutahata, Nandarampur, West Bengal (721635)</strong>. 
              We execute high-capacity bored cast-in-situ piling, sheet piling, EHV transmission tower footings, and heavy industrial machine substructures across India.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenQuoteModal}
                id="hero-quote-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm sm:text-base shadow-lg shadow-orange-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-orange-400/40"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href="#projects"
                id="hero-projects-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm sm:text-base border border-zinc-700 hover:border-orange-500 shadow-sm transition-all duration-200"
              >
                <Building2 className="w-4 h-4 text-orange-400" />
                <span>View Done Projects</span>
              </a>

              <a
                href="#maps-photos"
                id="hero-photos-btn"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white font-semibold text-sm sm:text-base border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
              >
                <Camera className="w-4 h-4 text-orange-400" />
                <span>Project Gallery (27 Photos)</span>
              </a>
            </div>

            {/* Registered Name Proper End of Point */}
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-semibold pt-4 border-t border-zinc-900">
              <span>All operations executed by <strong className="text-white">SRI SJ CONSTRUCTIONS PRIVATE LIMITED</strong></span>
            </div>

          </div>

          {/* Right Column: Big Formatting Company Construction Photo Showcase Slider */}
          <div className="lg:col-span-5 w-full flex flex-col justify-center">
            <div 
              className="relative aspect-video sm:aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-zinc-800 bg-[#121217] shadow-2xl group transition-all duration-300 hover:border-orange-500/50"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Active Photo with Ken Burns Zoom & smooth crossfade */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                {displaySlides.map((slide, idx) => {
                  const isCurrent = idx === currentSlideIndex;
                  const isZoomIn = idx % 2 === 0;
                  return (
                    <div
                      key={`showcase-${slide.id}`}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        isCurrent ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                      }`}
                    >
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className={`w-full h-full object-cover object-center ${
                          isCurrent ? (isZoomIn ? 'animate-kenburns-in' : 'animate-kenburns-out') : 'scale-100'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>


              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent p-3 sm:p-4 z-10 flex items-center justify-end">
                <span className="text-[11px] font-bold text-zinc-300 font-mono bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm border border-zinc-800">
                  {String(currentSlideIndex + 1).padStart(2, '0')} / {String(displaySlides.length).padStart(2, '0')}
                </span>
              </div>



              {/* Slider Interactive Navigation Controls */}
              <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between z-20 pointer-events-none">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-lg bg-black/60 hover:bg-orange-500 text-zinc-300 hover:text-black transition-all border border-zinc-800/80 pointer-events-auto cursor-pointer"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-black/60 hover:bg-orange-500 text-zinc-300 hover:text-black transition-all border border-zinc-800/80 pointer-events-auto cursor-pointer"
                  title="Next Photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slider progress bar indicator (at the very bottom edge of card) */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-zinc-800 z-20">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>



          </div>

        </div>

      </div>

      {/* CENTER POINT / MIDDLE POINT: BIG STATISTICAL HEADLINE SECTION (BLACK BACKGROUND & ORANGE/WHITE NUMBERS) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 md:my-12 w-full">
        <div className="w-full bg-[#0c0c10] p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-orange-500/30 backdrop-blur-md">
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 text-xs sm:text-sm font-black uppercase tracking-widest font-['Space_Grotesk'] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
              <span>COMPANY TRACK RECORD &amp; EXECUTION SCALE</span>
            </div>
            <p className="text-zinc-300 font-medium text-xs sm:text-sm mt-2">
              Proven civil engineering and deep foundation achievements across industrial and infrastructure projects
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* 100+ Clients */}
            <div className="bg-[#121217] hover:bg-[#181820] transition-all p-5 sm:p-6 rounded-2xl border border-zinc-800 hover:border-orange-500 text-center flex flex-col items-center justify-center shadow-lg group">
              <div className="text-4xl sm:text-6xl md:text-7xl font-black text-orange-500 font-['Space_Grotesk'] tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform">
                100+
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-black uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                CLIENTS
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 font-semibold mt-1">
                L&amp;T, TATA, JINDAL, PGCIL
              </div>
            </div>

            {/* 500+ Projects */}
            <div className="bg-[#121217] hover:bg-[#181820] transition-all p-5 sm:p-6 rounded-2xl border border-zinc-800 hover:border-orange-500 text-center flex flex-col items-center justify-center shadow-lg group">
              <div className="text-4xl sm:text-6xl md:text-7xl font-black text-orange-500 font-['Space_Grotesk'] tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform">
                500+
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-black uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                PROJECTS
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 font-semibold mt-1">
                Completed &amp; Live Sites
              </div>
            </div>

            {/* 200+ Employees */}
            <div className="bg-[#121217] hover:bg-[#181820] transition-all p-5 sm:p-6 rounded-2xl border border-zinc-800 hover:border-orange-500 text-center flex flex-col items-center justify-center shadow-lg group">
              <div className="text-4xl sm:text-6xl md:text-7xl font-black text-orange-500 font-['Space_Grotesk'] tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform">
                200+
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-black uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                EMPLOYEES
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 font-semibold mt-1">
                Engineers &amp; Rig Operators
              </div>
            </div>

            {/* 10000+ Piles */}
            <div className="bg-[#121217] hover:bg-[#181820] transition-all p-5 sm:p-6 rounded-2xl border border-zinc-800 hover:border-orange-500 text-center flex flex-col items-center justify-center shadow-lg group">
              <div className="text-4xl sm:text-6xl md:text-7xl font-black text-orange-500 font-['Space_Grotesk'] tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform">
                10,000+
              </div>
              <div className="text-base sm:text-xl md:text-2xl font-black uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                PILES
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 font-semibold mt-1">
                Cast-in-situ &amp; Driven Piling
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Fullscreen Photo Modal */}
      {fullscreenPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setFullscreenPhoto(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#111116] border border-orange-500/50 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-black flex items-center justify-between border-b border-zinc-800">
              <div className="space-y-0.5">
                <span className="text-xs font-black uppercase text-orange-400 tracking-wider">
                  Step {fullscreenPhoto.stepNumber} • {fullscreenPhoto.categoryLabel}
                </span>
                <h3 className="text-base sm:text-lg font-black text-white font-['Space_Grotesk']">
                  {fullscreenPhoto.title}
                </h3>
              </div>
              <button
                onClick={() => setFullscreenPhoto(null)}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-orange-500 hover:text-black text-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={fullscreenPhoto.imageUrl}
                alt={fullscreenPhoto.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            {/* Modal Footer Specs */}
            <div className="p-4 bg-[#0e0e12] border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <p className="text-zinc-300 font-medium">{fullscreenPhoto.subtitle}</p>
                <p className="text-orange-300 font-mono text-[11px]">Specs: {fullscreenPhoto.technicalSpecs}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold">
                  {fullscreenPhoto.location}
                </span>
                <span className="px-2.5 py-1 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold">
                  {fullscreenPhoto.client}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


