import React, { useState, useEffect } from 'react';
import { SERVICES, COMPANY_INFO } from '../data/companyData';
import { QuoteRequest } from '../types';
import { notifyQuoteSubmission, ADMIN_NOTIFICATION_EMAIL } from '../services/gmailNotificationService';
import { 
  saveQuoteRequestToSupabase, 
  SUPABASE_PROJECT_ID 
} from '../services/supabaseClient';
import { 
  X, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Phone, 
  Building2, 
  MapPin, 
  ShieldCheck,
  Calculator,
  Mail,
  Database
} from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillService?: string;
  onOpenAppointmentModal?: (prefillService?: string) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  prefillService,
  onOpenAppointmentModal
}) => {
  const [formData, setFormData] = useState<QuoteRequest>({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    serviceRequired: prefillService || SERVICES[0].title,
    projectLocation: 'West Bengal',
    estimatedTimeline: 'Immediate (Within 15 days)',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [gmailNotified, setGmailNotified] = useState(false);
  const [quoteRefId, setQuoteRefId] = useState('');

  useEffect(() => {
    if (prefillService) {
      setFormData(prev => ({ ...prev, serviceRequired: prefillService }));
    }
  }, [prefillService]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save directly to Supabase Backend
      const res = await saveQuoteRequestToSupabase(formData);
      setQuoteRefId(res.referenceId || 'QT-' + Date.now().toString().slice(-6));

      // 2. Dispatch real-time Gmail notification to srisjcons@gmail.com
      await notifyQuoteSubmission({
        name: formData.name,
        companyName: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        serviceRequired: formData.serviceRequired,
        projectLocation: formData.projectLocation,
        estimatedTimeline: formData.estimatedTimeline,
        message: formData.message,
      });
      setGmailNotified(true);
    } catch (err) {
      console.warn('Quote notification/database log:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full max-h-[95vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Estimate Request Registered
              </span>
              <h3 className="text-2xl font-black text-slate-950 font-['Space_Grotesk']">
                Thank You, {formData.name}!
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
                We have received your quotation request for <strong className="text-amber-700">{formData.serviceRequired}</strong> in <strong className="text-slate-950">{formData.projectLocation}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 text-xs text-left space-y-2 shadow-md">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Quote Reference ID:</span>
                <span className="text-amber-400 font-mono font-bold">{quoteRefId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact Number:</span>
                <span className="text-slate-100 font-bold">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Timeline:</span>
                <span className="text-amber-300 font-bold">{formData.estimatedTimeline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Engineering Firm:</span>
                <span className="text-slate-100 font-bold">SRI SJ CONSTRUCTION PVT LTD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">GST Registration:</span>
                <span className="text-emerald-300 font-mono font-bold">19ABPCS8304J1ZQ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gmail Alert Routed:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Mail className="w-3 h-3 text-emerald-400" />
                  {ADMIN_NOTIFICATION_EMAIL}
                </span>
              </div>
            </div>

            {onOpenAppointmentModal && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left flex items-center justify-between gap-3">
                <div className="text-xs text-amber-900">
                  <strong>Need an On-Site Soil &amp; Rig Assessment?</strong>
                  <p className="text-[11px] text-amber-800">Book an engineer site appointment directly on calendar.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAppointmentModal(formData.serviceRequired);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 cursor-pointer shadow-sm"
                >
                  Book Site Visit
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="w-full py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider cursor-pointer"
            >
              Done &amp; Return
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500 text-slate-950 shadow-md">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Official Estimation Desk
                  </span>
                  <h3 className="text-2xl font-black text-slate-950 font-['Space_Grotesk']">
                    Request a Project Quote
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono font-bold text-xs">
                GSTIN: 19ABPCS8304J1ZQ
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Company Name (Optional)"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Service Required <span className="text-amber-600">*</span>
                  </label>
                  <select
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Complete Turnkey Industrial Package">Complete Turnkey Industrial Package</option>
                    <option value="Equipment Rental / Deployment">Equipment Rental / Deployment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Timeline
                  </label>
                  <select
                    name="estimatedTimeline"
                    value={formData.estimatedTimeline}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    <option value="Immediate (Within 15 days)">Immediate (Within 15 days)</option>
                    <option value="1 Month">Within 1 Month</option>
                    <option value="2-3 Months">Within 2–3 Months</option>
                    <option value="Planning / Budgetary Stage">Planning / Budgetary Stage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Project Site Location (West Bengal) <span className="text-amber-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="projectLocation"
                  value={formData.projectLocation}
                  onChange={handleInputChange}
                  placeholder="e.g., Haldia Port Complex, Sutahata, West Bengal"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Scope Brief / Estimated Quantities (Optional)
                </label>
                <textarea
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Mention number of bored piles, pile diameter (e.g., 600mm), depth (e.g., 25m), or equipment requirements..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Quotation Request</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Strict privacy guaranteed by <strong className="text-slate-800">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong></span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
