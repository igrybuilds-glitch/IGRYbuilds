import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, Volume2, UserCheck, CalendarCheck, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { DemoBadge } from './DemoBadge';

interface CallMockupProps {
  callerName?: string;
  agentName?: string;
  className?: string;
  autoPlay?: boolean;
}

export const CallMockup: React.FC<CallMockupProps> = ({
  callerName = 'Dr. Julian Vance (Private Inbound)',
  agentName = 'IGRY Clinical Intake AI',
  className = '',
  autoPlay = true,
}) => {
  const [seconds, setSeconds] = useState<number>(38);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setSeconds((prev) => (prev >= 60 ? 38 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `0${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-2xl p-5 flex flex-col justify-between overflow-hidden relative ${className}`}>
      {/* Background radial accent */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telephony Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
            CALL ACTIVE
          </span>
          <span className="font-mono text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {formatTimer(seconds)}
          </span>
        </div>
        <DemoBadge label="SIMULATION" className="bg-slate-900 text-slate-300 border-slate-800 text-[9px]" />
      </div>

      {/* Caller & Voice Frequency Visualizer */}
      <div className="my-5 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-emerald-500 p-0.5 mb-3 shadow-lg shadow-indigo-500/20">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
            <Volume2 className="w-7 h-7 text-indigo-400 animate-pulse" />
          </div>
        </div>

        <h4 className="font-semibold text-sm text-slate-100">{callerName}</h4>
        <p className="text-[11px] text-slate-400 font-mono mt-0.5">{agentName} (Sub-600ms latency)</p>

        {/* Dynamic audio waveform bars */}
        <div className="flex items-center justify-center gap-1 my-4 h-8">
          {[40, 75, 95, 60, 30, 85, 100, 70, 45, 80, 90, 35].map((h, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{
                height: `${Math.max(15, (h * (0.6 + ((seconds + i) % 4) * 0.15)))}%`,
              }}
            />
          ))}
        </div>

        {/* Real-time Live Transcript Bubble */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-left shadow-inner">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span>REAL-TIME STREAMING TRANSCRIPTION</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            <strong className="text-indigo-400">Caller:</strong> “I'm looking for a surgical consultation next Thursday.”
            <br />
            <strong className="text-emerald-400">AI Agent:</strong> “Certainly. Dr. Vance has an open clinical intake at 3:15 PM or 4:45 PM. Which fits your schedule?”
          </p>
        </div>
      </div>

      {/* Autonomous System Verification Checklist */}
      <div className="grid grid-cols-3 gap-2 bg-slate-900/60 border border-slate-800/80 rounded-xl p-2.5 mb-4">
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Lead Qualified</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
          <CalendarCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Booked ✓</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>CRM Updated</span>
        </div>
      </div>

      {/* Call Actions */}
      <div className="flex items-center justify-center gap-4 pt-1">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isMuted ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          title="Toggle Mute"
        >
          <Mic className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 cursor-pointer hover:bg-rose-700 transition-colors">
          <PhoneOff className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
