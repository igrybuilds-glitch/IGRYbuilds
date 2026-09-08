import React, { useState } from 'react';
import { 
  Zap, 
  GitBranch, 
  Cpu, 
  Send, 
  Database, 
  Bell, 
  CheckCircle2, 
  ChevronRight,
  Code,
  ArrowRight
} from 'lucide-react';
import { DemoBadge } from './DemoBadge';

interface NodeData {
  id: string;
  step: string;
  title: string;
  type: string;
  icon: React.ElementType;
  color: string;
  summary: string;
  payload: Record<string, string>;
}

interface AutomationFlowProps {
  className?: string;
  title?: string;
}

export const AutomationFlow: React.FC<AutomationFlowProps> = ({
  className = '',
  title = 'Live Automation Architecture Graph',
}) => {
  const nodes: NodeData[] = [
    {
      id: 'trigger',
      step: '01',
      title: 'Inbound Trigger',
      type: 'EVENT EMITTER',
      icon: Zap,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      summary: 'Captures incoming webhooks, form submissions, or WhatsApp messages within 120ms.',
      payload: {
        source: 'Web Intake / Meta Ad',
        event: 'form.submitted',
        ip: 'Authenticated SSL Proxy',
      },
    },
    {
      id: 'logic',
      step: '02',
      title: 'Conditional Logic',
      type: 'ROUTER',
      icon: GitBranch,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      summary: 'Applies deterministic business rules: filtering duplicate requests, verifying location, and routing.',
      payload: {
        rule_1: 'Check previous engagement in CRM',
        rule_2: 'Filter disposable email domains',
        routing: 'Enterprise vs Standard queue',
      },
    },
    {
      id: 'ai',
      step: '03',
      title: 'AI Intelligence',
      type: 'LLM REASONING',
      icon: Cpu,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      summary: 'Performs semantic analysis, extracts specifications, scores qualification readiness, and formulates response.',
      payload: {
        model: 'Guardrail Reasoning Model',
        intent_confidence: '98.4%',
        sentiment: 'High Urgency (Commercial)',
      },
    },
    {
      id: 'action',
      step: '04',
      title: 'Automated Action',
      type: 'EXECUTION',
      icon: Send,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      summary: 'Dispatches two-way WhatsApp message, reserves provisional calendar slot, and sends video brief.',
      payload: {
        channel: 'WhatsApp Cloud API',
        message: 'Personalized slot offer + video deck',
        turnaround: '< 45 seconds',
      },
    },
    {
      id: 'database',
      step: '05',
      title: 'State Database',
      type: 'CRM & PERSISTENCE',
      icon: Database,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      summary: 'Synchronizes deal record to HubSpot / Notion / PostgreSQL with attribution parameters and full transcript.',
      payload: {
        destination: 'HubSpot Enterprise CRM',
        deal_stage: 'Qualified Opportunity',
        utm_preserved: 'utm_campaign=q3_growth',
      },
    },
    {
      id: 'notify',
      step: '06',
      title: 'Owner Notification',
      type: 'TELEMETRY & ALERT',
      icon: Bell,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      summary: 'Sends instant Slack / push notification with high-priority audio chime and one-tap calendar sync.',
      payload: {
        slack_channel: '#hot-leads-internal',
        sound: 'Priority Chime',
        status: 'DISPATCHED',
      },
    },
  ];

  const [activeNodeId, setActiveNodeId] = useState<string>('trigger');
  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-white shadow-xl p-5 md:p-6 flex flex-col text-slate-800 ${className}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="font-semibold text-sm sm:text-base text-slate-900">{title}</h4>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any node in the pipeline to inspect data payload and routing behavior.
          </p>
        </div>
        <DemoBadge label="INTERACTIVE ARCHITECTURE" className="self-start sm:self-auto text-[9px]" />
      </div>

      {/* Nodes visual flow */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-5">
        {nodes.map((node) => {
          const Icon = node.icon;
          const isSelected = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-150 relative ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-indigo-500/30'
                  : 'bg-slate-50/80 text-slate-700 border-slate-200/80 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-indigo-500 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[9px] font-mono font-bold ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                  {node.step}
                </span>
              </div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-70">
                {node.type}
              </div>
              <div className="text-xs font-semibold mt-0.5 leading-tight truncate">
                {node.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Node Inspector Payload Panel */}
      <div className="bg-slate-950 text-slate-100 rounded-xl p-4 border border-slate-800 shadow-inner flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>NODE {activeNode.step}: {activeNode.title.toUpperCase()}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            {activeNode.summary}
          </p>
        </div>

        {/* JSON Payload preview */}
        <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 font-mono text-[11px] min-w-[240px]">
          <div className="text-[9px] text-slate-400 uppercase font-semibold mb-1 flex items-center justify-between">
            <span>JSON State Output</span>
            <span className="text-emerald-400">200 OK</span>
          </div>
          {Object.entries(activeNode.payload).map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-3 text-slate-300">
              <span className="text-indigo-300">{k}:</span>
              <span className="text-emerald-300 font-semibold truncate">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
