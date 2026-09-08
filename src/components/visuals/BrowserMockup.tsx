import React from 'react';
import { Lock, RotateCw, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

interface BrowserMockupProps {
  url?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  badge?: string;
  aspect?: string;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  url = 'https://igrybuilds.systems',
  title = 'System Interface',
  children,
  className = '',
  badge,
}) => {
  return (
    <div className={`rounded-2xl border border-slate-300/80 bg-white shadow-xl shadow-slate-900/5 overflow-hidden flex flex-col ${className}`}>
      {/* Browser Chrome Header */}
      <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between gap-3 select-none">
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80 border border-rose-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 border border-amber-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 border border-emerald-500/40" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-2 px-3 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-600 shadow-2xs">
          <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
          <span className="truncate text-slate-800 font-medium">{url}</span>
          <span className="text-slate-400 shrink-0 hidden sm:inline">200 OK</span>
        </div>

        {/* Right actions / badge */}
        <div className="flex items-center gap-2">
          {badge && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {badge}
            </span>
          )}
          <RotateCw className="w-3 h-3 text-slate-400 hidden md:inline" />
        </div>
      </div>

      {/* Viewport Content */}
      <div className="relative flex-1 bg-white overflow-hidden">
        {children}
      </div>
    </div>
  );
};
