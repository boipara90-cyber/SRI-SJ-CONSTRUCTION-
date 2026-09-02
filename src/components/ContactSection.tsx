import React, { useState } from 'react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { QuoteRequest } from '../types';
import { notifyContactSubmission, ADMIN_NOTIFICATION_EMAIL } from '../services/gmailNotificationService';
import { 
  saveContactInquiryToSupabase, 
  SUPABASE_PROJECT_ID 
} from '../services/supabaseClient';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Building2, 
  Clock, 
  Sparkles,
  ExternalLink,
  MessageCircle,
  Bell,
  Database
} from 'lucide-react';

interface ContactSectionProps {
  onOpenQuoteModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  onOpenQuoteModal
}) => {
  const [formData, setFormData] = useState<QuoteRequest>({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    serviceRequired: SERVICES[0].title,
    projectLocation: 'Haldia, West Bengal',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryRefId, setInquiryRefId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save directly to Supabase Backend
      const res = await saveContactInquiryToSupabase(formData);
      setInquiryRefId(res.referenceId || 'INQ-' + Date.now().toString().slice(-6));

      // 2. Dispatches real-time notification to srisjcons@gmail.com
      await notifyContactSubmission({
        name: formData.name,
        companyName: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        serviceRequired: formData.serviceRequired,
        projectLocation: formData.projectLocation,
        message: formData.message,
      });
    } catch (err) {
      console.warn('Contact notification error/log:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello Sri SJ Construction Team, I am inquiring regarding piling and civil construction services for our project.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-[#e2e8f0] text-slate-800 relative border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Contact &amp; Site Assessment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Space_Grotesk']">
            Get in Touch with Sri SJ Construction
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Connect with our engineering estimation desk in Haldia, West Bengal for BOQ pricing, rotary rig deployment, or site inspection requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 5 Cols: Company Contact Card + Direct Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Company Office Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-100 border border-slate-300 space-y-6 shadow-xl relative overflow-hidden text-slate-800">
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Head Office &amp; Central Operations
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 font-mono font-bold text-[11px]">
                    GSTIN: 19ABPCS8304J1ZQ
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-950 font-['Space_Grotesk']">
                  Sri SJ Constructions Private Limited
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Registered under Indian Companies Act (Estd. 2011) • GST Registered Active Taxpayer
                </p>
              </div>

              {/* Official Address */}
              <div className="space-y-4 pt-2 border-t border-slate-200 text-sm">
                <div className="flex items-start gap-3 text-slate-700">
                  <div className="p-2.5 rounded-lg bg-slate-200 border border-slate-300 text-emerald-600 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase block mb-0.5">Registered Office Address</span>
                    <p className="text-slate-900 font-medium leading-snug">
                      Haldia, Sutahata, Nandarampur,<br />
                      West Bengal – 721635, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 text-slate-700">
                  <div className="p-2.5 rounded-lg bg-slate-200 border border-slate-300 text-emerald-600 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase block mb-0.5">Phone &amp; Site Inquiries</span>
                    <a href={`tel:${COMPANY_INFO.contact.phone}`} className="text-slate-950 hover:text-emerald-600 font-bold transition-colors block">
                      {COMPANY_INFO.contact.phone}
                    </a>
                    <a href={`tel:${COMPANY_INFO.contact.altPhone}`} className="text-slate-600 hover:text-emerald-600 transition-colors text-xs">
                      {COMPANY_INFO.contact.altPhone} (Site Hotline)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 text-slate-700">
                  <div className="p-2.5 rounded-lg bg-[#f0f4f8] border border-slate-200 text-emerald-600 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase block mb-0.5">Email Communications</span>
                    <a href={`mailto:${COMPANY_INFO.contact.email}`} className="text-slate-950 hover:text-emerald-600 font-bold transition-colors block">
                      {COMPANY_INFO.contact.email}
                    </a>
                    <a href={`mailto:${COMPANY_INFO.contact.supportEmail}`} className="text-slate-600 hover:text-emerald-600 transition-colors text-xs">
                      {COMPANY_INFO.contact.supportEmail}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3 text-slate-700">
                  <div className="p-2.5 rounded-lg bg-[#f0f4f8] border border-slate-200 text-emerald-600 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold uppercase block mb-0.5">Working Hours</span>
                    <p className="text-slate-900 text-xs leading-relaxed font-medium">
                      {COMPANY_INFO.contact.workingHours}<br />
                      <span className="text-emerald-800 font-bold">24/7 Site Emergency Response for Piling Operations</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons: WhatsApp & Quote */}
              <div className="space-y-2.5 pt-3 border-t border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    id="whatsapp-chat-btn"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Chat</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenQuoteModal}
                    id="contact-quote-modal-btn"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <span>Request a Quote</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Google Maps Section for Haldia / Sutahata / Nandarampur */}
            <div className="rounded-2xl bg-slate-100 border border-slate-300 overflow-hidden shadow-xl">
              <div className="p-3 bg-slate-200 border-b border-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>HQ: Sutahata, Haldia (WB 721635)</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="#maps-photos"
                    className="text-xs font-bold text-slate-700 hover:text-emerald-800 hover:underline"
                  >
                    View Photo Hub
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Sri+SJ+Construction+Private+Limited+Sutahata+Haldia+West+Bengal+721635"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>Search on Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Embedded Google Maps View for Haldia/Sutahata/Nandarampur */}
              <div className="relative h-56 w-full bg-slate-200">
                <iframe
                  title="Sri SJ Construction Haldia Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59049.25608678036!2d88.0833!3d22.1287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02f06c117d3d25%3A0x86133ffaa33aa2e1!2sSutahata%2C%20Haldia%2C%20West%20Bengal%20721635!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

          {/* Right 7 Cols: Complete Contact & Quote Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-100 border border-slate-300 shadow-xl text-slate-800">
              
              <div className="mb-6">
                <h3 className="text-xl font-black text-slate-950 font-['Space_Grotesk']">
                  Send a Message or Project Inquiry
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Fill in your project requirements below. Our commercial civil engineering team will respond within 24 business hours.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-8 rounded-xl bg-[#f0f4f8] border border-emerald-500/40 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-950 font-['Space_Grotesk']">
                    Thank You, {formData.name || 'Valued Client'}!
                  </h4>
                  <p className="text-slate-700 text-sm max-w-md mx-auto leading-relaxed">
                    Your inquiry for <strong className="text-emerald-800">{formData.serviceRequired}</strong> at <strong className="text-slate-950">{formData.projectLocation}</strong> has been received by Sri SJ Construction Private Limited.
                  </p>
                  <p className="text-xs text-slate-500">
                    Our estimation engineer will contact you at <span className="text-slate-900 font-bold">{formData.phone}</span> or <span className="text-slate-900 font-bold">{formData.email}</span>.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 text-xs text-left space-y-1.5 max-w-md mx-auto">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Tracking Reference:</span>
                      <span className="text-emerald-400 font-mono font-bold">{inquiryRefId}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant Alert Dispatched to {ADMIN_NOTIFICATION_EMAIL}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        companyName: '',
                        phone: '',
                        email: '',
                        serviceRequired: SERVICES[0].title,
                        projectLocation: 'Haldia, West Bengal',
                        message: ''
                      });
                    }}
                    className="mt-4 px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Name <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Rajesh Debnath"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g., Bengal Infrastructure Corp"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="client@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Required & Project Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Service Required <span className="text-emerald-600">*</span>
                      </label>
                      <select
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                      >
                        {SERVICES.map((srv) => (
                          <option key={srv.id} value={srv.title}>
                            {srv.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Project Location <span className="text-emerald-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        name="projectLocation"
                        value={formData.projectLocation}
                        onChange={handleInputChange}
                        placeholder="e.g., Haldia Port Zone, West Bengal"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Project Details / Message <span className="text-emerald-600">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please specify estimated pile diameter, depth, structural requirements, or machinery support needed..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="contact-form-submit-btn"
                      className="w-full py-3.5 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Transmitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Project Request</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-center">
                    <p className="text-[11px] text-slate-500 font-medium">
                      Direct engineering evaluation provided by <strong className="text-slate-900">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong> (Haldia, WB).
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
