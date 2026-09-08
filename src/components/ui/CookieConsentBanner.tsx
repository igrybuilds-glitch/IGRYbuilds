import React, { useState, useEffect } from 'react';
import { Shield, Check, X } from 'lucide-react';
import { AppRoute } from '../../types';

const CONSENT_KEY = 'igry_cookie_consent';

interface CookieConsentBannerProps {
  navigate: (route: AppRoute) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ navigate }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        setShow(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'all');
    } catch {
      // Ignore
    }
    setShow(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'essential');
    } catch {
      // Ignore
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="region"
      aria-label="Privacy and Cookie Choices"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl bg-white border border-slate-300 shadow-2xl space-y-3"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5] shrink-0 mt-0.5">
          <Shield className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase text-[#4F46E5] font-semibold tracking-wider">
            DATA MINIMIZATION & COOKIES
          </div>
          <p className="text-xs text-[#475569] leading-relaxed">
            We use strictly essential session tokens and anonymous interaction telemetry to assess funnel performance. We never sell data or deploy intrusive third-party ad pixels.{' '}
            <button
              onClick={() => navigate('/privacy')}
              className="text-[#4F46E5] font-semibold underline underline-offset-2 hover:text-indigo-800"
            >
              Read our Privacy Policy
            </button>.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleAccept}
          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-mono text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Accept Telemetry</span>
        </button>
        <button
          type="button"
          onClick={handleEssentialOnly}
          className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-mono text-xs font-semibold transition-colors"
        >
          Essential Only
        </button>
      </div>
    </div>
  );
};
