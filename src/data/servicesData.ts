import { ServiceSystem } from '../types';

export const serviceSystems: ServiceSystem[] = [
  {
    slug: 'web-experiences',
    route: '/services/web-experiences',
    name: 'Custom Web Experiences',
    categoryTag: 'SYSTEM 01 • HIGH-CONVERSION FRONTEND',
    headline: 'Websites engineered for speed, authority, and measurable conversion.',
    subhead: 'We replace slow, generic agency templates with bespoke React & Next.js architectures that turn cold visitors into booked appointments and qualified opportunities.',
    outcome: 'Convert high-intent traffic with sub-second page loads, interactive decision tools, and direct CRM data pipelines.',
    fixes: [
      'Bloated CMS themes taking 4+ seconds to render on mobile devices',
      'Generic contact forms that leak high-value visitors before submission',
      'Disconnect between front-end analytics and sales pipeline data',
      'No interactive qualification tools to engage serious commercial buyers',
    ],
    deliverables: [
      'Bespoke Next.js/React responsive architecture with sub-second LCP',
      'Engineered interactive diagnostic tools & dynamic quote calculators',
      'Bi-directional CRM & webhook integration (HubSpot, Salesforce, Supabase)',
      '100% WCAG AA accessibility compliance & semantic technical SEO hierarchy',
      'Custom animations using Motion with full reduced-motion safeguards',
      'Zero monthly plugin licensing fees and full code ownership',
    ],
    integrations: ['Next.js 16', 'React 19', 'Tailwind CSS', 'HubSpot', 'Stripe', 'Supabase', 'PostHog'],
    timeline: '3 – 5 weeks from architecture blueprint to deployment',
    beforeState: 'Outdated WordPress theme, 4.8s mobile load time, 1.4% visitor-to-inquiry rate, manual data copy-pasting into spreadsheets.',
    afterState: 'Bespoke high-performance web engine, 0.6s LCP, 3.8% conversion rate, immediate automated webhook dispatch to sales team.',
    faqs: [
      {
        question: 'Do you use standard Webflow or WordPress templates?',
        answer: 'No. Every IGRYbuilds web experience is architected from clean code with modern React, TypeScript, and Tailwind. This ensures unmatched speed, total layout freedom, zero plugin vulnerability debt, and direct integration with your internal databases and APIs.'
      },
      {
        question: 'Will our internal marketing team be able to edit content?',
        answer: 'Yes. We pair our custom frontend with lightweight headless CMS solutions (such as Sanity, Contentful, or Supabase) so your team can publish case studies, blog posts, and copy changes without engineering assistance.'
      },
      {
        question: 'How do you guarantee performance and Core Web Vitals?',
        answer: 'We test across synthetic mobile throttling and enforce strict performance budgets: zero layout shifts (CLS < 0.05), instant interaction latency (INP < 120ms), and optimized modern image pipelines.'
      }
    ]
  },
  {
    slug: 'ai-automation',
    route: '/services/ai-automation',
    name: 'AI & Workflow Automation',
    categoryTag: 'SYSTEM 02 • ZERO-LATENCY PIPELINES',
    headline: 'Eliminate manual admin and respond to inbound demand in under 60 seconds.',
    subhead: 'We architect autonomous business workflows that capture inbound inquiries, qualify prospects, enrich data, route tasks, and update your CRM with zero human intervention.',
    outcome: 'Recover 15–25 hours of manual operational work every week while eliminating lead leakage.',
    fixes: [
      'Inbound leads waiting 4 to 24 hours for a human response, losing deals to fast competitors',
      'Sales reps wasting hours copying data between web forms, email, and CRMs',
      'Untracked lead drop-offs when prospects fail to self-book meetings',
      'Fragile single-point-of-failure spreadsheets running mission-critical operations',
    ],
    deliverables: [
      'Sub-60s instant lead triage and enrichment via LLM classification engines',
      'Multi-channel follow-up sequences across Email, SMS, and WhatsApp Cloud API',
      'Bi-directional CRM synchronization with automated deal-stage progression',
      'Automated invoice generation, contract dispatch, and payment receipt triggers',
      'Resilient webhook buses with auto-retry queues and error alerting channels',
      'Executive telemetry dashboard showing daily operational hours saved',
    ],
    integrations: ['Make', 'n8n', 'OpenAI / Gemini', 'HubSpot', 'Salesforce', 'Slack', 'PostgreSQL', 'Stripe'],
    timeline: '2 – 4 weeks for complete pipeline architecture & stress testing',
    beforeState: 'Inquiries answered after 6 hours on average. 35% of leads never followed up after first attempt. Over 18 hours spent weekly on manual data entry.',
    afterState: 'Immediate multi-channel response within 45 seconds. Automated 5-touch nurture sequence. 100% CRM sync with zero manual data entry.',
    faqs: [
      {
        question: 'What happens if a third-party API or webhook goes down?',
        answer: 'We build enterprise-grade error handling. Every incoming payload is logged to an immutable queue. If a downstream service has an outage, our system automatically pauses and retries with exponential backoff, alerting our monitoring channels without dropping a single lead.'
      },
      {
        question: 'Can you integrate with our existing CRM and proprietary tools?',
        answer: 'Yes. Whether you use HubSpot, Salesforce, Pipedrive, GoHighLevel, or a custom internal SQL database, we interface via REST APIs, webhooks, or custom microservice middleware.'
      }
    ]
  },
  {
    slug: 'ai-agents',
    route: '/services/ai-agents',
    name: 'Conversational AI Agents',
    categoryTag: 'SYSTEM 03 • 24/7 VOICE & MESSAGING AGENTS',
    headline: 'Autonomous voice and WhatsApp agents that qualify, support, and book meetings.',
    subhead: 'Deploy natural-sounding, ultra-low latency AI voice dispatchers and WhatsApp business agents trained on your specific business rules, pricing, and availability.',
    outcome: 'Never miss an inbound phone call or WhatsApp message again—even at 2:00 AM on a Sunday.',
    fixes: [
      'Missed inbound customer phone calls during peak hours or after business closing',
      'Front-desk staff consumed by repetitive basic FAQ questions rather than high-value clients',
      'Long WhatsApp response times causing impatient prospects to seek alternatives',
      'Unqualified sales calls booking into senior executive calendars',
    ],
    deliverables: [
      'Sub-700ms ultra-low latency voice agent for phone calls with realistic inflection',
      'Official WhatsApp Business API conversational agent with interactive buttons & media',
      'Strict brand guardrails, context injection, and anti-hallucination validation layers',
      'Direct calendar availability checks and real-time appointment booking (Google / Calendly)',
      'Automated live transfer to human team members when high-urgency keywords are spoken',
      'Full call audio recording, transcripts, and CRM summary card generation',
    ],
    integrations: ['Vapi', 'ElevenLabs', 'Twilio', 'WhatsApp Cloud API', 'Google Calendar', 'Calendly', 'Retool'],
    timeline: '3 – 4 weeks including voice persona tuning and edge-case testing',
    beforeState: '40% of inbound calls went to voicemail during lunch and after 6 PM. Overwhelmed receptionist, 2-day delay in scheduling consultations.',
    afterState: '100% of calls answered on first ring 24/7. Instant calendar booking with zero human intervention. Complete call summaries logged to CRM.',
    faqs: [
      {
        question: 'Do the voice agents sound like robotic phone trees?',
        answer: 'Not at all. We utilize the latest state-of-the-art neural voice models (like ElevenLabs and Cartesia) running on low-latency streaming infrastructure. The latency is under 700ms, including natural pauses, vocal inflections, and seamless conversational interruptions.'
      },
      {
        question: 'How do you prevent the AI from making false claims or hallucinations?',
        answer: 'We deploy strict boundary constraints and retrieval-augmented verification (RAG). The agent only answers from your approved company knowledge base and pricing guidelines. If asked something outside its scope, it gracefully transfers to a human or logs a callback request.'
      }
    ]
  },
  {
    slug: 'creative',
    route: '/services/creative',
    name: 'AI UGC & Creative Pipelines',
    categoryTag: 'SYSTEM 04 • HIGH-VELOCITY CREATIVE',
    headline: 'High-velocity ad creative testing engines that conquer ad fatigue.',
    subhead: 'We build automated creative generation workflows combining AI-assisted scripting, avatar synthesis, dynamic hook variations, and automated captioning.',
    outcome: 'Test 20+ authentic ad variations weekly at a fraction of traditional production and agency costs.',
    fixes: [
      'Ad creative fatigue causing customer acquisition costs to spike every 2 weeks',
      'Spending $5,000–$15,000 monthly on creator fees and waiting weeks for video turnarounds',
      'Slow creative testing loops that delay finding winning marketing angles',
      'Inability to localize ad creatives across different languages and geographic markets',
    ],
    deliverables: [
      'Modular script generation engine trained on top-performing direct-response formulas',
      'AI avatar & natural voice cloning pipelines for realistic UGC-style video assets',
      'Automated video assembly, dynamic hook testing, and word-by-word subtitle rendering',
      'Multi-variant batch generation (10 hooks x 3 bodies x 2 CTAs = 60 test ads)',
      'Integration with Meta Ads & TikTok Ads reporting for performance feedback loops',
      'Complete raw project assets and proprietary workflow documentation',
    ],
    integrations: ['Midjourney API', 'Runway', 'ElevenLabs', 'CapCut / FFmpeg Pipelines', 'Meta Marketing API'],
    timeline: '2 – 3 weeks to establish pipeline and produce first 30 ad assets',
    beforeState: 'Testing only 2-3 ads per month due to creator delays. Ad fatigue caused ROAS to decay by 40% every 3 weeks.',
    afterState: 'Batch generation of 30+ validated ad angles weekly. Sustained 3.4x blended ROAS through constant creative iteration.',
    faqs: [
      {
        question: 'Are AI UGC ads approved on Meta and TikTok platforms?',
        answer: 'Yes. They comply fully with Meta and TikTok advertising policies. Because they look, sound, and engage like genuine user-generated recommendations, they achieve high viewer retention rates and strong click-through rates.'
      },
      {
        question: 'Can we use our own team members or brand ambassadors as avatars?',
        answer: 'Yes. We can record a single 5-minute training video of your founder or team member and clone their digital likeness and voice for ongoing automated ad production.'
      }
    ]
  }
];
