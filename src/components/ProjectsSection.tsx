import React, { useState } from 'react';
import { PROJECTS, MAJOR_CLIENTS } from '../data/companyData';
import { 
  Building, 
  MapPin, 
  Tag, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  Check,
  Activity,
  Flame
} from 'lucide-react';

interface ProjectsSectionProps {
  onOpenQuoteModal: () => void;
}

type ProjectFilter = 'all' | 'ongoing' | 'completed' | 'piling' | 'industrial' | 'civil';

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenQuoteModal }) => {
  const [filter, setFilter] = useState<ProjectFilter>('all');

  const ongoingCount = PROJECTS.filter(p => p.status === 'Ongoing').length;
  const completedCount = PROJECTS.filter(p => p.status === 'Completed').length;

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'ongoing') return p.status === 'Ongoing';
    if (filter === 'completed') return p.status === 'Completed';
    return p.category === filter;
  });

  return (
    <section id="projects" className="py-20 bg-black text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Building className="w-3.5 h-3.5 text-orange-400" />
              <span>Executed &amp; Active Project Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Space_Grotesk']">
              Featured Contracts &amp; Foundation Track Record
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-2xl">
              Major completed projects with <strong className="text-white">L&amp;T, TATA, JINDAL, SUNLIGHT, PGCIL &amp; UAIL</strong>, alongside active ongoing contracts at <strong className="text-white">Ceratizit India, Ruchi Infra Services (Haldia), Shreeji Propack, RG Baruah Nehru Stadium</strong>, and <strong className="text-white">Ganesh Complex (Ranihati)</strong>.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 flex-wrap sm:flex-nowrap">
            {[
              { id: 'all', label: 'All Projects', count: PROJECTS.length },
              { id: 'ongoing', label: 'Current Projects', count: ongoingCount, isLive: true },
              { id: 'completed', label: 'Major Completed', count: completedCount },
              { id: 'piling', label: 'Piling Works' },
              { id: 'industrial', label: 'Industrial & Machine Bases' },
              { id: 'civil', label: 'Civil & PEB' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as ProjectFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  filter === tab.id
                    ? 'bg-orange-600 text-white ring-2 ring-orange-500/40 shadow-sm border border-orange-500'
                    : 'bg-[#121218] text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {tab.isLive && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                )}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                    filter === tab.id ? 'bg-black text-white' : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Prestigious Clients & Industry Track Record Banner */}
        <div className="mb-10 p-6 rounded-2xl bg-[#0e0e13] border border-zinc-800 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                <Award className="w-4 h-4 text-orange-400" />
                <span>Major Completed &amp; Ongoing Client Partnerships</span>
              </div>
              <h3 className="text-lg font-black text-white font-['Space_Grotesk']">
                Trusted by National Infrastructure &amp; Industrial Leaders
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {MAJOR_CLIENTS.map((client, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#14141a] border border-zinc-800 text-center hover:border-orange-500 transition-colors">
                  <span className="block text-xs font-black text-white font-['Space_Grotesk']">{client.short}</span>
                  <span className="block text-[9px] text-zinc-400 font-bold truncate mt-0.5" title={client.highlight}>{client.highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className={`rounded-2xl bg-[#0e0e13] border transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-lg ${
                project.status === 'Ongoing' ? 'border-orange-500/80 ring-1 ring-orange-500/20' : 'border-zinc-800'
              } hover:border-orange-500 hover:shadow-xl`}
            >
              {/* Image & Badges */}
              <div className="relative h-48 bg-black overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-black/40 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-xs flex items-center gap-1.5 ${
                    project.status === 'Ongoing'
                      ? 'bg-orange-950/90 text-orange-300 border-orange-500/60 shadow-xs'
                      : 'bg-black/90 text-orange-400 border-zinc-700'
                  }`}>
                    {project.status === 'Ongoing' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                    )}
                    <span>{project.status === 'Ongoing' ? 'Current Project' : 'Major Completed'}</span>
                  </span>
                </div>

                {/* Year / Timeline Badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 text-zinc-300 border border-zinc-700 backdrop-blur-xs">
                    {project.year}
                  </span>
                </div>

                {/* Client / Authority Badge */}
                {project.client && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block text-[11px] font-black tracking-wide uppercase px-2.5 py-1 rounded-md bg-black/90 text-orange-400 border border-orange-500/40 shadow-sm truncate max-w-full">
                      Client: {project.client}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors font-['Space_Grotesk'] leading-snug">
                    {project.title}
                  </h3>

                  {/* Location & Type */}
                  <div className="space-y-1.5 mt-3 pt-3 border-t border-zinc-800 text-xs">
                    <div className="flex items-center gap-2 text-zinc-300 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Tag className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span className="font-medium truncate">{project.typeOfWork}</span>
                    </div>
                  </div>

                  <p className="text-zinc-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technical Highlights Tags */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-wrap gap-1.5">
                      {project.highlights.map((hl, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-[#14141a] text-zinc-300 border border-zinc-800"
                        >
                          <Check className="w-3 h-3 text-orange-400 shrink-0" />
                          <span>{hl}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                    SRI SJ CONSTRUCTIONS PVT LTD
                  </span>
                  <button
                    onClick={onOpenQuoteModal}
                    className="inline-flex items-center gap-1 text-xs font-black text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-[#0e0e13] border border-zinc-800 text-white shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Ready for Immediate Site Mobilization Across India</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">
            Looking for an Experienced Piling &amp; Foundation Contractor?
          </h3>
          <p className="text-zinc-300 text-sm mt-2 max-w-xl mx-auto">
            From major projects with <strong className="text-orange-400">L&amp;T, TATA, JINDAL, SUNLIGHT, PGCIL &amp; UAIL</strong> to active industrial sites, <strong className="text-orange-400">SRI SJ CONSTRUCTIONS PRIVATE LIMITED</strong> guarantees certified engineering excellence.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm shadow-lg shadow-orange-600/30 cursor-pointer transition-all border border-orange-400/40"
            >
              <span>Submit Project Requirement &amp; BOQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-zinc-400">
            GSTIN: <strong className="text-orange-400 font-mono">19ABPCS8304J1ZQ</strong> • Corporate Entity: <strong className="text-white">SRI SJ CONSTRUCTIONS PRIVATE LIMITED</strong> • Haldia, West Bengal (721635)
          </div>
        </div>

      </div>
    </section>
  );
};

