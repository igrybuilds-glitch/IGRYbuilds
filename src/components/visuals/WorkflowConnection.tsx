import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

interface WorkflowConnectionProps {
  direction?: 'horizontal' | 'vertical';
  label?: string;
  active?: boolean;
  className?: string;
}

export const WorkflowConnection: React.FC<WorkflowConnectionProps> = ({
  direction = 'horizontal',
  label,
  active = true,
  className = '',
}) => {
  if (direction === 'vertical') {
    return (
      <div className={`flex flex-col items-center justify-center my-1.5 ${className}`}>
        <div className="w-[2px] h-6 bg-slate-300 relative overflow-hidden">
          {active && (
            <div className="absolute inset-x-0 top-0 h-3 bg-indigo-500 animate-[bounce_1.5s_infinite]" />
          )}
        </div>
        <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
        {label && (
          <span className="text-[9px] font-mono text-slate-400 mt-0.5 bg-slate-100 px-1.5 py-0.5 rounded">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`hidden lg:flex items-center justify-center px-1 ${className}`}>
      <div className="h-[2px] w-8 bg-slate-300 relative overflow-hidden flex items-center">
        {active && (
          <div className="h-full w-4 bg-indigo-500 rounded-full animate-pulse" />
        )}
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-slate-400 -ml-1" />
    </div>
  );
};
