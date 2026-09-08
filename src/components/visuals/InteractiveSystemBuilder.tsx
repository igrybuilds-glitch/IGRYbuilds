import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Globe, 
  MessageSquare, 
  Clock, 
  CalendarCheck, 
  Cpu, 
  Database,
  Layers
} from 'lucide-react';
import { DemoBadge } from './DemoBadge';

interface GoalOption {
  id: string;
  label: string;
  systemName: string;
  nodes: { title: string; subtitle: string; icon: React.ElementType }[];
  explanation: string;
  recommendedService: string;
}

interface InteractiveSystemBuilderProps {
  onSelectService?: (serviceName: string) => void;
  className?: string;
}

export const InteractiveSystemBuilder: React.FC<InteractiveSystemBuilderProps> = ({
  onSelectService,
  className = '',
}) => {
  const options: GoalOption[] = [
    {
      id: 'leads',
      label: 'Get more leads',
      systemName: 'High-Conversion Web Experience & Intake',
      recommendedService: 'web-experiences',
      nodes: [
        { title: 'Visitor Inbound', subtitle: 'Targeted campaign traffic', icon: Globe },
        { title: 'Interactive Engine', subtitle: 'Instant dynamic quote quiz', icon: Zap },
        { title: 'One-Tap Verification', subtitle: 'Spam-screened intake form', icon: CheckCircle2 },
        { title: 'Instant Lead Route', subtitle: 'Direct dispatch to your inbox', icon: ArrowRight },
      ],
      explanation: 'We replace flat informational websites with interactive diagnostic web tools that double conversion rates by giving visitors immediate answers.',
    },
    {
      id: 'speed',
      label: 'Respond faster',
      systemName: 'Sub-45s Autonomous WhatsApp Bridge',
      recommendedService: 'ai-automation',
      nodes: [
        { title: 'Web Inquiry', subtitle: 'Lead submitted online', icon: Globe },
        { title: 'Autonomous Ping', subtitle: 'WhatsApp message in < 45s', icon: MessageSquare },
        { title: 'Instant Engagement', subtitle: 'Engage while intent is peak', icon: Zap },
        { title: 'Owner Notification', subtitle: 'Slack alert with user replies', icon: CheckCircle2 },
      ],
      explanation: 'Leads cool off rapidly after 15 minutes. Our autonomous bridge reaches out via verified WhatsApp before your competitor even opens their inbox.',
    },
    {
      id: 'followup',
      label: 'Automate follow-up',
      systemName: 'Multi-Touch Nurture & Recall Engine',
      recommendedService: 'ai-automation',
      nodes: [
        { title: 'Lead Captured', subtitle: 'Logged with metadata', icon: Globe },
        { title: 'AI Qualification', subtitle: 'Scored on urgency and budget', icon: Cpu },
        { title: 'WhatsApp Sequence', subtitle: 'Personalized cadence over 7 days', icon: MessageSquare },
        { title: 'Calendar Booking', subtitle: 'Self-serve appointment link', icon: CalendarCheck },
        { title: 'CRM Synchronization', subtitle: 'Deal status kept up to date', icon: Database },
      ],
      explanation: 'No forgotten inquiries. The system autonomously follows up with tailored messages until the prospect books or opts out, keeping your pipeline warm.',
    },
    {
      id: 'booking',
      label: 'Book more appointments',
      systemName: 'Self-Serve Calendar & Deposit System',
      recommendedService: 'ai-agents',
      nodes: [
        { title: 'Prospect Discovery', subtitle: 'Identifies service need', icon: Globe },
        { title: 'Slot Allocation', subtitle: 'Real-time two-way calendar sync', icon: CalendarCheck },
        { title: 'Deposit Collection', subtitle: 'Stripe integration checkout', icon: Zap },
        { title: 'Automated Reminders', subtitle: '48h, 24h & 2h WhatsApp alerts', icon: MessageSquare },
      ],
      explanation: 'Reduces appointment no-shows below 3% by combining friction-free time-slot selection with optional deposit payment and automated SMS/WhatsApp reminders.',
    },
    {
      id: 'voice',
      label: 'Reduce manual work',
      systemName: '24/7 Autonomous Voice & Intake Agent',
      recommendedService: 'ai-agents',
      nodes: [
        { title: 'Inbound Telephone Call', subtitle: 'Answered on Ring 1 (<600ms)', icon: Globe },
        { title: 'Voice AI Reasoning', subtitle: 'Understands caller questions', icon: Cpu },
        { title: 'Direct Booking', subtitle: 'Reserves slot in calendar', icon: CalendarCheck },
        { title: 'CRM Update & SMS', subtitle: 'Transcript & confirmation sent', icon: Database },
      ],
      explanation: 'Answers routine phone inquiries and check-calls 24/7 without hold times, transcribing and booking slots directly into your management database.',
    },
    {
      id: 'creative',
      label: 'Create better ads',
      systemName: 'High-Velocity Direct Response Ad Engine',
      recommendedService: 'creative',
      nodes: [
        { title: 'Creative Hook Matrix', subtitle: '10 proven psychographic angles', icon: Cpu },
        { title: 'Dynamic UGC Render', subtitle: 'Native vertical video edits', icon: Zap },
        { title: 'Multivariate Test', subtitle: 'Batch deployment to ad accounts', icon: Globe },
        { title: 'Performance Filter', subtitle: 'Identifies winning ROAS hooks', icon: CheckCircle2 },
      ],
      explanation: 'Overcomes ad fatigue with an automated creative pipeline that tests dozens of hook and format variations weekly without traditional agency production delays.',
    },
  ];

  const [selectedGoalId, setSelectedGoalId] = useState<string>('followup');
  const selected = options.find((o) => o.id === selectedGoalId) || options[2];

  return (
    <div className={`rounded-3xl border border-slate-200/90 bg-white shadow-xl p-5 sm:p-7 text-slate-800 ${className}`}>
      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <DemoBadge label="SYSTEM RECOMMENDATION ENGINE" className="mb-2" />
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          What are you trying to improve?
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Select your primary bottleneck below to preview the architectural blueprint IGRYbuilds deploys.
        </p>
      </div>

      {/* Goal chips selector */}
      <div className="flex flex-wrap gap-2 my-5">
        {options.map((opt) => {
          const isCurrent = opt.id === selectedGoalId;
          return (
            <button
              key={opt.id}
              onClick={() => {
                setSelectedGoalId(opt.id);
                if (onSelectService) {
                  onSelectService(opt.recommendedService);
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isCurrent
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Blueprint Visual Preview */}
      <div className="rounded-2xl bg-slate-950 text-white p-5 border border-slate-800 shadow-inner">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-400">
              RECOMMENDED ARCHITECTURE
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            ENGINEERED FOR SCALE
          </span>
        </div>

        <h4 className="text-base font-bold text-white mb-2">
          {selected.systemName}
        </h4>

        {/* Workflow Chain */}
        <div className="flex flex-wrap items-center gap-2 my-4">
          {selected.nodes.map((n, idx) => {
            const NodeIcon = n.icon;
            return (
              <React.Fragment key={idx}>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 shadow-xs">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <NodeIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-100 leading-none">{n.title}</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">{n.subtitle}</div>
                  </div>
                </div>
                {idx < selected.nodes.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
          {selected.explanation}
        </p>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            This is the exact kind of system IGRYbuilds can design and deploy around your business.
          </span>
          <button
            onClick={() => {
              if (onSelectService) {
                onSelectService(selected.recommendedService);
              }
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
          >
            <span>Configure This System</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
