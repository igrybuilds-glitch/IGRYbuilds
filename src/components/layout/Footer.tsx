import React from 'react';
import { Terminal, ArrowUpRight, MessageSquare, ShieldCheck, Cpu } from 'lucide-react';
import { AppRoute } from '../../types';
import { openWhatsApp } from '../../lib/whatsapp';
import { trackEvent } from '../../lib/analytics';
import { siteConfig } from '../../config/site';

interface FooterProps {
  navigate: (route: AppRoute) => void;
  openBriefModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate, openBriefModal }) => {
  const currentYear = siteConfig.copyrightYear;

  const handleRoute = (route: AppRoute) => {
    trackEvent('cta_click', { destination: route, source: 'footer' });
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="global-footer" className="bg-white border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Brand Statement & Primary Direct Bridge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-[#4F46E5]" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-[#0F172A]">
                IGRY<span className="text-[#4F46E5]">builds</span>
              </span>
            </div>

            <p className="text-base text-[#475569] max-w-md leading-relaxed">
              {siteConfig.siteDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-mono text-emerald-800 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>SYSTEM STATUS: OPERATIONAL</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-[#475569]">
                <Cpu className="w-3 h-3 text-[#4F46E5]" />
                <span>BENCHMARK: SUB-SECOND RENDERING</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between items-start lg:items-end space-y-6">
            <div className="space-y-3 text-left lg:text-right">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
                Ready to engineer your growth?
              </span>
              <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
                Let's discuss your system architecture.
              </h4>
              <p className="text-sm text-[#475569]">
                Submit your project brief for a direct 30-minute system diagnosis with our lead engineer.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                id="footer-brief-btn"
                onClick={openBriefModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/25 active:scale-95"
              >
                <span>Start Project Brief</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                id="footer-whatsapp-btn"
                onClick={() => openWhatsApp('general', { customNote: 'Footer Callout' })}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 border border-emerald-200/90 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Message on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Middle Tier: Sitemap Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-slate-200 text-sm">
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-[#0F172A] font-bold mb-4">
              Core Systems
            </h5>
            <ul className="space-y-2.5 text-[#475569]">
              <li>
                <button
                  onClick={() => handleRoute('/services/web-experiences')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  Custom Web Experiences
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRoute('/services/ai-automation')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  AI & Workflow Automation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRoute('/services/ai-agents')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  Conversational AI Agents
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRoute('/services/creative')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  AI UGC & Creative Pipelines
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-[#0F172A] font-bold mb-4">
              Architecture Prototypes
            </h5>
            <ul className="space-y-2.5 text-[#475569]">
              <li>
                <button
                  onClick={() => handleRoute('/work/apex-solar')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  Apex Solar: 45s WhatsApp Lead Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRoute('/work/nexus-logistics')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  Nexus: 24/7 AI Voice Dispatcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRoute('/work/lumina-health')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  Lumina: Clinical Deposit Triage
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRoute('/work/verve-commerce')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  Verve: 40 Ads/Wk Creative Pipeline
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-[#0F172A] font-bold mb-4">
              Methodology
            </h5>
            <ul className="space-y-2.5 text-[#475569]">
              <li>
                <button
                  onClick={() => handleRoute('/process')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  The 4-Week Sprint Protocol
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRoute('/about')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  Engineering Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRoute('/contact')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  Smart Project Brief
                </button>
              </li>
              <li>
                <button
                  onClick={() => openWhatsApp('general', { customNote: 'Direct Inquiry' })}
                  className="hover:text-[#4F46E5] transition-colors text-left flex items-center gap-1.5"
                >
                  <span>WhatsApp Channel</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-[#0F172A] font-bold mb-4">
              Governance & Standards
            </h5>
            <ul className="space-y-2.5 text-[#475569]">
              <li>
                <button
                  onClick={() => handleRoute('/privacy')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  Privacy & Data Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleRoute('/terms')}
                  className="hover:text-[#4F46E5] transition-colors text-left"
                >
                  Terms & 100% IP Ownership
                </button>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-1.5 text-xs text-[#475569]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Zero Vendor Lock-in Guarantee</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Legal & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {currentYear} {siteConfig.siteName}. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Deterministic Engineering</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>WCAG 2.2 AA Accessible</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>Sub-Second Performance</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
