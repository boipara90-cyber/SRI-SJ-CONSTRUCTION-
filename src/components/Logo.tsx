import React from 'react';
import { motion } from 'motion/react';
import companyLogoImg from '../assets/images/regenerated_image_1788338692886.png';

interface LogoProps {
  variant?: 'full' | 'compact' | 'light' | 'dark' | 'emblem-only';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

/**
 * Pure SVG Official Company Emblem
 * Exact reproduction of the high-res uploaded logo:
 * Symmetrical blue roof, blue outer/orange inner frame, royal blue S & C,
 * orange central J pillar, orange foundation wedge, and orange Devanagari श्री in the S loop.
 */
export const OfficialCompanyEmblem: React.FC<{ className?: string; strokeEnhanced?: boolean }> = ({
  className = "w-full h-full"
}) => {
  return (
    <motion.img 
      src={companyLogoImg} 
      alt="Sri SJ Constructions Logo" 
      className={`${className} object-contain`} 
      draggable={false}
      whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
      transition={{ duration: 0.4 }}
    />
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'dark',
  className = '',
  size = 'md'
}) => {
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28',
    '3xl': 'w-36 h-36'
  };

  return (
    <div id="company-logo" className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Company Emblem */}
      <div className={`relative flex items-center justify-center rounded-xl bg-white shadow-md border-2 border-zinc-700/80 p-0.5 shrink-0 overflow-hidden transition-all duration-300 hover:border-orange-500 hover:shadow-orange-500/20 hover:shadow-lg ${iconSizes[size]}`}>
        <OfficialCompanyEmblem />
      </div>

      {variant !== 'compact' && variant !== 'emblem-only' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none flex-wrap">
            <span className="font-black tracking-tight font-['Space_Grotesk'] text-lg sm:text-xl text-white">
              SRI <span className="text-orange-500 font-black">SJ</span> <span className="text-white">CONSTRUCTIONS</span>
            </span>
            <span className="text-[10px] font-black tracking-wider px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40">
              PVT LTD
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Big Company Logo Showcase Card
 * Renders the big official emblem with certified registered company credentials
 */
export const BigCompanyLogoShowcase: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-[#0d0d11] border-2 border-zinc-800 shadow-2xl flex flex-col sm:flex-row items-center gap-6 sm:gap-8 ${className}`}>
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 shrink-0 rounded-2xl bg-white shadow-lg border border-zinc-700 p-2 overflow-hidden group">
        <OfficialCompanyEmblem className="w-full h-full transform group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="space-y-3 text-center sm:text-left flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Official Registered Emblem
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          SRI SJ CONSTRUCTIONS <span className="text-orange-500">PVT LTD</span>
        </h3>
        <p className="text-sm text-zinc-300 font-medium leading-relaxed">
          Estd. 2011 • Haldia, Sutahata, Nandarampur, West Bengal (721635). Specializing in bored cast-in-situ piling, heavy industrial foundations, and infrastructure contracting.
        </p>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-200">
            GSTIN: <strong className="text-orange-400 font-mono">19ABPCS8304J1ZQ</strong>
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-orange-500/20 border border-orange-500/40 text-orange-300">
            Verified Contractor
          </span>
        </div>
      </div>
    </div>
  );
};
