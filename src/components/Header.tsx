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
  Calendar,
  Lock
} from 'lucide-react';

interface HeaderProps {
  onOpenQuoteModal: (prefillService?: string) => void;
  onOpenAppointmentModal?: (prefillService?: string) => void;
  activeSection: string;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuoteModal,
  onOpenAppointmentModal,
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
      <div className={`bg-slate-900 border-b border-slate-800 text-slate-200 text-xs py-2 px-4 transition-all duration-300 ${
        isScrolled ? 'hidden md:block' : 'block'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Haldia, Sutahata, Nandarampur, West Bengal – 721635</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Office Hours: 9:00 AM – 8:00 PM (Mon – Sat)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsGmailDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-[11px] cursor-pointer transition-colors"
              title="Click to view Gmail Notification status and logs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <Mail className="w-3 h-3 text-amber-400" />
              <span>Gmail Alerts</span>
            </button>

            <a 
              href={`tel:${COMPANY_INFO.contact.phone}`} 
              className="flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors font-medium"
              id="topbar-phone-link"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{COMPANY_INFO.contact.phone}</span>
            </a>
            <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-400 font-semibold text-[11px]" title="GSTIN: 19AFUPK0762L1ZS">
              <HardHat className="w-3 h-3" />
              <span>GST: 19AFUPK0762L1ZS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/90 py-3' 
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/80 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg">
            <Logo size="md" theme="light" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  id={`nav-${link.name.toLowerCase()}`}
                  className={`px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
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
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 transition-all cursor-pointer flex items-center justify-center"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>
            )}

            {onOpenAppointmentModal && (
              <button
                onClick={() => onOpenAppointmentModal()}
                id="header-appointment-btn"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Book Appointment</span>
              </button>
            )}

            <button
              onClick={() => onOpenQuoteModal()}
              id="header-quote-btn"
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                id="mobile-header-theme-toggle-btn"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                className="p-1.5 rounded-md bg-slate-100 border border-slate-300 text-slate-800"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>
            )}

            {onOpenAppointmentModal && (
              <button
                onClick={() => onOpenAppointmentModal()}
                className="px-2.5 py-1.5 rounded-md bg-slate-900 text-white text-[11px] font-bold shadow-sm flex items-center gap-1"
                id="mobile-quick-appointment-btn"
              >
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>Book</span>
              </button>
            )}

            <button
              onClick={() => onOpenQuoteModal()}
              className="px-2.5 py-1.5 rounded-md bg-amber-500 text-slate-950 text-[11px] font-bold shadow-sm"
              id="mobile-quick-quote-btn"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-800 hover:text-slate-950 hover:bg-slate-200 border border-slate-200 focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 mt-3 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold rounded-lg text-slate-700 hover:bg-amber-500/10 hover:text-amber-700 border border-transparent hover:border-amber-500/20"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 space-y-2.5">
              {onOpenAppointmentModal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAppointmentModal();
                  }}
                  className="w-full py-3 rounded-lg bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Book Site Appointment</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
              >
                <span>Request a Detailed Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-slate-800 font-medium">{COMPANY_INFO.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-slate-800 font-medium">{COMPANY_INFO.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
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
