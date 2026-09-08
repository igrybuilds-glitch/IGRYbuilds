import React from 'react';
import { ArrowRight, CheckCircle2, XCircle, Clock, ShieldCheck, MessageSquare, Layers, Cpu, Bot, Sparkles } from 'lucide-react';
import { ServiceSystem, AppRoute } from '../types';
import { openWhatsApp } from '../lib/whatsapp';
import { trackEvent } from '../lib/analytics';

interface ServiceDetailViewProps {
  system: ServiceSystem;
  navigate: (route: AppRoute) => void;
  openBriefModal: () => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  system,
  navigate,
  openBriefModal,
}) => {
  const iconMap: Record<string, React.ElementType> = {
    'web-experiences': Layers,
    'ai-automation': Cpu,
    'ai-agents': Bot,
    'creative': Sparkles,
  };

  const Icon = iconMap[system.slug] || Layers;

  return (
    <div id={`service-detail-${system.slug}`} className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-8">
          <button 
            onClick={() => navigate('/')} 
            className="hover:text-[#4F46E5] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate('/services')} 
            className="hover:text-[#4F46E5] transition-colors"
          >
            Systems
          </button>
          <span>/</span>
          <span className="text-[#4F46E5] font-semibold">{system.name}</span>
        </div>

        {/* Hero Banner */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-[#4F46E5]">
              <Icon className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono tracking-widest uppercase text-[#4F46E5] font-semibold">
              {system.categoryTag}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
            Build a {system.name.toLowerCase()} that {system.outcome.toLowerCase()}
          </h1>

          <p className="text-lg sm:text-xl text-[#475569] max-w-3xl leading-relaxed">
            {system.subhead}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              id="service-detail-brief-cta"
              onClick={() => {
                trackEvent('cta_click', { cta_id: `brief_from_${system.slug}`, route: system.route });
                openBriefModal();
              }}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xl shadow-indigo-500/20"
            >
              <span>Build This System</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              id="service-detail-whatsapp-cta"
              onClick={() => openWhatsApp(system.slug as any, system.name)}
              className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-[#0F172A] font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Inquire via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* What It Fixes: Symptoms Block */}
        <div className="mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-semibold mb-4">
            Critical Symptoms This Architecture Solves
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {system.fixes.map((fix, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <span className="text-sm text-rose-950 font-medium leading-relaxed">{fix}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Architecture Modules */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 mb-16 space-y-8 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#4F46E5] font-semibold">
              TECHNICAL SCOPE OF WORK
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
              What we build and hand over
            </h2>
            <p className="text-sm text-[#475569]">
              Every module is custom-coded, thoroughly stress-tested, and transferred with full code ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {system.deliverables.map((deliv, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-[#0F172A] font-medium leading-relaxed">{deliv}</span>
              </div>
            ))}
          </div>

          {/* Integration Stack */}
          <div className="pt-6 border-t border-slate-200">
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold block mb-3">
              Standard Integration Ecosystem:
            </span>
            <div className="flex flex-wrap gap-2">
              {system.integrations.map((tool) => (
                <span key={tool} className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-[#4F46E5] font-semibold">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Before vs After Impact Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-700 font-bold block">
              BEFORE THIS SYSTEM
            </span>
            <p className="text-sm text-rose-900 leading-relaxed">
              {system.beforeState}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold block">
              AFTER DEPLOYING THIS SYSTEM
            </span>
            <p className="text-sm text-emerald-950 leading-relaxed">
              {system.afterState}
            </p>
          </div>
        </div>

        {/* System Specific FAQs */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 mb-16 space-y-6 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#4F46E5] font-semibold">
              SYSTEM FAQS
            </span>
            <h2 className="font-display text-2xl font-bold text-[#0F172A]">
              Specific questions about this architecture
            </h2>
          </div>

          <div className="space-y-4 pt-2">
            {system.faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-base font-bold text-[#0F172A] font-display">
                  {faq.question}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Action Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-800 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-emerald-400 font-bold">
              <Clock className="w-4 h-4" />
              <span>SPRINT DURATION: {system.timeline}</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Ready to deploy {system.name}?
            </h3>
            <p className="text-sm text-indigo-200 max-w-xl">
              Submit your project brief to receive a customized architecture diagram and sprint timeline.
            </p>
          </div>

          <button
            onClick={openBriefModal}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-emerald-500/25"
          >
            Start Project Brief
          </button>
        </div>
      </div>
    </div>
  );
};
