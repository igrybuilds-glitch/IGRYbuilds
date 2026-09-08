import React from 'react';
import { Sparkles, Info } from 'lucide-react';

interface DemoBadgeProps {
  label?: string;
  variant?: 'concept' | 'demo' | 'simulation';
  className?: string;
  showTooltip?: boolean;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({
  label,
  variant = 'concept',
  className = '',
  showTooltip = false,
}) => {
  const displayLabel = label || (
    variant === 'concept' ? 'CONCEPT PROJECT' :
    variant === 'demo' ? 'DEMO AUTOMATION' :
    'SIMULATION'
  );

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-50/90 text-indigo-700 border border-indigo-200/90 shadow-2xs ${className}`}
      title={showTooltip ? 'Demonstrative architecture engineered by IGRYbuilds to exhibit workflow capabilities.' : undefined}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
      <span>{displayLabel}</span>
      {showTooltip && <Info className="w-3 h-3 text-indigo-400 ml-0.5" />}
    </span>
  );
};
