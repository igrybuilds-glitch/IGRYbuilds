import React, { useState } from 'react';
import { Calculator, ArrowRight, Zap, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';
import { RevealOnScroll } from '../ui/RevealOnScroll';

interface DiagnosticCalculatorProps {
  openBriefModal: () => void;
}

export const DiagnosticCalculator: React.FC<DiagnosticCalculatorProps> = ({ openBriefModal }) => {
  const [bottleneck, setBottleneck] = useState<'followup' | 'conversion' | 'calls' | 'creative'>('followup');
  const [monthlyVolume, setMonthlyVolume] = useState<number>(350);
  const [averageDealValue, setAverageDealValue] = useState<number>(1500);

  // Dynamic calculations based on operational models
  let estimatedHoursSaved = 0;
  let estimatedLeadsRecovered = 0;
  let estimatedMonthlyRevenue = 0;
  let recommendedSystem = '';
  let recommendedRoute = '';

  if (bottleneck === 'followup') {
    // 35% of leads leak when response > 2 hours; automated response recovers ~18%
    estimatedLeadsRecovered = Math.round(monthlyVolume * 0.18);
    estimatedHoursSaved = Math.round(monthlyVolume * 0.08); // 5 mins per manual follow-up triage
    estimatedMonthlyRevenue = Math.round(estimatedLeadsRecovered * (averageDealValue * 0.12)); // assuming 12% closing
    recommendedSystem = 'AI & Workflow Automation (Sub-45s WhatsApp & CRM Pipeline)';
  } else if (bottleneck === 'conversion') {
    // High-performance custom web boosts conversion by ~2.2% absolute
    estimatedLeadsRecovered = Math.round(monthlyVolume * 0.22);
    estimatedHoursSaved = 12; // less tech troubleshooting
    estimatedMonthlyRevenue = Math.round(estimatedLeadsRecovered * (averageDealValue * 0.15));
    recommendedSystem = 'Custom Web Experiences (Next.js Sub-Second Engine)';
  } else if (bottleneck === 'calls') {
    // 40% calls missed; voice agent answers 100%
    estimatedLeadsRecovered = Math.round(monthlyVolume * 0.24);
    estimatedHoursSaved = Math.round((monthlyVolume * 0.6) * 0.12); // ~7 mins per call
    estimatedMonthlyRevenue = Math.round(estimatedLeadsRecovered * (averageDealValue * 0.14));
    recommendedSystem = 'Conversational AI Voice & WhatsApp Agents';
  } else {
    // Creative fatigue: rapid ad testing lifts ROAS
    estimatedLeadsRecovered = Math.round(monthlyVolume * 0.15);
    estimatedHoursSaved = 32; // agency waiting & filming
    estimatedMonthlyRevenue = Math.round(estimatedLeadsRecovered * (averageDealValue * 0.1));
    recommendedSystem = 'AI UGC & Ad Creative Testing Engine';
  }

  const handleCalculateChange = (type: string, val: any) => {
    trackEvent('cta_click', { cta_id: 'diagnostic_calc_change', type, val });
  };

  return (
    <section id="diagnostic-calculator-section" className="py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="up" distance={24}>
          <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-900/5 relative overflow-hidden">
            {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Title Header */}
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-mono text-[#4F46E5] font-semibold">
              <Calculator className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>SYSTEM DIAGNOSTIC & ROI ENGINE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Calculate your manual operational leakage.
            </h2>
            <p className="text-base text-[#475569]">
              Select your biggest bottleneck and volume to see how much manual labor and leaked pipeline revenue an automated IGRYbuilds architecture can capture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Inputs (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Question 1: Bottleneck Selector */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-[#0F172A] block font-bold">
                  1. What is your primary operational bottleneck right now?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'followup', label: 'Slow Lead Response (>2h wait)', desc: 'Leads buy from faster competitors' },
                    { id: 'conversion', label: 'Low Website Conversion Rate', desc: 'Traffic bounces on outdated CMS' },
                    { id: 'calls', label: 'Missed Calls / Busy Reception', desc: 'After-hours and weekend call loss' },
                    { id: 'creative', label: 'Ad Creative Fatigue & Cost', desc: 'Slow creator cycles, high CAC' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setBottleneck(item.id as any);
                        handleCalculateChange('bottleneck', item.id);
                      }}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        bottleneck === item.id
                          ? 'bg-indigo-50/70 border-2 border-[#4F46E5] shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:border-indigo-200 hover:bg-white'
                      }`}
                    >
                      <div className="text-sm font-bold text-[#0F172A] mb-1">
                        {item.label}
                      </div>
                      <div className="text-xs text-[#64748B]">
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Monthly Lead Volume Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="volume-slider" className="text-xs font-mono uppercase tracking-wider text-[#0F172A] font-bold">
                    2. Monthly Inbound Inquiries or Traffic Volume
                  </label>
                  <span className="font-mono text-base font-bold text-[#4F46E5]">
                    {monthlyVolume.toLocaleString()} leads / month
                  </span>
                </div>
                <input
                  id="volume-slider"
                  type="range"
                  min="50"
                  max="3000"
                  step="50"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer bg-slate-200 h-2 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#64748B]">
                  <span>50 leads</span>
                  <span>1,000 leads</span>
                  <span>3,000+ leads</span>
                </div>
              </div>

              {/* Question 3: Average Customer / Deal Value */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="deal-value-slider" className="text-xs font-mono uppercase tracking-wider text-[#0F172A] font-bold">
                    3. Average Customer Value or Project Deal Size
                  </label>
                  <span className="font-mono text-base font-bold text-[#4F46E5]">
                    ${averageDealValue.toLocaleString()}
                  </span>
                </div>
                <input
                  id="deal-value-slider"
                  type="range"
                  min="200"
                  max="15000"
                  step="100"
                  value={averageDealValue}
                  onChange={(e) => setAverageDealValue(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer bg-slate-200 h-2 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#64748B]">
                  <span>$200</span>
                  <span>$5,000</span>
                  <span>$15,000+</span>
                </div>
              </div>
            </div>

            {/* Right Output Box (5 Cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="pb-4 border-b border-slate-200">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#64748B] block mb-1 font-semibold">
                  PROJECTED MONTHLY RECOVERY
                </span>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-emerald-700 tracking-tight">
                  +${estimatedMonthlyRevenue.toLocaleString()}
                  <span className="text-xs font-mono text-[#64748B] font-normal ml-2">/ month in saved pipeline</span>
                </div>
              </div>

              {/* Calculated Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#64748B]">
                    <Clock className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>Admin Time Saved</span>
                  </div>
                  <div className="text-xl font-display font-bold text-[#0F172A]">
                    ~{estimatedHoursSaved} hrs
                  </div>
                  <span className="text-[10px] text-[#64748B]">per month of manual work</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#64748B]">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Recovered Leads</span>
                  </div>
                  <div className="text-xl font-display font-bold text-[#0F172A]">
                    +{estimatedLeadsRecovered}
                  </div>
                  <span className="text-[10px] text-[#64748B]">retained via instant response</span>
                </div>
              </div>

              {/* Recommended Architecture Banner */}
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200/80 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#4F46E5] font-bold block">
                  RECOMMENDED SYSTEM ARCHITECTURE:
                </span>
                <div className="text-sm font-bold text-[#0F172A]">
                  {recommendedSystem}
                </div>
              </div>

              {/* CTA Action */}
              <button
                id="diagnostic-book-blueprint-btn"
                onClick={() => {
                  trackEvent('cta_click', {
                    cta_id: 'diagnostic_book_blueprint',
                    bottleneck,
                    monthlyVolume,
                    estimatedMonthlyRevenue,
                  });
                  openBriefModal();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-500/25 active:scale-[0.98]"
              >
                <span>Build This System For My Business</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
  );
};
