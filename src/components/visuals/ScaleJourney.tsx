import React, { useState } from 'react';
import { 
  Globe, 
  Zap, 
  Share2, 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { DemoBadge } from './DemoBadge';

interface ScaleLevel {
  level: string;
  name: string;
  tagline: string;
  icon: React.ElementType;
  color: string;
  accentBg: string;
  description: string;
  capabilities: string[];
  techOutput: string;
}

interface ScaleJourneyProps {
  className?: string;
}

export const ScaleJourney: React.FC<ScaleJourneyProps> = ({ className = '' }) => {
  const levels: ScaleLevel[] = [
    {
      level: 'LEVEL 01',
      name: 'Capture',
      tagline: 'Custom Web & High-Velocity Intake',
      icon: Globe,
      color: 'text-blue-600',
      accentBg: 'bg-blue-50 border-blue-200',
      description: 'Start with an ultra-fast, responsive web engine and high-converting interactive capture components that eliminate visitor drop-off.',
      capabilities: [
        'Sub-second LCP React/Next.js frontend',
        'Interactive quote & diagnostic calculators',
        'Built-in spam prevention & honeypots',
        'Instant webhook payload emission'
      ],
      techOutput: 'Frontend Capture Ready',
    },
    {
      level: 'LEVEL 02',
      name: 'Automate',
      tagline: 'Instant Notifications & Autonomous Follow-Up',
      icon: Zap,
      color: 'text-cyan-600',
      accentBg: 'bg-cyan-50 border-cyan-200',
      description: 'Eliminate response delay by triggering instant email confirmations, team Slack alerts, and immediate follow-up cadences.',
      capabilities: [
        'Sub-45s auto-responder triggers',
        'Internal Slack / WhatsApp team alert dispatch',
        'SMS & email confirmation sequences',
        'Automated calendar slot holding'
      ],
      techOutput: 'Response Latency < 45s',
    },
    {
      level: 'LEVEL 03',
      name: 'Connect',
      tagline: 'CRM, WhatsApp & Calendar Synchronization',
      icon: Share2,
      color: 'text-emerald-600',
      accentBg: 'bg-emerald-50 border-emerald-200',
      description: 'Bridge disparate tools into a unified pipeline so data flows seamlessly between your CRM, messaging apps, and calendar.',
      capabilities: [
        'Bi-directional CRM sync (HubSpot, Pipedrive, Notion)',
        'WhatsApp Business Cloud API automation',
        'Two-way Google/Outlook calendar reservation',
        'Zero manual copy-pasting between systems'
      ],
      techOutput: 'Unified Data Highway',
    },
    {
      level: 'LEVEL 04',
      name: 'Intelligence',
      tagline: 'AI Qualification, Routing & Semantic Summaries',
      icon: Cpu,
      color: 'text-indigo-600',
      accentBg: 'bg-indigo-50 border-indigo-200',
      description: 'Add AI agents and LLM guardrails that interview leads, score commercial fit, extract technical requirements, and route intelligently.',
      capabilities: [
        'Autonomous conversational WhatsApp agent',
        'Sub-700ms voice telephone intake assistant',
        'Automated RFQ & document data extraction',
        'Dynamic lead scoring & priority tagging'
      ],
      techOutput: 'Autonomous Agent Layer',
    },
    {
      level: 'LEVEL 05',
      name: 'Scale',
      tagline: 'Telemetry, Optimization & Multi-Workflow Orchestration',
      icon: Layers,
      color: 'text-purple-600',
      accentBg: 'bg-purple-50 border-purple-200',
      description: 'Expand to a comprehensive operating system with live pipeline telemetry, multi-location capacity, and continuous conversion tuning.',
      capabilities: [
        'Live pipeline metrics & conversion telemetry',
        'Multi-department cross-functional automations',
        'Automated review requests & client re-engagement',
        'Continuous prompt tuning & SLA guarantee'
      ],
      techOutput: 'Self-Sustaining Operations',
    },
  ];

  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const current = levels[selectedLevel];
  const Icon = current.icon;

  return (
    <div className={`rounded-3xl border border-slate-200/90 bg-white shadow-xl p-6 sm:p-8 ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <DemoBadge label="SCALABILITY ARCHITECTURE" className="mb-2" />
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Start with one workflow. Build the system around it.
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            You do not need to overhaul your entire company on day one. We build modular, extensible architectures that grow as your operational volume increases.
          </p>
        </div>
      </div>

      {/* 5-Step Progressive Horizontal Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 my-6">
        {levels.map((lvl, idx) => {
          const StepIcon = lvl.icon;
          const isSelected = selectedLevel === idx;
          return (
            <button
              key={lvl.level}
              onClick={() => setSelectedLevel(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-150 relative ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg ring-2 ring-indigo-500/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
                  <StepIcon className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`}>
                  0{idx + 1}
                </span>
              </div>
              <div className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                {lvl.level}
              </div>
              <div className="text-sm font-bold mt-0.5 leading-tight">
                {lvl.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Level Inspector Card */}
      <div className="rounded-2xl bg-slate-50/80 border border-slate-200/90 p-5 sm:p-6 flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${current.accentBg} ${current.color}`}>
              {current.level} : {current.name.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-700">{current.techOutput}</span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
            {current.tagline}
          </h4>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mb-4">
            {current.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {current.capabilities.map((cap, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Level Progression Indicator */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs w-full md:w-64 shrink-0 text-left">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
            Maturity Stage
          </span>
          <div className="flex items-baseline gap-1 text-2xl font-mono font-bold text-slate-900">
            <span>0{selectedLevel + 1}</span>
            <span className="text-xs text-slate-400 font-normal">/ 05</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((selectedLevel + 1) / 5) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            {selectedLevel === 0
              ? 'Foundational: Stop inquiry bounce and speed up capture.'
              : selectedLevel === 4
              ? 'Full Enterprise OS: Maximum automation and operational leverage.'
              : 'Progressive buildout tailored to customer lifecycle requirements.'}
          </p>
        </div>
      </div>
    </div>
  );
};
