import React from 'react';
import { MAJOR_CLIENTS } from '../data/companyData';
import { CompanyLogo } from './ClientLogos';
import { Award, Building2, ShieldCheck, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const ClientSection: React.FC = () => {
  return (
    <section id="clients" className="py-24 bg-[#0a0a0f] text-white relative border-t border-zinc-900 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#f9731610_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
            <Award className="w-4 h-4" />
            <span>Trusted Corporate &amp; Industrial Partners</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-['Space_Grotesk'] mb-6">
            Our Esteemed <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500">Client Portfolio</span>
          </h2>
          <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed">
            Proudly delivering high-precision deep foundation piling, heavy machinery civil structures, and critical infrastructure for India's leading conglomerates.
          </p>
        </div>

        {/* Quick Logo Strip Showcase */}
        <div className="mb-14 p-4 sm:p-6 rounded-2xl bg-[#111116] border border-zinc-800 shadow-xl overflow-hidden">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 text-center mb-5">
            Verified Contractor for Blue-Chip Industry Leaders
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 items-center">
            {MAJOR_CLIENTS.map((client, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-white flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-md h-16 border border-zinc-200 group"
                title={client.name}
              >
                <CompanyLogo company={client.short} size="sm" className="w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Comprehensive Client Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MAJOR_CLIENTS.map((client, idx) => (
            <div 
              key={idx} 
              className="group relative p-6 rounded-3xl bg-[#121218] border border-zinc-800 hover:border-orange-500/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] flex flex-col justify-between"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Authentic Logo Tile */}
                <div className="w-full h-20 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center p-3 mb-5 group-hover:shadow-lg transition-all duration-300">
                  <CompanyLogo company={client.short} size="md" className="w-full h-full object-contain" />
                </div>

                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-orange-400 uppercase tracking-wider font-['Space_Grotesk']">
                      {client.short}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold border border-zinc-700">
                      Tier-1 Client
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                    {client.name}
                  </h3>
                  {client.tagline && (
                    <p className="text-[11px] text-zinc-400 font-medium">
                      {client.tagline}
                    </p>
                  )}
                </div>
              </div>

              {/* Project Focus & Location Details */}
              <div className="relative z-10 pt-4 border-t border-zinc-800/80 group-hover:border-orange-500/30 transition-colors duration-300 space-y-2.5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-orange-400 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-orange-500 shrink-0" />
                    <span>Scope Executed</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                    {client.highlight}
                  </p>
                </div>

                {client.location && (
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-semibold pt-1">
                    <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{client.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* National Scale Capability Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#14141c] via-[#0e0e13] to-black border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Industrial Safety &amp; Quality</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
              High-Tonnage Foundation &amp; Substructure Capability
            </h4>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
              From Exide's heavy industrial battery plants and Tata Projects packages to Adani Infra corridors and PGCIL 765kV EHV lines, Sri SJ Constructions delivers uncompromising structural durability.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0 flex items-center gap-4">
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/80 border border-zinc-800 min-w-[130px] shadow-lg">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-['Space_Grotesk']">15+</span>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Years</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/80 border border-zinc-800 min-w-[130px] shadow-lg">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-['Space_Grotesk']">50+</span>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">Major Sites</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

