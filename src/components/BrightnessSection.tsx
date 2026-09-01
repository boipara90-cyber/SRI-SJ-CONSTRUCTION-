import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Sparkles, RotateCcw, Sliders, ChevronDown, ChevronUp } from 'lucide-react';

export type ThemeMode = 'light' | 'dark';

interface BrightnessSectionProps {
  theme: ThemeMode;
  brightness: number; // 60 to 130
  onThemeChange: (theme: ThemeMode) => void;
  onBrightnessChange: (brightness: number) => void;
  onReset: () => void;
}

export const BrightnessSection: React.FC<BrightnessSectionProps> = ({
  theme,
  brightness,
  onThemeChange,
  onBrightnessChange,
  onReset,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: 'Dim', value: 75 },
    { label: 'Normal', value: 100 },
    { label: 'Bright', value: 120 },
  ];

  return (
    <div 
      id="brightness-dark-mode-section"
      ref={containerRef}
      className="fixed bottom-6 left-6 z-40 transition-all duration-300 font-sans"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-w-xs sm:max-w-sm w-[290px] sm:w-[320px] ring-1 ring-white/10">
        
        {/* Compact Bar / Header */}
        <div className="p-3 flex items-center justify-between gap-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-100">Display & Brightness</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {brightness}%
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'} Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Quick Toggle Light/Dark */}
            <button
              onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
              id="quick-theme-toggle-btn"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
              )}
            </button>

            {/* Expand / Collapse Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              id="brightness-expand-btn"
              title={isExpanded ? 'Collapse Brightness Panel' : 'Adjust Brightness & Mode'}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="p-3.5 space-y-3.5 bg-slate-950/70 animate-in fade-in slide-in-from-bottom-2 duration-200">
            
            {/* Dark Mode vs Light Mode Segmented Control */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Theme Mode
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
                <button
                  type="button"
                  id="theme-light-btn"
                  onClick={() => onThemeChange('light')}
                  className={`flex items-center justify-center gap-2 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light Mode</span>
                </button>

                <button
                  type="button"
                  id="theme-dark-btn"
                  onClick={() => onThemeChange('dark')}
                  className={`flex items-center justify-center gap-2 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>

            {/* Brightness Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor="brightness-slider"
                  className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>Brightness Level</span>
                </label>
                <span className="text-xs font-black text-amber-400 font-mono">
                  {brightness}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <input
                  id="brightness-slider"
                  type="range"
                  min="60"
                  max="130"
                  step="5"
                  value={brightness}
                  onChange={(e) => onBrightnessChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
                  aria-label="Website Brightness Controller"
                />
                <Sun className="w-5 h-5 text-amber-400 shrink-0" />
              </div>
            </div>

            {/* Quick Brightness Presets & Reset */}
            <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-slate-800/80">
              <div className="flex items-center gap-1">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    id={`brightness-preset-${preset.label.toLowerCase()}`}
                    onClick={() => onBrightnessChange(preset.value)}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                      brightness === preset.value
                        ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {preset.label} ({preset.value}%)
                  </button>
                ))}
              </div>

              <button
                type="button"
                id="reset-brightness-btn"
                onClick={onReset}
                title="Reset to default Light Mode & 100% Brightness"
                className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
