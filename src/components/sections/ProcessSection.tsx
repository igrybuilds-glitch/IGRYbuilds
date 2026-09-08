import React, { useState } from 'react';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { processSteps } from '../../data/processData';
import { trackEvent } from '../../lib/analytics';
import { RevealOnScroll } from '../ui/RevealOnScroll';

interface ProcessSectionProps {
  openBriefModal: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ openBriefModal }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = processSteps[activeStepIndex];

  return (
    <section id="process-timeline-section" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll direction="up" distance={24} className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
                ENGINEERING METHODOLOGY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                A disciplined 6-phase sprint. <br />
                From blueprint to production in weeks.
              </h2>
              <p className="text-base text-[#475569]">
                We eliminate agency bureaucracy. You communicate directly with senior systems engineers via a dedicated private channel with guaranteed sprint milestones.
              </p>
            </div>

            <button
              onClick={openBriefModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-sm font-semibold text-[#0F172A] hover:text-[#4F46E5] transition-colors self-start md:self-auto shadow-xs"
            >
              <span>Book Architecture Audit</span>
              <ArrowRight className="w-4 h-4 text-[#4F46E5]" />
            </button>
          </div>
        </RevealOnScroll>

        {/* Phase Selector Tabs */}
        <RevealOnScroll direction="up" distance={20} delay={100} className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {processSteps.map((step, idx) => {
              const isSelected = idx === activeStepIndex;
              return (
                <button
                  key={step.step}
                  id={`process-tab-${step.step}`}
                  onClick={() => {
                    trackEvent('cta_click', { cta_id: `process_step_${step.step}`, step: step.name });
                    setActiveStepIndex(idx);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-indigo-50/70 border-2 border-[#4F46E5] shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:border-indigo-200 hover:bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#4F46E5]"></div>
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-[#64748B] font-semibold">
                      PHASE {step.step}
                    </span>
                    <span className="text-[9px] font-mono text-[#4F46E5] font-semibold px-1 py-0.5 rounded bg-indigo-50">
                      {step.duration}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#0F172A] truncate">
                    {step.name}
                  </div>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Active Phase Deep Dive Card */}
        <RevealOnScroll direction="up" distance={24} delay={150}>
          <div className="rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-900/5 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-mono text-[#4F46E5] font-semibold">
                    PHASE {activeStep.step} • {activeStep.duration}
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">
                    {activeStep.name}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] leading-tight">
                  {activeStep.headline}
                </h3>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  {activeStep.description}
                </p>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#4F46E5] font-bold">
                    <UserCheck className="w-4 h-4 text-[#4F46E5]" />
                    <span>Required Client Commitment</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0F172A]">
                    {activeStep.clientCommitment}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
                <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block font-semibold">
                  Deliverables Handed Over In Phase {activeStep.step}
                </span>

                <div className="space-y-3">
                  {activeStep.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#0F172A]">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-[#4F46E5]" />
                      </div>
                      <span className="leading-snug">{deliv}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-[#64748B]">
                  <span>Code Ownership: 100% Client</span>
                  <span className="text-[#4F46E5] font-bold">Guaranteed SLA</span>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
