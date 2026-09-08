import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Menu, 
  X, 
  ArrowRight, 
  MessageSquare, 
  Activity, 
  EyeOff, 
  Eye, 
  ChevronDown,
  Layers,
  Cpu,
  Bot,
  Sparkles,
  Mic,
  User,
  Radio
} from 'lucide-react';
import { AppRoute } from '../../types';
import { trackEvent } from '../../lib/analytics';
import { openWhatsApp } from '../../lib/whatsapp';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentRoute: AppRoute;
  navigate: (route: AppRoute) => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  toggleTelemetry: () => void;
  openBriefModal: () => void;
  openVoiceModal?: () => void;
  openPortalModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  navigate,
  reducedMotion,
  toggleReducedMotion,
  toggleTelemetry,
  openBriefModal,
  openVoiceModal,
  openPortalModal,
}) => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change or ESC
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [currentRoute]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks: { label: string; route: AppRoute; hasDropdown?: boolean }[] = [
    { label: 'Systems', route: '/services', hasDropdown: true },
    { label: 'Selected Work', route: '/work' },
    { label: 'Process', route: '/process' },
    { label: 'Philosophy', route: '/about' },
    { label: 'Contact', route: '/contact' },
  ];

  const subServices = [
    {
      name: 'Custom Web Experiences',
      route: '/services/web-experiences' as AppRoute,
      desc: 'Sub-second, high-converting digital interfaces',
      icon: Layers,
    },
    {
      name: 'AI & Workflow Automation',
      route: '/services/ai-automation' as AppRoute,
      desc: 'Instant lead routing & CRM auto-sync',
      icon: Cpu,
    },
    {
      name: 'Conversational AI Agents',
      route: '/services/ai-agents' as AppRoute,
      desc: '24/7 autonomous voice & WhatsApp agents',
      icon: Bot,
    },
    {
      name: 'AI UGC & Creative Pipelines',
      route: '/services/creative' as AppRoute,
      desc: 'High-velocity video ad testing engines',
      icon: Sparkles,
    },
  ];

  const handleNavClick = (route: AppRoute) => {
    trackEvent('cta_click', { destination: route, source: 'navbar' });
    navigate(route);
  };

  return (
    <header
      id="global-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-sm shadow-slate-900/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-lg p-1"
            aria-label="IGRYbuilds Home"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200/80 group-hover:border-indigo-400 flex items-center justify-center transition-colors">
              <Terminal className="w-5 h-5 text-[#4F46E5]" />
            </div>
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-tight text-[#0F172A]">
                  IGRY<span className="text-[#4F46E5]">builds</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-mono text-emerald-700 tracking-wider uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Systems Live
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#64748B] tracking-wider uppercase -mt-0.5">
                Digital Systems Studio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route || (link.hasDropdown && currentRoute.startsWith('/services'));
              
              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.route} 
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      id="nav-systems-dropdown-btn"
                      onClick={() => handleNavClick(link.route)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'text-[#4F46E5] bg-indigo-50/80 border border-indigo-200/80 font-semibold'
                          : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-100/80'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#4F46E5]' : ''}`} />
                    </button>

                    {/* Flyout Dropdown */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 mt-2 w-80 p-2 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-900/10 z-50"
                        >
                          <div className="p-2 border-b border-slate-100 mb-1">
                            <span className="text-[11px] font-mono uppercase text-[#64748B] tracking-wider font-semibold">
                              Flagship Architectures
                            </span>
                          </div>
                          {subServices.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <button
                                key={sub.route}
                                onClick={() => {
                                  setServicesDropdownOpen(false);
                                  handleNavClick(sub.route);
                                }}
                                className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-indigo-50/50 text-left transition-colors group"
                              >
                                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 group-hover:border-indigo-300 group-hover:bg-indigo-50 transition-colors">
                                  <SubIcon className="w-4 h-4 text-[#4F46E5]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">
                                    {sub.name}
                                  </div>
                                  <p className="text-xs text-[#64748B] truncate mt-0.5">
                                    {sub.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={link.route}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(link.route)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#4F46E5] bg-indigo-50/80 border border-indigo-200/80 font-semibold'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-100/80'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Utility & Action Controls */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Live AI Voice Consultation Button */}
            {openVoiceModal && (
              <button
                id="nav-voice-consult-btn"
                onClick={() => {
                  trackEvent('cta_click', { cta_id: 'nav_voice_consult' });
                  openVoiceModal();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50/90 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold transition-all shadow-2xs group"
                title="Talk Live to AI System Architect (Gemini Live API)"
              >
                <div className="relative">
                  <Mic className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span>Live Voice AI</span>
              </button>
            )}

            {/* Client Portal / Auth Button */}
            {openPortalModal && (
              <button
                id="nav-client-portal-btn"
                onClick={openPortalModal}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 text-xs font-semibold transition-colors shadow-2xs"
                title={user ? `Signed in as ${user.displayName || user.email}` : 'Client Portal (Google Sign-In)'}
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-4 h-4 rounded-full border border-indigo-200"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <User className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span>{user ? 'My Systems' : 'Portal'}</span>
              </button>
            )}

            {/* Reduced Motion Toggle */}
            <button
              id="reduced-motion-toggle-btn"
              onClick={toggleReducedMotion}
              className="p-2 rounded-xl bg-white border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:border-slate-300 transition-colors text-xs shadow-2xs"
              title={reducedMotion ? 'Enable Animations' : 'Reduce Motion (Accessibility)'}
              aria-label="Toggle motion preferences"
            >
              {reducedMotion ? <EyeOff className="w-3.5 h-3.5 text-amber-500" /> : <Eye className="w-3.5 h-3.5" />}
            </button>

            {/* Telemetry Inspector Button */}
            <button
              id="telemetry-drawer-toggle-btn"
              onClick={toggleTelemetry}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-[#475569] hover:text-[#4F46E5] hover:border-indigo-300 transition-colors text-xs font-mono shadow-2xs"
              title="View Live Event Telemetry"
              aria-label="Open live telemetry viewer"
            >
              <Activity className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>Telemetry</span>
            </button>

            {/* High Salience Primary Action */}
            <button
              id="nav-primary-brief-btn"
              onClick={() => {
                trackEvent('cta_click', { cta_id: 'nav_growth_audit', route: currentRoute });
                openBriefModal();
              }}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-md shadow-indigo-600/20 active:scale-95"
            >
              <span>Build My System</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {openVoiceModal && (
              <button
                onClick={openVoiceModal}
                className="p-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-2xs"
                title="Voice AI"
              >
                <Mic className="w-4 h-4" />
              </button>
            )}

            {openPortalModal && (
              <button
                onClick={openPortalModal}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs"
                title="Portal"
              >
                <User className="w-4 h-4" />
              </button>
            )}

            <button
              id="mobile-brief-quick-btn"
              onClick={() => openBriefModal()}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-xs"
            >
              Audit
            </button>

            <button
              id="mobile-menu-trigger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-[#0F172A] shadow-2xs"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-4 pb-6 shadow-xl overflow-hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    currentRoute === link.route
                      ? 'bg-indigo-50 text-[#4F46E5] border border-indigo-200'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </button>
              ))}

              <div className="pt-3 pb-1 border-t border-slate-100 my-2">
                <span className="text-[11px] font-mono uppercase text-[#64748B] tracking-wider px-4 font-semibold">
                  Flagship Systems
                </span>
                <div className="grid grid-cols-1 gap-1 mt-2">
                  {subServices.map((sub) => (
                    <button
                      key={sub.route}
                      onClick={() => handleNavClick(sub.route)}
                      className="w-full text-left px-4 py-2 text-sm text-[#475569] hover:text-[#4F46E5] rounded-lg hover:bg-indigo-50/50 transition-colors"
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBriefModal();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/25"
                >
                  <span>Get a Growth Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => openWhatsApp('general', 'Mobile Menu')}
                    className="py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={toggleTelemetry}
                    className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-[#475569] text-xs font-mono flex items-center justify-center gap-1.5"
                  >
                    <Activity className="w-4 h-4 text-[#4F46E5]" />
                    <span>Telemetry</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
