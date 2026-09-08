import React from 'react';
import { ArrowLeft, Compass, Home, Layers, MessageSquare } from 'lucide-react';
import { AppRoute } from '../types';
import { openWhatsApp } from '../lib/whatsapp';

interface NotFoundViewProps {
  navigate: (route: AppRoute) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ navigate }) => {
  return (
    <div id="not-found-view" className="pt-36 pb-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
            ERROR 404 • UNMAPPED SYSTEM ROUTE
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
            This endpoint is not in our system registry.
          </h1>
          <p className="text-sm text-[#475569] max-w-lg mx-auto leading-relaxed">
            The page or resource you requested does not exist or has been moved to an updated architectural path. Use the primary system routing below to continue.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Systems Index</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/services')}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-mono text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>Explore 4 Core Systems</span>
          </button>

          <button
            type="button"
            onClick={() => openWhatsApp('general', '404 Recovery Help')}
            className="px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-mono text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Contact on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
