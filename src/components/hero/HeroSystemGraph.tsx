import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Cpu, 
  MessageSquare, 
  CalendarCheck, 
  Database, 
  BarChart3, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  Sparkles,
  Lock,
  Play,
  RotateCw
} from 'lucide-react';
import { DemoBadge } from '../visuals/DemoBadge';

interface HeroSystemGraphProps {
  reducedMotion: boolean;
}

interface PipelineNode {
  id: string;
  step: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  accent: string;
  statusText: string;
  statusBadge: string;
  previewData: {
    title: string;
    detail: string;
    meta: string;
    extra?: string;
  };
}

export const HeroSystemGraph: React.FC<HeroSystemGraphProps> = ({ reducedMotion }) => {
  const nodes: PipelineNode[] = [
    {
      id: 'lead',
      step: '01',
      label: 'LEAD',
      sublabel: 'Custom Web Intake',
      icon: Globe,
      accent: '#3B82F6',
      statusText: 'New enquiry received',
      statusBadge: 'CAPTURED < 120ms',
      previewData: {
        title: 'Commercial Solar & Battery Inquiry',
        detail: 'Source: Google Ads • Intent: High • Latency: 84ms',
        meta: '24 Rivergate Way, Austin TX • Commercial 50kW',
        extra: 'Payload validated with honeypot spam protection',
      },
    },
    {
      id: 'ai',
      step: '02',
      label: 'AI QUALIFICATION',
      sublabel: 'Autonomous Triage',
      icon: Cpu,
      accent: '#10B981',
      statusText: 'Lead qualified',
      statusBadge: 'FIT SCORE: 96/100',
      previewData: {
        title: 'Autonomous Semantic Classification',
        detail: 'Model: Guardrail Classifier v3.2 • Latency: 380ms',
        meta: 'Decision: Commercial High Priority → Instant Dispatch',
        extra: 'Budget: $45k–$60k verified • Timeline: < 30 Days',
      },
    },
    {
      id: 'followup',
      step: '03',
      label: 'FOLLOW-UP',
      sublabel: 'WhatsApp Cloud Bridge',
      icon: MessageSquare,
      accent: '#06B6D4',
      statusText: 'Follow-up sent',
      statusBadge: 'DISPATCHED IN 32s',
      previewData: {
        title: 'WhatsApp Business Cloud API',
        detail: 'System: “Hi Marcus, review your solar assessment & pick a time:”',
        meta: 'Customer replied in 18s • Selected slot tomorrow',
        extra: 'Pre-consultation video deck delivered via chat',
      },
    },
    {
      id: 'booking',
      step: '04',
      label: 'BOOKING',
      sublabel: 'Calendar & SMS Lock',
      icon: CalendarCheck,
      accent: '#8B5CF6',
      statusText: 'Appointment booked',
      statusBadge: 'SLOT CONFIRMED',
      previewData: {
        title: 'Two-Way Practitioner Calendar Sync',
        detail: 'Slot: Tomorrow 4:30 PM • Host: Senior Engineer',
        meta: 'Calendar invite sent + SMS reminder scheduled',
        extra: 'No-show protection active via automated 2h ping',
      },
    },
    {
      id: 'crm',
      step: '05',
      label: 'CRM',
      sublabel: 'HubSpot & Pipeline Sync',
      icon: Database,
      accent: '#F59E0B',
      statusText: 'Pipeline updated',
      statusBadge: 'DEAL ADVANCED',
      previewData: {
        title: 'Bi-directional Deal Stage Synchronization',
        detail: 'Stage: Qualified Opportunity • Value: $52,000',
        meta: 'Assigned: Enterprise Engineering Queue',
        extra: 'Full chat transcript and attribution UTMs logged',
      },
    },
    {
      id: 'reporting',
      step: '06',
      label: 'REPORTING',
      sublabel: 'Live Telemetry & Scale',
      icon: BarChart3,
      accent: '#EC4899',
      statusText: 'Business system running.',
      statusBadge: 'TELEMETRY LIVE',
      previewData: {
        title: 'Real-Time Pipeline Telemetry',
        detail: 'Avg. Response: 41s • Retention: 97.4%',
        meta: 'Active Concurrency: 120 simultaneous flows',
        extra: 'Zero human touch required for end-to-end triage',
      },
    },
  ];

  const [activeStepIndex, setActiveStepIndex] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Micro-interaction simulation cycle (Section 5)
  useEffect(() => {
    if (!isPlaying || reducedMotion) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % nodes.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying, reducedMotion, nodes.length]);

  const activeNode = nodes[activeStepIndex];

  return (
    <div className="w-full rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-2xl p-4 sm:p-6 text-slate-800 flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top OS Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-bold text-slate-900 tracking-tight">
              LIVE BUSINESS GROWTH OS
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[10px] text-slate-400">
            • ENGINE v2.4
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Micro-interaction status badge (Section 5) */}
          <div className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            <span>{activeNode.statusText}</span>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
          >
            {isPlaying ? <RotateCw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 6-Node Visual Architecture Pipeline (Section 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {nodes.map((node, idx) => {
          const NodeIcon = node.icon;
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <button
              key={node.id}
              onClick={() => {
                setActiveStepIndex(idx);
                setIsPlaying(false);
              }}
              className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-200 relative select-none ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-indigo-500/20'
                  : isPassed
                  ? 'bg-emerald-50/70 text-slate-800 border-emerald-200 hover:border-emerald-300'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-indigo-500 text-white'
                      : isPassed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  <NodeIcon className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[9px] font-mono font-bold ${isActive ? 'text-indigo-300' : 'text-slate-400'}`}>
                  {node.step}
                </span>
              </div>

              <div className="text-[10px] font-mono font-bold leading-none truncate">
                {node.label}
              </div>
              <div className={`text-[9px] truncate mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                {node.sublabel}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Miniature Live System Window (Section 4 & 5) */}
      <div className="rounded-2xl bg-slate-950 text-slate-100 p-4 sm:p-5 border border-slate-800 shadow-inner flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>NODE {activeNode.step}: {activeNode.label} ACTIVE</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {activeNode.statusBadge}
          </span>
        </div>

        {/* Live UI simulation preview */}
        <div className="space-y-2">
          <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
            {activeNode.previewData.title}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {activeNode.previewData.detail}
          </p>
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-indigo-300 flex items-center justify-between">
            <span className="truncate">{activeNode.previewData.meta}</span>
            <span className="text-[10px] font-mono text-emerald-400 shrink-0 ml-2 font-bold">200 OK</span>
          </div>
          {activeNode.previewData.extra && (
            <p className="text-[11px] text-slate-400 mt-1">
              ✓ {activeNode.previewData.extra}
            </p>
          )}
        </div>

        {/* Bottom Progress Tracker */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Autonomous Pipeline Cycle: Stage {activeStepIndex + 1} of 6</span>
          </div>
          <span className="text-emerald-400">System Healthy</span>
        </div>
      </div>
    </div>
  );
};
