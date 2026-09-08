import React from 'react';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { AppRoute } from '../types';

interface PrivacyViewProps {
  navigate: (route: AppRoute) => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ navigate }) => {
  return (
    <div id="privacy-policy-view" className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#64748B] hover:text-[#4F46E5] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4F46E5] uppercase tracking-wider font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-[#0F172A]">
            Privacy Policy & Data Retention Standards
          </h1>
          <p className="text-xs font-mono text-[#64748B]">
            Effective Date: September 2026 • Version 1.2
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#475569] leading-relaxed bg-white border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-sm">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              1. Core Philosophy & Data Minimization
            </h2>
            <p>
              IGRYbuilds operates on a strict principle of data minimization. We only collect information strictly required to evaluate your project brief, architect your system, and execute authorized engineering agreements. We do not sell, rent, monetize, or broker corporate lead data under any circumstances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              2. Information We Collect
            </h2>
            <p>When you submit a Smart Project Brief or contact our studio, we collect:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li><strong className="text-[#0F172A]">Contact Parameters:</strong> Full name, company name, corporate email, and optional phone/WhatsApp number.</li>
              <li><strong className="text-[#0F172A]">Project Context:</strong> Stated business bottlenecks, desired system modules, investment ranges, and target deployment timeframes.</li>
              <li><strong className="text-[#0F172A]">Technical Metadata:</strong> Anonymized interaction event telemetry (e.g. CTA clicks, route changes) to measure funnel performance.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              3. Purpose & Legal Basis of Processing
            </h2>
            <p>
              We process your parameters solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Prepare custom architectural diagrams and commercial proposals.</li>
              <li>Coordinate 30-minute discovery calls and milestone delivery sprints.</li>
              <li>Monitor web application security, rate-limiting, and prevent spam abuse.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              4. Lead Retention & Deletion Policy
            </h2>
            <p>
              In accordance with Section 05.6 of our specifications, inquiry records that do not transition into active client engagements are archived and permanently scrubbed from our systems after 180 days. You may request immediate deletion of your data at any time by emailing <strong className="text-[#0F172A]">igrybuilds@gmail.com</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              5. Security Standards
            </h2>
            <p>
              All data transmissions are encrypted using Transport Layer Security (TLS 1.3). Access to our internal database and lead endpoints is restricted by least-privilege identity access controls. We never store client credentials or private API keys in client-accessible application bundles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              6. Contact Information
            </h2>
            <p>
              For inquiries regarding our data handling or GDPR/CCPA rights, contact our Data Protection Officer at:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-[#0F172A]">
              <div>IGRYbuilds Digital Systems Studio</div>
              <div>Email: igrybuilds@gmail.com</div>
              <div>Subject: Privacy & Data Request</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
