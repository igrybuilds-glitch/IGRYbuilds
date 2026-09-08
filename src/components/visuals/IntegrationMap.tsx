import React from 'react';
import { 
  Globe, 
  MessageSquare, 
  Database, 
  Calendar, 
  Mail, 
  CreditCard, 
  BarChart3, 
  Cpu,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { DemoBadge } from './DemoBadge';

interface IntegrationMapProps {
  className?: string;
  activeIntegrations?: string[];
}

export const IntegrationMap: React.FC<IntegrationMapProps> = ({
  className = '',
  activeIntegrations = ['Website', 'WhatsApp Cloud API', 'HubSpot CRM', 'Google Calendar', 'Stripe', 'OpenAI / Anthropic LLM'],
}) => {
  const tools = [
    { name: 'Custom Web Engine', icon: Globe, category: 'Frontend Intake', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { name: 'WhatsApp Cloud API', icon: MessageSquare, category: 'Messaging Bridge', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { name: 'HubSpot / Pipedrive', icon: Database, category: 'Central CRM', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { name: 'Google / Outlook Cal', icon: Calendar, category: 'Booking Engine', color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    { name: 'Stripe Payments', icon: CreditCard, category: 'Deposit Checkout', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { name: 'AI Models & Voice', icon: Cpu, category: 'Reasoning Layer', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { name: 'Email & SMS Dispatch', icon: Mail, category: 'Multi-Channel Alert', color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { name: 'Analytics Telemetry', icon: BarChart3, category: 'Conversion Audit', color: 'text-teal-600 bg-teal-50 border-teal-200' },
  ];

  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-white shadow-lg p-5 text-slate-800 ${className}`}>
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-indigo-600" />
          <h4 className="font-semibold text-xs sm:text-sm text-slate-900 font-mono">
            ECOSYSTEM & API INTEGRATION NODES
          </h4>
        </div>
        <DemoBadge label="ZERO-FRICTION PIPING" className="text-[9px]" />
      </div>

      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        We connect the tools your business already pays for into an autonomous data loop with zero brittle manual zap bridges.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/80 flex flex-col justify-between text-left hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${t.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Active Connection" />
              </div>
              <div>
                <div className="text-[9px] font-mono text-slate-400 uppercase font-semibold">
                  {t.category}
                </div>
                <div className="text-xs font-semibold text-slate-900 mt-0.5 leading-tight">
                  {t.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
