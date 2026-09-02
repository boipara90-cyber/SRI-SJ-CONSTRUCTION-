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
    <section id="why-choose-us" className="py-20 bg-black text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HardHat className="w-3.5 h-3.5 text-orange-400" />
            <span>Proven Reliability &amp; Safety</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Why Choose Sri SJ Constructions
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg mt-3">
            Eight foundational reasons why industrial developers and civil project heads in West Bengal trust our foundation and construction capabilities.
          </p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#0e0e13] border border-zinc-800 hover:border-orange-500 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Icon & Count */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors shadow-sm">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-xs font-bold text-zinc-500 font-mono">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors font-['Space_Grotesk']">
                  {item.title}
                </h3>

                <p className="text-zinc-300 text-xs sm:text-sm mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] font-black text-orange-400 group-hover:text-orange-300 flex items-center gap-1">
                  <span>SRI SJ CONSTRUCTIONS PVT LTD</span>
                </span>
                <span className="text-[10px] text-zinc-400 font-semibold">Standard of Practice</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality & Safety Commitment Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0e0e13] border border-orange-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-black uppercase text-orange-400 tracking-wider">
              SRI SJ CONSTRUCTIONS PRIVATE LIMITED
            </div>
            <h4 className="text-lg font-black text-white font-['Space_Grotesk']">
              Strict Adherence to Indian Engineering Codes (IS 2911 &amp; IS 456)
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300">
              Every piling and civil contract undertaken by <strong className="text-white">SRI SJ CONSTRUCTIONS PRIVATE LIMITED</strong> complies with national safety and structural standards.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <div className="px-3.5 py-1.5 rounded-lg bg-[#14141a] border border-zinc-700 text-xs font-bold text-zinc-200">
              IS 2911 (Piling)
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-[#14141a] border border-zinc-700 text-xs font-bold text-zinc-200">
              IS 456 (Plain &amp; RCC)
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-orange-500/20 border border-orange-500/40 text-xs font-bold text-orange-300">
              Zero Incident Protocol
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
