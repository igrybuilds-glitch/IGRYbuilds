import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  carrierTime?: string;
  theme?: 'light' | 'dark';
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  className = '',
  carrierTime = '9:41',
  theme = 'light',
}) => {
  return (
    <div className={`relative mx-auto w-full max-w-[320px] rounded-[36px] p-3 bg-slate-900 border-4 border-slate-800 shadow-2xl shadow-slate-950/20 ${className}`}>
      {/* Device Side Buttons */}
      <div className="absolute -left-[7px] top-24 w-[3px] h-8 bg-slate-700 rounded-l-sm" />
      <div className="absolute -left-[7px] top-36 w-[3px] h-10 bg-slate-700 rounded-l-sm" />
      <div className="absolute -right-[7px] top-28 w-[3px] h-12 bg-slate-700 rounded-r-sm" />

      {/* Screen Container */}
      <div className={`relative w-full rounded-[28px] overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        {/* Dynamic Island / Status Bar */}
        <div className="pt-2 px-5 pb-1 flex items-center justify-between text-[11px] font-semibold select-none z-20">
          <span className="font-mono">{carrierTime}</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-800" />
          </div>
          <div className="flex items-center gap-1">
            <Signal className="w-3 h-3 text-slate-400" />
            <Wifi className="w-3 h-3 text-slate-400" />
            <BatteryMedium className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Screen Viewport */}
        <div className="relative flex-1 min-h-[460px] overflow-y-auto">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="py-2 flex justify-center z-20">
          <div className="w-28 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
