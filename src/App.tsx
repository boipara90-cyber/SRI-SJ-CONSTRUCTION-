/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ClientSection } from './components/ClientSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { EquipmentSection } from './components/EquipmentSection';
import { CareersSection } from './components/CareersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { OriginalPhotosManagerModal } from './components/OriginalPhotosManagerModal';
import { WebsiteContentEditorModal } from './components/WebsiteContentEditorModal';
import { BrightnessSection, ThemeMode } from './components/BrightnessSection';
import { AnimatedSection } from './components/AnimatedSection';
import { COMPANY_INFO } from './data/companyData';
import { MessageCircle, Phone, Sparkles, Lock, Camera, SlidersHorizontal } from 'lucide-react';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [originalPhotosModalOpen, setOriginalPhotosModalOpen] = useState(false);
  const [isWebsiteEditorOpen, setIsWebsiteEditorOpen] = useState(false);
  const [prefillService, setPrefillService] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>('home');
  
  // Theme & Brightness (Default to Clean White / Light Theme)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('sri_sj_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  const [brightness, setBrightness] = useState<number>(() => {
    const saved = localStorage.getItem('sri_sj_brightness');
    const parsed = saved ? parseInt(saved, 10) : 100;
    return !isNaN(parsed) && parsed >= 60 && parsed <= 130 ? parsed : 100;
  });

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem('sri_sj_theme', newTheme);
  };

  // Track active section via IntersectionObserver or Scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'clients', 'projects', 'equipment', 'careers', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenQuoteModal = (serviceTitle?: string) => {
    setPrefillService(serviceTitle);
    setQuoteModalOpen(true);
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-orange-500 selection:text-white ${
        theme === 'dark' ? 'bg-zinc-950 text-zinc-100 dark' : 'bg-slate-50 text-slate-900'
      }`}
      style={{
        filter: brightness !== 100 ? `brightness(${brightness}%)` : undefined,
      }}
    >
      {/* Top Header & Navigation */}
      <Header 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
        onOpenWebsiteEditor={() => setIsWebsiteEditorOpen(true)}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
      />

      {/* Main Page Sections */}
      <main>
        {/* 1. Industrial Hero Banner */}
        <Hero 
          onOpenQuoteModal={() => handleOpenQuoteModal()} 
          onOpenPhotosModal={() => setOriginalPhotosModalOpen(true)}
          onOpenWebsiteEditor={() => setIsWebsiteEditorOpen(true)}
        />

        {/* 2. Visual Brightness & Quick Control Ribbon */}
        <BrightnessSection 
          theme={theme}
          onThemeChange={handleThemeChange}
          brightness={brightness}
          onBrightnessChange={(val) => {
            setBrightness(val);
            localStorage.setItem('sri_sj_brightness', val.toString());
          }}
          onReset={() => {
            setBrightness(100);
            localStorage.setItem('sri_sj_brightness', '100');
          }}
        />

        {/* 3. Company Overview & Credentials */}
        <AnimatedSection>
          <AboutSection onOpenQuoteModal={handleOpenQuoteModal} />
        </AnimatedSection>

        {/* 4. Core Capabilities & Piling Services */}
        <AnimatedSection>
          <ServicesSection onOpenQuoteModal={handleOpenQuoteModal} />
        </AnimatedSection>

        {/* 5. Client Portfolio & Industry Partners */}
        <AnimatedSection>
          <ClientSection />
        </AnimatedSection>

        {/* 6. Featured Completed Infrastructure Projects */}
        <AnimatedSection>
          <ProjectsSection onOpenQuoteModal={handleOpenQuoteModal} />
        </AnimatedSection>

        {/* 7. Why Choose Sri SJ Constructions */}
        <AnimatedSection>
          <WhyChooseUs onOpenQuoteModal={handleOpenQuoteModal} />
        </AnimatedSection>

        {/* 7b. Heavy Machinery & Modern Rig Fleet */}
        <AnimatedSection>
          <EquipmentSection onOpenQuoteModal={handleOpenQuoteModal} />
        </AnimatedSection>

        {/* 8. Careers & Application Portal */}
        <AnimatedSection>
          <CareersSection />
        </AnimatedSection>

        {/* 9. Contact & Registered Office Location */}
        <AnimatedSection>
          <ContactSection onOpenQuoteModal={handleOpenQuoteModal} />
        </AnimatedSection>
      </main>

      {/* Footer */}
      <Footer 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
        onOpenAdminModal={() => setAdminModalOpen(true)}
        onOpenWebsiteEditor={() => setIsWebsiteEditorOpen(true)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Floating Quick Quote Button */}
        <button
          onClick={() => handleOpenQuoteModal()}
          className="group flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-full shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-105 active:scale-95 transition-all text-sm font-semibold border border-orange-400/30 cursor-pointer"
          title="Instant Piling Rate Calculation"
        >
          <Sparkles className="w-4 h-4 animate-spin text-amber-200" style={{ animationDuration: '4s' }} />
          <span>Get Instant Quote</span>
        </button>

        {/* Floating WhatsApp Quick Connect */}
        <a
          href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
            `Hello Sri SJ Constructions, I am inquiring about piling work and foundation construction services.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg shadow-green-600/30 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>

        {/* Floating Direct Call Button */}
        <a
          href={`tel:${COMPANY_INFO.contact.phone.replace(/\s+/g, '')}`}
          className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-600/30 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title={`Call Us: ${COMPANY_INFO.contact.phone}`}
        >
          <Phone className="w-5 h-5 fill-current" />
        </a>
      </div>

      {/* Modals */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        prefillService={prefillService} 
      />

      <AdminPanelModal 
        isOpen={adminModalOpen} 
        onClose={() => setAdminModalOpen(false)} 
        onOpenWebsiteEditor={() => setIsWebsiteEditorOpen(true)}
      />

      <OriginalPhotosManagerModal 
        isOpen={originalPhotosModalOpen} 
        onClose={() => setOriginalPhotosModalOpen(false)} 
      />

      <WebsiteContentEditorModal 
        isOpen={isWebsiteEditorOpen} 
        onClose={() => setIsWebsiteEditorOpen(false)} 
        onOpenPhotosManager={() => setOriginalPhotosModalOpen(true)} 
      />
    </div>
  );
}
