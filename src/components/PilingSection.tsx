import React, { useState } from 'react';
import { PILING_CAPABILITIES, PILING_PROCESS_STEPS } from '../data/companyData';
import { 
  Drill, 
  Layers, 
  Factory, 
  Building2, 
  Shield, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Info,
  Sliders
} from 'lucide-react';

interface PilingSectionProps {
  onOpenQuoteModal: (pilingType?: string) => void;
}

export const PilingSection: React.FC<PilingSectionProps> = ({ onOpenQuoteModal }) => {
  const [selectedPileId, setSelectedPileId] = useState<string>(PILING_CAPABILITIES[0].id);

  const getPilingIcon = (iconName: string) => {
    switch (iconName) {
      case 'Drill': return <Drill className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Factory': return <Factory className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      default: return <Drill className="w-5 h-5" />;
    }
  };

  const currentCapability = PILING_CAPABILITIES.find(c => c.id === selectedPileId) || PILING_CAPABILITIES[0];

  return (
    <section id="piling" className="py-20 bg-black text-white relative overflow-hidden border-t border-zinc-900">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#f9731615_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Drill className="w-3.5 h-3.5 text-orange-500" />
            <span>Specialized Geotechnical Ground Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Comprehensive Piling &amp; Deep Foundation Capabilities
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg mt-3 leading-relaxed">
            With dedicated rotary piling rigs, bentonite circulation systems, and experienced rig operators, 
            Sri SJ Construction delivers high-capacity bored piles and complex foundation systems throughout West Bengal.
          </p>
        </div>

        {/* Highlight Image & Capability Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Left 6 Cols: Interactive Capabilities List */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
              Select Piling Solution:
            </div>
            {PILING_CAPABILITIES.map((cap) => {
              const isSelected = cap.id === selectedPileId;
              return (
                <button
                  key={cap.id}
                  onClick={() => setSelectedPileId(cap.id)}
                  id={`piling-tab-${cap.id}`}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 border flex items-start gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-[#121218] border-orange-500 shadow-xl ring-1 ring-orange-500/40'
                      : 'bg-[#0e0e13] border-zinc-800 hover:border-zinc-700 hover:bg-[#14141a]'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                    isSelected 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {getPilingIcon(cap.iconName)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-base font-bold font-['Space_Grotesk'] ${
                        isSelected ? 'text-orange-400' : 'text-white'
                      }`}>
                        {cap.title}
                      </h4>
                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">
                          Active View
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1 line-clamp-2">
                      {cap.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 6 Cols: Detailed Spec Card + Site Photography */}
          <div className="lg:col-span-6">
            <div className="bg-[#0e0e13] rounded-2xl border border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Photo Banner with Piling Overlay */}
              <div className="relative h-56 rounded-xl overflow-hidden bg-black border border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80"
                  alt="Bored Piling Rig Operation on Indian Industrial Site"
                  className="w-full h-full object-cover object-center opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-white px-2.5 py-1 rounded bg-black/85 backdrop-blur-sm border border-zinc-700">
                    IS 2911 Piling Standard Compliant
                  </span>
                  <span className="text-xs font-bold text-orange-400 px-2.5 py-1 rounded bg-black/85 backdrop-blur-sm border border-zinc-700">
                    Haldia Fleet
                  </span>
                </div>
              </div>

              {/* Dynamic Information Display for Selected Capability */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Detailed Specifications
                </span>
                <h3 className="text-2xl font-black text-white font-['Space_Grotesk'] mt-1">
                  {currentCapability.title}
                </h3>
                <p className="text-zinc-300 text-sm mt-3 leading-relaxed">
                  {currentCapability.description}
                </p>
              </div>

              {/* Technical Attributes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentCapability.diameterRange && (
                  <div className="p-3 rounded-lg bg-[#14141a] border border-zinc-800">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase">Pile Diameters</span>
                    <p className="text-sm font-black text-orange-400 mt-0.5">{currentCapability.diameterRange}</p>
                  </div>
                )}
                {currentCapability.depthRange && (
                  <div className="p-3 rounded-lg bg-[#14141a] border border-zinc-800">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase">Drilling Depth</span>
                    <p className="text-sm font-black text-white mt-0.5">{currentCapability.depthRange}</p>
                  </div>
                )}
              </div>

              <div className="p-3.5 rounded-lg bg-[#14141a] border border-zinc-800">
                <span className="text-[11px] font-bold text-zinc-400 uppercase">Recommended Applications:</span>
                <p className="text-xs sm:text-sm text-zinc-200 mt-1 font-medium">{currentCapability.bestFor}</p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenQuoteModal(currentCapability.title)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-orange-400/40"
              >
                <span>Request Piling Estimate for {currentCapability.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Piling Methodology / Step-by-Step Flow */}
        <div className="mt-16 bg-[#0e0e13] rounded-2xl border border-zinc-800 p-6 sm:p-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-black text-white font-['Space_Grotesk']">
              Standard Bored Cast-In-Situ Piling Workflow
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Rigorous 5-stage geotechnical execution methodology adhered to on every Sri SJ Constructions site.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PILING_PROCESS_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-[#14141a] border border-zinc-800 flex flex-col justify-between relative group hover:border-orange-500 transition-colors shadow-sm"
              >
                <div>
                  <div className="text-2xl font-black text-orange-500 font-['Space_Grotesk'] mb-2">
                    {step.step}
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug font-['Space_Grotesk']">
                    {step.title}
                  </h4>
                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-800">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                    SRI SJ CONSTRUCTION PVT LTD
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
            <span>Engineering Standard: IS 2911 (Part 1/Sec 2) Bored Cast-In-Situ Piling Execution</span>
            <span className="font-black text-orange-400">SRI SJ CONSTRUCTION PRIVATE LIMITED • HALDIA</span>
          </div>
        </div>

      </div>
    </section>
  );
};
