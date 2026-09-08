import React from 'react';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, UserCheck, MessageSquare } from 'lucide-react';
import { processSteps } from '../data/processData';
import { AppRoute } from '../types';
import { openWhatsApp } from '../lib/whatsapp';
import { trackEvent } from '../lib/analytics';

interface ProcessViewProps {
  navigate: (route: AppRoute) => void;
  openBriefModal: () => void;
}

export const ProcessView: React.FC<ProcessViewProps> = ({ navigate, openBriefModal }) => {
  return (
    <div id="process-view" className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
            ENGINEERING PROCESS & SLAS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight">
            How we build: 6 disciplined sprint phases.
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            No endless committee meetings, no junior account managers, and no bloated scopes. You work directly with a senior systems engineer through a streamlined, milestone-driven delivery process.
          </p>
        </div>

        {/* 6 Steps List */}
        <div className="space-y-8 mb-20">
          {processSteps.map((step) => (
            <div
              key={step.step}
              id={`process-phase-${step.step}`}
              className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 hover:border-slate-300 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-200 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono text-[#4F46E5] font-bold">
                      PHASE {step.step}
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">
                      DURATION: <strong className="text-[#0F172A]">{step.duration}</strong>
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#0F172A]">
                    {step.name}
                  </h2>
                  <p className="text-sm font-semibold text-emerald-700 mt-1">
                    {step.headline}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-[#475569] max-w-sm">
                  <div className="text-[#4F46E5] font-semibold mb-1 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>CLIENT COMMITMENT</span>
                  </div>
                  {step.clientCommitment}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                    Phase Focus & Methodology
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="lg:col-span-5 space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#4F46E5] font-semibold">
                    Key Deliverables Handed Over
                  </h3>
                  <div className="space-y-2">
                    {step.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-[#0F172A]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Action Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl text-white">
          <div className="space-y-1">
            <h3 className="font-display text-2xl font-bold text-white">
              Ready to kick off Phase 01 Discovery?
            </h3>
            <p className="text-sm text-indigo-200">
              We evaluate your existing stack and map your bottlenecks in a single 60-minute strategy session.
            </p>
          </div>
          <button
            onClick={openBriefModal}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-emerald-500/25"
          >
            Start Project Brief
          </button>
        </div>
      </div>
    </div>
  );
};
