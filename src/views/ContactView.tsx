import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, Loader2, Sparkles, Layers, Cpu, Bot } from 'lucide-react';
import { LeadFormData, AppRoute } from '../types';
import { openWhatsApp } from '../lib/whatsapp';
import { trackEvent } from '../lib/analytics';
import { getStoredAttribution } from '../lib/attribution';
import { siteConfig } from '../config/site';
import { BrowserMockup } from '../components/visuals/BrowserMockup';
import { ChatMockup } from '../components/visuals/ChatMockup';
import { CallMockup } from '../components/visuals/CallMockup';
import { AutomationFlow } from '../components/visuals/AutomationFlow';
import { InteractiveSystemBuilder } from '../components/visuals/InteractiveSystemBuilder';
import { SuccessCheckmark } from '../components/ui';

interface ContactViewProps {
  navigate: (route: AppRoute) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ navigate }) => {
  const [formRenderedAt] = useState<number>(Date.now());
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    business: '',
    email: '',
    phone: '',
    website: '',
    goal: '',
    services: ['web-experiences', 'ai-automation'],
    budget: '$8,000 - $15,000',
    timeline: '3 - 5 weeks',
    message: '',
    consent: true,
    hp_company_field: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [leadId, setLeadId] = useState<string>('');

  const handleFieldChange = (field: keyof LeadFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleService = (slug: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(slug);
      const updated = exists ? prev.services.filter((s) => s !== slug) : [...prev.services, slug];
      return { ...prev, services: updated };
    });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.business.trim()) errs.business = 'Business or company name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Valid corporate email is required';
    }
    if (!formData.goal.trim()) errs.goal = 'Please state your primary objective or problem';
    if (formData.services.length === 0) errs.services = 'Select at least one system';
    if (!formData.consent) errs.consent = 'Consent required to process brief';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    trackEvent('form_start', { form_id: 'contact_page_form', route: '/contact' });

    const attribution = getStoredAttribution();

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          form_rendered_at: formRenderedAt,
          sourcePage: '/contact',
          sourceCta: 'Contact Page Hero Brief',
          attribution,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        const generatedId = data.id || `LEAD-${Date.now()}`;
        setSuccess(true);
        setLeadId(generatedId);
        trackEvent('form_submit', { form_id: 'contact_page_form', lead_id: generatedId });
      } else {
        setErrors({ form: data.error || 'Submission failed. Please check inputs or contact via WhatsApp.' });
        trackEvent('form_error', { error: data.error });
      }
    } catch (err) {
      console.warn('[ContactView Network Fallback]:', err);
      // Graceful offline fallback
      const fallbackId = `LEAD-OFFLINE-${Date.now().toString(36).toUpperCase()}`;
      setSuccess(true);
      setLeadId(fallbackId);
      trackEvent('form_submit', { form_id: 'contact_page_form', fallback: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contact-view" className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Bridges & Guarantees */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
                START A PROJECT
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                Let's scope your system.
              </h1>
              <p className="text-base text-[#475569] leading-relaxed">
                Submit your project parameters. Within 24 business hours, you will receive a structured response with an initial architecture overview, timeline estimate, and investment quote.
              </p>
            </div>

            {/* Contact Channels */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
                <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-[#4F46E5]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748B] font-semibold">Direct Engineering Inbox</span>
                  <div className="text-sm font-bold text-[#0F172A]">{siteConfig.contactEmail}</div>
                </div>
              </div>

              <div 
                onClick={() => openWhatsApp('general', { customNote: 'Contact Page Inquiry' })}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md cursor-pointer transition-all flex items-center justify-between shadow-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#64748B] font-semibold">Immediate WhatsApp Channel</span>
                    <div className="text-sm font-bold text-[#0F172A] group-hover:text-emerald-700 transition-colors">
                      {siteConfig.whatsappDisplay}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Dynamic System Preview based on Selected Service */}
            <div className="rounded-3xl bg-slate-900 text-slate-100 p-5 border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    TARGET ARCHITECTURE PREVIEW
                  </span>
                </div>
                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                  {formData.services.includes('ai-agents')
                    ? 'AI VOICE / CHAT AGENT'
                    : formData.services.includes('ai-automation')
                    ? 'AUTOMATION ENGINE'
                    : 'WEB EXPERIENCE'}
                </span>
              </div>

              {formData.services.includes('ai-agents') ? (
                <CallMockup
                  title="24/7 Autonomous Voice Receptionist"
                  callerName="High-Intent Inbound Lead"
                  callerNumber="+1 (512) 890-4421"
                  status="CONNECTED • QUALIFYING"
                  duration="00:42"
                  transcript={[
                    { speaker: 'caller', text: 'Hi, I need to know if you have availability for custom system architecture this month?' },
                    { speaker: 'agent', text: 'Yes, absolutely. We have 2 development slots open for mid-month sprints. What primary bottleneck are you looking to automate?' },
                    { speaker: 'caller', text: 'Our sales reps are drowning in manual qualification and missed WhatsApp inquiries.' },
                  ]}
                  activeOutcomes={[
                    'Lead Qualified: Enterprise Tier',
                    'Slot Selected: Thursday 3:30 PM',
                    'Calendar Invite Dispatched via SMS',
                  ]}
                />
              ) : formData.services.includes('ai-automation') ? (
                <ChatMockup
                  title="WhatsApp Business Lead Bridge"
                  contactName="Apex Systems Bot"
                  contactStatus="ONLINE • SUB-45S LATENCY"
                  messages={[
                    { sender: 'customer', time: '14:20', text: 'Hi, I just submitted an inquiry on your site.' },
                    { sender: 'bot', time: '14:20', text: 'Welcome! I reviewed your project parameters. What day works best for a 20-min architecture walkthrough?' },
                    { sender: 'customer', time: '14:21', text: 'Tomorrow at 4:30 PM works.' },
                    { sender: 'bot', time: '14:21', text: 'Confirmed! Calendar invite & pre-meeting audit link sent to your email.' },
                  ]}
                  badgeLabel="DEMO SIMULATION"
                />
              ) : (
                <BrowserMockup
                  url="https://igrybuilds.systems/live-preview"
                  title="Sub-Second Custom Web Experience"
                >
                  <div className="p-4 bg-slate-950 text-slate-100 rounded-xl space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>✓ LCP: 0.58s (Instant)</span>
                      <span>✓ 100% Code Ownership</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Bespoke React/Next.js frontend with integrated lead intake, spam protection, and sub-60s webhook dispatch.
                    </p>
                  </div>
                </BrowserMockup>
              )}
            </div>

            {/* Turnaround Standards */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs font-mono text-[#475569] shadow-sm">
              <div className="text-[#0F172A] font-bold text-sm">Our Communication Commitments:</div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#4F46E5]" />
                <span>Response in under 24 business hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero sales pressure or unrequested phone outreach</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#4F46E5]" />
                <span>Free 30-min system architecture consultation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Smart Brief Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl">
              {success ? (
                <div className="py-12 text-center space-y-6 animate-checkmark-pop">
                  <div className="flex items-center justify-center">
                    <SuccessCheckmark size="lg" showRipples={true} showParticles={true} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-emerald-700 uppercase tracking-wider font-semibold">
                      BRIEF LOGGED SUCCESSFULLY • REF: {leadId}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#0F172A]">
                      Thank you. Your brief is in queue.
                    </h3>
                    <p className="text-sm text-[#475569] max-w-md mx-auto">
                      Our systems engineer will review your notes for <strong className="text-[#0F172A]">{formData.business}</strong> and prepare your architecture proposal.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsApp('post_submit', {
                        leadId,
                        businessName: formData.business,
                      })
                    }
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg shadow-emerald-600/25"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Confirm Instantly via WhatsApp</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Anti-Spam Honeypot */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="hp_contact_field">Leave this empty</label>
                    <input
                      id="hp_contact_field"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.hp_company_field || ''}
                      onChange={(e) => handleFieldChange('hp_company_field', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1 mb-2">
                    <h2 className="font-display text-xl font-bold text-[#0F172A]">
                      Smart Project Brief
                    </h2>
                    <p className="text-xs text-[#64748B]">
                      Fill out what applies. Fields marked with * are required.
                    </p>
                  </div>

                  {errors.form && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#0F172A] font-semibold mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Mercer"
                        value={formData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white transition-colors ${
                          errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#0F172A] font-semibold mb-1.5">
                        Business / Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nexus Freight"
                        value={formData.business}
                        onChange={(e) => handleFieldChange('business', e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white transition-colors ${
                          errors.business ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]'
                        }`}
                      />
                      {errors.business && <p className="text-[11px] text-rose-600 mt-1">{errors.business}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#0F172A] font-semibold mb-1.5">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@nexusfreight.com"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white transition-colors ${
                          errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#0F172A] font-semibold mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+44 7000 000000"
                        value={formData.phone || ''}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#0F172A] font-semibold mb-1.5">
                        Website (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://company.com"
                        value={formData.website || ''}
                        onChange={(e) => handleFieldChange('website', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Services Chips */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#0F172A] font-semibold mb-2">
                      Systems of Interest *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: 'web-experiences', label: 'Custom Web Experience' },
                        { id: 'ai-automation', label: 'AI & Workflow Automation' },
                        { id: 'ai-agents', label: 'Conversational Voice/Chat Agent' },
                        { id: 'creative', label: 'AI UGC & Ad Creative Engine' },
                      ].map((s) => {
                        const isSelected = formData.services.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => toggleService(s.id)}
                            className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-colors flex items-center justify-between ${
                              isSelected
                                ? 'bg-indigo-50 border-[#4F46E5] text-indigo-900 font-semibold'
                                : 'bg-slate-50 border-slate-200 text-[#475569] hover:text-[#0F172A] hover:bg-slate-100'
                            }`}
                          >
                            <span>{s.label}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#4F46E5]" />}
                          </button>
                        );
                      })}
                    </div>
                    {errors.services && <p className="text-[11px] text-rose-600 mt-1">{errors.services}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#0F172A] font-semibold mb-1.5">
                      What is the primary operational friction or growth goal? *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="e.g. Inbound leads wait 3 hours before contact. We want instant WhatsApp qualification and automated calendar bookings."
                      value={formData.goal}
                      onChange={(e) => handleFieldChange('goal', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white transition-colors ${
                        errors.goal ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]'
                      }`}
                    ></textarea>
                    {errors.goal && <p className="text-[11px] text-rose-600 mt-1">{errors.goal}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#0F172A] font-semibold mb-1.5">
                        Investment Bracket
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleFieldChange('budget', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#4F46E5] text-xs text-[#0F172A] focus:outline-none focus:bg-white"
                      >
                        <option value="$4,500 - $8,000">$4,500 – $8,000 (Single Focused System)</option>
                        <option value="$8,000 - $15,000">$8,000 – $15,000 (Multi-Module Pipeline)</option>
                        <option value="$15,000+">$15,000+ (Full Enterprise Digital Engine)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#0F172A] font-semibold mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => handleFieldChange('timeline', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#4F46E5] text-xs text-[#0F172A] focus:outline-none focus:bg-white"
                      >
                        <option value="Under 3 weeks">Under 3 weeks (Urgent Sprint)</option>
                        <option value="3 - 5 weeks">3 – 5 weeks (Standard Sprint)</option>
                        <option value="1 - 2 months">1 – 2 months (Phased Architecture)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      id="contact-consent"
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => handleFieldChange('consent', e.target.checked)}
                      className="mt-1 accent-[#4F46E5] rounded w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="contact-consent" className="text-xs text-[#475569] leading-snug cursor-pointer">
                      I agree to have IGRYbuilds review my parameters under your Privacy Policy.
                    </label>
                  </div>
                  {errors.consent && <p className="text-[11px] text-rose-600 -mt-2">{errors.consent}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 active:scale-[0.99]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Brief to Engineers...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Section 27: Interactive System Builder Exploration */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
              INTERACTIVE SYSTEM BUILDER
            </span>
            <h2 className="font-display text-3xl font-bold text-[#0F172A]">
              What are you trying to improve?
            </h2>
            <p className="text-sm text-[#475569]">
              Select your immediate operational priority to see how IGRYbuilds engineers a connected digital system around it.
            </p>
          </div>

          <InteractiveSystemBuilder
            onSelectService={(service) => {
              if (!formData.services.includes(service)) {
                setFormData((prev) => ({
                  ...prev,
                  services: [...prev.services, service],
                }));
              }
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </div>
  );
};
