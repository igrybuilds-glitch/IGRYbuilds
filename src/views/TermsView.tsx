import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { AppRoute } from '../types';

interface TermsViewProps {
  navigate: (route: AppRoute) => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ navigate }) => {
  return (
    <div id="terms-of-service-view" className="pt-32 pb-24 bg-[#F8FAFC]">
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
            <Lock className="w-4 h-4" />
            <span>COMMERCIAL ENGAGEMENT TERMS</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-[#0F172A]">
            Terms of Service & Client Engagement Standards
          </h1>
          <p className="text-xs font-mono text-[#64748B]">
            Effective Date: September 2026 • Version 1.2
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#475569] leading-relaxed bg-white border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-sm">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              1. Engagement Model & Scope of Work
            </h2>
            <p>
              IGRYbuilds provides custom software development, AI agent configuration, and business automation engineering under fixed-scope sprint agreements. Each project begins with an executed Statement of Work (SOW) defining milestones, specific deliverables, and delivery schedules.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              2. 100% Intellectual Property & Code Ownership
            </h2>
            <p>
              Unlike agencies that enforce proprietary SaaS lock-in or recurring template licenses, IGRYbuilds transfers complete ownership of all custom code, automation workflows, AI agent knowledge bases, and visual assets to the client upon full payment of the agreed milestone invoices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              3. Milestone Approvals & Revisions
            </h2>
            <p>
              Each phase (e.g. Phase 02 Architecture Blueprint, Phase 04 QA & Stress Testing) includes designated review windows and two revision cycles to confirm that deliverables match the agreed technical specifications before deployment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              4. Service Level Commitments & 30-Day Launch Warranty
            </h2>
            <p>
              Every production deployment includes a standard 30-day hyper-care warranty. If any code defect, broken API endpoint, or webhook failure arises that was within the agreed scope of work, IGRYbuilds rectifies the issue with priority SLA turnaround at zero additional cost.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              5. Third-Party Platform Terms & Cloud Costs
            </h2>
            <p>
              Clients maintain their own accounts for third-party services (such as OpenAI/Gemini API, Vapi, Twilio, WhatsApp Business Cloud, Supabase, and CRM platforms). Direct usage fees from those providers are billed directly to the client's respective accounts with zero agency markup.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              6. Governing Law & Dispute Resolution
            </h2>
            <p>
              Agreements are interpreted and governed according to applicable corporate commercial laws. In the rare event of a dispute, parties agree to undertake 30 days of good-faith senior executive negotiation before initiating formal arbitration.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
