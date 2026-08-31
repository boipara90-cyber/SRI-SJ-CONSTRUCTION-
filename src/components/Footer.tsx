import React from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp, 
  HardHat, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ShieldCheck
} from 'lucide-react';

interface FooterProps {
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Piling', href: '#piling' },
    { name: 'Projects', href: '#projects' },
    { name: 'Maps & Photos', href: '#maps-photos' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer id="main-footer" className="bg-[#111c2a] text-slate-200 border-t-2 border-amber-500 relative overflow-hidden">
      {/* Top Industrial Stripe Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Tagline (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" />
            
            <p className="text-amber-400 font-bold text-base font-['Space_Grotesk'] italic">
              "{COMPANY_INFO.tagline}"
            </p>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Established in 2013, Sri SJ Construction Private Limited is a specialized 
              piling and construction company based in Haldia, West Bengal, delivering 
              bored cast-in-situ piling, industrial foundations, and turnkey civil structural engineering.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Follow Us:</span>
              <div className="flex items-center gap-2">
                <a href="#contact" aria-label="LinkedIn placeholder" className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#contact" aria-label="Facebook placeholder" className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#contact" aria-label="Twitter placeholder" className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#contact" aria-label="YouTube placeholder" className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-['Space_Grotesk'] border-b border-slate-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-amber-400 transition-colors block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Services List (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-['Space_Grotesk'] border-b border-slate-700 pb-2">
              Key Services
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>• Piling Work</li>
              <li>• Bored Piling</li>
              <li>• Foundation Construction</li>
              <li>• Civil Construction</li>
              <li>• RCC Work</li>
              <li>• Structural Construction</li>
              <li>• Industrial Development</li>
              <li>• Earthwork &amp; Machinery</li>
            </ul>
          </div>

          {/* Column 4: Address & Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider font-['Space_Grotesk'] border-b border-slate-700 pb-2">
              Registered Office
            </h4>
            
            <div className="space-y-3 text-xs text-slate-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Sri SJ Construction Private Limited</p>
                  <p className="text-slate-300 mt-0.5">
                    Haldia, Sutahata, Nandarampur,<br />
                    West Bengal – 721635, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.contact.phone}`} className="text-slate-200 hover:text-amber-400 font-semibold">
                  {COMPANY_INFO.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.contact.email}`} className="text-slate-200 hover:text-amber-400 font-semibold">
                  {COMPANY_INFO.contact.email}
                </a>
              </div>

              <div className="pt-1 text-[11px] text-amber-400 font-mono font-semibold flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300">GSTIN</span>
                <span>19AFUPK0762L1ZS</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuoteModal}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Get a Quote
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 flex-wrap text-center sm:text-left">
            <span>© 2013 – {new Date().getFullYear()} <strong className="text-white font-black tracking-wide">SRI SJ CONSTRUCTION PRIVATE LIMITED</strong>. All Rights Reserved.</span>
            <span className="hidden md:inline text-amber-500">•</span>
            <span className="text-slate-300">GSTIN: <strong className="text-amber-400 font-mono">19AFUPK0762L1ZS</strong></span>
            <span className="hidden md:inline text-amber-500">•</span>
            <span className="text-slate-300">Haldia, West Bengal – 721635, India</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors cursor-pointer font-medium"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
