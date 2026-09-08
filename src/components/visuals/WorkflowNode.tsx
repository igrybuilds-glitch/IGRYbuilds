import React from 'react';
import { LucideIcon, CheckCircle2, ArrowRight } from 'lucide-react';

export interface WorkflowNodeProps {
  step?: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  status?: string;
  statusVariant?: 'active' | 'success' | 'warning' | 'idle';
  latency?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  step,
  title,
  subtitle,
  icon: Icon,
  status = 'ONLINE',
  statusVariant = 'active',
  latency,
  isActive = false,
  onClick,
  className = '',
}) => {
  const statusColors = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    success: 'bg-indigo-50 text-indigo-700 border-indigo-300',
    warning: 'bg-amber-50 text-amber-700 border-amber-300',
    idle: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <div
      onClick={onClick}
      className={`p-3.5 rounded-2xl border transition-all duration-200 text-left relative select-none ${
        isActive
          ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
          : 'bg-white/90 border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'}`}>
            <Icon className="w-4 h-4" />
          </div>
          {step && (
            <span className="text-[10px] font-mono font-bold text-slate-400">
              {step}
            </span>
          )}
        </div>

        {status && (
          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${statusColors[statusVariant]}`}>
            {status}
          </span>
        )}
      </div>

      <h5 className="font-semibold text-xs text-slate-900 leading-tight">
        {title}
      </h5>

      {subtitle && (
        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
          {subtitle}
        </p>
      )}

      {latency && (
        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-400">
          <span>LATENCY</span>
          <span className="font-bold text-slate-700">{latency}</span>
        </div>
      )}
    </div>
  );
};
