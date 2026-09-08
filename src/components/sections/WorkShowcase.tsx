import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Clock, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { caseStudies } from '../../data/workData';
import { AppRoute, CaseStudy } from '../../types';
import { trackEvent } from '../../lib/analytics';
import { RevealOnScroll } from '../ui/RevealOnScroll';

interface WorkShowcaseProps {
  navigate: (route: AppRoute) => void;
  openBriefModal: () => void;
}

export const WorkShowcase: React.FC<WorkShowcaseProps> = ({
  navigate,
  openBriefModal,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Experiences' },
    { id: 'automation', label: 'Automation & WhatsApp' },
    { id: 'agents', label: 'AI Voice Agents' },
    { id: 'creative', label: 'Creative Engine' },
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
    <section id="work-showcase-section" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Filter Tabs */}
        <RevealOnScroll direction="up" distance={24} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
                VERIFIED CASE STUDIES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                Real systems shipped. <br />
                Measured in seconds and pipeline value.
              </h2>
              <p className="text-base text-[#475569]">
                Every case study represents an operational architecture deployed into production. We test against real user loads, real phone calls, and real commercial sales funnels.
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    trackEvent('cta_click', { cta_id: `filter_work_${cat.id}`, route: '/work' });
                    setFilter(cat.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                    filter === cat.id
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-[#475569] hover:text-[#0F172A] border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study, idx) => (
            <RevealOnScroll
              key={study.slug}
              delay={idx * 100}
              direction="up"
              distance={24}
              className="h-full"
            >
              <div
                id={`work-card-${study.slug}`}
                className="rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-300 hover:shadow-lg transition-all group shadow-xs h-full"
              >
              <div>
                {/* Meta Row: Client & Category */}
                <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: study.accentColor }}></span>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] font-semibold">
                      {study.client}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded bg-white border border-slate-200 text-[#4F46E5] font-semibold">
                    {study.category}
                  </span>
                </div>

                {/* Case Study Title & Tagline */}
                <h3 className="font-display text-2xl font-bold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors mb-2">
                  {study.title}
                </h3>
                <p className="text-sm font-semibold text-[#4F46E5] mb-4">
                  {study.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                  {study.summary}
                </p>

                {/* Measurable Impact Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-slate-200 mb-6 shadow-xs">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-lg font-display font-extrabold text-[#0F172A] tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-mono text-[#4F46E5] font-bold">
                        {metric.label}
                      </div>
                      <div className="text-[10px] text-[#64748B] leading-none">
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Problem vs Solution Summary */}
                <div className="space-y-3 mb-6 text-xs text-[#475569]">
                  <div>
                    <strong className="text-[#0F172A] uppercase font-mono tracking-wider block mb-1">
                      The Operational Problem:
                    </strong>
                    <p className="line-clamp-2">{study.problem}</p>
                  </div>
                  <div>
                    <strong className="text-[#4F46E5] uppercase font-mono tracking-wider block mb-1">
                      The IGRYbuilds System:
                    </strong>
                    <p className="line-clamp-2">{study.solution}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Stack Tags & Action Button */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {study.stack.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-[#475569]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <button
                  id={`view-case-study-${study.slug}`}
                  onClick={() => handleStudyClick(study)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#4F46E5] hover:text-indigo-700 transition-colors self-end sm:self-auto group-hover:translate-x-0.5"
                >
                  <span>Inspect System Blueprint</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Bottom Callout */}
      <RevealOnScroll direction="up" distance={20} className="mt-16">
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="font-display text-xl font-bold text-[#0F172A]">
              Have a similar operational bottleneck in your business?
            </h4>
            <p className="text-xs sm:text-sm text-[#475569]">
              We can map out an identical automated pipeline tailored to your CRM, calendar, and lead volume.
            </p>
          </div>
          <button
            onClick={openBriefModal}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-500/25 shrink-0"
          >
            Request System Blueprint
          </button>
        </div>
      </RevealOnScroll>
    </div>
  </section>
  );
};
