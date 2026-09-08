import React, { useState, useEffect } from 'react';
import { X, Activity, Radio, Trash2, Cpu, CheckCircle } from 'lucide-react';
import { AnalyticsEvent } from '../../types';
import { subscribeAnalytics } from '../../lib/analytics';

interface TelemetryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelemetryDrawer: React.FC<TelemetryDrawerProps> = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeAnalytics((updatedEvents) => {
      setEvents(updatedEvents);
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  return (
    <div
      id="telemetry-drawer-modal"
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-label="Real-time Telemetry Monitor"
    >
      <div 
        className="w-full max-w-md h-full bg-white border-l border-slate-200 p-6 flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#4F46E5]" />
            <div>
              <h3 className="font-mono text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                Live Event Telemetry
              </h3>
              <p className="text-[11px] font-mono text-[#64748B]">
                Real-time conversion event stream
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-[#64748B] hover:text-[#0F172A] transition-colors"
            aria-label="Close Telemetry"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* System Health Overview */}
        <div className="py-4 border-b border-slate-200 grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[#64748B] block text-[10px] font-semibold">API ENGINE</span>
            <div className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
              <span>ONLINE (200 OK)</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[#64748B] block text-[10px] font-semibold">EVENTS DISPATCHED</span>
            <div className="text-[#0F172A] font-bold">
              {events.length} logs
            </div>
          </div>
        </div>

        {/* Event Stream List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2.5 pr-1 font-mono text-xs">
          {events.length === 0 ? (
            <div className="text-center py-12 text-[#64748B] space-y-2">
              <Radio className="w-8 h-8 mx-auto text-slate-300 animate-pulse" />
              <p>No events recorded yet. Click CTAs or switch routes to fire telemetry.</p>
            </div>
          ) : (
            events.map((ev) => (
              <div
                key={ev.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-[#4F46E5] font-bold">
                    {ev.type}
                  </span>
                  <span className="text-[#64748B] text-[10px]">{ev.timestamp}</span>
                </div>
                <div className="text-[#0F172A] text-[11px] truncate">
                  Route: <span className="text-[#64748B]">{ev.route}</span>
                </div>
                {ev.metadata && Object.keys(ev.metadata).length > 0 && (
                  <pre className="text-[10px] text-[#475569] bg-white border border-slate-200 p-2 rounded-lg mt-1 overflow-x-auto">
                    {JSON.stringify(ev.metadata, null, 2)}
                  </pre>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-slate-200 text-[11px] font-mono text-[#64748B] flex items-center justify-between">
          <span>Taxonomy: PRD Section 5.5</span>
          <span className="text-[#4F46E5] font-bold">Client + Server Sync</span>
        </div>
      </div>
    </div>
  );
};
