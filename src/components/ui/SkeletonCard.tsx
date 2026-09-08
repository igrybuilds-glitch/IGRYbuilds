import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
        <div className="h-4 w-16 bg-slate-200 rounded-full"></div>
      </div>
      <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
      <div className="space-y-2">
        <div className="h-3.5 w-full bg-slate-100 rounded"></div>
        <div className="h-3.5 w-5/6 bg-slate-100 rounded"></div>
      </div>
      <div className="pt-4 grid grid-cols-2 gap-3 border-t border-slate-100">
        <div className="h-10 bg-slate-100 rounded-xl"></div>
        <div className="h-10 bg-slate-100 rounded-xl"></div>
      </div>
    </div>
  );
};
