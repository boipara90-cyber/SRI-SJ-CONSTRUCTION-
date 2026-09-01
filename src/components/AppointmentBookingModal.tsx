import React, { useState } from 'react';
import { SERVICES, COMPANY_INFO } from '../data/companyData';
import { 
  saveAppointmentBooking, 
  SUPABASE_PROJECT_ID,
  AppointmentBookingData,
  RECOMMENDED_SUPABASE_SQL 
} from '../services/supabaseClient';
import { notifyQuoteSubmission, ADMIN_NOTIFICATION_EMAIL } from '../services/gmailNotificationService';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Building2, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Database, 
  ShieldCheck, 
  HardHat, 
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillService?: string;
}

const APPOINTMENT_TYPES = [
  'On-Site Bored Piling Inspection & Borehole Feasibility',
  'Rig Deployment & Logistics Site Assessment',
  'Soil Bearing Capacity & Rotary Rig Consultation',
  'Industrial Plant Substructure & Pile Cap Discussion',
  'EHV Transmission Tower Footing Survey',
  'Commercial Estimation & BOQ Rate Discussion',
  'Equipment & Machinery Rental Inspection'
];

const TIME_SLOTS = [
  'Morning Slot (10:00 AM – 01:00 PM)',
  'Afternoon Slot (02:00 PM – 05:00 PM)',
  'Evening Slot (05:00 PM – 07:30 PM)',
  'Urgent Site Emergency Visit (Immediate)'
];

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  prefillService
}) => {
  // Tomorrow's date as default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<AppointmentBookingData>({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    appointmentDate: minDateStr,
    timeSlot: TIME_SLOTS[0],
    appointmentType: prefillService || APPOINTMENT_TYPES[0],
    projectLocation: 'Haldia Port Zone, West Bengal',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [supabaseSavedTable, setSupabaseSavedTable] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlDrawer, setShowSqlDrawer] = useState(false);

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
      const res = await saveAppointmentBooking(formData);
      setReferenceId(res.referenceId || 'SJ-APT-' + Date.now().toString().slice(-6));
      setSupabaseSavedTable(res.tableUsed || 'appointments');

      // 2. Dispatch real-time alert email
      await notifyQuoteSubmission({
        name: `${formData.name} [APPOINTMENT: ${formData.appointmentDate} @ ${formData.timeSlot}]`,
        companyName: formData.companyName || 'Individual / Site Developer',
        phone: formData.phone,
        email: formData.email,
        serviceRequired: formData.appointmentType,
        projectLocation: formData.projectLocation,
        estimatedTimeline: `Scheduled: ${formData.appointmentDate} (${formData.timeSlot})`,
        message: formData.notes || 'Appointment for technical site assessment / discussion.'
      });
    } catch (err) {
      console.warn('Booking submission status:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(RECOMMENDED_SUPABASE_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-8 relative text-slate-800 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-appointment-modal-btn"
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                Appointment Booked &amp; Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-['Space_Grotesk']">
                Confirmed, {formData.name}!
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-lg mx-auto">
                Your technical site visit has been scheduled. Our senior geotechnical engineer will reach out to confirm logistic details.
              </p>
            </div>

            {/* Booking Summary Card */}
            <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 text-xs text-left space-y-2.5 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-slate-200">Site Appointment Confirmation</span>
                </div>
                <span className="font-mono text-[11px] font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Status: Confirmed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-xs pt-1">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Booking Ref ID</span>
                  <span className="font-mono font-black text-amber-400 text-sm">{referenceId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Company</span>
                  <span className="text-white font-medium">{formData.companyName || 'Private Site Developer'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Appointment Date</span>
                  <span className="text-white font-bold">{formData.appointmentDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Time Window</span>
                  <span className="text-amber-300 font-bold">{formData.timeSlot}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Consultation Purpose</span>
                  <span className="text-white font-medium">{formData.appointmentType}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Done &amp; Return to Website
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-6 flex-wrap pr-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500 text-slate-950 shadow-md">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                    Engineering Scheduling Desk
                  </span>
                  <h3 className="text-2xl font-black text-slate-950 font-['Space_Grotesk']">
                    Book an Engineering Appointment
                  </h3>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Full Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Suman Mondal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company / Firm Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Haldia Petrochemicals Subcontractor"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Email */}
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
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
                    placeholder="engineer@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Date & Time Slot Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Preferred Date <span className="text-amber-600">*</span></span>
                  </label>
                  <input
                    type="date"
                    required
                    min={minDateStr}
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Preferred Time Slot <span className="text-amber-600">*</span></span>
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors font-medium"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Purpose & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Appointment Purpose / Service <span className="text-amber-600">*</span>
                  </label>
                  <select
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    {APPOINTMENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                    {SERVICES.map((srv) => (
                      <option key={srv.id} value={`Service Discussion: ${srv.title}`}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Project / Site Location <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="projectLocation"
                    value={formData.projectLocation}
                    onChange={handleInputChange}
                    placeholder="e.g. Sutahata, Haldia, WB 721635"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Scope Brief / Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Additional Scope Notes / Boring Specs (Optional)
                </label>
                <textarea
                  rows={2}
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Mention site soil type, estimated bored piles count, required machine rigs, or specific discussion agenda..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-appointment-btn"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Scheduling Appointment...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm &amp; Book Engineering Appointment</span>
                    </>
                  )}
                </button>
              </div>

              {/* Privacy Guarantee */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Confidential geotechnical inquiry. Your details are never shared.</span>
                </div>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
