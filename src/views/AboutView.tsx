import React from 'react';
import { ArrowRight, ShieldCheck, Terminal, Cpu, CheckCircle2, Lock, Zap, MessageSquare } from 'lucide-react';
import { AppRoute } from '../types';
import { openWhatsApp } from '../lib/whatsapp';

interface AboutViewProps {
  navigate: (route: AppRoute) => void;
  openBriefModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ navigate, openBriefModal }) => {
  const principles = [
    {
      title: '1. Outcomes Over Artifacts',
      desc: 'We do not measure progress by how many Figma frames or code commits we generated. We measure progress by business throughput: sub-second load times, sub-45s lead response, and zero manual data-entry hours.'
    },
    {
      title: '2. Zero Template Bloat',
      desc: 'Most agency websites crumble under 40 third-party WordPress plugins and bloated templates. We build bespoke applications using modern React, TypeScript, and clean cloud APIs. Clean code runs faster, breaks less, and has zero security debt.'
    },
    {
      title: '3. 100% Code & Asset Ownership',
      desc: 'You never rent your systems from us. Upon milestone sign-off, full repository code, workflow definitions, API keys, and documentation are transferred unconditionally to your company.'
    },
    {
      title: '4. Deterministic Guardrails on AI',
      desc: 'We don’t treat AI as a toy or a gimmick. When deploying voice or chat agents, we build strict boundary checks, retrieval-augmented knowledge bases, and automatic human escalation paths so your brand reputation is never compromised.'
    }
  ];

  return (
    <div id="about-view" className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
            PHILOSOPHY & OPERATOR MINDSET
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight">
            We build systems the way engineers build infrastructure.
          </h1>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            IGRYbuilds was founded on a simple observation: modern businesses are drowning in manual tasks and slow response times because their websites and software tools don't talk to each other. We exist to solve that disconnect.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 lg:p-12 mb-16 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 text-xs font-mono uppercase text-[#4F46E5] font-semibold">
            <Terminal className="w-4 h-4 text-[#4F46E5]" />
            <span>THE IGRYbuilds STORY</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Why we left traditional agency models behind.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#475569] leading-relaxed">
            <p>
              Traditional marketing agencies sell you pretty pictures. They deliver a template, invoice you thousands for maintenance, and vanish when your leads stop coming through.
            </p>
            <p>
              Meanwhile, enterprise software consultancies take 9 months and $100k to build basic automation pipelines.
            </p>
            <p>
              <strong className="text-[#0F172A]">IGRYbuilds bridges that divide.</strong> We combine high-end aesthetic craftsmanship with senior software engineering. We view your website, your WhatsApp channel, your phone lines, and your CRM as a single unified system. When that system runs autonomously, your team gets to focus on closing deals and delivering great service—not copying data into spreadsheets.
            </p>
          </div>
        </div>

        {/* Studio Principles */}
        <div className="space-y-6 mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Our Engineering Convictions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((prin, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
                <h3 className="font-display text-lg font-bold text-[#0F172A]">
                  {prin.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {prin.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl text-white">
          <div className="space-y-1">
            <h3 className="font-display text-2xl font-bold text-white">
              Ready to partner with an engineering-led team?
            </h3>
            <p className="text-sm text-indigo-200">
              Let's look at your current architecture and identify the fastest ROI opportunities.
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
