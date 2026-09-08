import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading system parameters...',
  subtext = 'Connecting to real-time telemetry buffer',
  size = 'md',
}) => {
  const spinnerSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-10 h-10' : 'w-7 h-7';

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3" role="status" aria-live="polite">
      <Loader2 className={`${spinnerSize} text-[#4F46E5] animate-spin`} />
      <div>
        <p className="text-sm font-semibold text-[#0F172A]">{message}</p>
        {subtext && <p className="text-xs text-[#64748B] mt-0.5">{subtext}</p>}
      </div>
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
};
