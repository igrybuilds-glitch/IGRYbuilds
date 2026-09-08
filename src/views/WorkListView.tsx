import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Clock, Layers, TrendingUp } from 'lucide-react';
import { caseStudies } from '../data/workData';
import { AppRoute, CaseStudy } from '../types';
import { trackEvent } from '../lib/analytics';

interface WorkListViewProps {
  navigate: (route: AppRoute) => void;
  openBriefModal: () => void;
}

export const WorkListView: React.FC<WorkListViewProps> = ({ navigate, openBriefModal }) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Deployments' },
    { id: 'web', label: 'Web Experiences' },
    { id: 'automation', label: 'Automation & WhatsApp' },
    { id: 'agents', label: 'Conversational Voice AI' },
    { id: 'creative', label: 'Creative Testing Engines' },
  ];

  const filteredStudies = caseStudies.filter((study) => {
    if (filter === 'all') return true;
    if (filter === 'web') return study.category.toLowerCase().includes('web');
    if (filter === 'automation') return study.category.toLowerCase().includes('automation') || study.slug === 'apex-solar';
    if (filter === 'agents') return study.category.toLowerCase().includes('agent') || study.slug === 'nexus-logistics';
    if (filter === 'creative') return study.category.toLowerCase().includes('creative') || study.slug === 'verve-commerce';
    return true;
  });

  const handleStudyClick = (study: CaseStudy) => {
    trackEvent('work_open', { slug: study.slug, title: study.title });
    navigate(`/work/${study.slug}` as AppRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="work-list-view" className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
              PROOF & CASE STUDIES
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight">
              Selected system architectures in production.
            </h1>
            <p className="text-base sm:text-lg text-[#475569]">
              Inspect how we connect bespoke code, AI agents, and resilient automation pipelines to transform business operations and conversion performance.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  trackEvent('cta_click', { cta_id: `filter_work_page_${cat.id}`, route: '/work' });
                  setFilter(cat.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                  filter === cat.id
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold shadow-md shadow-indigo-500/20'
                    : 'bg-white text-[#475569] hover:text-[#0F172A] border border-slate-200 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {filteredStudies.map((study) => (
            <div
              key={study.slug}
              className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 flex flex-col justify-between hover:border-slate-300 hover:shadow-xl transition-all group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                    {study.client}
                  </span>
                  <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] font-semibold">
                    {study.category}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors mb-2">
                  {study.title}
                </h2>
                <p className="text-sm font-semibold text-emerald-700 mb-4">
                  {study.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                  {study.summary}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-lg font-display font-bold text-[#0F172A]">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-mono text-[#4F46E5] font-semibold">
                        {metric.label}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold">
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6 text-xs text-[#475569]">
                  <p><strong className="text-[#0F172A]">Problem:</strong> {study.problem.substring(0, 140)}...</p>
                  <p><strong className="text-[#0F172A]">System:</strong> {study.solution.substring(0, 140)}...</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {study.stack.slice(0, 3).map((tool) => (
                    <span key={tool} className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-mono text-[#475569]">
                      {tool}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleStudyClick(study)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#4F46E5] hover:text-indigo-700 transition-colors self-end sm:self-auto"
                >
                  <span>Inspect System Architecture</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl font-bold text-white">
              Ready to engineer your custom system?
            </h3>
            <p className="text-sm text-indigo-200">
              We begin every engagement with an operational discovery and system blueprint sprint.
            </p>
          </div>
          <button
            onClick={openBriefModal}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 shrink-0"
          >
            Start Project Brief
          </button>
        </div>
      </div>
    </div>
  );
};
