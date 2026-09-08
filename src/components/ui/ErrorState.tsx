import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'System Interaction Interrupted',
  message = 'An unexpected network error occurred while reaching the data layer. Your local session is safe.',
  onRetry,
  retryLabel = 'Retry Connection',
}) => {
  return (
    <div className="p-6 rounded-2xl bg-rose-50/80 border border-rose-200 text-left space-y-3" role="alert">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-rose-900">{title}</h4>
          <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">{message}</p>
        </div>
      </div>

      {onRetry && (
        <div className="pt-1">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-semibold transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{retryLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
};
