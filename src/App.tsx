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
import { GoogleMapsGallerySection } from './components/GoogleMapsGallerySection';
import { CareersSection } from './components/CareersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { OriginalPhotosManagerModal } from './components/OriginalPhotosManagerModal';
import { BrightnessSection, ThemeMode } from './components/BrightnessSection';
import { AnimatedSection } from './components/AnimatedSection';
import { COMPANY_INFO } from './data/companyData';
import { MessageCircle, Phone, Sparkles, Lock, Camera } from 'lucide-react';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [originalPhotosModalOpen, setOriginalPhotosModalOpen] = useState(false);
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

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    handleThemeChange(next);
  };

  const handleBrightnessChange = (val: number) => {
    const clamped = Math.min(130, Math.max(60, val));
    setBrightness(clamped);
    localStorage.setItem('sri_sj_brightness', clamped.toString());
  };

  const handleResetDisplay = () => {
    handleThemeChange('dark');
    handleBrightnessChange(100);
  };

  // Sync theme class to document body / root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('theme-dark');
      document.body.classList.add('theme-dark');
    } else {
      document.documentElement.classList.remove('theme-dark');
      document.body.classList.remove('theme-dark');
    }
  }, [theme]);

  // Listener for triggering admin panel modal from nested sections
  useEffect(() => {
    const handleOpenAdmin = () => {
      setAdminModalOpen(true);
    };
    window.addEventListener('sri_sj_open_admin_modal', handleOpenAdmin);
    return () => window.removeEventListener('sri_sj_open_admin_modal', handleOpenAdmin);
  }, []);

  // Track active section via IntersectionObserver or Scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'clients', 'projects', 'equipment', 'maps-photos', 'careers', 'contact'];
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenQuoteModal = (serviceTitle?: string) => {
    setPrefillService(serviceTitle);
    setQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setQuoteModalOpen(false);
    setPrefillService(undefined);
  };

  const handleFloatingWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Sri SJ Construction Private Limited, I would like to inquire about piling/construction services for our project.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div 
      className={`min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white font-sans transition-colors duration-300 ${
        theme === 'dark' ? 'theme-dark' : ''
      }`}
      style={{
        filter: brightness !== 100 ? `brightness(${brightness}%)` : undefined,
        transition: 'filter 150ms ease-out, background-color 250ms ease-in-out'
      }}
    >
      {/* Header with quick Dark/Light toggle and Get Quote */}
      <Header 
        onOpenQuoteModal={handleOpenQuoteModal} 
        activeSection={activeSection} 
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Sections */}
      <main className="bg-black">
        {/* 1. Hero Section */}
        <Hero 
          onOpenQuoteModal={() => handleOpenQuoteModal()} 
          onOpenPhotosModal={() => setOriginalPhotosModalOpen(true)}
        />

        {/* 2. About Us */}
        <AnimatedSection>
          <AboutSection />
        </AnimatedSection>

        {/* 3. Our Services */}
        <AnimatedSection>
          <ServicesSection onOpenQuoteModal={handleOpenQuoteModal} />
        </AnimatedSection>

        {/* 4. Client Section */}
        <AnimatedSection>
          <ClientSection />
        </AnimatedSection>

        {/* 5. Projects Section */}
        <AnimatedSection>
          <ProjectsSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
        </AnimatedSection>

        {/* 6. Why Choose Us */}
        <AnimatedSection>
          <WhyChooseUs />
        </AnimatedSection>

        {/* 7. Our Equipment */}
        <AnimatedSection>
          <EquipmentSection onOpenQuoteModal={handleOpenQuoteModal} />
        </AnimatedSection>

        {/* 8. Google Maps Search & Site Photo Hub */}
        <AnimatedSection>
          <GoogleMapsGallerySection 
            onOpenQuoteModal={handleOpenQuoteModal} 
            onOpenPhotosModal={() => setOriginalPhotosModalOpen(true)}
          />
        </AnimatedSection>

        {/* 9. Careers & Application Portal */}
        <AnimatedSection>
          <CareersSection />
        </AnimatedSection>

        {/* 10. Contact Us & Maps */}
        <AnimatedSection>
          <ContactSection 
            onOpenQuoteModal={() => handleOpenQuoteModal()} 
          />
        </AnimatedSection>
      </main>

      {/* Footer (contains the exclusive Admin Portal login/setup link) */}
      <Footer 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Dedicated Small Brightness & Dark/Light Mode Section */}
      <BrightnessSection
        theme={theme}
        brightness={brightness}
        onThemeChange={handleThemeChange}
        onBrightnessChange={handleBrightnessChange}
        onReset={handleResetDisplay}
      />

      {/* Floating Quick Action Buttons (WhatsApp & Quick Call) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={handleFloatingWhatsApp}
          aria-label="Direct WhatsApp Message"
          className="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group relative ring-2 ring-orange-500/50"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-15 px-3 py-1 rounded-md bg-zinc-950 text-orange-400 border border-orange-500/30 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Chat on WhatsApp
          </span>
        </button>

        <a
          href={`tel:${COMPANY_INFO.contact.phone}`}
          aria-label="Call Sri SJ Construction"
          className="w-13 h-13 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group relative ring-2 ring-orange-400/50"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute right-15 px-3 py-1 rounded-md bg-zinc-950 text-white border border-orange-500/30 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Call <span className="text-orange-400">{COMPANY_INFO.contact.phone}</span>
          </span>
        </a>
      </div>

      {/* Slide-over / Modal for Quote Request */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuoteModal}
        prefillService={prefillService}
      />

      {/* Single-Slot Master Admin Management Portal */}
      <AdminPanelModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      {/* Dedicated Original WhatsApp Site Photos Management Modal */}
      <OriginalPhotosManagerModal
        isOpen={originalPhotosModalOpen}
        onClose={() => setOriginalPhotosModalOpen(false)}
      />
    </div>
  );
}
