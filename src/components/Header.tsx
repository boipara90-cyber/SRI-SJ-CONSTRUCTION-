import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Header3DLogo } from './Header3DLogo';
import { COMPANY_INFO } from '../data/companyData';
import { GmailNotificationDrawer } from './GmailNotificationDrawer';
import { ADMIN_NOTIFICATION_EMAIL } from '../services/gmailNotificationService';
import { SUPABASE_PROJECT_ID } from '../services/supabaseClient';
import { useSiteContent } from '../services/siteContentService';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  HardHat, 
  Sparkles,
  Clock,
  Bell,
  Sun,
  Moon,
  Database,
  Lock,
  SlidersHorizontal,
  Edit3,
  Cpu
} from 'lucide-react';

interface HeaderProps {
  onOpenQuoteModal: (prefillService?: string) => void;
  onOpenWebsiteEditor?: () => void;
  activeSection: string;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuoteModal,
  onOpenWebsiteEditor,
  activeSection,
  theme = 'light',
  onToggleTheme
}) => {
  const { content } = useSiteContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGmailDrawerOpen, setIsGmailDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Clients', href: '#clients' },
    { name: 'Projects', href: '#projects' },
    { name: 'Equipment', href: '#equipment' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header id="main-header" className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar for Industrial Verification, Contact & Location */}
      <div className={`bg-[#050507] border-b border-zinc-800/80 text-zinc-300 text-xs py-2 px-4 transition-all duration-300 ${
        isScrolled ? 'hidden md:block' : 'block'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>{content.company.fullAddress}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Office Hours: <strong className="text-white">{content.company.workingHours}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onOpenWebsiteEditor && (
              <button
                type="button"
                onClick={onOpenWebsiteEditor}
                id="topbar-edit-website-btn"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-[11px] cursor-pointer transition-colors shadow-sm"
                title="Edit Website Content (Company Details, Hero, Services, Numbers)"
              >
                <SlidersHorizontal className="w-3 h-3 text-amber-400" />
                <span>Edit Site</span>
              </button>
            )}

            <button
              onClick={() => setIsGmailDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold text-[11px] cursor-pointer transition-colors"
              title="Click to view Gmail Notification status and logs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <Mail className="w-3 h-3 text-orange-400" />
              <span>Gmail Alerts</span>
            </button>

            <a 
              href={`tel:${content.company.phone}`} 
              className="flex items-center gap-1.5 text-white hover:text-orange-400 transition-colors font-medium"
              id="topbar-phone-link"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>{content.company.phone}</span>
            </a>
            <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-orange-500/30 text-orange-400 font-semibold text-[11px]" title={`GSTIN: ${content.company.gstNumber}`}>
              <HardHat className="w-3 h-3 text-orange-400" />
              <span className="text-zinc-200">GST: <span className="font-mono text-orange-400 font-bold">{content.company.gstNumber}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar with 3D Bevel & Perspective */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.9)] border-b border-orange-500/30 py-3' 
          : 'bg-[#09090e]/95 backdrop-blur-sm border-b border-zinc-800 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* 3D Interactive Logo */}
          <a href="#home" className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-xl">
            <Header3DLogo size="md" />
          </a>

          {/* Desktop Navigation with 3D Depth */}
          <div className="hidden lg:flex items-center gap-1 bg-[#0a0a10] p-1.5 rounded-full border border-zinc-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  id={`nav-${link.name.toLowerCase()}`}
                  className={`nav-link-3d px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'btn-3d-primary text-white font-black shadow-md shadow-orange-600/40 border border-orange-400/40'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Action & CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {onOpenWebsiteEditor && (
              <button
                type="button"
                onClick={onOpenWebsiteEditor}
                id="header-edit-site-btn"
                title="Edit Website Content (Company Details, Hero, Services, Numbers)"
                className="btn-3d-dark inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-amber-300 font-bold text-xs transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit Site</span>
              </button>
            )}

            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                id="header-theme-toggle-btn"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition-all cursor-pointer flex items-center justify-center shadow-xs"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-orange-400" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-400" />
                )}
              </button>
            )}

            {/* 3D CTA "Get Quote" Button with Shimmer Sweep */}
            <button
              onClick={() => onOpenQuoteModal()}
              id="header-quote-btn"
              className="btn-3d-primary relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white font-black text-xs uppercase tracking-wider cursor-pointer border border-orange-300/40 group"
            >
              {/* 3D Shimmer Specular Light Wave */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-shimmer-3d" />
              <Sparkles className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenWebsiteEditor && (
              <button
                type="button"
                onClick={onOpenWebsiteEditor}
                id="mobile-header-edit-site-btn"
                title="Edit Website Content"
                className="p-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 flex items-center gap-1 text-[11px] font-bold"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Edit</span>
              </button>
            )}

            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                id="mobile-header-theme-toggle-btn"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-orange-400" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-400" />
                )}
              </button>
            )}

            <button
              onClick={() => onOpenQuoteModal()}
              className="btn-3d-primary px-3 py-1.5 rounded-lg text-white text-xs font-black shadow-sm"
              id="mobile-quick-quote-btn"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-900 text-white hover:text-orange-400 hover:bg-zinc-800 border border-zinc-800 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-orange-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with 3D Fold Transition */}
        {mobileMenuOpen && (
          <div className="lg:hidden menu-drawer-3d bg-[#0a0a10] border-b-2 border-orange-500/30 px-4 pt-4 pb-6 mt-3 space-y-3 shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-zinc-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav-link-3d px-3 py-2.5 text-sm font-semibold rounded-xl text-zinc-200 hover:bg-orange-500/15 hover:text-orange-400 border border-transparent hover:border-orange-500/30"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 space-y-2.5">
              {onOpenWebsiteEditor && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWebsiteEditor();
                  }}
                  className="btn-3d-dark w-full py-2.5 rounded-xl text-amber-300 font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                  <span>Edit Website Content &amp; Details</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="btn-3d-primary w-full py-3 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30"
              >
                <span>Request a Detailed Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-white font-medium">{content.company.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-white font-medium">{content.company.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>{content.company.fullAddress}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Gmail Workspace Notification Center & Test Modal */}
      <GmailNotificationDrawer
        isOpen={isGmailDrawerOpen}
        onClose={() => setIsGmailDrawerOpen(false)}
      />
    </header>
  );
};
