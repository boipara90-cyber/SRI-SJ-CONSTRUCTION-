import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'light' | 'dark' | 'emblem-only';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

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
    xl: 'w-20 h-20'
  };

  const isDark = theme === 'dark' || variant === 'light';

  return (
    <div id="company-logo" className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Company Emblem: Red Outer Frame, White Canvas, Blue Inner Frame & Monogram */}
      <div className={`relative flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200/80 shrink-0 overflow-hidden ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-0.5"
        >
          {/* Outer Rounded Red Border */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="12"
            fill="#FFFFFF"
            stroke="#D32F2F"
            strokeWidth="5"
          />

          {/* Inner Navy Blue Rectangle Frame */}
          <rect
            x="12"
            y="12"
            width="76"
            height="76"
            fill="none"
            stroke="#002060"
            strokeWidth="2.5"
          />

          {/* Top House / Roof Chevron (Gable) */}
          <path
            d="M26 35L50 18L74 35"
            stroke="#002060"
            strokeWidth="5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Monogram: Left "S" Shape */}
          {/* Top horizontal */}
          <line x1="20" y1="42" x2="48" y2="42" stroke="#002060" strokeWidth="5.5" strokeLinecap="square" />
          {/* Left vertical stem */}
          <line x1="22.75" y1="42" x2="22.75" y2="67" stroke="#002060" strokeWidth="5.5" strokeLinecap="square" />
          {/* Middle horizontal */}
          <line x1="20" y1="64.5" x2="48" y2="64.5" stroke="#002060" strokeWidth="5.5" strokeLinecap="square" />
          {/* Lower right vertical */}
          <line x1="45.25" y1="64.5" x2="45.25" y2="86" stroke="#002060" strokeWidth="5.5" strokeLinecap="square" />
          {/* Bottom horizontal */}
          <line x1="20" y1="83.5" x2="48" y2="83.5" stroke="#002060" strokeWidth="5.5" strokeLinecap="square" />

          {/* Monogram: Center Column / Right Structure "T" / "C" */}
          {/* Top horizontal bridge over center column */}
          <line x1="47" y1="42" x2="80" y2="42" stroke="#002060" strokeWidth="5.5" strokeLinecap="square" />
          {/* Central main vertical pillar */}
          <line x1="56" y1="42" x2="56" y2="86" stroke="#002060" strokeWidth="5.5" strokeLinecap="square" />
          {/* Right C - vertical stroke */}
          <line x1="77.25" y1="42" x2="77.25" y2="86" stroke="#002060" strokeWidth="5.5" strokeLinecap="square" />
          {/* Right C - bottom horizontal hook */}
          <line x1="68" y1="83.5" x2="80" y2="83.5" stroke="#002060" strokeWidth="5.5" strokeLinecap="square" />
        </svg>
      </div>

      {variant !== 'compact' && variant !== 'emblem-only' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-extrabold tracking-tight font-['Space_Grotesk'] text-lg md:text-xl ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              SRI <span className="text-amber-500 font-black">SJ</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 border border-amber-500/30">
              PVT LTD
            </span>
          </div>
          <span className={`text-[10px] md:text-[11px] font-semibold tracking-wider uppercase mt-0.5 font-['Plus_Jakarta_Sans'] ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Construction &amp; Piling Company
          </span>
        </div>
      )}
    </div>
  );
};
