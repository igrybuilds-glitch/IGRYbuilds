import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Zap, Lock } from 'lucide-react';
import { openWhatsApp } from '../../lib/whatsapp';
import { trackEvent } from '../../lib/analytics';
import { RevealOnScroll } from '../ui/RevealOnScroll';

interface FinalCTASectionProps {
  openBriefModal: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ openBriefModal }) => {
  return (
    <section id="final-cta-section" className="py-24 bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <RevealOnScroll direction="up" distance={24}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-mono text-[#4F46E5] font-semibold mb-8">
            <Zap className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>CURRENT SPRINT CAPACITY: 2 NEW SYSTEMS THIS MONTH</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight max-w-3xl mx-auto leading-[1.1] mb-6">
            Ready to capture demand and eliminate manual work?
          </h2>

          <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed mb-10">
            Stop losing qualified leads to response lag and human administrative bottlenecks. Let's architect an automated digital system for your business.
          </p>

          {/* Dual Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              id="final-cta-brief-btn"
              onClick={() => {
                trackEvent('cta_click', { cta_id: 'final_cta_brief', route: '/' });
                openBriefModal();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Start Smart Project Brief</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              id="final-cta-whatsapp-btn"
              onClick={() => openWhatsApp('general', 'Final Section Callout')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-[#0F172A] font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>

          {/* What Happens Next Guarantee */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#64748B] max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4F46E5]" />
              <span>24h System Audit Turnaround</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-[#4F46E5]" />
              <span>100% Code & IP Ownership</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-[#4F46E5]" />
              <span>Zero Long-term Lock-in</span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
