import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { XCircle, CheckCircle2, ArrowRight, Clock, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';
import { RevealOnScroll } from '../ui/RevealOnScroll';

interface BeforeAfterComparisonProps {
  reducedMotion?: boolean;
  openBriefModal: () => void;
}

export const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({
  openBriefModal,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'lead_speed' | 'manual_labor' | 'qualification' | 'scalability'>('all');

  const comparisons = [
    {
      id: 'lead_speed',
      title: 'Inbound Lead Speed',
      category: 'Conversion Velocity',
      before: {
        headline: '4 to 24-Hour Wait Times',
        detail: 'Inquiries sit in an unread inbox or spreadsheet while sales reps are in meetings. Up to 40% of leads buy from the first competitor who calls them back.',
        stat: '4.2h average response',
        statLabel: 'High lead churn'
      },
      after: {
        headline: 'Sub-45s Autonomous Response',
        detail: 'Inbound submissions trigger instant personalized WhatsApp conversations or natural-voice AI calls that qualify and book the prospect immediately.',
        stat: '38s median response',
        statLabel: '+310% contact rate'
      }
    },
    {
      id: 'manual_labor',
      title: 'Administrative Repetition',
      category: 'Human Overhead',
      before: {
        headline: 'Manual Data Entry & Copy-Pasting',
        detail: 'Staff spends 15+ hours weekly copying names between forms, email, spreadsheets, CRM, and calendar apps—introducing human errors and lag.',
        stat: '18h/week lost per rep',
        statLabel: 'High payroll waste'
      },
      after: {
        headline: 'Direct Event-Driven Pipelines',
        detail: 'Automated webhooks push enriched prospect data cleanly into your CRM, fire notifications into Slack, and sync calendar invites without human touch.',
        stat: '0 manual steps',
        statLabel: '100% human-error free'
      }
    },
    {
      id: 'qualification',
      title: 'Lead Qualification & Booking',
      category: 'Sales Pipeline',
      before: {
        headline: 'Tire-Kickers Clogging Sales Calendars',
        detail: 'Sales reps spend 30-minute discovery calls explaining basic pricing only to discover the lead has zero budget or lacks decision-making authority.',
        stat: '35% qualified show-up',
        statLabel: 'Wasted sales hours'
      },
      after: {
        headline: 'Algorithmic Multi-Gate Qualification',
        detail: 'Self-serve interactive diagnostic calculators and conversational WhatsApp bots filter tire-kickers and only allow high-intent buyers onto the calendar.',
        stat: '88% qualified show-up',
        statLabel: 'High close rate'
      }
    },
    {
      id: 'scalability',
      title: 'Infrastructure & Scalability',
      category: 'System Resilience',
      before: {
        headline: 'Template Bloat & Brittleness',
        detail: 'Heavy WordPress themes, 40 third-party plugins, constant vulnerability security alerts, and pages that crawl on mobile devices.',
        stat: '4.8s mobile load',
        statLabel: 'High bounce rate'
      },
      after: {
        headline: 'Clean Custom Code Architecture',
        detail: 'Bespoke Next.js/React frontend with sub-second page loads, zero plugin licensing debt, and 100% full intellectual property ownership.',
        stat: '0.6s sub-second LCP',
        statLabel: '99.99% uptime SLA'
      }
    }
  ];

  const filtered = activeTab === 'all' 
    ? comparisons 
    : comparisons.filter(c => c.id === activeTab);

  return (
    <section id="before-after-section" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll direction="up" distance={24} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
                BEFORE VS AFTER
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                The cost of manual friction vs <br className="hidden sm:inline" />
                an engineered system.
              </h2>
              <p className="text-base text-[#475569]">
                Most businesses do not have a lead generation problem—they have a latency and operational leakage problem. Here is how IGRYbuilds replaces friction with automated throughput.
              </p>
            </div>

            {/* Tab Filter */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Dimensions' },
                { id: 'lead_speed', label: 'Lead Velocity' },
                { id: 'manual_labor', label: 'Admin Work' },
                { id: 'qualification', label: 'Lead Quality' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    trackEvent('cta_click', { cta_id: `filter_${tab.id}`, route: '/' });
                    setActiveTab(tab.id as any);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 text-[#475569] hover:text-[#0F172A] border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item, idx) => (
            <RevealOnScroll
              key={item.id}
              delay={idx * 100}
              direction="up"
              distance={20}
              className="h-full"
            >
              <div 
                className="rounded-3xl bg-[#F8FAFC] border border-slate-200/90 p-6 lg:p-8 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all h-full"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                    <h3 className="font-display font-bold text-xl text-[#0F172A]">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono text-[#64748B] px-2.5 py-1 rounded bg-white border border-slate-200 font-semibold">
                      {item.category}
                    </span>
                  </div>

                  <div className="space-y-6">
                    {/* Before State */}
                    <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase text-rose-700 font-bold">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Manual Status Quo</span>
                        </div>
                        <span className="text-xs font-mono text-rose-700 font-bold">
                          {item.before.stat}
                        </span>
                      </div>
                      <div className="text-base font-bold text-rose-950">
                        {item.before.headline}
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        {item.before.detail}
                      </p>
                    </div>

                    {/* After State */}
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none"></div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-700 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>IGRYbuilds Engineered System</span>
                        </div>
                        <span className="text-xs font-mono text-emerald-800 font-bold">
                          {item.after.stat}
                        </span>
                      </div>
                      <div className="text-base font-bold text-[#0F172A]">
                        {item.after.headline}
                      </div>
                      <p className="text-xs text-[#475569] leading-relaxed">
                        {item.after.detail}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#64748B]">
                    Outcome: <strong className="text-emerald-700 font-bold">{item.after.statLabel}</strong>
                  </span>
                  <button
                    onClick={openBriefModal}
                    className="text-xs font-bold text-[#4F46E5] hover:text-indigo-700 flex items-center gap-1 group"
                  >
                    <span>Build This System</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
