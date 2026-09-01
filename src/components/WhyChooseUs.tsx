import React from 'react';
import { WHY_CHOOSE_US, COMPANY_INFO } from '../data/companyData';
import { 
  Calendar, 
  Users, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Zap, 
  HeartHandshake,
  Sparkles,
  HardHat
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Calendar': return <Calendar className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'Award': return <Award className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6" />;
      case 'Clock': return <Clock className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
      default: return <CheckCircle2 className="w-6 h-6" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-20 bg-[#e2e8f0] text-slate-800 relative border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <HardHat className="w-3.5 h-3.5 text-amber-600" />
            <span>Proven Reliability &amp; Safety</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Space_Grotesk']">
            Why Choose Sri SJ Construction
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Eight foundational reasons why industrial developers and civil project heads in West Bengal trust our foundation and construction capabilities.
          </p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-100 border border-slate-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Icon & Count */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-sm">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors font-['Space_Grotesk']">
                  {item.title}
                </h3>

                <p className="text-slate-700 text-xs sm:text-sm mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-black text-amber-700 group-hover:text-amber-600 flex items-center gap-1">
                  <span>SRI SJ CONSTRUCTION PVT LTD</span>
                </span>
                <span className="text-[10px] text-slate-600 font-semibold">Standard of Practice</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality & Safety Commitment Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-100 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-black uppercase text-amber-700 tracking-wider">
              SRI SJ CONSTRUCTION PRIVATE LIMITED
            </div>
            <h4 className="text-lg font-black text-slate-950 font-['Space_Grotesk']">
              Strict Adherence to Indian Engineering Codes (IS 2911 &amp; IS 456)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Every piling and civil contract undertaken by <strong className="text-slate-900">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong> complies with national safety and structural standards.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
              IS 2911 (Piling)
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
              IS 456 (Plain &amp; RCC)
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-800">
              Zero Incident Protocol
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
