import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, User, Sparkles } from 'lucide-react';
import { DemoBadge } from './DemoBadge';

interface CalendarMockupProps {
  title?: string;
  hostName?: string;
  duration?: string;
  className?: string;
}

export const CalendarMockup: React.FC<CalendarMockupProps> = ({
  title = 'System Architecture & Scope Review',
  hostName = 'Senior Systems Architect (IGRYbuilds)',
  duration = '20 mins',
  className = '',
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(3);
  const [selectedSlot, setSelectedSlot] = useState<string>('14:30');
  const [booked, setBooked] = useState<boolean>(false);

  const days = [
    { day: 'Mon', date: 14 },
    { day: 'Tue', date: 15 },
    { day: 'Wed', date: 16 },
    { day: 'Thu', date: 17 },
    { day: 'Fri', date: 18 },
  ];

  const slots = ['09:30', '11:00', '13:15', '14:30', '16:00', '17:30'];

  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-white shadow-lg p-4 sm:p-5 flex flex-col text-slate-800 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="font-semibold text-xs sm:text-sm text-slate-900">{title}</h4>
          </div>
          <p className="text-[11px] text-slate-500 flex items-center gap-2">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3 text-slate-400" />
              {hostName}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {duration}
            </span>
          </p>
        </div>
        <DemoBadge label="LIVE CALENDAR ENGINE" className="text-[9px]" />
      </div>

      {/* Date selector strip */}
      <div className="my-3">
        <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1.5">
          Select Date
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((d, idx) => (
            <button
              key={d.date}
              onClick={() => {
                setSelectedDay(idx);
                setBooked(false);
              }}
              className={`py-2 px-1 rounded-xl text-center transition-all border ${
                selectedDay === idx
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-[9px] font-mono uppercase opacity-80">{d.day}</div>
              <div className="text-xs font-bold mt-0.5">{d.date}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Slots grid */}
      <div className="my-2">
        <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1.5">
          Available Time Windows (Auto-Synced)
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {slots.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSelectedSlot(s);
                setBooked(false);
              }}
              className={`py-1.5 px-2 rounded-lg text-xs font-mono font-medium transition-all border ${
                selectedSlot === s
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-500 ring-1 ring-emerald-400 font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Confirmation preview box */}
      <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
        {booked ? (
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Appointment confirmed for {days[selectedDay].day} {days[selectedDay].date} at {selectedSlot}. Calendar invite dispatched.</span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-600">
              Selected: <strong className="text-slate-900">{days[selectedDay].day} {days[selectedDay].date} at {selectedSlot}</strong>
            </div>
            <button
              onClick={() => setBooked(true)}
              className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-2xs"
            >
              Confirm Slot
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
