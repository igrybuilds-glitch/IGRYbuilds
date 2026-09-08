import React from 'react';
import { Database } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records in queue',
  description = 'No items matched your current filter criteria.',
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="py-12 px-6 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 mx-auto flex items-center justify-center">
        {icon || <Database className="w-6 h-6 text-slate-400" />}
      </div>
      <div className="space-y-1">
        <h4 className="text-base font-bold text-[#0F172A]">{title}</h4>
        <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <div>
          <button
            type="button"
            onClick={onAction}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 font-mono text-xs font-semibold transition-colors"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};
