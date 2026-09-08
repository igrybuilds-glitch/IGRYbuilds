import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Search } from 'lucide-react';
import { generalFAQs, FAQItem } from '../../data/faqData';
import { openWhatsApp } from '../../lib/whatsapp';
import { trackEvent } from '../../lib/analytics';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-1', 'faq-3']));
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'General', 'Engineering', 'Pricing', 'AI & Automation'];

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        trackEvent('cta_click', { cta_id: 'expand_faq', faq_id: id });
      }
      return next;
    });
  };

  const filteredFAQs = generalFAQs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq-section" className="py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll direction="up" distance={24} className="mb-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#4F46E5] font-semibold">
              QUESTIONS & OBJECTIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Direct answers. <br />
              Zero agency ambiguity.
            </h2>
            <p className="text-base text-[#475569]">
              Everything you need to know about our engineering standards, project delivery, intellectual property ownership, and integration safety.
            </p>
          </div>
        </RevealOnScroll>

        {/* Filter and Search Bar */}
        <RevealOnScroll direction="up" distance={20} delay={80} className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold shadow-xs'
                      : 'bg-white text-[#475569] hover:text-[#0F172A] border border-slate-200 shadow-xs'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-indigo-400 text-xs shadow-xs"
              />
            </div>
          </div>
        </RevealOnScroll>

        {/* FAQ Accordion List */}
        <RevealOnScroll direction="up" distance={20} delay={120}>
          <div className="space-y-3">
            {filteredFAQs.map((faq) => {
              const isOpen = openIds.has(faq.id);
              return (
                <div
                  key={faq.id}
                  id={faq.id}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-colors hover:border-slate-300"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono uppercase text-[#4F46E5] font-semibold hidden sm:inline">
                        [{faq.category}]
                      </span>
                      <span className="text-base font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`p-1 rounded-full bg-slate-100 text-[#475569] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 bg-indigo-50 text-[#4F46E5]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-0 text-sm text-[#475569] leading-relaxed border-t border-slate-200 mt-2">
                      <div className="pt-4">{faq.answer}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Unanswered Questions Box */}
        <RevealOnScroll direction="up" distance={20} delay={150} className="mt-12">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="text-sm font-bold text-[#0F172A]">
                Have a specific technical question about your stack?
              </div>
              <p className="text-xs text-[#475569] mt-0.5">
                Chat directly with our engineering lead on WhatsApp for instant technical validation.
              </p>
            </div>
            <button
              onClick={() => openWhatsApp('general', 'FAQ Help')}
              className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 text-xs font-semibold text-[#0F172A] hover:text-[#4F46E5] flex items-center gap-2 transition-colors shrink-0 shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
