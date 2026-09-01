import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { OfficialCompanyEmblem } from './Logo';
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
  HardHat,
  Cpu,
  Activity,
  Gauge,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const modernMethods = [
    {
      name: "Sonic Integrity Testing on Piles",
      tag: "NDT Quality Assurance",
      desc: "Low-strain sonic echo and integrity testing for defect-free pile shaft continuity and concrete quality.",
      icon: Activity
    },
    {
      name: "LVDT Display Devices",
      tag: "Precision Measurement",
      desc: "Linear Variable Differential Transformers for micro-millimeter precision during pile load testing.",
      icon: Gauge
    },
    {
      name: "VDF System (Vacuum Dewatered Flooring)",
      tag: "Advanced Flooring",
      desc: "High-density, wear-resistant, crack-free industrial flooring with accelerated curing time.",
      icon: Layers
    },
    {
      name: "Power Trowel Finishing",
      tag: "Surface Precision",
      desc: "Heavy-duty power float and trowel machinery for ultra-smooth, dust-proof floor surfaces.",
      icon: Cpu
    }
  ];

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
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HardHat className="w-3.5 h-3.5 text-emerald-600" />
            <span>About S.J. Constructions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Space_Grotesk']">
            Building on Trust, Technicality &amp; Engineering Precision
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            From our founding roots in <strong className="text-slate-900">2007</strong> to our established corporate presence in <strong className="text-emerald-800">Haldia, Sutahata, Nandarampur, West Bengal (721635)</strong>, delivering specialized deep foundation and infrastructure solutions.
          </p>
        </div>

        {/* Primary Story Card with User's Official Company Narrative */}
        <div className="mb-12 bg-white rounded-2xl border-2 border-slate-200 shadow-xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left: Emblem & Credentials Badge */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 shrink-0 rounded-xl bg-white shadow-md border border-slate-200 p-1.5 overflow-hidden">
                  <OfficialCompanyEmblem className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-950 font-['Space_Grotesk'] leading-tight">
                    SRI SJ CONSTRUCTIONS
                  </h3>
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                    Private Limited
                  </span>
                </div>
              </div>

              <div className="w-full pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Piling Roots:</span>
                  <span className="font-bold text-slate-900">Since 2007</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Corporate Incorporation:</span>
                  <span className="font-bold text-slate-900">Estd. 2011</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">GSTIN:</span>
                  <span className="font-mono font-bold text-emerald-700">19ABPCS8304J1ZQ</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">HQ Location:</span>
                  <span className="font-medium text-slate-800">Haldia, WB</span>
                </div>
              </div>
            </div>

            {/* Right: User's Official Text Narrative */}
            <div className="lg:col-span-8 space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p className="text-slate-900 font-semibold text-base sm:text-lg leading-snug">
                Incorporated as a piling company in <strong className="text-emerald-700 font-bold">2007</strong>, <strong className="text-slate-950">S.J. Constructions</strong> has taken the shape of a full-fledged construction company with special emphasis on pile foundation, testing and other geotechnical works in less than a year and half.
              </p>

              <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-slate-800">
                <p className="font-medium">
                  <strong>Consistent effort to improve quality of workmanship</strong>, <strong>Commitment towards timely Completion</strong>, <strong>Transparency in dealing with clients</strong>, above all the greatest encouragement from our clients are the <span className="text-amber-800 font-bold">Motivating factors to our Success</span>.
                </p>
              </div>

              <p>
                To combat the challenge ahead we’re on the way to modernize the testing and Construction methods. <strong>Sonic integrity testing on piles</strong>, usage of <strong>LVDT display device</strong>, <strong>VDF system</strong> and <strong>Power trowel</strong> are to name a few in this direction.
              </p>

              {/* Client Assurance Highlight Banner */}
              <div className="pt-4 border-t border-slate-200 flex items-start gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
                <Sparkles className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900">
                    Our Assurance to Every Client
                  </h4>
                  <p className="text-emerald-950 text-sm font-bold mt-0.5">
                    "We assure all our clients quality services, scheduled completion of projects empowered by technicality and dynamism."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modernized Testing & Construction Methods Showcase */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-emerald-700 mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                <span>Technical Modernization</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 font-['Space_Grotesk']">
                Modernized Testing &amp; Advanced Construction Methods
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Investing in digital measurement, non-destructive testing, and mechanized surface finishing for zero-defect execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modernMethods.map((method, idx) => {
              const IconComp = method.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                      {method.tag}
                    </span>
                    <h4 className="text-base font-bold text-slate-950 mt-2 font-['Space_Grotesk'] group-hover:text-emerald-700 transition-colors">
                      {method.name}
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                      {method.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>S.J. Technical Standard</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Narrative & Location Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Geotechnical Excellence (8 cols) */}
          <div className="lg:col-span-8 bg-slate-100/90 rounded-2xl border border-slate-300 p-6 sm:p-8 space-y-5 shadow-md">
            <h3 className="text-xl font-bold text-slate-950 font-['Space_Grotesk'] flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-600 rounded-sm" />
              Mastering Complex Geotechnical Soils in Haldia &amp; West Bengal
            </h3>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                From coastal alluvial strata to deep industrial soil profiles, deep foundations require exact verticality, continuous bentonite slurry stabilization, and high-strength concrete integrity.
              </p>
              <p>
                Whether executing bored cast-in-situ piling for multi-story towers or pouring massive reinforced concrete pile caps for industrial manufacturing complexes, our operational philosophy centers on rigorous quality control and timely execution.
              </p>
              <p>
                We own and operate specialized hydraulic and DMC piling rigs, heavy earthmoving equipment, and computerized batching equipment, backed by an experienced technical crew.
              </p>
            </div>

            {/* Quick Location Snapshot */}
            <div className="pt-4 border-t border-slate-300 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-800 text-sm">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Operating from: <strong>Nandarampur, Sutahata, Haldia, West Bengal – 721635</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-950 border border-emerald-300">
                  GSTIN: 19ABPCS8304J1ZQ
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-200 text-slate-800 border border-slate-300">
                  Pvt. Ltd. Estd. 2011
                </span>
              </div>
            </div>
          </div>

          {/* Quick Fact / Core Strengths Summary (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl text-white">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Our Operating Base</div>
              <h4 className="text-2xl font-black text-white font-['Space_Grotesk'] mb-4">
                Haldia Port &amp; Industrial Corridor
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Strategically positioned in Purba Medinipur, enabling rapid mobilization of piling rigs, testing equipment, and engineering teams throughout Haldia, Kolaghat, Kharagpur, and across West Bengal.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Piling Roots</span>
                <span className="font-bold text-white">2007 (S.J. Constructions)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Corporate Incorporation</span>
                <span className="font-bold text-white">2011 (Pvt. Ltd.)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">GST Registration</span>
                <span className="font-mono font-bold text-emerald-400">19ABPCS8304J1ZQ</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Core Specialization</span>
                <span className="font-bold text-emerald-400">Pile Foundation &amp; Testing</span>
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
                  className="p-5 rounded-xl bg-slate-100 border border-slate-300 hover:border-amber-400 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-700 flex items-center justify-center mb-3.5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors font-['Space_Grotesk']">
                    {pillar.title}
                  </h4>
                  <p className="text-slate-700 text-xs sm:text-sm mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                      SRI SJ CONSTRUCTIONS PRIVATE LIMITED
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ending Summary Note */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-100 border border-slate-300 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm text-center md:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Registered Under Ministry of Corporate Affairs (MCA) • Corporate Entity: <strong className="text-slate-950">SRI SJ CONSTRUCTIONS PRIVATE LIMITED</strong>
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
