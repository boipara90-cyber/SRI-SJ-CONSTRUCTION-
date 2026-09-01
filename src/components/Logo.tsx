import React from 'react';

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
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]`}
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      {/* Solid Pure White Canvas */}
      <rect width="600" height="600" fill="#FFFFFF" />

      {/* Outer Deep Royal Blue Rectangular Border */}
      <rect
        x="16"
        y="16"
        width="568"
        height="568"
        rx="4"
        fill="none"
        stroke="#163FA7"
        strokeWidth="9"
      />

      {/* Inner Vivid Orange Rectangular Border */}
      <rect
        x="32"
        y="32"
        width="536"
        height="536"
        fill="none"
        stroke="#F15A10"
        strokeWidth="9"
      />

      {/* Clean Blue Outline of Symmetrical Pitched Roof */}
      <path
        d="M 72 248 L 300 70 L 528 248"
        fill="none"
        stroke="#163FA7"
        strokeWidth="32"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      />

      {/* Central Vivid Orange 'J' Column (Central Structural Beam) */}
      <path
        d="M 300 118 L 356 162 L 356 460 C 356 488 334 506 294 506 L 244 506 L 244 456 L 286 456 C 302 456 312 448 312 434 L 312 254 L 300 254 Z"
        fill="#F15A10"
      />

      {/* Bottom Left Orange Foundation Base Wedge */}
      <polygon points="58,506 204,506 250,456 104,456" fill="#F15A10" />

      {/* Left Deep Royal Blue 'S' Monogram */}
      <polygon points="96,254 260,254 218,300 96,300" fill="#163FA7" />
      <path
        d="M 96 254 C 74 254 60 268 60 292 L 60 376 C 60 398 74 412 96 412 L 142 412 L 142 368 L 104 368 C 98 368 94 362 94 354 L 94 300 L 96 254 Z"
        fill="#163FA7"
      />
      <path
        d="M 204 362 C 238 362 264 398 264 442 C 264 480 232 506 172 506 C 218 496 244 458 244 422 C 244 380 216 362 204 362 Z"
        fill="#163FA7"
      />
      <path
        d="M 244 366 C 244 434 206 506 156 506 C 196 506 226 456 226 400 C 226 380 220 366 208 366 Z"
        fill="#163FA7"
      />

      {/* Devanagari Script Text 'श्री' in Vivid Orange in the Lower Loop of S */}
      <g transform="translate(104, 308)">
        <path d="M 38 12 C 34 2 24 -6 14 -6 C 2 -6 -6 2 -6 14 C -6 26 2 34 14 36 C 22 38 28 34 32 30 L 32 64 C 32 68 28 72 24 72 L 12 72 L 12 82 L 28 82 C 38 82 44 74 44 64 L 44 12 Z M 14 4 C 18 4 22 8 22 14 C 22 20 18 24 14 24 C 10 24 6 20 6 14 C 6 8 10 4 14 4 Z" fill="#F15A10" />
        <path d="M 18 36 L -2 60 L 4 66 L 26 42 Z" fill="#F15A10" />
        <path d="M 44 4 L 72 4 L 72 82 L 60 82 L 60 14 L 44 14 Z" fill="#F15A10" />
        <path d="M 40 -8 C 50 -20 64 -26 80 -26 C 96 -26 108 -14 108 8 L 108 82 L 96 82 L 96 8 C 96 -6 88 -14 78 -14 C 66 -14 54 -6 48 4 Z" fill="#F15A10" />
        <path d="M 2 4 L 112 4 L 112 14 L 2 14 Z" fill="#F15A10" />
        <text
          x="56"
          y="68"
          fontSize="110"
          fontWeight="900"
          textAnchor="middle"
          fill="#F15A10"
          fontFamily="'Rozha One', 'Yatra One', 'Noto Sans Devanagari', 'Mangal', 'Lohit Devanagari', 'Mukta', sans-serif"
        >
          श्री
        </text>
      </g>

      {/* Right Deep Royal Blue 'C' Geometry */}
      <path
        d="M 412 254 L 512 254 C 532 254 544 266 544 288 L 544 442 C 544 464 532 506 492 506 L 412 506 C 372 506 360 468 360 442 L 360 288 C 360 266 372 254 412 254 Z M 414 300 L 414 460 L 488 460 C 496 460 500 454 500 444 L 500 288 C 500 278 496 272 488 272 L 414 272 Z"
        fill="#163FA7"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
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

  const isDark = theme === 'dark' || variant === 'light';

  return (
    <div id="company-logo" className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Company Emblem */}
      <div className={`relative flex items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200/90 dark:border-slate-700 shrink-0 overflow-hidden transition-all duration-200 hover:shadow-md ${iconSizes[size]}`}>
        <OfficialCompanyEmblem />
      </div>

      {variant !== 'compact' && variant !== 'emblem-only' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none flex-wrap">
            <span className={`font-black tracking-tight font-['Space_Grotesk'] text-lg sm:text-xl ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              SRI <span className="text-amber-500 font-black">SJ</span> <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>CONSTRUCTIONS</span>
            </span>
            <span className="text-[10px] font-black tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
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
    <div className={`p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/90 shadow-2xl flex flex-col sm:flex-row items-center gap-6 sm:gap-8 ${className}`}>
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 shrink-0 rounded-2xl bg-white shadow-lg border border-slate-200 p-2 overflow-hidden group">
        <OfficialCompanyEmblem className="w-full h-full transform group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="space-y-3 text-center sm:text-left flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 text-xs font-black uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Official Registered Emblem
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-['Space_Grotesk'] tracking-tight">
          SRI SJ CONSTRUCTIONS <span className="text-amber-600">PVT LTD</span>
        </h3>
        <p className="text-sm text-slate-600 font-medium leading-relaxed">
          Estd. 2011 • Haldia, Sutahata, Nandarampur, West Bengal (721635). Specializing in bored cast-in-situ piling, heavy industrial foundations, and infrastructure contracting.
        </p>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800">
            GSTIN: 19ABPCS8304J1ZQ
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 border border-emerald-200 text-emerald-900">
            Verified Contractor
          </span>
        </div>
      </div>
    </div>
  );
};
