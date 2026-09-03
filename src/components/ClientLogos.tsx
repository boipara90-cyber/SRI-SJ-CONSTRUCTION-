import React from 'react';

interface CompanyLogoProps {
  company: 'EXIDE' | 'TATA' | 'ADANI' | 'ITC' | 'RUCHI' | 'L&T' | 'JINDAL' | 'PGCIL' | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ company, className = '', size = 'md' }) => {
  const normalized = company.toUpperCase();

  const sizeClasses = {
    sm: 'h-8 max-w-[110px]',
    md: 'h-11 max-w-[160px]',
    lg: 'h-14 max-w-[200px]'
  };

  const containerClass = `flex items-center justify-center select-none ${sizeClasses[size]} ${className}`;

  switch (normalized) {
    case 'EXIDE':
      return (
        <div className={containerClass} title="Exide Industries Limited">
          <svg viewBox="0 0 160 50" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Red Energy Badge Background */}
            <rect x="2" y="5" width="156" height="40" rx="8" fill="#E31837" />
            <path d="M120 5L105 45H150C154.418 45 158 41.418 158 37V13C158 8.58172 154.418 5 150 5H120Z" fill="#B30E26" />
            
            {/* Battery Power Spark Motif */}
            <path d="M128 12L120 25H127L122 38L136 23H129L134 12H128Z" fill="#FFD200" />
            
            {/* EXIDE Bold Letterforms */}
            <g fill="#FFFFFF" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif">
              {/* E */}
              <path d="M14 14H30V19H20V23H28V27H20V31H30V36H14V14Z" fill="#FFFFFF" />
              {/* X */}
              <path d="M33 14H40L46 23.5L52 14H59L50 25L60 36H53L46 26.5L39 36H32L42 25L33 14Z" fill="#FFFFFF" />
              {/* I */}
              <path d="M62 14H68V36H62V14Z" fill="#FFFFFF" />
              {/* D */}
              <path d="M72 14H83C88 14 92 18 92 25C92 32 88 36 83 36H72V14ZM78 19V31H83C85.5 31 86.5 28.5 86.5 25C86.5 21.5 85.5 19 83 19H78Z" fill="#FFFFFF" />
              {/* E */}
              <path d="M96 14H112V19H102V23H110V27H102V31H112V36H96V14Z" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      );

    case 'TATA':
      return (
        <div className={containerClass} title="Tata Projects / Tata Group">
          <svg viewBox="0 0 150 50" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Tata Iconic Oval Blue Monogram */}
            <g transform="translate(6, 4)">
              <ellipse cx="21" cy="21" rx="20" ry="19" fill="#005A9C" />
              {/* Dual Arch curves symbolizing trust & growth */}
              <path d="M21 7C21 7 21 24 21 28" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <path d="M21 7C17.5 12 11 17 8 18.5" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M21 7C24.5 12 31 17 34 18.5" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
              <ellipse cx="21" cy="31" rx="1.5" ry="1.5" fill="#FFFFFF" />
            </g>
            
            {/* TATA Bold Typography */}
            <text x="56" y="32" fill="#005A9C" fontSize="24" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="4">
              TATA
            </text>
            <text x="57" y="43" fill="#64748B" fontSize="8.5" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.5">
              PROJECTS
            </text>
          </svg>
        </div>
      );

    case 'ADANI':
      return (
        <div className={containerClass} title="Adani Infra / Adani Group">
          <svg viewBox="0 0 150 50" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Adani Dynamic Tri-Arc Icon */}
            <g transform="translate(6, 6)">
              {/* Blue Arc */}
              <path d="M2 34C6 18 16 8 32 4" stroke="#003B70" strokeWidth="4.5" strokeLinecap="round" />
              {/* Cyan Arc */}
              <path d="M8 36C12 23 20 14 34 11" stroke="#00A3E0" strokeWidth="4" strokeLinecap="round" />
              {/* Orange/Coral Arc */}
              <path d="M14 38C17 29 23 21 36 18" stroke="#F26522" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            
            {/* adani lowercase signature wordmark */}
            <text x="48" y="31" fill="#003B70" fontSize="23" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">
              adani
            </text>
            <text x="49" y="42" fill="#F26522" fontSize="8" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="2">
              INFRASTRUCTURE
            </text>
          </svg>
        </div>
      );

    case 'ITC':
      return (
        <div className={containerClass} title="ITC Limited">
          <svg viewBox="0 0 140 50" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* ITC Triangular Heraldic Crest */}
            <g transform="translate(6, 6)">
              <polygon points="18,2 34,34 2,34" fill="#003366" stroke="#D4AF37" strokeWidth="1.5" />
              <polygon points="18,7 30,32 6,32" fill="#0A2540" />
              {/* Compass Gold Star */}
              <circle cx="18" cy="20" r="4" fill="#D4AF37" />
              <line x1="18" y1="12" x2="18" y2="28" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="10" y1="20" x2="26" y2="20" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>
            
            {/* ITC Serif Distinct Typography */}
            <text x="46" y="28" fill="#003366" fontSize="22" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="3">
              I.T.C.
            </text>
            <text x="46" y="40" fill="#94A3B8" fontSize="7.5" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1">
              LIMITED
            </text>
          </svg>
        </div>
      );

    case 'RUCHI':
      return (
        <div className={containerClass} title="Ruchi Infra Services / Infrastructure">
          <svg viewBox="0 0 150 50" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ruchi Golden Harvest & Port Industrial Ring */}
            <g transform="translate(6, 6)">
              <circle cx="18" cy="18" r="17" fill="#0D5C3A" />
              <circle cx="18" cy="18" r="14" fill="#FFFFFF" />
              {/* Sunburst / Grain Rays */}
              <path d="M18 6V12M18 24V30M6 18H12M24 18H30M9 9L14 14M22 22L27 27M9 27L14 22M22 14L27 9" stroke="#E5A910" strokeWidth="2" strokeLinecap="round" />
              <circle cx="18" cy="18" r="4.5" fill="#E31837" />
            </g>
            
            {/* RUCHI Bold Wordmark */}
            <text x="46" y="29" fill="#E31837" fontSize="21" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.5">
              RUCHI
            </text>
            <text x="47" y="41" fill="#0D5C3A" fontSize="8" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.5">
              INFRA SERVICES
            </text>
          </svg>
        </div>
      );

    case 'L&T':
      return (
        <div className={containerClass} title="Larsen & Toubro Limited">
          <svg viewBox="0 0 150 50" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* L&T Signature Yellow Box */}
            <rect x="4" y="6" width="38" height="38" rx="6" fill="#FDB913" />
            <path d="M10 13H15V31H25V36H10V13Z" fill="#002D62" />
            <path d="M21 13H33V17H29V36H24V17H21V13Z" fill="#002D62" />
            <path d="M18 22L22 26" stroke="#002D62" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* L&T Wordmark */}
            <text x="48" y="27" fill="#002D62" fontSize="18" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1">
              L&amp;T
            </text>
            <text x="48" y="39" fill="#64748B" fontSize="8" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.8">
              LARSEN &amp; TOUBRO
            </text>
          </svg>
        </div>
      );

    case 'JINDAL':
      return (
        <div className={containerClass} title="Jindal India Limited">
          <svg viewBox="0 0 150 50" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Jindal Steel Arch */}
            <g transform="translate(6, 6)">
              <rect width="36" height="36" rx="6" fill="#0F172A" />
              <path d="M8 28C8 17 17 8 28 8" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
              <path d="M14 28C14 20 20 14 28 14" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            
            <text x="48" y="27" fill="#0F172A" fontSize="18" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.5">
              JINDAL
            </text>
            <text x="49" y="39" fill="#0284C7" fontSize="8" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.5">
              INDIA LIMITED
            </text>
          </svg>
        </div>
      );

    case 'PGCIL':
      return (
        <div className={containerClass} title="Power Grid Corporation of India Limited">
          <svg viewBox="0 0 160 50" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* PGCIL Transmission Tower Crest */}
            <g transform="translate(6, 6)">
              <rect width="36" height="36" rx="6" fill="#065F46" />
              {/* Tower structure */}
              <path d="M18 6V30M8 18H28M12 12H24M11 25L25 25M11 12L25 25M25 12L11 25" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="18" cy="6" r="2" fill="#F59E0B" />
            </g>
            
            <text x="48" y="27" fill="#065F46" fontSize="17" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1">
              POWERGRID
            </text>
            <text x="49" y="39" fill="#047857" fontSize="7.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1">
              PGCIL GOVT OF INDIA
            </text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={containerClass}>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700">
            <span className="text-xs font-black text-orange-400 font-['Space_Grotesk'] tracking-wider">{company}</span>
          </div>
        </div>
      );
  }
};
