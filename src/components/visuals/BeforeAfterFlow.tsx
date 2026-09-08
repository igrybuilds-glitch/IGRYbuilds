import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Zap, 
  ArrowRight, 
  Layers, 
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { DemoBadge } from './DemoBadge';

interface BeforeAfterFlowProps {
  className?: string;
}

export const BeforeAfterFlow: React.FC<BeforeAfterFlowProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');

  const beforeSteps = [
    { label: 'Website Visitor', issue: 'Visits static contact page' },
    { label: 'Enquiry Sent', issue: 'Lands in unmonitored inbox' },
    { label: 'WhatsApp Delay', issue: 'Manual message sent 4 hours later' },
    { label: 'Manual Triage', issue: 'Staff forgets conversation context' },
    { label: 'Missed Slot', issue: 'Customer booked with competitor' },
    { label: 'Zero Follow-up', issue: 'Lead is permanently abandoned' },
  ];

  const afterSteps = [
    { label: 'Visitor Enters', outcome: 'Interactive Web Calculator' },
    { label: 'Instant Capture', outcome: 'Form validated in < 120ms' },
    { label: 'AI Qualification', outcome: 'Fit scored & enriched via LLM' },
    { label: 'WhatsApp Ping', outcome: 'Sent within 45 seconds' },
    { label: 'Calendar Booking', outcome: 'Reserved slot + SMS reminder' },
    { label: 'CRM & Pipeline', outcome: 'Auto-logged with attribution' },
    { label: 'Owner Alert', outcome: 'Slack / Mobile push with audio' },
    { label: 'Live Telemetry', outcome: 'Continuous conversion audit' },
  ];

  return (
    <div className={`rounded-3xl border border-slate-200/90 bg-white shadow-xl overflow-hidden ${className}`}>
      {/* Header with Mode Toggle */}
      <div className="p-6 md:p-8 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <DemoBadge label="WORKFLOW COMPARISON" className="bg-slate-800 text-slate-300 border-slate-700" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Most businesses don't have a lead problem.
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-xl">
            They have a pipeline latency problem: slow triage, lost follow-ups, and manual busywork leaking high-intent customers.
          </p>
        </div>

        {/* Toggle Pills */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('before')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'before'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>THE OLD MANUAL CHAOS</span>
          </button>
          <button
            onClick={() => setActiveTab('after')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'after'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>THE IGRY SYSTEM</span>
          </button>
        </div>
      </div>

      {/* Main Visual Presentation */}
      <div className="p-6 md:p-8 bg-slate-50/50">
        {activeTab === 'before' ? (
          /* Messy Manual Workflow */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-600 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>TYPICAL HIGH-FRICTION WORKFLOW (20+ MANUAL TOUCHPOINTS)</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Avg. Response: 4.2 hours</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {beforeSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-rose-200/90 shadow-2xs relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      STEP 0{idx + 1}
                    </span>
                    <Clock className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <h5 className="font-semibold text-xs text-slate-900">{step.label}</h5>
                  <p className="text-[11px] text-rose-600 font-medium mt-1">
                    {step.issue}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-rose-50/80 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="font-bold text-xs text-rose-950">High Revenue Leakage</h6>
                  <p className="text-[11px] text-rose-700">Leads cool off after 15 minutes; staff spends hours copying data across tools manually.</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('after')}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors shrink-0 shadow-xs"
              >
                Inspect Automated System →
              </button>
            </div>
          </div>
        ) : (
          /* Clean Automated System Workflow */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>CONNECTED IGRY GROWTH ENGINE (FULLY ORCHESTRATED)</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Avg. Response: &lt; 45 seconds
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {afterSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs relative overflow-hidden flex flex-col justify-between hover:border-emerald-400 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      STEP 0{idx + 1}
                    </span>
                    <Zap className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <h5 className="font-semibold text-xs text-slate-900">{step.label}</h5>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    {step.outcome}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="font-bold text-xs text-emerald-950">Zero Lost Leads. Zero Repetitive Data Entry.</h6>
                  <p className="text-[11px] text-emerald-800">Every qualified visitor is answered, booked, and logged into your CRM without waiting on human availability.</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 px-3 py-1 bg-white rounded-lg border border-emerald-300">
                100% Autonomous Pipeline
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
