import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Clock, Zap, DollarSign, Filter } from 'lucide-react';
import { DemoBadge } from './DemoBadge';

interface DealCard {
  id: string;
  name: string;
  business: string;
  value: string;
  stage: 'new' | 'assigned' | 'qualified' | 'followup' | 'proposal' | 'won';
  trigger: string;
  timestamp: string;
  autoMoved?: boolean;
}

interface CRMBoardProps {
  className?: string;
  interactive?: boolean;
}

export const CRMBoard: React.FC<CRMBoardProps> = ({
  className = '',
  interactive = true,
}) => {
  const [deals, setDeals] = useState<DealCard[]>([
    {
      id: 'D-101',
      name: 'Dr. Sarah Lin',
      business: 'Apex Dental Care',
      value: '$4,800/mo',
      stage: 'qualified',
      trigger: 'Auto-qualified via WhatsApp quiz',
      timestamp: '2m ago',
      autoMoved: true,
    },
    {
      id: 'D-102',
      name: 'Marcus Sterling',
      business: 'Sterling Industrial Supply',
      value: '$18,500',
      stage: 'proposal',
      trigger: 'Automated RFQ extraction complete',
      timestamp: '14m ago',
    },
    {
      id: 'D-103',
      name: 'Elena Rostova',
      business: 'Lumina Aesthetic Clinic',
      value: '$7,200/mo',
      stage: 'won',
      trigger: 'Stripe deposit verified ($1,500)',
      timestamp: '1h ago',
    },
    {
      id: 'D-104',
      name: 'David Vance',
      business: 'Nexus Freight Logistics',
      value: '$12,000',
      stage: 'followup',
      trigger: 'Sub-second Voice Bot scheduled demo',
      timestamp: '35m ago',
      autoMoved: true,
    },
    {
      id: 'D-105',
      name: 'Chloe Bennett',
      business: 'Verve Athletic Wear',
      value: '$5,400/mo',
      stage: 'assigned',
      trigger: 'Lead assigned to Creative Director',
      timestamp: '48m ago',
    },
    {
      id: 'D-106',
      name: 'Arthur Hayes',
      business: 'Prestige Car Detailing',
      value: '$3,200',
      stage: 'new',
      trigger: 'Webhook intake from Web Engine',
      timestamp: 'Just now',
    },
  ]);

  const stages = [
    { key: 'new', title: 'New Lead', color: 'border-slate-300 text-slate-700 bg-slate-100' },
    { key: 'assigned', title: 'Assigned', color: 'border-blue-300 text-blue-700 bg-blue-50' },
    { key: 'qualified', title: 'Qualified', color: 'border-cyan-300 text-cyan-700 bg-cyan-50' },
    { key: 'followup', title: 'Follow-up', color: 'border-amber-300 text-amber-700 bg-amber-50' },
    { key: 'proposal', title: 'Proposal', color: 'border-indigo-300 text-indigo-700 bg-indigo-50' },
    { key: 'won', title: 'Won', color: 'border-emerald-300 text-emerald-700 bg-emerald-50' },
  ];

  const advanceDeal = (dealId: string) => {
    if (!interactive) return;
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d;
        const stageIndex = stages.findIndex((s) => s.key === d.stage);
        const nextStage = stages[Math.min(stages.length - 1, stageIndex + 1)].key as DealCard['stage'];
        return {
          ...d,
          stage: nextStage,
          autoMoved: true,
          trigger: `Automated stage transition → ${nextStage.toUpperCase()}`,
        };
      })
    );
  };

  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-slate-50/80 shadow-lg p-4 flex flex-col overflow-hidden text-slate-800 ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h4 className="font-semibold text-xs text-slate-900 font-mono tracking-tight">
            CENTRAL PIPELINE & AUTONOMOUS DISPATCH
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <DemoBadge label="SYSTEM 04 DEMO" className="text-[9px]" />
        </div>
      </div>

      {/* Horizontal Kanban Columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 overflow-x-auto pb-1">
        {stages.map((stg) => {
          const colDeals = deals.filter((d) => d.stage === stg.key);
          return (
            <div
              key={stg.key}
              className="bg-white rounded-xl border border-slate-200/80 p-2.5 flex flex-col min-w-[130px] shadow-2xs"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${stg.color}`}>
                  {stg.title}
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-semibold">
                  {colDeals.length}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="space-y-2 flex-1">
                {colDeals.map((deal) => (
                  <div
                    key={deal.id}
                    onClick={() => advanceDeal(deal.id)}
                    className="p-2 rounded-lg bg-slate-50/90 border border-slate-200/90 hover:border-indigo-400 cursor-pointer transition-all hover:shadow-xs group text-left"
                    title="Click to trigger simulated automation event"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>{deal.id}</span>
                      <span className="font-semibold text-slate-700">{deal.value}</span>
                    </div>
                    <div className="font-semibold text-xs text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                      {deal.business}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                      {deal.name}
                    </div>

                    {/* Automation trigger indicator */}
                    <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center gap-1 text-[9px] font-mono text-indigo-700">
                      <Zap className="w-2.5 h-2.5 text-indigo-500 shrink-0" />
                      <span className="truncate">{deal.trigger}</span>
                    </div>
                  </div>
                ))}

                {colDeals.length === 0 && (
                  <div className="h-16 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-[10px] font-mono text-slate-400">
                    Awaiting trigger
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer trigger note */}
      <div className="mt-3 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-emerald-500" />
          <span>Interactive: Click any card to advance its simulated webhook trigger</span>
        </span>
        <span className="text-slate-400">Real-time HubSpot / Pipedrive / Notion Webhook Sync</span>
      </div>
    </div>
  );
};
