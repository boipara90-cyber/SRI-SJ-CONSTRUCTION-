import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/companyData';
import { GmailNotificationDrawer } from './GmailNotificationDrawer';
import { ADMIN_NOTIFICATION_EMAIL } from '../services/gmailNotificationService';
import { SUPABASE_PROJECT_ID } from '../services/supabaseClient';
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
  Lock
} from 'lucide-react';

interface HeaderProps {
  onOpenQuoteModal: (prefillService?: string) => void;
  activeSection: string;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuoteModal,
  activeSection,
  theme = 'light',
  onToggleTheme
}) => {
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
    { name: 'Piling', href: '#piling' },
    { name: 'Projects', href: '#projects' },
    { name: 'Equipment', href: '#equipment' },
    { name: 'Maps & Photos', href: '#maps-photos' },
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
              <span>Haldia, Sutahata, Nandarampur, West Bengal – 721635</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>Office Hours: <strong className="text-white">9:00 AM – 8:00 PM</strong> (Mon – Sat)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
              href={`tel:${COMPANY_INFO.contact.phone}`} 
              className="flex items-center gap-1.5 text-white hover:text-orange-400 transition-colors font-medium"
              id="topbar-phone-link"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>{COMPANY_INFO.contact.phone}</span>
            </a>
            <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 border border-orange-500/30 text-orange-400 font-semibold text-[11px]" title="GSTIN: 19ABPCS8304J1ZQ">
              <HardHat className="w-3 h-3 text-orange-400" />
              <span className="text-zinc-200">GST: <span className="font-mono text-orange-400 font-bold">19ABPCS8304J1ZQ</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-zinc-800 py-3' 
          : 'bg-[#09090b]/95 backdrop-blur-sm border-b border-zinc-800/80 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg">
            <Logo size="md" theme="dark" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-zinc-950/90 p-1.5 rounded-full border border-zinc-800">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  id={`nav-${link.name.toLowerCase()}`}
                  className={`px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30 font-bold'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                id="header-theme-toggle-btn"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition-all cursor-pointer flex items-center justify-center"
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
              id="header-quote-btn"
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-orange-400/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                id="mobile-header-theme-toggle-btn"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                className="p-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-200"
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
              className="px-3 py-1.5 rounded-md bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold shadow-sm"
              id="mobile-quick-quote-btn"
            >
              Get Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 text-white hover:text-orange-400 hover:bg-zinc-800 border border-zinc-800 focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#09090b] border-b border-zinc-800 px-4 pt-4 pb-6 mt-3 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-zinc-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold rounded-lg text-zinc-200 hover:bg-orange-500/15 hover:text-orange-400 border border-transparent hover:border-orange-500/30"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30"
              >
                <span>Request a Detailed Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-white font-medium">{COMPANY_INFO.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-white font-medium">{COMPANY_INFO.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>{COMPANY_INFO.address.fullAddress}</span>
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
