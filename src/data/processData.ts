export interface ProcessStep {
  step: string;
  name: string;
  phaseLabel: string;
  duration: string;
  headline: string;
  description: string;
  deliverables: string[];
  clientCommitment: string;
  stageVisual: {
    badge: string;
    iconName: string;
    metrics: string;
  };
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    name: 'DISCOVER',
    phaseLabel: 'Understand Business & Operations',
    duration: 'Days 1 – 3',
    headline: 'Deep operational immersion to diagnose where leads bounce and where manual hours disappear.',
    description: 'We audit your customer acquisition journey, existing CRM/tools, communication channels, and administrative bottlenecks. We do not write a line of code until we have mathematically modeled how your new system will generate a positive ROI.',
    deliverables: [
      'Operational Friction & Revenue Leakage Audit Document',
      'Customer Lifecycle Map & Bottleneck Breakdown',
      'Target Latency & Automation ROI Blueprint',
      'Fixed Scope of Work & Milestone Guarantees'
    ],
    clientCommitment: 'One 45-minute architectural deep dive + access to active software accounts.',
    stageVisual: {
      badge: 'DIAGNOSTIC PHASE',
      iconName: 'Search',
      metrics: '100% Pipeline Transparency',
    },
  },
  {
    step: '02',
    name: 'MAP',
    phaseLabel: 'Find Bottlenecks & Friction Points',
    duration: 'Days 4 – 7',
    headline: 'Mapping out every manual touchpoint, data gap, and dropped conversion transition.',
    description: 'We construct a high-resolution workflow diagram charting the journey from first visitor touchpoint to booked client, identifying manual delays and calculating time lost at each stage.',
    deliverables: [
      'Current State vs Future State Dataflow Schematic',
      'Inquiry Latency Benchmark Analysis',
      'Security, Privacy & Data Retention Protocol Matrix',
      'Tool Consolidation & Redundancy Reduction Plan'
    ],
    clientCommitment: 'Brief asynchronous feedback on dataflow schematics in shared Slack channel.',
    stageVisual: {
      badge: 'FRICTION ELIMINATION',
      iconName: 'GitBranch',
      metrics: 'Zero Unaccounted Inquiries',
    },
  },
  {
    step: '03',
    name: 'DESIGN',
    phaseLabel: 'Design the System & Visual Experience',
    duration: 'Week 2',
    headline: 'Crafting high-conversion interactive interfaces and precise technical payloads.',
    description: 'We design the interactive front-end experience — calculators, qualification quizzes, and conversational flows — engineered with clean typography, rapid rendering, and effortless user clarity.',
    deliverables: [
      'High-Fidelity Interactive UI Prototypes (Desktop & Mobile)',
      'WhatsApp Conversational Script & Quick-Reply Logic Matrix',
      'AI Agent Prompt Architecture & Hallucination Guardrails',
      'Responsive Component Design System with Zero Slop'
    ],
    clientCommitment: 'One 30-minute design sign-off walkthrough.',
    stageVisual: {
      badge: 'ARCHITECTURAL DESIGN',
      iconName: 'Layout',
      metrics: 'Sub-600ms Visual Hierarchy',
    },
  },
  {
    step: '04',
    name: 'BUILD',
    phaseLabel: 'Develop the System & Custom Code',
    duration: 'Week 2 – 3',
    headline: 'Engineering clean, type-safe software and configuring low-latency AI models.',
    description: 'Our senior engineers construct your custom web frontend in modern React, build webhook buses with automated retries, deploy conversational agents, and establish CRM schemas with zero template shortcuts.',
    deliverables: [
      'Production-grade Web Engine with Sub-Second LCP Performance',
      'Configured WhatsApp / Voice AI Agent with Tested Guardrails',
      'Resilient Webhook Event Queue with Auto-Retry Logic',
      'Private Staging Environment with Live Preview Access'
    ],
    clientCommitment: 'Review staging build asynchronously at your convenience.',
    stageVisual: {
      badge: 'SOFTWARE ENGINEERING',
      iconName: 'Code',
      metrics: 'Type-Safe Modular Architecture',
    },
  },
  {
    step: '05',
    name: 'CONNECT',
    phaseLabel: 'Integrate Tools & Unify Data Highway',
    duration: 'Week 3 – 4',
    headline: 'Piping your website, messaging, calendar, CRM, and payments into one living ecosystem.',
    description: 'We wire all endpoints into a unified data loop. An inquiry on your website triggers verified WhatsApp reach-out, checks real-time calendar slots, logs deals into your CRM, and alerts your team without manual intervention.',
    deliverables: [
      'Bi-directional CRM Webhook Sync (HubSpot, Pipedrive, Notion)',
      'Calendar Slot Reservation & SMS/WhatsApp Reminder Engine',
      'Payment & Deposit Checkout Gateways (Stripe)',
      'Team Alert Channels (Slack / WhatsApp / Mobile Push)'
    ],
    clientCommitment: 'Confirm sample test leads reflect accurately in your CRM.',
    stageVisual: {
      badge: 'API ORCHESTRATION',
      iconName: 'Share2',
      metrics: '100% Automated Data Sync',
    },
  },
  {
    step: '06',
    name: 'LAUNCH',
    phaseLabel: 'Test Everything & Execute Cutover',
    duration: 'Week 4',
    headline: 'Stress-testing edge cases, simulating peak loads, and deploying with zero downtime.',
    description: 'We inject malformed inputs, test broken webhooks, simulate high concurrency, and verify fallback routines. Once signed off, we execute a seamless DNS cutover with live hyper-care support.',
    deliverables: [
      'Edge-Case Stress Test Matrix & Concurrency Audit',
      'Zero-Downtime DNS & SSL Cutover Execution',
      'Complete Source Code Repository Transfer (Full Ownership)',
      'Recorded Video SOP Walkthroughs for Internal Team'
    ],
    clientCommitment: 'Grant DNS/domain record access and celebrate go-live.',
    stageVisual: {
      badge: 'PRODUCTION CUTOVER',
      iconName: 'Zap',
      metrics: 'Zero-Downtime Reliability',
    },
  },
  {
    step: '07',
    name: 'OPTIMIZE',
    phaseLabel: 'Improve Based on Real Usage & Scale',
    duration: 'Ongoing Evolution',
    headline: 'Monitoring real user telemetry, refining AI prompts, and expanding workflow capacity.',
    description: 'A digital system is a living asset. We analyze drop-off rates, tune conversation prompts based on real customer questions, and add cross-department automations as your business volume expands.',
    deliverables: [
      'Monthly Conversion & System Telemetry Performance Reports',
      'Continuous Prompt Refinement & Knowledge Base Expansions',
      'Proactive Security, Dependency, and API Version Updates',
      'Priority SLA Support & Architecture Advisory Channel'
    ],
    clientCommitment: 'Monthly 30-minute strategic growth sync.',
    stageVisual: {
      badge: 'SYSTEM EVOLUTION',
      iconName: 'TrendingUp',
      metrics: 'Continuous Conversion Uplift',
    },
  },
];
