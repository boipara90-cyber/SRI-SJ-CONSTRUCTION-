import React from 'react';

interface CompanyLogoProps {
  company: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ company, className = '', size = 'md' }) => {
  const normalized = company.toUpperCase().trim().replace(/[\s\-_]+/g, '');

  const sizeClasses = {
    sm: 'h-8 max-w-[120px]',
    md: 'h-11 max-w-[170px]',
    lg: 'h-14 max-w-[210px]'
  };

  const containerClass = `flex items-center justify-center select-none cursor-pointer ${sizeClasses[size]} ${className}`;
  const svgClass = "w-full h-full client-logo-interactive cursor-pointer";

  // 1. L&T / LARSEN & TOUBRO
  if (normalized.includes('L&T') || normalized.includes('LARSEN') || normalized === 'LT') {
    return (
      <div className={containerClass} title="Larsen & Toubro">
        <svg viewBox="0 0 170 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(45, 0)">
            <circle cx="25" cy="25" r="22" stroke="#00356B" strokeWidth="3.5" fill="none" />
            <path d="M14 12 L22 36 L34 36 L26 12 Z" fill="#00356B" />
            <path d="M21 12 L38 12 L35 20 L27 20 L30 12 Z" fill="#00356B" />
            <path d="M23 28 L31 28 L28 36 L21 36 Z" fill="#00356B" />
          </g>
          <text x="100" y="32" fill="#00356B" fontSize="22" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" fontStyle="italic" letterSpacing="0.5">
            L&amp;T
          </text>
        </svg>
      </div>
    );
  }

  // 2. KALPATARU / KPIL
  if (normalized.includes('KALPATARU') || normalized.includes('KPIL')) {
    return (
      <div className={containerClass} title="Kalpataru Projects International Limited">
        <svg viewBox="0 0 170 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Kalpataru Circular Seal */}
          <g transform="translate(6, 0)">
            <circle cx="25" cy="25" r="23" stroke="#23A1D9" strokeWidth="4.5" fill="none" />
            <circle cx="25" cy="25" r="18" stroke="#23A1D9" strokeWidth="1" fill="none" />
            
            {/* Center Blue Square */}
            <rect x="14" y="11" width="8" height="8" fill="#23A1D9" />
            {/* White Clover inside square */}
            <path d="M18 12.5 C19 12.5 19 14.5 18 15 C19.5 15 19.5 16.5 18 16.5 C18 17.5 16 17.5 16 16.5 C14.5 16.5 14.5 15 16 15 C15 14.5 15 12.5 16 12.5 Z" fill="#FFFFFF" />
            <line x1="18" y1="12" x2="18" y2="17" stroke="#FFFFFF" strokeWidth="0.8" />
            <line x1="15" y1="15" x2="21" y2="15" stroke="#FFFFFF" strokeWidth="0.8" />
            
            {/* Inner Text */}
            <text x="24" y="17" fill="#333333" fontSize="5.5" fontWeight="900" fontFamily="system-ui, sans-serif">
              KALPA-TARU
            </text>
            <text x="25" y="32" textAnchor="middle" fill="#333333" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">
              KPIL
            </text>

            {/* Stars */}
            <g fill="#23A1D9" transform="translate(0, 1) scale(0.95)">
              <polygon points="12,42 13,44 15,44 13.5,45.5 14,47.5 12,46.5 10,47.5 10.5,45.5 9,44 11,44" />
              <polygon points="17,44 18,46 20,46 18.5,47.5 19,49.5 17,48.5 15,49.5 15.5,47.5 14,46 16,46" />
              <polygon points="22.5,45 23.5,47 25.5,47 24,48.5 24.5,50.5 22.5,49.5 20.5,50.5 21,48.5 19.5,47 21.5,47" />
              <polygon points="28,44 29,46 31,46 29.5,47.5 30,49.5 28,48.5 26,49.5 26.5,47.5 25,46 27,46" />
              <polygon points="33,42 34,44 36,44 34.5,45.5 35,47.5 33,46.5 31,47.5 31.5,45.5 30,44 32,44" />
            </g>
          </g>
          
          <text x="64" y="24" fill="#23A1D9" fontSize="15" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">
            KALPATARU
          </text>
          <text x="64" y="37" fill="#475569" fontSize="8.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.3">
            PROJECTS INTL LTD
          </text>
        </svg>
      </div>
    );
  }

  // 3. RESONIA LTD
  if (normalized.includes('RESONIA')) {
    return (
      <div className={containerClass} title="Resonia Ltd">
        <svg viewBox="0 0 170 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(10, 6)">
            <polygon points="19,2 35,11 35,29 19,38 3,29 3,11" fill="#1E293B" />
            <polygon points="19,7 30,13 30,27 19,33 8,27 8,13" fill="#0F172A" stroke="#F97316" strokeWidth="2" />
            <path d="M13 16L19 22L25 16M13 22L19 28L25 22" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <text x="58" y="27" fill="#1E293B" fontSize="19" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.5">
            RESONIA
          </text>
          <text x="59" y="39" fill="#F97316" fontSize="8.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="2">
            LIMITED
          </text>
        </svg>
      </div>
    );
  }

  // 4. ADANI WILMAR
  if (normalized.includes('WILMAR') || normalized === 'ADANIWILMAR') {
    return (
      <div className={containerClass} title="Adani Wilmar Limited">
        <svg viewBox="0 0 160 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="adaniWilmarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0079C1" />
              <stop offset="50%" stopColor="#7B3294" />
              <stop offset="100%" stopColor="#D81B60" />
            </linearGradient>
          </defs>
          <text x="36" y="22" fill="url(#adaniWilmarGrad)" fontSize="26" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0">
            adani
          </text>
          <text x="33" y="44" fill="#00665E" fontSize="23" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="0">
            wilmar
          </text>
        </svg>
      </div>
    );
  }

  // 5. ADANI ENERGY SOLUTIONS
  if (normalized.includes('ADANIENERGY') || normalized.includes('ENERGYSOLUTIONS')) {
    return (
      <div className={containerClass} title="Adani Energy Solutions Ltd">
        <svg viewBox="0 0 170 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="adaniEnergyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0079C1" />
              <stop offset="50%" stopColor="#7B3294" />
              <stop offset="100%" stopColor="#D81B60" />
            </linearGradient>
          </defs>
          <text x="18" y="24" fill="url(#adaniEnergyGrad)" fontSize="26" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0">
            adani
          </text>
          <line x1="18" y1="31" x2="152" y2="31" stroke="#64748B" strokeWidth="1.5" />
          <text x="18" y="44" fill="#475569" fontSize="12.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.2">
            Energy Solutions
          </text>
        </svg>
      </div>
    );
  }

  // 6. SHAPOORJI PALLONJI
  if (normalized.includes('SHAPOORJI') || normalized.includes('PALLONJI') || normalized === 'SP') {
    return (
      <div className={containerClass} title="Shapoorji Pallonji">
        <svg viewBox="0 0 170 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(16, 4)">
            {/* Shapoorji 3D Ribbon SP */}
            <polygon points="12,18 24,12 36,18 36,26 24,32 12,26" fill="#0B3C78" />
            <polygon points="12,18 24,12 24,18 12,24" fill="#0E4B92" />
            <polygon points="24,12 36,18 36,26 24,20" fill="#0078C1" />
            
            <polygon points="0,24 12,18 24,24 24,32 12,38 0,32" fill="#0E4B92" />
            <polygon points="0,24 12,18 12,24 0,30" fill="#0B3C78" />
            <polygon points="12,18 24,24 24,32 12,26" fill="#1867BB" />
          </g>
          <text x="58" y="27" fill="#0B3C78" fontSize="14" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0">
            Shapoorji Pallonji
          </text>
          <text x="59" y="39" fill="#0078C1" fontSize="8.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.8">
            CONSTRUCTION LTD
          </text>
        </svg>
      </div>
    );
  }

  // 7. ITC LIMITED
  if (normalized.includes('ITC')) {
    return (
      <div className={containerClass} title="ITC Limited">
        <svg viewBox="0 0 170 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(18, 0)">
            {/* The ITC Triangle */}
            <path d="M 23 2 L 44 42 L 2 42 Z" fill="#002B5E" />
            {/* The White Cutout forming I T C */}
            <path d="M 23 18 L 33 42 L 30 42 L 27 35 L 19 35 L 16 42 L 13 42 Z" fill="#FFFFFF" />
            <path d="M 20 31 L 26 31 L 23 23 Z" fill="#002B5E" />
            <rect x="22" y="10" width="2" height="6" fill="#FFFFFF" />
          </g>
          <text x="68" y="28" fill="#002B5E" fontSize="21" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="2">
            ITC
          </text>
          <text x="69" y="42" fill="#002B5E" fontSize="11" fontWeight="700" fontFamily="Georgia, serif" letterSpacing="0.5">
            Limited
          </text>
        </svg>
      </div>
    );
  }

  // 8. RUCHI INDUSTRIES / RUCHI SOYA
  if (normalized.includes('RUCHI')) {
    return (
      <div className={containerClass} title="Ruchi Soya Industries Limited">
        <svg viewBox="0 0 170 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="4" width="120" height="30" rx="15" fill="#139648" />
          <g fill="#FFFFFF" transform="translate(35, 10)">
            {/* Custom stylized R */}
            <path d="M 10 3 L 18 3 C 21 3 23 4.5 23 7 C 23 9.5 21 11 18 11 L 14 11 L 14 17 L 10 17 Z M 14 6 L 14 8 L 18 8 C 19 8 19 6 18 6 Z" />
            <path d="M 18 11 L 26 21 L 21 21 L 15 13 Z" />
            <text x="25" y="16" fontSize="15" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="0">
              uchi
            </text>
          </g>
          <text x="22" y="45" fill="#139648" fontSize="8.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.3">
            Ruchi Soya Industries Limited
          </text>
        </svg>
      </div>
    );
  }

  // 9. JINDAL INDIA LTD
  if (normalized.includes('JINDAL')) {
    return (
      <div className={containerClass} title="Jindal India Limited">
        <svg viewBox="0 0 170 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(25, 2)">
            {/* Red Oval Trade Mark */}
            <ellipse cx="30" cy="18" rx="28" ry="17" stroke="#E31837" strokeWidth="2.5" fill="none" />
            <rect x="18" y="0" width="24" height="6" fill="#FFFFFF" />
            <text x="30" y="5" textAnchor="middle" fill="#E31837" fontSize="5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">
              TRADE
            </text>
            <rect x="20" y="32" width="20" height="6" fill="#FFFFFF" />
            <text x="30" y="37" textAnchor="middle" fill="#E31837" fontSize="5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">
              MARK
            </text>
            
            {/* Simplified Map of India */}
            <path d="M25 8 C28 6 32 8 34 11 C37 13 40 15 39 18 C38 21 35 24 33 27 C31 30 29 34 26 34 C23 30 21 26 19 23 C17 19 16 15 19 11 Z" fill="#E31837" />
            
            <text x="30" y="21" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="0.5">
              Jindal
            </text>
          </g>
          
          <text x="86" y="22" fill="#E31837" fontSize="16" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1">
            JINDAL
          </text>
          <text x="86" y="36" fill="#E31837" fontSize="8" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.8">
            (INDIA) LIMITED
          </text>
        </svg>
      </div>
    );
  }

  // 10. EXIDE INDUSTRIES LTD
  if (normalized.includes('EXIDE')) {
    return (
      <div className={containerClass} title="Exide Industries Limited">
        <svg viewBox="0 0 170 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(10, 4)">
            <circle cx="21" cy="21" r="19" fill="#0A18A8" />
            <path d="M25 7 L12 21 L19 21 L16 34 L29 20 L22 20 Z" fill="#FFFFFF" />
          </g>
          <text x="56" y="28" fill="#DA2128" fontSize="27" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" fontStyle="italic" letterSpacing="1">
            EXIDE
          </text>
          <text x="57" y="41" fill="#1C1B50" fontSize="8.5" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="1.2">
            INDUSTRIES LIMITED
          </text>
        </svg>
      </div>
    );
  }

  // 11. CERATIZIT INDIA PVT LTD
  if (normalized.includes('CERATIZIT')) {
    return (
      <div className={containerClass} title="Ceratizit Group">
        <svg viewBox="0 0 170 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(12, 8)">
            {/* Dark Charcoal Triangle outline */}
            <polygon points="12,2 2,26 8,32 18,32 21,26 12,26 7,26 14,8 18,8" fill="#404040" />
            {/* Red Triangle Stripes */}
            <polygon points="21,12 30,30 25,30 17,16" fill="#E83A14" />
            <polygon points="24,18 29,30 27,30 22,21" fill="#E83A14" />
            <polygon points="27,24 30,30 28,30 25,25" fill="#E83A14" />
            
            <line x1="20" y1="32" x2="33" y2="32" stroke="#E83A14" strokeWidth="2.5" />
          </g>

          <g transform="translate(54, 8)">
            <text x="0" y="19" fill="#E83A14" fontSize="18" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="2">
              CERATIZIT
            </text>
            <line x1="2" y1="26" x2="100" y2="26" stroke="#404040" strokeWidth="1.5" />
            <text x="30" y="38" fill="#404040" fontSize="9" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="4">
              GROUP
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // 12. SHREEJI PROPACK PVT LTD (SHREEJI GROUP)
  if (normalized.includes('SHREEJI')) {
    return (
      <div className={containerClass} title="Shreeji Group">
        <svg viewBox="0 0 170 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(8, 2)">
            {/* Globe Sphere */}
            <circle cx="21" cy="24" r="17" fill="#2E2469" />
            <ellipse cx="21" cy="24" rx="15" ry="7" stroke="#4B4190" strokeWidth="1" fill="none" />
            <ellipse cx="21" cy="24" rx="7" ry="15" stroke="#4B4190" strokeWidth="1" fill="none" />
            
            {/* Light Blue S Wave */}
            <path d="M 12 18 C 16 12 28 10 32 18 C 36 26 24 32 16 35 C 12 36 26 31 34 23" stroke="#25A5DE" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            
            <path d="M 6 12 C 12 4 30 4 36 12" id="shreejiCurve" fill="none" />
            <text fill="#E51D24" fontSize="7" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.2">
              <textPath href="#shreejiCurve" startOffset="50%" textAnchor="middle">
                SHREEJI GROUP
              </textPath>
            </text>
          </g>
          
          <g transform="translate(56, 4)">
            <text x="0" y="19" fill="#E51D24" fontSize="15" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">
              SHREEJI
            </text>
            <text x="0" y="32" fill="#2E2469" fontSize="8.5" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.5">
              PROPACK PVT. LTD.
            </text>
            <text x="0" y="42" fill="#2E2469" fontSize="7" fontStyle="italic" fontWeight="600" fontFamily="Georgia, serif">
              Driven to Deliver
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // TATA (For backwards compatibility)
  if (normalized.includes('TATA')) {
    return (
      <div className={containerClass} title="Tata Projects">
        <svg viewBox="0 0 150 50" className={svgClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="21" cy="25" rx="19" ry="18" fill="#005A9C" />
          <path d="M21 11C21 11 21 28 21 32" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M21 11C17.5 16 11 21 8 22.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M21 11C24.5 16 31 21 34 22.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <text x="52" y="30" fill="#005A9C" fontSize="22" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="3">
            TATA
          </text>
        </svg>
      </div>
    );
  }

  // Default fallback
  return (
    <div className={containerClass}>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700">
        <span className="text-xs font-black text-orange-400 font-['Space_Grotesk'] tracking-wider">{company}</span>
      </div>
    </div>
  );
};

