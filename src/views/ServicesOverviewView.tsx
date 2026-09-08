import React from 'react';
import { ArrowRight, Layers, Cpu, Bot, Sparkles, Check, Clock, ShieldCheck } from 'lucide-react';
import { serviceSystems } from '../data/servicesData';
import { AppRoute } from '../types';
import { trackEvent } from '../lib/analytics';
import { openWhatsApp } from '../lib/whatsapp';

interface ServicesOverviewViewProps {
  navigate: (route: AppRoute) => void;
  openBriefModal: () => void;
}

export const ServicesOverviewView: React.FC<ServicesOverviewViewProps> = ({
  navigate,
  openBriefModal,
}) => {
  const iconMap: Record<string, React.ElementType> = {
    'web-experiences': Layers,
    'ai-automation': Cpu,
    'ai-agents': Bot,
    'creative': Sparkles,
  };

  const handleSystemClick = (route: AppRoute, name: string) => {
    trackEvent('service_open', { service_name: name, route });
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="services-overview-view" className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
            OFFER MATRIX & ARCHITECTURE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight">
            Digital systems engineered for business outcomes.
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            We don't provide hourly body-shopping or cosmetic mockups. We deliver end-to-end digital infrastructure that turns manual chaos into predictable, scalable revenue.
          </p>
        </div>

        {/* 4 In-Depth System Cards */}
        <div className="space-y-12 mb-20">
          {serviceSystems.map((system, idx) => {
            const Icon = iconMap[system.slug] || Layers;

            return (
              <div
                key={system.slug}
                id={`overview-system-${system.slug}`}
                className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 lg:p-12 hover:border-slate-300 hover:shadow-xl transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Overview & Outcome */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-[#4F46E5]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono tracking-wider uppercase text-[#64748B] font-semibold">
                        {system.categoryTag}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
                      {system.name}
                    </h2>

                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                      {system.subhead}
                    </p>

                    {/* Guaranteed Outcome Box */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold block mb-1">
                        GUARANTEED OUTCOME:
                      </span>
                      <p className="text-sm font-semibold text-[#0F172A]">
                        {system.outcome}
                      </p>
                    </div>

                    {/* Typical Timeline */}
                    <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>Standard Deployment Sprint: <strong className="text-[#0F172A]">{system.timeline}</strong></span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => handleSystemClick(system.route, system.name)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-indigo-500/20"
                      >
                        <span>Inspect Full Technical Spec</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => openWhatsApp(system.slug as any, system.name)}
                        className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[#0F172A] hover:bg-slate-50 text-xs font-semibold transition-colors"
                      >
                        Quick WhatsApp Inquiry
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Symptoms Fixed & Deliverables */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-rose-600 font-semibold block">
                        Symptoms This System Eliminates:
                      </span>
                      <div className="space-y-2">
                        {system.fixes.map((fix, fIdx) => (
                          <div key={fIdx} className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-900 flex items-start gap-2.5">
                            <span className="text-rose-600 font-bold shrink-0">✕</span>
                            <span>{fix}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#4F46E5] font-semibold block">
                        Engineered Modules Delivered:
                      </span>
                      <div className="space-y-2">
                        {system.deliverables.slice(0, 4).map((deliv, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#0F172A]">
                            <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 text-emerald-600" />
                            </div>
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Integrated Tool Tags */}
                    <div className="pt-2">
                      <span className="text-[10px] font-mono uppercase text-[#64748B] font-semibold block mb-2">
                        Stack & Integration Endpoints:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {system.integrations.map((tool) => (
                          <span key={tool} className="px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-mono text-[#475569] font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl font-bold text-white">
              Need a multi-system hybrid architecture?
            </h3>
            <p className="text-sm text-indigo-200">
              Most growing businesses combine a Custom Web Experience with AI Automation & WhatsApp agents. We engineer cross-system data pipelines seamlessly.
            </p>
          </div>
          <button
            onClick={openBriefModal}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 shrink-0"
          >
            Start Custom System Brief
          </button>
        </div>
      </div>
    </div>
  );
};
