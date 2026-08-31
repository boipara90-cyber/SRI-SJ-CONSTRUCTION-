/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PilingSection } from './components/PilingSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { EquipmentSection } from './components/EquipmentSection';
import { GoogleMapsGallerySection } from './components/GoogleMapsGallerySection';
import { CareersSection } from './components/CareersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { COMPANY_INFO } from './data/companyData';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [prefillService, setPrefillService] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Track active section via IntersectionObserver or Scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'piling', 'projects', 'equipment', 'maps-photos', 'careers', 'contact'];
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
    <div className="min-h-screen bg-[#e2e8f0] text-slate-900 selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Header */}
      <Header 
        onOpenQuoteModal={handleOpenQuoteModal} 
        activeSection={activeSection} 
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* 2. About Us */}
        <AboutSection />

        {/* 3. Our Services */}
        <ServicesSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 4. Piling Services Dedicated Section */}
        <PilingSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 5. Projects Section */}
        <ProjectsSection onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* 6. Why Choose Us */}
        <WhyChooseUs />

        {/* 7. Our Equipment */}
        <EquipmentSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 8. Google Maps Search & Site Photo Hub */}
        <GoogleMapsGallerySection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 9. Careers & Application Portal */}
        <CareersSection />

        {/* 10. Contact Us & Maps */}
        <ContactSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
      </main>

      {/* Footer */}
      <Footer onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Floating Quick Action Buttons (WhatsApp & Quick Call) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={handleFloatingWhatsApp}
          aria-label="Direct WhatsApp Message"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group relative ring-2 ring-emerald-400/50"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-15 px-3 py-1 rounded-md bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-slate-800">
            Chat on WhatsApp
          </span>
        </button>

        <a
          href={`tel:${COMPANY_INFO.contact.phone}`}
          aria-label="Call Sri SJ Construction"
          className="w-13 h-13 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group relative ring-2 ring-amber-400/50"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute right-15 px-3 py-1 rounded-md bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-slate-800">
            Call {COMPANY_INFO.contact.phone}
          </span>
        </a>
      </div>

      {/* Slide-over / Modal for Quote Request */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuoteModal}
        prefillService={prefillService}
      />
    </div>
  );
}
