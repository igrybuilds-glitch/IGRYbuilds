import React from 'react';
import { ArrowRight, Check, Clock, Layers, Cpu, Bot, Sparkles, Zap } from 'lucide-react';
import { serviceSystems } from '../../data/servicesData';
import { AppRoute } from '../../types';
import { trackEvent } from '../../lib/analytics';
import { RevealOnScroll } from '../ui/RevealOnScroll';

interface ServicesSectionProps {
  navigate: (route: AppRoute) => void;
  openBriefModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
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
    <section id="services-flagship-section" className="py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll direction="up" distance={24} className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
                CORE SERVICE SYSTEMS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                Four digital systems. <br />
                Zero unnecessary complexity.
              </h2>
              <p className="text-base text-[#475569]">
                We do not sell random design hours or disconnected tools. We deliver turnkey digital systems with clear business outcomes, defined delivery sprints, and guaranteed performance.
              </p>
            </div>

            <button
              id="services-overview-cta-btn"
              onClick={() => {
                trackEvent('cta_click', { destination: '/services', source: 'services_section_header' });
                navigate('/services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-sm font-semibold text-[#0F172A] hover:text-[#4F46E5] transition-colors self-start md:self-auto shadow-xs"
            >
              <span>Compare All Architectures</span>
              <ArrowRight className="w-4 h-4 text-[#4F46E5]" />
            </button>
          </div>
        </RevealOnScroll>

        {/* 4 Flagship Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {serviceSystems.map((system, idx) => {
            const Icon = iconMap[system.slug] || Zap;

            return (
              <RevealOnScroll
                key={system.slug}
                delay={idx * 100}
                direction="up"
                distance={24}
                className="h-full"
              >
                <div
                  id={`system-card-${system.slug}`}
                  className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-300 hover:shadow-lg transition-all group relative overflow-hidden shadow-xs h-full"
                >
                <div>
                  {/* Category Pill & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200/80 group-hover:border-indigo-300 transition-colors">
                        <Icon className="w-6 h-6 text-[#4F46E5]" />
                      </div>
                      <span className="text-[11px] font-mono tracking-wider text-[#64748B] uppercase font-semibold">
                        {system.categoryTag}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-[#475569]">
                      <Clock className="w-3.5 h-3.5 text-[#4F46E5]" />
                      <span>{system.timeline.split(' ')[0]} {system.timeline.split(' ')[1]} {system.timeline.split(' ')[2]}</span>
                    </div>
                  </div>

                  {/* Headline & Subhead */}
                  <h3 className="font-display text-2xl font-bold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors mb-3">
                    {system.name}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed mb-6">
                    {system.subhead}
                  </p>

                  {/* Primary Business Outcome Box */}
                  <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/70 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#4F46E5] font-bold block mb-1">
                      GUARANTEED OUTCOME
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                      {system.outcome}
                    </p>
                  </div>

                  {/* Key Deliverables Bullet Points */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block font-semibold">
                      Core System Deliverables
                    </span>
                    {system.deliverables.slice(0, 4).map((deliv, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#475569]">
                        <div className="w-4 h-4 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#4F46E5]" />
                        </div>
                        <span className="leading-snug">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions: Tech Tags & Buttons */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {system.integrations.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-mono text-[#475569]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id={`system-details-btn-${system.slug}`}
                      onClick={() => handleSystemClick(system.route, system.name)}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-xs font-semibold text-[#0F172A] hover:text-[#4F46E5] transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Explore Spec</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#4F46E5]" />
                    </button>
                    <button
                      id={`system-brief-btn-${system.slug}`}
                      onClick={openBriefModal}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      Build
                    </button>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          );
        })}
        </div>
      </div>
    </section>
  );
};
