import React, { useState } from 'react';
import { EQUIPMENT_FLEET } from '../data/companyData';
import { EquipmentItem } from '../types';
import { 
  Truck, 
  Wrench, 
  CheckCircle, 
  ArrowRight, 
  Settings, 
  Sparkles, 
  Zap, 
  PlusCircle,
  X
} from 'lucide-react';

interface EquipmentSectionProps {
  onOpenQuoteModal: (equipmentName?: string) => void;
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({ onOpenQuoteModal }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);

  return (
    <section id="equipment" className="py-20 bg-[#dbe2ea] text-slate-800 relative border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Truck className="w-3.5 h-3.5 text-amber-600" />
              <span>Plant &amp; Machinery Fleet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Space_Grotesk']">
              Our Construction &amp; Piling Machinery
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-2xl">
              Equipped with heavy rotary piling rigs, excavators, cranes, transit concrete mixers, and site gensets ready for rapid deployment in West Bengal.
            </p>
          </div>

          <button
            onClick={() => onOpenQuoteModal('Equipment Deployment Support')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md transition-all self-start md:self-auto cursor-pointer"
          >
            <span>Inquire for Equipment Support</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Company Notification Banner for Equipment Customization */}
        <div className="mb-8 p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between flex-wrap gap-3 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>
              <strong className="text-slate-900">Fleet Specifications:</strong> Equipment list includes active placeholders for company asset records. Custom machinery mobilization available for project-term requirements.
            </span>
          </div>
          <span className="text-xs font-bold text-amber-800">
            Haldia Central Maintenance Yard
          </span>
        </div>

        {/* Equipment Cards Grid (6 core items required) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EQUIPMENT_FLEET.map((item) => (
            <div
              key={item.id}
              id={`equipment-card-${item.id}`}
              className="rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-md"
            >
              {/* Photo Area */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />

                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm text-amber-400 border border-amber-500/30">
                    {item.category}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 text-[11px] font-bold border border-emerald-500/40 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{item.status}</span>
                </div>
              </div>

              {/* Machinery Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors font-['Space_Grotesk']">
                    {item.name}
                  </h3>

                  <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="text-slate-700">
                      <span className="text-slate-500 font-medium">Specs: </span>
                      <span>{item.specification}</span>
                    </div>
                    <div className="text-slate-700">
                      <span className="text-slate-500 font-medium">Capacity: </span>
                      <span className="font-bold text-amber-700">{item.capacity}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedEquipment(item)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => onOpenQuoteModal(`Machinery Support: ${item.name}`)}
                    className="w-full py-2 px-3 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-800 hover:text-slate-950 border border-amber-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Request Unit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Equipment Specs Modal */}
      {selectedEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 relative shadow-2xl text-slate-800">
            <button
              onClick={() => setSelectedEquipment(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-amber-500 text-slate-950">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase">
                  {selectedEquipment.category}
                </span>
                <h3 className="text-xl font-black text-slate-950 font-['Space_Grotesk']">
                  {selectedEquipment.name}
                </h3>
              </div>
            </div>

            <div className="space-y-4 my-4">
              <div className="p-3.5 rounded-lg bg-[#f0f4f8] border border-slate-200 text-xs space-y-2">
                <div>
                  <span className="text-slate-500 uppercase font-bold">Technical Specifications:</span>
                  <p className="text-sm font-medium text-slate-900 mt-0.5">{selectedEquipment.specification}</p>
                </div>
                <div>
                  <span className="text-slate-500 uppercase font-bold">Operational Capacity:</span>
                  <p className="text-sm font-black text-amber-700 mt-0.5">{selectedEquipment.capacity}</p>
                </div>
                <div>
                  <span className="text-slate-500 uppercase font-bold">Deployment Status:</span>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">{selectedEquipment.status}</p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {selectedEquipment.description}
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  const eqName = selectedEquipment.name;
                  setSelectedEquipment(null);
                  onOpenQuoteModal(`Equipment Requirement: ${eqName}`);
                }}
                className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                Inquire Deployment
              </button>
              <button
                onClick={() => setSelectedEquipment(null)}
                className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
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
