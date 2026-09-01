import React, { useState } from 'react';
import { SERVICES } from '../data/companyData';
import { ServiceItem } from '../types';
import { 
  Drill, 
  Layers, 
  Building2, 
  Hammer, 
  Grid, 
  Wrench, 
  Factory, 
  MapPin, 
  Shovel, 
  Truck, 
  ArrowRight, 
  Check, 
  SlidersHorizontal,
  X,
  PhoneCall
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenQuoteModal: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuoteModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Drill': return <Drill className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'Hammer': return <Hammer className="w-6 h-6" />;
      case 'Grid': return <Grid className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'Factory': return <Factory className="w-6 h-6" />;
      case 'MapPin': return <MapPin className="w-6 h-6" />;
      case 'Shovel': return <Shovel className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      default: return <Drill className="w-6 h-6" />;
    }
  };

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Services (10)' },
    { id: 'piling', label: 'Piling & Foundation' },
    { id: 'civil', label: 'Civil & Structural' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'earthwork', label: 'Earthwork & Site' },
  ];

  return (
    <section id="services" className="py-20 bg-[#dbe2ea] text-slate-800 relative border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <span>Comprehensive Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Space_Grotesk']">
              Our Specialized Services
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-2xl">
              Professional ground engineering, deep piling, heavy RCC structural works, and turnkey civil construction across West Bengal.
            </p>
          </div>

          {/* Quick Quote trigger */}
          <button
            onClick={() => onOpenQuoteModal()}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            <span>Inquire for Custom Scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <div className="flex items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-200 text-slate-800 hover:bg-slate-300 border border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="rounded-xl bg-slate-100 border border-slate-300 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-md"
            >
              {/* Image Container with Top Icon Overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                <img
                  src={service.imageUrl}
                  alt={`${service.title} by Sri SJ Construction`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />

                {/* Service Category Tag */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm text-emerald-400 border border-emerald-500/30">
                    {service.category}
                  </span>
                </div>

                {/* Icon Badge */}
                <div className="absolute bottom-3 right-3 w-11 h-11 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {getServiceIcon(service.iconName)}
                </div>
              </div>

              {/* Service Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-['Space_Grotesk']">
                    {service.title}
                  </h3>
                  <p className="text-slate-700 text-sm mt-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Key Features Pill List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200">
                  {service.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Actions: View Details / Request Quote */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300"
                  >
                    <span>View Specs</span>
                  </button>
                  <button
                    onClick={() => onOpenQuoteModal(service.title)}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-600 text-emerald-900 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600">Contractor:</span>
                  <span className="text-[10px] font-black text-emerald-800 uppercase">SRI SJ CONSTRUCTION PVT LTD</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative text-slate-800">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-emerald-600 text-white">
                {getServiceIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  {selectedService.category} Service
                </span>
                <h3 className="text-2xl font-black text-slate-950 font-['Space_Grotesk']">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {selectedService.fullDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-[#f0f4f8] border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
                  Scope &amp; Technical Capabilities
                </h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#f0f4f8] border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
                  Equipment &amp; Machinery Deployed
                </h4>
                <ul className="space-y-2">
                  {selectedService.equipmentUsed.map((eq, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-700 text-center">
              Civil execution and quality oversight guaranteed by <strong className="text-slate-950">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong> (Haldia, WB).
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onOpenQuoteModal(title);
                }}
                className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Request Quotation for {selectedService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
