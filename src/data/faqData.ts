export interface FAQItem {
  id: string;
  category: 'General' | 'Engineering' | 'Pricing' | 'AI & Automation';
  question: string;
  answer: string;
}

export const generalFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'How is IGRYbuilds different from traditional web agencies or freelance designers?',
    answer: 'Traditional agencies sell aesthetic surface-level mockups on clunky WordPress/Webflow templates and abandon you at launch. IGRYbuilds engineers complete digital systems: we connect your customer-facing high-performance web application directly to autonomous AI qualification agents, instant WhatsApp/voice workflows, and your CRM backend. You do not just get a website; you get an automated business engine that captures demand and removes manual labor.'
  },
  {
    id: 'faq-2',
    category: 'Engineering',
    question: 'Do we own the custom code, workflows, and intellectual property?',
    answer: 'Yes, 100%. Upon project completion, all source code, automation workflows, AI agent prompts, system documentation, and design assets are transferred fully to your organization. We believe in zero proprietary agency lock-in.'
  },
  {
    id: 'faq-3',
    category: 'General',
    question: 'How long does a typical system build take from start to launch?',
    answer: 'A focused flagship system (such as an automated qualification pipeline or bespoke high-conversion web engine) typically ships in 3 to 5 weeks. Because we use modular, production-tested architectures and eliminate bureaucratic bloat, you get into production in weeks, not quarters.'
  },
  {
    id: 'faq-4',
    category: 'AI & Automation',
    question: 'What happens if a tool or API changes or encounters an outage?',
    answer: 'We build enterprise-grade fault tolerance. Every inbound webhook payload is ingested into an immutable queue. If a third-party service like HubSpot, WhatsApp, or Stripe stutters, our system gracefully buffers, retries with exponential backoff, and alerts our monitoring channels without losing a single customer lead.'
  },
  {
    id: 'faq-5',
    category: 'AI & Automation',
    question: 'How do you guarantee that AI agents will not hallucinate or make false promises?',
    answer: 'We enforce strict deterministic guardrails and Retrieval-Augmented Generation (RAG). The agent is mathematically restricted to your verified company documentation, pricing matrices, and service policies. If a user asks an out-of-bounds question, the agent politely notes it will confirm with a human specialist and routes the inquiry.'
  },
  {
    id: 'faq-6',
    category: 'Pricing',
    question: 'How do your project engagements and pricing work?',
    answer: 'We operate on transparent, fixed-scope project agreements based on your business outcomes—never vague hourly billing with surprise overages. Engagements typically range from $4,500 for focused automation pipelines up to $15,000+ for comprehensive multi-system full-stack architectures. We also offer ongoing growth & maintenance retainers.'
  },
  {
    id: 'faq-7',
    category: 'Engineering',
    question: 'Can IGRYbuilds integrate with our existing software stack?',
    answer: 'Yes. We seamlessly interface with HubSpot, Salesforce, Pipedrive, Slack, Stripe, Supabase, Google Workspace, Make, Zapier, Twilio, and custom REST/GraphQL APIs. We build around your current stack rather than forcing you to migrate everything.'
  },
  {
    id: 'faq-8',
    category: 'General',
    question: 'What is the first step to explore working together?',
    answer: 'Click "Build My System" or "Get a Growth Audit" to submit our 2-minute Smart Project Brief. We review your goals and schedule a direct 30-minute architecture strategy session where we present a visual diagram of the recommended system—free of charge.'
  }
];
