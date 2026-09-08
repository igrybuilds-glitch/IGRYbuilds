import React from 'react';
import { LucideIcon, Bell, CheckCircle2, MessageSquare, Zap, AlertCircle } from 'lucide-react';

interface NotificationCardProps {
  app?: string;
  time?: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  variant?: 'emerald' | 'indigo' | 'amber' | 'blue';
  className?: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  app = 'IGRY SYSTEMS CORE',
  time = 'Just now',
  title,
  description,
  icon: Icon = Zap,
  variant = 'emerald',
  className = '',
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-500 text-white',
    indigo: 'bg-indigo-600 text-white',
    amber: 'bg-amber-500 text-white',
    blue: 'bg-blue-600 text-white',
  };

  return (
    <div className={`p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md shadow-slate-900/5 text-left flex items-start gap-3 ${className}`}>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${variantStyles[variant]} shadow-xs`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 leading-tight">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 truncate">
            {app}
          </span>
          <span className="text-[10px] font-mono text-slate-400 shrink-0">{time}</span>
        </div>
        <h5 className="text-xs font-semibold text-slate-900 mt-0.5 leading-snug">{title}</h5>
        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
