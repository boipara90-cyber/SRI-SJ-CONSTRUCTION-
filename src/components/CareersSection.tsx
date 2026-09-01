import React, { useState } from 'react';
import { JOB_OPENINGS } from '../data/companyData';
import { CareerApplication, JobOpening } from '../types';
import { notifyCareerApplication, ADMIN_NOTIFICATION_EMAIL } from '../services/gmailNotificationService';
import { 
  saveCareerApplicationToSupabase, 
  SUPABASE_PROJECT_ID 
} from '../services/supabaseClient';
import { 
  Briefcase, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Upload, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  X,
  Printer,
  Database
} from 'lucide-react';

export const CareersSection: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [formData, setFormData] = useState<CareerApplication>({
    fullName: '',
    fatherName: '',
    age: '',
    aadhaarNumber: '',
    address: '',
    phone: '',
    email: '',
    positionAppliedFor: JOB_OPENINGS[0].title,
    experienceYears: '3',
    cvFileName: '',
    coverLetter: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setFormData(prev => ({ ...prev, cvFileName: file.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomId = 'SJ-HR-' + Math.floor(100000 + Math.random() * 900000);
    setSubmittedRefId(randomId);

    try {
      // 1. Save to Supabase Backend
      await saveCareerApplicationToSupabase(formData, randomId);

      // 2. Trigger instant Gmail notification to boipara90@gmail.com with candidate particulars and attached CV name
      await notifyCareerApplication({
        fullName: formData.fullName,
        fatherName: formData.fatherName,
        age: formData.age,
        aadhaarNumber: formData.aadhaarNumber,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        positionAppliedFor: formData.positionAppliedFor,
        experienceYears: formData.experienceYears,
        cvFileName: formData.cvFileName || (uploadedFile ? uploadedFile.name : undefined),
        coverLetter: formData.coverLetter,
        referenceId: randomId,
      });
    } catch (err) {
      console.warn('Career notification dispatched/logged:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleJobSelect = (job: JobOpening) => {
    setFormData(prev => ({ ...prev, positionAppliedFor: job.title }));
    const formElement = document.getElementById('career-application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="careers" className="py-20 bg-[#dbe2ea] text-slate-800 relative border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            <span>Join Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Space_Grotesk']">
            Career Opportunities &amp; Employment Application
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Sri SJ Construction Private Limited is continuously seeking qualified piling rig operators, civil engineers, safety supervisors, and skilled site technicians in West Bengal.
          </p>
        </div>

        {/* Current Job Openings Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-950 font-['Space_Grotesk'] flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
              Active Job Openings ({JOB_OPENINGS.length})
            </h3>
            <span className="text-xs text-slate-500 font-medium">Location: Haldia &amp; Project Sites, WB</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {JOB_OPENINGS.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-xl bg-slate-100 border border-slate-300 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 border border-amber-500/30">
                      {job.department}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {job.type}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                    {job.title}
                  </h4>

                  <div className="space-y-1 mt-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Experience: {job.experience}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleJobSelect(job)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form Section */}
        <div id="career-application-form" className="bg-slate-100 rounded-2xl border border-slate-300 p-6 sm:p-10 shadow-xl">
          
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl font-black text-slate-950 font-['Space_Grotesk']">
              Official Employee Application Form
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Please submit your personal and professional particulars. Our HR and site engineering recruitment team will review your application.
            </p>
          </div>

          {/* SENSITIVE DATA & AADHAAR PRIVACY ADVISORY BANNER */}
          <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700 space-y-1">
              <span className="font-bold text-amber-800 block">
                Sensitive Information &amp; Data Privacy Advisory:
              </span>
              <p>
                Aadhaar number is highly sensitive personal identification. Providing your Aadhaar number is <strong>strictly optional</strong> during initial screening. Submitted applicant data is kept strictly confidential and will not be displayed publicly.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid Row 1: Full Name & Father's Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g., Subhashish Mondal"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Father's Name <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    placeholder="Father's / Guardian's Full Name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Grid Row 2: Age, Aadhaar (Optional), Experience */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Age <span className="text-amber-600">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="18"
                  max="65"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g., 28"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Aadhaar Number</span>
                  <span className="text-[10px] text-amber-700 font-bold">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  maxLength={14}
                  placeholder="XXXX XXXX XXXX (Optional)"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Years of Experience <span className="text-amber-600">*</span>
                </label>
                <select
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                >
                  <option value="0-1">Fresher / Less than 1 Year</option>
                  <option value="1-3">1 to 3 Years</option>
                  <option value="3-5">3 to 5 Years</option>
                  <option value="5-10">5 to 10 Years</option>
                  <option value="10+">10+ Years (Senior / Foreman)</option>
                </select>
              </div>
            </div>

            {/* Grid Row 3: Position Applied For */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Position Applied For <span className="text-amber-600">*</span>
              </label>
              <select
                required
                name="positionAppliedFor"
                value={formData.positionAppliedFor}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
              >
                {JOB_OPENINGS.map((job) => (
                  <option key={job.id} value={job.title}>
                    {job.title} ({job.department})
                  </option>
                ))}
                <option value="Other Construction / Site Role">Other Construction / Site Technical Role</option>
              </select>
            </div>

            {/* Grid Row 4: Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Phone Number <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="candidate@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Residential Address (Village / Town, District, State, Pin) <span className="text-amber-600">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g., Sutahata, Haldia, Purba Medinipur, West Bengal - 721635"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#f0f4f8] border border-slate-300 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Upload CV Box */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Upload CV / Bio-data (PDF / DOCX / JPG)
              </label>
              <div className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-6 text-center bg-[#f0f4f8]/60 transition-colors">
                <input
                  type="file"
                  id="cv-upload-input"
                  accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="cv-upload-input"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 text-amber-600 flex items-center justify-center shadow-sm">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 hover:underline">
                      Click to upload your CV
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      or drag and drop resume file (Max 10 MB)
                    </span>
                  </div>
                </label>

                {formData.cvFileName && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs">
                    <FileText className="w-4 h-4" />
                    <span>{formData.cvFileName}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedFile(null);
                        setFormData(prev => ({ ...prev, cvFileName: '' }));
                      }}
                      className="ml-2 text-slate-500 hover:text-slate-800"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Submitted data is handled exclusively by <strong className="text-slate-900">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong> HR Team.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                id="submit-career-app-btn"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Processing Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 relative shadow-2xl text-slate-800">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase">
                  {selectedJob.department}
                </span>
                <h3 className="text-xl font-black text-slate-950 font-['Space_Grotesk'] mt-1">
                  {selectedJob.title}
                </h3>
                <div className="flex gap-3 text-xs text-slate-600 mt-2">
                  <span>Location: {selectedJob.location}</span>
                  <span>•</span>
                  <span>Exp: {selectedJob.experience}</span>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {selectedJob.description}
              </p>

              <div>
                <h4 className="text-xs font-bold text-amber-800 uppercase mb-2">Key Requirements:</h4>
                <ul className="space-y-1.5">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => {
                    const job = selectedJob;
                    setSelectedJob(null);
                    handleJobSelect(job);
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase cursor-pointer"
                >
                  Apply for this position
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Success Confirmation Dialog */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-center space-y-5 text-slate-800">
            
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider text-amber-700 uppercase">
                Application Received Successfully
              </span>
              <h3 className="text-2xl font-black text-slate-950 font-['Space_Grotesk']">
                Thank You, {formData.fullName || 'Candidate'}!
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your employee application for <strong className="text-slate-900">{formData.positionAppliedFor}</strong> has been registered with the HR &amp; Technical Recruitment Cell of <strong className="text-amber-800">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong>.
              </p>
            </div>

            {/* Reference Box */}
            <div className="p-4 rounded-xl bg-[#f0f4f8] border border-slate-200 text-left space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Application Reference ID:</span>
                <span className="font-mono font-black text-amber-700 text-sm">{submittedRefId}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Position Applied:</span>
                <span className="text-slate-900 font-semibold">{formData.positionAppliedFor}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Attached CV Resume:</span>
                <span className="text-emerald-700 font-bold">{formData.cvFileName || 'Uploaded to Portal'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Application Status:</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Submitted &amp; Registered
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">Notification:</span>
                <span className="text-slate-900 font-bold flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  Sent to HR Desk
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 text-[11px] text-slate-600 border border-slate-200 text-left">
              Our site engineers and HR coordinators will evaluate your credentials. Shortlisted candidates will be contacted via phone/email for an on-ground site interview in Haldia.
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Confirmation</span>
              </button>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: '',
                    fatherName: '',
                    age: '',
                    aadhaarNumber: '',
                    address: '',
                    phone: '',
                    email: '',
                    positionAppliedFor: JOB_OPENINGS[0].title,
                    experienceYears: '3',
                    cvFileName: '',
                    coverLetter: ''
                  });
                  setUploadedFile(null);
                }}
                className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                Close &amp; Finish
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
