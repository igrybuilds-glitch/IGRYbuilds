import React from 'react';
import { ArrowRight, ShieldCheck, Terminal, MessageSquare, Zap, Cpu, Sparkles } from 'lucide-react';
import { AppRoute } from '../types';
import { HeroSystemGraph } from '../components/hero/HeroSystemGraph';
import { BeforeAfterComparison } from '../components/sections/BeforeAfterComparison';
import { ServicesSection } from '../components/sections/ServicesSection';
import { WorkShowcase } from '../components/sections/WorkShowcase';
import { DiagnosticCalculator } from '../components/sections/DiagnosticCalculator';
import { ProcessSection } from '../components/sections/ProcessSection';
import { FAQSection } from '../components/sections/FAQSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { trackEvent } from '../lib/analytics';
import { openWhatsApp } from '../lib/whatsapp';

interface HomeViewProps {
  navigate: (route: AppRoute) => void;
  openBriefModal: () => void;
  reducedMotion: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  navigate,
  openBriefModal,
  reducedMotion,
}) => {
  return (
    <div id="home-view" className="w-full">
      {/* Hero Section */}
      <section id="hero-section" className="pt-32 sm:pt-40 pb-20 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] border-b border-slate-200 relative overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Eyebrow Pill */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200/80 shadow-xs text-[11px] font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
              <Terminal className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>DIGITAL SYSTEMS & AI ARCHITECTURE STUDIO</span>
            </span>
          </div>

          {/* Main Display Headline */}
          <div className="max-w-4xl space-y-6">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0F172A] tracking-tight leading-[1.08]">
              We build digital systems that capture demand and eliminate manual work.
            </h1>

            <p className="text-lg sm:text-xl text-[#475569] max-w-2xl leading-relaxed">
              High-performance custom web applications, autonomous AI agents, and sub-60s automation pipelines engineered to turn cold inquiries into booked customers with zero operational friction.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                id="hero-primary-cta"
                onClick={() => {
                  trackEvent('cta_click', { cta_id: 'hero_build_my_system', route: '/' });
                  openBriefModal();
                }}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Build My Growth System</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                id="hero-secondary-work-cta"
                onClick={() => {
                  trackEvent('cta_click', { cta_id: 'hero_explore_work', route: '/' });
                  navigate('/work');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-[#0F172A] hover:text-[#4F46E5] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>See Case Studies</span>
              </button>

              <button
                id="hero-whatsapp-cta"
                onClick={() => openWhatsApp('general', 'Hero Section Direct')}
                className="px-5 py-4 rounded-xl bg-emerald-50 border border-emerald-200/90 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Quick WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Signature Interactive System Graph */}
          <HeroSystemGraph reducedMotion={reducedMotion} />

          {/* Trust Bar / Engineering Standards */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[#64748B]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Code & IP Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#4F46E5] shrink-0" />
              <span>Sub-60s Automated Latency</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Sub-Second Page LCP</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B5CF6] shrink-0" />
              <span>Zero Template Bloat</span>
            </div>
          </div>
        </div>
      </section>

      {/* Before vs After Comparison */}
      <BeforeAfterComparison reducedMotion={reducedMotion} openBriefModal={openBriefModal} />

      {/* 4 Flagship Service Systems */}
      <ServicesSection navigate={navigate} openBriefModal={openBriefModal} />

      {/* Selected Work Showcase */}
      <WorkShowcase navigate={navigate} openBriefModal={openBriefModal} />

      {/* Interactive System Diagnostic ROI Calculator */}
      <DiagnosticCalculator openBriefModal={openBriefModal} />

      {/* 6-Phase Engineering Delivery Process */}
      <ProcessSection openBriefModal={openBriefModal} />

      {/* FAQ Objections Section */}
      <FAQSection />

      {/* Final Conversion CTA Section */}
      <FinalCTASection openBriefModal={openBriefModal} />
    </div>
  );
};
