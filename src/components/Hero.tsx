import React, { useState, useEffect } from 'react';
import { OfficialCompanyEmblem } from './Logo';
import { TOP_BACKGROUND_PHOTOS } from '../data/heroSlidesData';
import riverPilingHero from '../assets/images/river_piling_hero_1788334233850.jpg';
import { getStoredPhotosMap } from '../services/photoStorageService';
import { useSiteContent } from '../services/siteContentService';
import { Card3D } from './Card3D';
import { 
  ArrowRight, 
  Building2, 
  SlidersHorizontal,
  Award,
  ShieldCheck,
  Zap,
  Layers,
  Camera,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CheckCircle2,
  HardHat
} from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: (serviceTitle?: string) => void;
  onOpenPhotosModal?: () => void;
  onOpenWebsiteEditor?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onOpenPhotosModal, onOpenWebsiteEditor }) => {
  const { content } = useSiteContent();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [customPhotosMap, setCustomPhotosMap] = useState<Record<string, string>>({});

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

  const displaySlides = baseSlides;

  // Ambient auto-slide rotation for background crossfade
  useEffect(() => {
    if (displaySlides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((curr) => (curr + 1) % displaySlides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [displaySlides.length]);

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
                isCurrent ? 'opacity-35' : 'opacity-0'
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className={`w-full h-full object-cover object-center filter contrast-125 brightness-90 ${
                  isCurrent ? (isZoomIn ? 'animate-kenburns-in' : 'animate-kenburns-out') : 'scale-100'
                }`}
                loading={index < 4 ? "eager" : "lazy"}
              />
            </div>
          );
        })}
        
        {/* Deep Black Gradient Overlays for pristine text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-950/30 via-transparent to-transparent" />
        
        {/* Industrial Precision 3D Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731612_1px,transparent_1px),linear-gradient(to_bottom,#f9731612_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Main Hero Content: High-Impact 3D Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 md:pt-4 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Brand & Headlines */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Company Brand Header with 3D Bevel */}
            <div className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-[#0e0e14] border border-zinc-800/80 shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md max-w-xl">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-white shadow-md border border-zinc-700 p-1 overflow-hidden">
                <OfficialCompanyEmblem className="w-full h-full" />
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="text-base sm:text-lg font-black text-white font-['Space_Grotesk'] leading-none">
                    SRI <span className="text-orange-500">SJ</span> CONSTRUCTIONS
                  </h2>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40">
                    PVT LTD
                  </span>
                  {onOpenWebsiteEditor && (
                    <button
                      type="button"
                      onClick={onOpenWebsiteEditor}
                      className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-[10px] font-bold transition-colors cursor-pointer"
                      title="Edit this section's text, headlines and company details"
                    >
                      <SlidersHorizontal className="w-3 h-3 text-amber-400" />
                      <span>Edit Info</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-zinc-400 font-medium truncate">
                  {content.company.fullAddress} • GSTIN: <span className="font-mono font-bold text-orange-400">{content.company.gstNumber}</span>
                </p>
              </div>
            </div>

            {/* Headline Tagline with 3D Industrial Underlay */}
            <div className="relative py-2 max-w-2xl select-none">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0d0d14]/90 to-transparent rounded-2xl border border-zinc-800/80 -z-10 shadow-2xl flex items-center overflow-hidden">
                {/* Industrial grid details */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731608_1px,transparent_1px),linear-gradient(to_bottom,#f9731608_1px,transparent_1px)] bg-[size:12px_12px]" />
                {/* Glowing Left Steel Pillar */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-orange-500 via-amber-400 to-orange-600 shadow-[0_0_12px_#f97316]" />
              </div>
              
              <div className="pl-6 pr-4 py-4 sm:py-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-orange-400 uppercase block leading-tight">
                    {content.hero.specialistBadge}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    <ShieldCheck className="w-3 h-3" /> ISO 9001:2015
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-black tracking-tight leading-[1.2] font-['Space_Grotesk'] text-white">
                  <span className="relative inline-flex items-center px-4 py-1.5 rounded-xl border-2 border-orange-500/90 shadow-[0_10px_35px_rgba(249,115,22,0.4)] mr-2 overflow-hidden align-middle group">
                    <span
                      className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700 group-hover:scale-110 filter brightness-[0.45] contrast-125 saturate-125 pointer-events-none"
                      style={{ backgroundImage: `url(${riverPilingHero})` }}
                      aria-hidden="true"
                    />
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-black/85 via-zinc-950/75 to-orange-950/80 pointer-events-none"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute bottom-0 inset-x-0 h-1 bg-[repeating-linear-gradient(45deg,#f97316,#f97316_8px,#09090b_8px,#09090b_16px)] opacity-95 pointer-events-none"
                      aria-hidden="true"
                    />
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-400 font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      {content.hero.headline1}
                    </span>
                  </span>
                  <span className="block mt-2 text-zinc-100 font-extrabold text-2xl sm:text-3xl lg:text-[2.15rem] tracking-tight leading-none">
                    {content.hero.headline2}
                  </span>
                </h1>
              </div>
            </div>

            {/* Introduction Narrative */}
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed font-normal">
              {content.hero.intro}
            </p>

            {/* High-Impact 3D Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenQuoteModal()}
                id="hero-quote-btn"
                className="btn-3d-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-black text-sm sm:text-base cursor-pointer tracking-wide"
              >
                <span>{content.hero.quoteBtnText || 'Get a Quote'}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href="#projects"
                id="hero-projects-btn"
                className="btn-3d-dark inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm sm:text-base cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-orange-400" />
                <span>{content.hero.projectsBtnText || 'View Done Projects'}</span>
              </a>
            </div>

            {/* Industrial Verification Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-900/80 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>Rig Fleet: <strong>Mait, Bauer &amp; Casagrande</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Pile Diameter: <strong>600mm to 2000mm</strong></span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Project Execution & Site Machinery Showcase */}
          <div className="lg:col-span-6 w-full">
            <div className="relative rounded-3xl bg-[#0d0d14]/95 border-2 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-5 sm:p-6 backdrop-blur-md overflow-hidden">
              {/* Decorative top accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600" />
              
              {/* Header inside card */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-orange-400 font-['Space_Grotesk']">
                    Live Site Spotlight
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                    Photo {currentSlideIndex + 1} / {displaySlides.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCurrentSlideIndex(prev => (prev - 1 + displaySlides.length) % displaySlides.length)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                      title="Previous site photo"
                      aria-label="Previous site photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentSlideIndex(prev => (prev + 1) % displaySlides.length)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                      title="Next site photo"
                      aria-label="Next site photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Image Viewport */}
              <div className="relative mt-4 aspect-16/10 rounded-2xl overflow-hidden border border-zinc-700/80 shadow-inner group">
                <img
                  src={displaySlides[currentSlideIndex]?.imageUrl}
                  alt={displaySlides[currentSlideIndex]?.title || 'Sri SJ Piling Site'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Category Pill on Image */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-orange-500/40 text-orange-400 text-[11px] font-bold">
                  <HardHat className="w-3 h-3 text-orange-400" />
                  <span>{displaySlides[currentSlideIndex]?.categoryLabel || 'Hydraulic Rotary Piling'}</span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight font-['Space_Grotesk'] drop-shadow-md">
                    {displaySlides[currentSlideIndex]?.title}
                  </h3>
                  <p className="text-xs text-zinc-300 font-medium line-clamp-1 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                    <span>{displaySlides[currentSlideIndex]?.location}</span>
                  </p>
                </div>
              </div>

              {/* Technical Specifications Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-zinc-800/80 text-left">
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Client / Project</span>
                  <span className="text-xs font-black text-white truncate block mt-0.5">
                    {displaySlides[currentSlideIndex]?.client || 'KPIL / PGCIL'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Engineering Spec</span>
                  <span className="text-xs font-bold text-amber-300 truncate block mt-0.5">
                    600-2000mm Dia Piles
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Standard</span>
                  <span className="text-xs font-bold text-emerald-400 truncate block mt-0.5">
                    IS 2911 / M40 RCC
                  </span>
                </div>
              </div>

              {/* Thumbnails preview & Photo Gallery Launcher */}
              <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-zinc-800/80">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {displaySlides.slice(0, 5).map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`w-10 h-8 sm:w-12 sm:h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        idx === currentSlideIndex
                          ? 'border-orange-500 scale-105 shadow-md shadow-orange-500/30'
                          : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                      title={slide.title}
                    >
                      <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {onOpenPhotosModal && (
                  <button
                    type="button"
                    onClick={onOpenPhotosModal}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-bold text-zinc-200 transition-colors cursor-pointer shrink-0"
                  >
                    <Camera className="w-3.5 h-3.5 text-orange-400" />
                    <span className="hidden sm:inline">All 27 Photos</span>
                    <span className="sm:hidden">27 Photos</span>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CENTER POINT: 3D INTERACTIVE STATISTICAL CARDS WITH REAL TILT & SPECULAR GLARE */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 md:my-14 w-full">
        <div className="w-full bg-[#0a0a0f] p-6 sm:p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] border-2 border-orange-500/30 backdrop-blur-md relative overflow-hidden">
          
          {/* Background technical watermarks */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 select-none font-mono text-9xl font-black text-orange-500 translate-x-12 translate-y-12">
            3D
          </div>

          <div className="text-center mb-8">
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
            <Card3D intensity={18} depth={20}>
              <div className="card-3d-bevel p-5 sm:p-6 rounded-2xl text-center flex flex-col items-center justify-center h-full group">
                <div className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-amber-500 font-['Space_Grotesk'] tracking-tight drop-shadow-[0_4px_12px_rgba(249,115,22,0.3)] group-hover:scale-105 transition-transform">
                  100+
                </div>
                <div className="text-base sm:text-xl md:text-2xl font-black uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                  CLIENTS
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-semibold mt-1">
                  L&amp;T, TATA, JINDAL, PGCIL
                </div>
              </div>
            </Card3D>

            {/* 500+ Projects */}
            <Card3D intensity={18} depth={20}>
              <div className="card-3d-bevel p-5 sm:p-6 rounded-2xl text-center flex flex-col items-center justify-center h-full group">
                <div className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-amber-500 font-['Space_Grotesk'] tracking-tight drop-shadow-[0_4px_12px_rgba(249,115,22,0.3)] group-hover:scale-105 transition-transform">
                  500+
                </div>
                <div className="text-base sm:text-xl md:text-2xl font-black uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                  PROJECTS
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-semibold mt-1">
                  Completed &amp; Live Sites
                </div>
              </div>
            </Card3D>

            {/* 200+ Employees */}
            <Card3D intensity={18} depth={20}>
              <div className="card-3d-bevel p-5 sm:p-6 rounded-2xl text-center flex flex-col items-center justify-center h-full group">
                <div className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-amber-500 font-['Space_Grotesk'] tracking-tight drop-shadow-[0_4px_12px_rgba(249,115,22,0.3)] group-hover:scale-105 transition-transform">
                  200+
                </div>
                <div className="text-base sm:text-xl md:text-2xl font-black uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                  EMPLOYEES
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-semibold mt-1">
                  Engineers &amp; Rig Operators
                </div>
              </div>
            </Card3D>

            {/* 10000+ Piles */}
            <Card3D intensity={18} depth={20}>
              <div className="card-3d-bevel p-5 sm:p-6 rounded-2xl text-center flex flex-col items-center justify-center h-full group">
                <div className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-amber-500 font-['Space_Grotesk'] tracking-tight drop-shadow-[0_4px_12px_rgba(249,115,22,0.3)] group-hover:scale-105 transition-transform">
                  10,000+
                </div>
                <div className="text-base sm:text-xl md:text-2xl font-black uppercase text-white tracking-wider mt-2 font-['Space_Grotesk']">
                  PILES
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-semibold mt-1">
                  Cast-in-situ &amp; Driven Piling
                </div>
              </div>
            </Card3D>

          </div>
        </div>
      </div>
    </section>
  );
};

