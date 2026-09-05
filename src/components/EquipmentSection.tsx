import React, { useState } from 'react';
import { EQUIPMENT_FLEET } from '../data/companyData';
import { EquipmentItem } from '../types';
import { Card3D } from './Card3D';
import { 
  Truck, 
  Wrench, 
  CheckCircle, 
  ArrowRight, 
  Settings, 
  Sparkles, 
  Zap, 
  PlusCircle,
  X,
  Cpu
} from 'lucide-react';

interface EquipmentSectionProps {
  onOpenQuoteModal: (equipmentName?: string) => void;
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({ onOpenQuoteModal }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);

  return (
    <section id="equipment" className="py-20 bg-[#08080d] text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Truck className="w-3.5 h-3.5 text-orange-500" />
              <span>Heavy Rig Fleet &amp; Industrial Plant</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-['Space_Grotesk']">
              Our Construction &amp; Piling Machinery
            </h2>
            <p className="text-zinc-300 text-base mt-2 max-w-2xl">
              Equipped with heavy rotary piling rigs, hydraulic cranes, transit concrete mixers, and site gensets ready for rapid deployment across West Bengal.
            </p>
          </div>

          <button
            onClick={() => onOpenQuoteModal('Equipment Deployment Support')}
            className="btn-3d-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-black text-sm shadow-md transition-all self-start md:self-auto cursor-pointer"
          >
            <span>Mobilize Equipment Fleet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Company Fleet Telemetry Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-[#0f0f16] border border-zinc-800 shadow-xl flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            <span>
              <strong className="text-white">Active Machinery Fleet:</strong> Rotary piling rigs (Mait HR-180, Bauer BG-28), crawler cranes, batching plants, and bentonite pumps stationed in West Bengal.
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-950/60 border border-orange-500/40 text-xs font-bold text-orange-300">
            <Cpu className="w-3.5 h-3.5 text-orange-400" />
            <span>Haldia Central Maintenance Depot</span>
          </div>
        </div>

        {/* Equipment Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EQUIPMENT_FLEET.map((item) => (
            <Card3D key={item.id} intensity={15} depth={22} className="h-full">
              <div
                id={`equipment-card-${item.id}`}
                className="card-3d-bevel rounded-2xl overflow-hidden flex flex-col justify-between group h-full"
              >
                {/* Photo Area */}
                <div className="relative h-48 bg-black overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-black/30 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-orange-400 border border-orange-500/40">
                      {item.category}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 text-emerald-300 text-[11px] font-bold border border-emerald-500/40 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{item.status}</span>
                  </div>
                </div>

                {/* Machinery Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors font-['Space_Grotesk']">
                      {item.name}
                    </h3>

                    <div className="space-y-1.5 mt-3 pt-3 border-t border-zinc-800 text-xs">
                      <div className="text-zinc-300">
                        <span className="text-zinc-400 font-medium">Specs: </span>
                        <span>{item.specification}</span>
                      </div>
                      <div className="text-zinc-300">
                        <span className="text-zinc-400 font-medium">Capacity: </span>
                        <span className="font-bold text-orange-400">{item.capacity}</span>
                      </div>
                    </div>

                    <p className="text-zinc-400 text-xs mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-800">
                    <button
                      onClick={() => setSelectedEquipment(item)}
                      className="btn-3d-dark w-full py-2.5 px-3 rounded-xl text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => onOpenQuoteModal(`Machinery Support: ${item.name}`)}
                      className="btn-3d-primary w-full py-2.5 px-3 rounded-xl text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Request Unit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

      </div>

      {/* Equipment Specs Modal */}
      {selectedEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0e0e14] border-2 border-zinc-800 rounded-2xl max-w-xl w-full p-6 relative shadow-2xl text-white">
            <button
              onClick={() => setSelectedEquipment(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase">
                  {selectedEquipment.category}
                </span>
                <h3 className="text-xl font-black text-white font-['Space_Grotesk']">
                  {selectedEquipment.name}
                </h3>
              </div>
            </div>

            <div className="space-y-4 my-4">
              <div className="p-4 rounded-xl bg-[#14141d] border border-zinc-800 text-xs space-y-2.5">
                <div>
                  <span className="text-zinc-400 uppercase font-bold">Technical Specifications:</span>
                  <p className="text-sm font-medium text-white mt-0.5">{selectedEquipment.specification}</p>
                </div>
                <div>
                  <span className="text-zinc-400 uppercase font-bold">Operational Capacity:</span>
                  <p className="text-sm font-black text-orange-400 mt-0.5">{selectedEquipment.capacity}</p>
                </div>
                <div>
                  <span className="text-zinc-400 uppercase font-bold">Deployment Status:</span>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">{selectedEquipment.status}</p>
                </div>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed">
                {selectedEquipment.description}
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-zinc-800">
              <button
                onClick={() => {
                  const eqName = selectedEquipment.name;
                  setSelectedEquipment(null);
                  onOpenQuoteModal(`Equipment Requirement: ${eqName}`);
                }}
                className="flex-1 py-3 rounded-xl btn-3d-primary text-white font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                Inquire Deployment
              </button>
              <button
                onClick={() => setSelectedEquipment(null)}
                className="px-5 py-3 rounded-xl btn-3d-dark text-zinc-300 text-xs font-semibold cursor-pointer"
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

