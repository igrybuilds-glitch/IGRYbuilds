import React, { useState, useEffect } from 'react';
import { Check, Sparkles, RotateCcw, ShieldCheck, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import { useMotionPreference } from '../../context/MotionContext';

export interface SuccessCheckmarkProps {
  size?: 'sm' | 'md' | 'lg';
  showRipples?: boolean;
  showParticles?: boolean;
  className?: string;
  onReplay?: () => void;
}

/**
 * Pure CSS/SVG Animated Checkmark
 * Uses stroke-dasharray & stroke-dashoffset with cubic-bezier physics.
 * Automatically respects reduced-motion preferences.
 */
export const SuccessCheckmark: React.FC<SuccessCheckmarkProps> = ({
  size = 'md',
  showRipples = true,
  showParticles = true,
  className = '',
  onReplay,
}) => {
  const { reducedMotion } = useMotionPreference();
  const [animKey, setAnimKey] = useState<number>(0);

  const handleReplay = () => {
    setAnimKey((prev) => prev + 1);
    if (onReplay) onReplay();
  };

  const dimensions = {
    sm: { box: 'w-12 h-12', svg: 48, radius: 20, stroke: 3, checkD: 'M15 25 L21 31 L33 19' },
    md: { box: 'w-16 h-16', svg: 64, radius: 28, stroke: 3.5, checkD: 'M20 33 L28 41 L44 25' },
    lg: { box: 'w-20 h-20', svg: 80, radius: 35, stroke: 4, checkD: 'M25 41 L35 51 L55 31' },
  }[size];

  // Circle circumference: 2 * pi * r
  const circumference = Math.round(2 * Math.PI * dimensions.radius);

  return (
    <div
      key={animKey}
      className={`relative inline-flex items-center justify-center ${dimensions.box} ${className}`}
      onClick={handleReplay}
      role="status"
      aria-label="Submission confirmed successfully"
    >
      {/* Outer subtle ripple rings */}
      {showRipples && !reducedMotion && (
        <>
          <div
            className="absolute inset-0 rounded-full bg-emerald-400/20 animate-checkmark-ripple pointer-events-none"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="absolute inset-0 rounded-full bg-emerald-500/15 animate-checkmark-ripple pointer-events-none"
            style={{ animationDelay: '600ms' }}
          />
        </>
      )}

      {/* Radial soft background ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/15 via-emerald-400/10 to-teal-400/20 blur-sm pointer-events-none" />

      {/* Main SVG with stroke draw animations */}
      <svg
        width={dimensions.svg}
        height={dimensions.svg}
        viewBox={`0 0 ${dimensions.svg} ${dimensions.svg}`}
        className="relative z-10 drop-shadow-sm"
      >
        <defs>
          <linearGradient id={`checkGrad-${size}-${animKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#10B981" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Muted background track ring */}
        <circle
          cx={dimensions.svg / 2}
          cy={dimensions.svg / 2}
          r={dimensions.radius}
          fill="rgba(240, 253, 244, 0.95)"
          stroke="#E2E8F0"
          strokeWidth={dimensions.stroke}
          className="transition-colors"
        />

        {/* Animated animated circular stroke */}
        <circle
          cx={dimensions.svg / 2}
          cy={dimensions.svg / 2}
          r={dimensions.radius}
          fill="none"
          stroke={`url(#checkGrad-${size}-${animKey})`}
          strokeWidth={dimensions.stroke}
          strokeLinecap="round"
          transform={`rotate(-90 ${dimensions.svg / 2} ${dimensions.svg / 2})`}
          style={
            reducedMotion
              ? { strokeDasharray: circumference, strokeDashoffset: 0 }
              : {
                  strokeDasharray: circumference,
                  strokeDashoffset: circumference,
                  animation: 'checkmark-circle 0.65s cubic-bezier(0.65, 0, 0.45, 1) forwards',
                }
          }
        />

        {/* Animated checkmark stem */}
        <path
          d={dimensions.checkD}
          fill="none"
          stroke="#059669"
          strokeWidth={dimensions.stroke + 0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            reducedMotion
              ? { strokeDasharray: 60, strokeDashoffset: 0 }
              : {
                  strokeDasharray: 60,
                  strokeDashoffset: 60,
                  animation: 'checkmark-stem 0.55s 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                }
          }
        />
      </svg>

      {/* Delicate floating sparks (4 satellite dots) */}
      {showParticles && !reducedMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <span
            className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-checkmark-sparkle"
            style={{ animationDelay: '420ms' }}
          />
          <span
            className="absolute bottom-1 left-0 w-1.5 h-1.5 rounded-full bg-teal-400 animate-checkmark-sparkle"
            style={{ animationDelay: '520ms' }}
          />
          <span
            className="absolute top-2 left-1 w-1 h-1 rounded-full bg-emerald-300 animate-checkmark-sparkle"
            style={{ animationDelay: '600ms' }}
          />
          <span
            className="absolute bottom-2 right-1 w-1 h-1 rounded-full bg-indigo-400 animate-checkmark-sparkle"
            style={{ animationDelay: '480ms' }}
          />
        </div>
      )}
    </div>
  );
};

export interface SuccessCheckmarkOverlayProps {
  isVisible: boolean;
  leadId: string;
  businessName: string;
  email: string;
  services: string[];
  timeline?: string;
  onDismiss: () => void;
  onOpenWhatsApp: () => void;
}

/**
 * Overlay component rendered upon successful SmartProjectBrief form submission.
 * Provides immediate feedback with an animated SVG checkmark,
 * transmission timeline indicators, and quick action bridges.
 */
export const SuccessCheckmarkOverlay: React.FC<SuccessCheckmarkOverlayProps> = ({
  isVisible,
  leadId,
  businessName,
  email,
  services,
  timeline,
  onDismiss,
  onOpenWhatsApp,
}) => {
  const { reducedMotion } = useMotionPreference();
  const [replayCount, setReplayCount] = useState<number>(0);
  const [stepIndex, setStepIndex] = useState<number>(1);

  // Progressive verification ticker: simulates swift verification stages
  useEffect(() => {
    if (!isVisible) {
      setStepIndex(1);
      return;
    }

    if (reducedMotion) {
      setStepIndex(3);
      return;
    }

    const t1 = setTimeout(() => setStepIndex(2), 350);
    const t2 = setTimeout(() => setStepIndex(3), 850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isVisible, reducedMotion, replayCount]);

  if (!isVisible) return null;

  return (
    <div
      id="project-brief-success-overlay"
      className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 sm:p-8 bg-white/95 backdrop-blur-md text-center animate-checkmark-pop overflow-y-auto"
      role="alert"
      aria-live="polite"
    >
      <div className="w-full max-w-lg space-y-6 my-auto">
        {/* Animated Checkmark Hero */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative group cursor-pointer" onClick={() => setReplayCount((c) => c + 1)}>
            <SuccessCheckmark
              key={replayCount}
              size="lg"
              showRipples={true}
              showParticles={true}
            />
            {/* Subtle replay helper on hover */}
            <div className="absolute -bottom-2 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-mono bg-slate-800 text-white px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <RotateCcw className="w-2.5 h-2.5" /> Replay
              </span>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>TRANSMISSION CONFIRMED • REF: {leadId}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Your System Brief is Logged.
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
              Requirements received for <strong className="text-[#0F172A]">{businessName || 'your organization'}</strong>.
              Technical architecture and turnaround quote are being routed to{' '}
              <strong className="text-[#0F172A]">{email}</strong>.
            </p>
          </div>
        </div>

        {/* Verification Pipeline Ticker */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2 text-xs font-mono">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            System Dispatch Pipeline:
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stepIndex >= 1 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              Payload Encrypted & Structured
            </span>
            <span className="text-emerald-700 font-bold">VERIFIED ✓</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stepIndex >= 2 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              Assigned to Lead Architect
            </span>
            <span className={stepIndex >= 2 ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
              {stepIndex >= 2 ? 'CONFIRMED ✓' : 'PROCESSING...'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${stepIndex >= 3 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              Turnaround SLA (Under 24h)
            </span>
            <span className={stepIndex >= 3 ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
              {stepIndex >= 3 ? 'ACTIVE ✓' : 'QUEUED'}
            </span>
          </div>
        </div>

        {/* Selected Parameters Summary */}
        <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-left text-xs font-mono text-indigo-950 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-indigo-600 font-semibold">Scope:</span>{' '}
            <span>{services.length > 0 ? services.join(', ') : 'Custom Architecture'}</span>
          </div>
          {timeline && (
            <div>
              <span className="text-indigo-600 font-semibold">Timeline:</span> <span>{timeline}</span>
            </div>
          )}
        </div>

        {/* Interactive Next Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            id="overlay-whatsapp-confirm-btn"
            onClick={onOpenWhatsApp}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20 active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Confirm Instantly via WhatsApp</span>
          </button>

          <button
            type="button"
            id="overlay-view-receipt-btn"
            onClick={onDismiss}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Review Full Receipt</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
