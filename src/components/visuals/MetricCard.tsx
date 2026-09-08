import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  subtext?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  subtext,
  className = '',
}) => {
  return (
    <div className={`p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between text-left ${className}`}>
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
        <span className="truncate">{label}</span>
        {change && (
          <span className="flex items-center gap-0.5 text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
            <TrendingUp className="w-2.5 h-2.5" />
            <span>{change}</span>
          </span>
        )}
      </div>

      <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tracking-tight">
        {value}
      </div>

      {subtext && (
        <div className="text-[11px] text-slate-400 mt-1 leading-snug">
          {subtext}
        </div>
      )}
    </div>
  );
};
