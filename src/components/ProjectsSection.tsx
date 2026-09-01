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
    <section id="projects" className="py-20 bg-[#dbe2ea] text-slate-800 relative border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Building className="w-3.5 h-3.5 text-amber-600" />
              <span>Executed &amp; Active Project Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Space_Grotesk']">
              Featured Contracts &amp; Foundation Track Record
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Major completed projects with <strong className="text-slate-900">L&amp;T, TATA, JINDAL, SUNLIGHT, PGCIL &amp; UAIL</strong>, alongside active ongoing contracts at <strong className="text-slate-900">Ceratizit India, Ruchi Infra Services (Haldia), Shreeji Propack, RG Baruah Nehru Stadium</strong>, and <strong className="text-slate-900">Ganesh Complex (Ranihati)</strong>.
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
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-500/40 shadow-sm'
                    : 'bg-slate-200 text-slate-800 hover:bg-slate-300 border border-slate-300'
                }`}
              >
                {tab.isLive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                    filter === tab.id ? 'bg-slate-950 text-white' : 'bg-slate-300 text-slate-800'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Prestigious Clients & Industry Track Record Banner */}
        <div className="mb-10 p-6 rounded-2xl bg-slate-100 border border-slate-300 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Major Completed &amp; Ongoing Client Partnerships</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 font-['Space_Grotesk']">
                Trusted by National Infrastructure &amp; Industrial Leaders
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {MAJOR_CLIENTS.map((client, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-200 border border-slate-300 text-center hover:border-amber-400 transition-colors">
                  <span className="block text-xs font-black text-slate-900 font-['Space_Grotesk']">{client.short}</span>
                  <span className="block text-[9px] text-slate-700 font-bold truncate mt-0.5" title={client.highlight}>{client.highlight}</span>
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
              className={`rounded-2xl bg-slate-100 border transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-md ${
                project.status === 'Ongoing' ? 'border-amber-400/80 ring-1 ring-amber-400/20' : 'border-slate-300'
              } hover:border-amber-500 hover:shadow-xl`}
            >
              {/* Image & Badges */}
              <div className="relative h-48 bg-slate-200 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-black/20" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-xs flex items-center gap-1.5 ${
                    project.status === 'Ongoing'
                      ? 'bg-amber-950/90 text-amber-300 border-amber-500/60 shadow-xs'
                      : 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
                  }`}>
                    {project.status === 'Ongoing' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    )}
                    <span>{project.status === 'Ongoing' ? 'Current Project' : 'Major Completed'}</span>
                  </span>
                </div>

                {/* Year / Timeline Badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900/80 text-slate-200 border border-slate-700 backdrop-blur-xs">
                    {project.year}
                  </span>
                </div>

                {/* Client / Authority Badge */}
                {project.client && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block text-[11px] font-black tracking-wide uppercase px-2.5 py-1 rounded-md bg-slate-950/90 text-amber-400 border border-amber-500/40 shadow-sm truncate max-w-full">
                      Client: {project.client}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors font-['Space_Grotesk'] leading-snug">
                    {project.title}
                  </h3>

                  {/* Location & Type */}
                  <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-medium truncate">{project.typeOfWork}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technical Highlights Tags */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {project.highlights.map((hl, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-[#f0f4f8] text-slate-700 border border-slate-200"
                        >
                          <Check className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>{hl}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                    SRI SJ CONSTRUCTION PVT LTD
                  </span>
                  <button
                    onClick={onOpenQuoteModal}
                    className="inline-flex items-center gap-1 text-xs font-black text-amber-700 hover:text-amber-600 transition-colors cursor-pointer"
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
        <div className="mt-12 text-center p-8 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Ready for Immediate Site Mobilization Across India</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">
            Looking for an Experienced Piling &amp; Foundation Contractor?
          </h3>
          <p className="text-slate-300 text-sm mt-2 max-w-xl mx-auto">
            From major projects with <strong className="text-amber-400">L&amp;T, TATA, JINDAL, SUNLIGHT, PGCIL &amp; UAIL</strong> to active industrial sites, <strong className="text-amber-400">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong> guarantees certified engineering excellence.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md cursor-pointer transition-all"
            >
              <span>Submit Project Requirement &amp; BOQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
            GSTIN: <strong className="text-amber-400 font-mono">19AFUPK0762L1ZS</strong> • Corporate Entity: <strong className="text-white">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong> • Haldia, West Bengal (721635)
          </div>
        </div>

      </div>
    </section>
  );
};

