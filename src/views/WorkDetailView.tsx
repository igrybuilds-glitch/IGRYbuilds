import React from 'react';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Cpu, ArrowLeft, ArrowUpRight, MessageSquare, AlertTriangle, Layers, Zap, Database } from 'lucide-react';
import { CaseStudy, AppRoute } from '../types';
import { openWhatsApp } from '../lib/whatsapp';
import { trackEvent } from '../lib/analytics';
import { DemoBadge } from '../components/visuals/DemoBadge';

interface WorkDetailViewProps {
  study: CaseStudy;
  navigate: (route: AppRoute) => void;
  openBriefModal: () => void;
}

export const WorkDetailView: React.FC<WorkDetailViewProps> = ({
  study,
  navigate,
  openBriefModal,
}) => {
  return (
    <div id={`work-detail-${study.slug}`} className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={() => {
              navigate('/work');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#64748B] hover:text-[#4F46E5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Studies</span>
          </button>

          <div className="flex items-center gap-2">
            {study.type === 'concept' && (
              <DemoBadge type="concept" text="CONCEPT ARCHITECTURE" />
            )}
            {study.type === 'demo' && (
              <DemoBadge type="demo" text="INTERACTIVE DEMO" />
            )}
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] font-semibold">
              {study.category}
            </span>
          </div>
        </div>

        {/* Hero Meta */}
        <div className="space-y-4 mb-12">
          {study.industry && (
            <div className="text-xs font-mono text-[#64748B] uppercase tracking-wider font-semibold">
              {study.industry} • {study.client}
            </div>
          )}
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            {study.title}
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-[#4F46E5]">
            {study.tagline}
          </p>
          <p className="text-base text-[#475569] leading-relaxed max-w-3xl">
            {study.summary}
          </p>

          {study.conceptDisclaimer && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 leading-relaxed font-mono">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>System Concept Note:</strong> {study.conceptDisclaimer}
              </span>
            </div>
          )}
        </div>

        {/* Primary Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-white border border-slate-200 mb-16 shadow-sm">
          {study.metrics.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F172A]">
                {metric.value}
              </div>
              <div className="text-xs font-mono text-[#4F46E5] font-semibold">
                {metric.label}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold">
                {metric.change}
              </div>
            </div>
          ))}
        </div>

        {/* Problem vs Solution Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-50 border border-rose-200 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-700 font-bold block">
              THE OPERATIONAL BOTTLENECK
            </span>
            <h3 className="font-display text-xl font-bold text-rose-950">
              Where time and pipeline were leaking
            </h3>
            <p className="text-sm text-rose-900 leading-relaxed mb-4">
              {study.problem}
            </p>

            {study.oldWorkflowSteps && study.oldWorkflowSteps.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-rose-200/80">
                <span className="text-[11px] font-mono text-rose-800 font-bold uppercase block">
                  Legacy Manual Workflow:
                </span>
                {study.oldWorkflowSteps.map((step, sIdx) => (
                  <div key={sIdx} className="text-xs text-rose-800 flex items-start gap-2">
                    <span className="text-rose-500 font-mono font-bold shrink-0">✕</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold block">
              THE IGRYbuilds ARCHITECTURE
            </span>
            <h3 className="font-display text-xl font-bold text-emerald-950">
              Engineered autonomous pipeline
            </h3>
            <p className="text-sm text-emerald-900 leading-relaxed mb-4">
              {study.solution}
            </p>

            {study.newArchitectureSteps && study.newArchitectureSteps.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-emerald-200/80">
                <span className="text-[11px] font-mono text-emerald-800 font-bold uppercase block">
                  Engineered System Pipeline:
                </span>
                {study.newArchitectureSteps.map((step, sIdx) => (
                  <div key={sIdx} className="text-xs text-emerald-800 flex items-start gap-2">
                    <span className="text-emerald-600 font-mono font-bold shrink-0">✓</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Customer Journey Progression (if present) */}
        {study.customerJourneyStages && study.customerJourneyStages.length > 0 && (
          <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 mb-16 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#4F46E5] font-semibold">
                END-TO-END CUSTOMER JOURNEY
              </span>
              <h3 className="font-display text-2xl font-bold text-[#0F172A]">
                How the prospect transitions across stages
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {study.customerJourneyStages.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#4F46E5] uppercase">
                      STAGE 0{idx + 1}: {stage.stage}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        stage.automated
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {stage.automated ? 'AUTONOMOUS' : 'TOUCHPOINT'}
                    </span>
                  </div>
                  <p className="text-xs text-[#0F172A] leading-relaxed">
                    {stage.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scalability Progression (if present) */}
        {study.scaleLevels && study.scaleLevels.length > 0 && (
          <div className="rounded-3xl bg-slate-900 text-slate-100 p-6 sm:p-10 mb-16 shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                SCALABILITY ROADMAP
              </span>
              <h3 className="font-display text-2xl font-bold text-white">
                How this system expands as the business grows
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {study.scaleLevels.map((lvl, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2"
                >
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                    {lvl.level}
                  </span>
                  <div className="text-sm font-bold text-white">
                    {lvl.name}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lvl.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pipeline Execution Flow Diagram */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 mb-16 space-y-8 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#4F46E5] font-semibold">
              SYSTEM ARCHITECTURE DATAFLOW
            </span>
            <h3 className="font-display text-2xl font-bold text-[#0F172A]">
              How data and events flow autonomously
            </h3>
          </div>

          <div className="space-y-3">
            {study.systemDiagramSteps.map((stepDesc, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4 hover:border-indigo-300 transition-colors"
              >
                <div className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0 text-xs font-mono text-[#4F46E5] font-bold">
                  0{idx + 1}
                </div>
                <div className="text-sm text-[#0F172A] pt-0.5 leading-relaxed">
                  {stepDesc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Stack Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#64748B] font-semibold">
              Key System Deliverables
            </h4>
            <div className="space-y-2.5">
              {study.deliverables.map((deliv, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F172A]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#64748B] font-semibold">
              Production Tech Stack & Integrations
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {study.stack.map((tool) => (
                <span key={tool} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-[#4F46E5] font-semibold">
                  {tool}
                </span>
              ))}
            </div>
            {study.integrations && study.integrations.length > 0 && (
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <span className="text-[11px] font-mono uppercase text-[#64748B] font-semibold block">
                  Integrated Endpoints:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {study.integrations.map((item, iIdx) => (
                    <span key={iIdx} className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-800">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="pt-3 border-t border-slate-200 text-xs font-mono text-[#64748B]">
              <span>Delivery Timeline: <strong className="text-[#0F172A]">{study.timeline}</strong></span>
            </div>
          </div>
        </div>

        {/* Closing Action Card (Section 42 Dual CTAs) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl text-white">
          <div className="space-y-1">
            <h3 className="font-display text-2xl font-bold text-white">
              Build a system like this for my business.
            </h3>
            <p className="text-sm text-indigo-200">
              Submit your project parameters to receive a tailored architecture diagram and quote.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => {
                trackEvent('cta_click', { cta_id: `brief_from_study_${study.slug}` });
                openBriefModal();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25"
            >
              Build My System
            </button>

            <button
              onClick={() => openWhatsApp('case_study', { caseStudyTitle: study.title, caseStudySlug: study.slug })}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Talk Through Problem First</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
