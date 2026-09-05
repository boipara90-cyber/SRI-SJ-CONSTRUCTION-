import React, { useState, useEffect } from 'react';
import { 
  getSiteContent, 
  saveSiteContent, 
  resetSiteContent, 
  EditableSiteContent 
} from '../services/siteContentService';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  Layers, 
  FileText, 
  HardHat, 
  Image as ImageIcon,
  AlertCircle,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

interface WebsiteContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPhotosManager?: () => void;
}

type EditorTab = 'company' | 'hero' | 'about' | 'stats' | 'services';

export const WebsiteContentEditorModal: React.FC<WebsiteContentEditorModalProps> = ({
  isOpen,
  onClose,
  onOpenPhotosManager
}) => {
  const [formData, setFormData] = useState<EditableSiteContent>(() => getSiteContent());
  const [activeTab, setActiveTab] = useState<EditorTab>('company');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      setFormData(getSiteContent());
      setToastMessage(null);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = () => {
    setIsSaving(true);
    saveSiteContent(formData);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Website content updated and saved successfully! Changes are live across the site.', 'success');
    }, 200);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all website text and details to the original defaults?')) {
      const reset = resetSiteContent();
      setFormData(reset);
      showToast('Website details reset to original defaults.', 'info');
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sri_sj_website_content_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Website configuration exported as JSON backup.', 'success');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.company) {
            setFormData(parsed);
            saveSiteContent(parsed);
            showToast('Website configuration imported and applied successfully!', 'success');
          } else {
            showToast('Invalid backup file format.', 'error');
          }
        } catch (err) {
          showToast('Failed to parse backup JSON file.', 'error');
        }
      };
    }
  };

  // Helper updates
  const updateCompanyField = (field: keyof EditableSiteContent['company'], value: any) => {
    setFormData(prev => ({
      ...prev,
      company: { ...prev.company, [field]: value }
    }));
  };

  const updateHeroField = (field: keyof EditableSiteContent['hero'], value: any) => {
    setFormData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateAboutField = (field: keyof EditableSiteContent['about'], value: any) => {
    setFormData(prev => ({
      ...prev,
      about: { ...prev.about, [field]: value }
    }));
  };

  const updateStatItem = (index: number, key: 'label' | 'value' | 'detail', value: string) => {
    setFormData(prev => {
      const nextStats = [...prev.stats];
      nextStats[index] = { ...nextStats[index], [key]: value };
      return { ...prev, stats: nextStats };
    });
  };

  const updateServiceItem = (index: number, key: 'title' | 'shortDescription' | 'category', value: string) => {
    setFormData(prev => {
      const nextServices = [...prev.services];
      nextServices[index] = { ...nextServices[index], [key]: value };
      return { ...prev, services: nextServices };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#0b0b10] border-2 border-orange-500/50 rounded-2xl w-full max-w-5xl h-[90vh] max-h-[850px] shadow-2xl flex flex-col overflow-hidden relative text-zinc-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="bg-[#12121a] border-b border-zinc-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/30">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white font-['Space_Grotesk'] tracking-wide">
                  Website Content Editor
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
                  Live Customizer
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Instantly edit texts, company details, phone numbers, hero headlines, and services.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenPhotosManager && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPhotosManager();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-orange-400 text-xs font-semibold border border-zinc-700 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-orange-400" />
                <span>Photos Manager</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#0f0f15] border-b border-zinc-800 px-6 py-2 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-thin">
          <button
            type="button"
            onClick={() => setActiveTab('company')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'company'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Company & Contact</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hero & Headlines</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>About Section</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>Key Stats</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'services'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Services Overview</span>
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: COMPANY & CONTACT */}
          {activeTab === 'company' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-[#121218] p-4 rounded-xl border border-zinc-800">
                <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange-400" />
                  <span>Company Identity & Registration</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Full Legal Registered Name
                    </label>
                    <input
                      type="text"
                      value={formData.company.name}
                      onChange={e => updateCompanyField('name', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Short Brand Name
                    </label>
                    <input
                      type="text"
                      value={formData.company.shortName}
                      onChange={e => updateCompanyField('shortName', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Company Tagline / Slogan
                    </label>
                    <input
                      type="text"
                      value={formData.company.tagline}
                      onChange={e => updateCompanyField('tagline', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      GSTIN / GST Registration Number
                    </label>
                    <input
                      type="text"
                      value={formData.company.gstNumber}
                      onChange={e => updateCompanyField('gstNumber', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm font-mono focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Established Year &amp; Experience
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formData.company.establishedYear}
                        onChange={e => updateCompanyField('establishedYear', e.target.value)}
                        placeholder="2011"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={formData.company.experienceYears}
                        onChange={e => updateCompanyField('experienceYears', e.target.value)}
                        placeholder="15+ Years"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#121218] p-4 rounded-xl border border-zinc-800">
                <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span>Contact Numbers, WhatsApp &amp; Email</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Primary Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.company.phone}
                      onChange={e => updateCompanyField('phone', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Alternate Phone / Site Hotline
                    </label>
                    <input
                      type="text"
                      value={formData.company.altPhone}
                      onChange={e => updateCompanyField('altPhone', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      WhatsApp Number (With Country Code e.g. +918170039171)
                    </label>
                    <input
                      type="text"
                      value={formData.company.whatsapp}
                      onChange={e => updateCompanyField('whatsapp', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.company.email}
                      onChange={e => updateCompanyField('email', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Registered Address
                    </label>
                    <input
                      type="text"
                      value={formData.company.fullAddress}
                      onChange={e => updateCompanyField('fullAddress', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Working Hours Display
                    </label>
                    <input
                      type="text"
                      value={formData.company.workingHours}
                      onChange={e => updateCompanyField('workingHours', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Emergency Support Info
                    </label>
                    <input
                      type="text"
                      value={formData.company.emergencySupport}
                      onChange={e => updateCompanyField('emergencySupport', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & HEADLINES */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-[#121218] p-4 rounded-xl border border-zinc-800">
                <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>Main Hero Section Presentation</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Top Headline Eyebrow / Specialist Badge
                    </label>
                    <input
                      type="text"
                      value={formData.hero.specialistBadge}
                      onChange={e => updateHeroField('specialistBadge', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Headline Line 1 (Highlighted Box)
                      </label>
                      <input
                        type="text"
                        value={formData.hero.headline1}
                        onChange={e => updateHeroField('headline1', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Headline Line 2
                      </label>
                      <input
                        type="text"
                        value={formData.hero.headline2}
                        onChange={e => updateHeroField('headline2', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Hero Introduction Narrative
                    </label>
                    <textarea
                      rows={3}
                      value={formData.hero.intro}
                      onChange={e => updateHeroField('intro', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Primary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={formData.hero.quoteBtnText}
                        onChange={e => updateHeroField('quoteBtnText', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Secondary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={formData.hero.projectsBtnText}
                        onChange={e => updateHeroField('projectsBtnText', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT SECTION */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-[#121218] p-4 rounded-xl border border-zinc-800">
                <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-400" />
                  <span>About Us Content &amp; Story</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Section Badge
                    </label>
                    <input
                      type="text"
                      value={formData.about.badgeText}
                      onChange={e => updateAboutField('badgeText', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Main About Heading
                    </label>
                    <input
                      type="text"
                      value={formData.about.heading}
                      onChange={e => updateAboutField('heading', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Intro Lead Summary
                    </label>
                    <textarea
                      rows={2}
                      value={formData.about.leadParagraph}
                      onChange={e => updateAboutField('leadParagraph', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Company Story Paragraph 1
                    </label>
                    <textarea
                      rows={3}
                      value={formData.about.storyParagraph1}
                      onChange={e => updateAboutField('storyParagraph1', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Company Story Paragraph 2
                    </label>
                    <textarea
                      rows={3}
                      value={formData.about.storyParagraph2}
                      onChange={e => updateAboutField('storyParagraph2', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Company Story Paragraph 3 (Testing &amp; Modernization Methods)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.about.storyParagraph3 || ''}
                      onChange={e => updateAboutField('storyParagraph3', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                      placeholder="To combat the challenge ahead we're on the way to modernize..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: KEY STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                    Company Highlights &amp; Numbers
                  </h4>
                  <p className="text-xs text-zinc-300">
                    These 5 metrics appear in the About section and corporate identity banner.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.stats.map((stat, idx) => (
                  <div key={idx} className="bg-[#121218] p-4 rounded-xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-400">Metric #{idx + 1}</span>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">Value / Figure</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={e => updateStatItem(idx, 'value', e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-white text-sm font-bold focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={e => updateStatItem(idx, 'label', e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">Sub-detail</label>
                      <input
                        type="text"
                        value={stat.detail}
                        onChange={e => updateStatItem(idx, 'detail', e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES OVERVIEW */}
          {activeTab === 'services' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                    Core Services Titles &amp; Summaries
                  </h4>
                  <p className="text-xs text-zinc-300">
                    Modify the descriptions and headings shown in the Services section and quote dropdowns.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.services.map((srv, idx) => (
                  <div key={srv.id || idx} className="bg-[#121218] p-4 rounded-xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-orange-400 font-bold uppercase">{srv.category}</span>
                      <span className="text-[10px] font-mono text-zinc-400">ID: {srv.id}</span>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">Service Title</label>
                      <input
                        type="text"
                        value={srv.title}
                        onChange={e => updateServiceItem(idx, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-white text-sm font-bold focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-400 mb-1">Short Description</label>
                      <textarea
                        rows={2}
                        value={srv.shortDescription}
                        onChange={e => updateServiceItem(idx, 'shortDescription', e.target.value)}
                        className="w-full px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-white text-xs focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-20 right-6 z-20 animate-in slide-in-from-top-2 duration-200">
            <div className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border text-xs font-bold ${
              toastMessage.type === 'success' 
                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50' 
                : toastMessage.type === 'error'
                ? 'bg-red-950/90 text-red-300 border-red-500/50'
                : 'bg-zinc-900/90 text-zinc-200 border-zinc-700'
            }`}>
              {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
              <span>{toastMessage.text}</span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="bg-[#12121a] border-t border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 text-xs font-semibold border border-zinc-800 transition-colors"
              title="Reset all fields to original defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset to Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-semibold border border-zinc-800 transition-colors"
              title="Backup current edits as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Backup</span>
            </button>

            <label
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-semibold border border-zinc-800 transition-colors cursor-pointer"
              title="Restore from JSON backup"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restore</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs border border-zinc-700 transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-orange-400/40 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save & Apply Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
