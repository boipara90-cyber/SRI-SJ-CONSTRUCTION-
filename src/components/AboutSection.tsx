import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Building2, 
  Drill, 
  ShieldCheck, 
  Clock, 
  Users, 
  Award, 
  Target, 
  MapPin, 
  CheckCircle,
  HardHat
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: "Construction Expertise",
      desc: "Comprehensive technical proficiency in RCC structures, industrial developments, and earthwork engineering.",
      icon: Building2
    },
    {
      title: "Piling & Foundation Work",
      desc: "Specialized bored cast-in-situ piling and heavy load-bearing foundation solutions tailored to coastal and industrial soils.",
      icon: Drill
    },
    {
      title: "Quality Workmanship",
      desc: "Uncompromising compliance with engineering standards, material specifications, and structural design blueprints.",
      icon: Award
    },
    {
      title: "Safety First Culture",
      desc: "Strict on-site safety procedures, personal protective gear enforcement, and zero-accident protocol on every work zone.",
      icon: ShieldCheck
    },
    {
      title: "Professional Project Execution",
      desc: "Structured workflows, systematic daily reporting, coordinated machinery deployment, and transparent client communication.",
      icon: Target
    },
    {
      title: "Timely Project Completion",
      desc: "Disciplined scheduling, proactive resource allocation, and continuous site supervision to respect target completion dates.",
      icon: Clock
    },
    {
      title: "Reliable Service",
      desc: "Consistent on-ground support, prompt machine mobilization, and dependable operational commitment from start to handover.",
      icon: CheckCircle
    },
    {
      title: "Experienced Workforce",
      desc: "Skilled rig operators, qualified civil engineers, site foremen, and dedicated labor teams with years of practical experience.",
      icon: Users
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#e2e8f0] text-slate-800 relative overflow-hidden border-t border-slate-300">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <HardHat className="w-3.5 h-3.5 text-amber-600" />
            <span>About Sri SJ Construction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Space_Grotesk']">
            Building on Trust &amp; Engineering Precision Since 2013
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            <strong className="text-slate-900">Sri SJ Construction Private Limited</strong> was established in 2013 and operates 
            from its corporate base in <strong className="text-amber-700">Haldia, Sutahata, Nandarampur, West Bengal (721635)</strong>. 
            We are dedicated to delivering high-integrity deep piling, heavy foundation systems, and turnkey civil construction across West Bengal.
          </p>
        </div>

        {/* Narrative & Location Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Main Story & Values (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-md">
            <h3 className="text-xl font-bold text-slate-950 font-['Space_Grotesk'] flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
              Our Commitment to Ground Engineering &amp; Civil Excellence
            </h3>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                From our inception in 2013 in the vital industrial corridor of Haldia, Sri SJ Construction Private Limited 
                has focused on mastering challenging subterranean geotechnical conditions. Deep foundations require exact 
                verticality, appropriate slurry stabilization, and high-strength concrete integrity.
              </p>
              <p>
                Whether executing bored cast-in-situ piling for multi-story structures or pouring massive reinforced concrete 
                pile caps for industrial complexes, our operational philosophy centers on safety, rigorous quality control, 
                and timely execution.
              </p>
              <p>
                We own and operate specialized piling rigs, heavy earthmoving equipment, and concrete machinery, backed by an 
                experienced workforce dedicated to delivering dependable results for our clients.
              </p>
            </div>

            {/* Quick Location Snapshot */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-700 text-sm">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Operating from: <strong>Nandarampur, Sutahata, Haldia, West Bengal – 721635</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200">
                  GSTIN: 19AFUPK0762L1ZS
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Estd. 2013
                </span>
              </div>
            </div>
          </div>

          {/* Quick Fact / Core Strengths Summary (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl text-white">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">Our Operating Base</div>
              <h4 className="text-2xl font-black text-white font-['Space_Grotesk'] mb-4">
                Haldia Port &amp; Industrial Corridor
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Strategically positioned in Purba Medinipur, enabling rapid mobilization of piling rigs, skilled crews, and heavy machinery throughout Haldia, Kolaghat, Kharagpur, and across West Bengal.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Establishment Year</span>
                <span className="font-bold text-white">2013 (Pvt. Ltd.)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">GST Registration</span>
                <span className="font-mono font-bold text-amber-400">19AFUPK0762L1ZS</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Core Specialization</span>
                <span className="font-bold text-amber-400">Bored Piling &amp; Civil Works</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">HQ Location</span>
                <span className="font-bold text-white">Haldia, West Bengal</span>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Core Focus Pillars Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-slate-950 font-['Space_Grotesk']">
              Core Pillars of Our Operations
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Guiding principles that define every piling and civil construction project we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-3.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors font-['Space_Grotesk']">
                    {pillar.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                      SRI SJ CONSTRUCTION PRIVATE LIMITED
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ending Summary Note */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm text-center md:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Registered Under Ministry of Corporate Affairs (MCA) • Corporate Entity: <strong className="text-slate-950">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong>
            </p>
          </div>
          <span className="text-xs font-black px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-800 border border-amber-500/30">
            Haldia, West Bengal – 721635
          </span>
        </div>

      </div>
    </section>
  );
};
