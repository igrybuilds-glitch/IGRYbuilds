import { AppRoute } from '../types';
import { siteConfig } from '../config/site';

export interface RouteMeta {
  title: string;
  description: string;
  canonicalPath: string;
  schemaType?: 'Organization' | 'WebPage' | 'Service' | 'Article';
}

const ROUTE_METADATA: Record<string, RouteMeta> = {
  '/': {
    title: 'IGRYbuilds — Engineered Digital Systems for High-Growth Businesses',
    description: 'Bespoke web engines, autonomous AI workflows, and zero-latency pipelines that convert demand and eliminate manual labor.',
    canonicalPath: '/',
    schemaType: 'Organization',
  },
  '/services': {
    title: 'Systems & Architecture Solutions | IGRYbuilds',
    description: 'Explore our core digital systems: custom web experiences, AI workflow automation, autonomous voice & WhatsApp agents, and algorithmic creative pipelines.',
    canonicalPath: '/services',
    schemaType: 'Service',
  },
  '/services/web-experiences': {
    title: 'Custom Web Experiences | Sub-Second Performance & Conversion | IGRYbuilds',
    description: 'High-conversion web platforms built on modern React and Next.js with sub-second page loads, interactive diagnostic tools, and CRM pipelines.',
    canonicalPath: '/services/web-experiences',
    schemaType: 'Service',
  },
  '/services/ai-automation': {
    title: 'AI & Workflow Automation | Zero-Latency Lead Routing | IGRYbuilds',
    description: 'Autonomous business workflows that qualify leads, enrich data, route tasks, and update your CRM within 60 seconds.',
    canonicalPath: '/services/ai-automation',
    schemaType: 'Service',
  },
  '/services/ai-agents': {
    title: 'Autonomous AI Agents | 24/7 Voice & WhatsApp Workflows | IGRYbuilds',
    description: 'Sub-second conversational AI voice and WhatsApp dispatchers that handle inquiries, check status, and book appointments without human delays.',
    canonicalPath: '/services/ai-agents',
    schemaType: 'Service',
  },
  '/services/creative': {
    title: 'Algorithmic Creative Engines | Programmatic Ad Production | IGRYbuilds',
    description: 'Automated video creative generation pipelines that test multivariate hooks, eliminate ad fatigue, and scale acquisition spend.',
    canonicalPath: '/services/creative',
    schemaType: 'Service',
  },
  '/work': {
    title: 'Architectural Prototypes & Case Studies | IGRYbuilds',
    description: 'Detailed system blueprints and benchmark prototypes showcasing real-world integrations, event telemetry, and performance architectures.',
    canonicalPath: '/work',
    schemaType: 'WebPage',
  },
  '/work/apex-solar': {
    title: 'Apex Renewable Systems — Satellite Solar Estimator Prototype | IGRYbuilds',
    description: 'Architectural prototype featuring Google Solar geospatial calculation and autonomous WhatsApp qualification workflow.',
    canonicalPath: '/work/apex-solar',
    schemaType: 'Article',
  },
  '/work/nexus-logistics': {
    title: 'Nexus Freight Logistics — Sub-700ms Voice Dispatcher Prototype | IGRYbuilds',
    description: 'Autonomous conversational phone agent integrated with real-time GPS telematics database simulation.',
    canonicalPath: '/work/nexus-logistics',
    schemaType: 'Article',
  },
  '/work/lumina-health': {
    title: 'Lumina Clinic — Clinical Triage & Deposit Checkout Prototype | IGRYbuilds',
    description: 'Editorial surgical medicine web engine with diagnostic procedure triage and integrated Stripe deposit reservation.',
    canonicalPath: '/work/lumina-health',
    schemaType: 'Article',
  },
  '/work/verve-commerce': {
    title: 'Verve Athletics — Algorithmic Creative Engine Prototype | IGRYbuilds',
    description: 'Automated multi-variant video creative generation pipeline demonstrating high-velocity direct-response testing.',
    canonicalPath: '/work/verve-commerce',
    schemaType: 'Article',
  },
  '/process': {
    title: 'The 4-Week System Sprint Protocol | IGRYbuilds',
    description: 'Our transparent engineering sprint methodology: Discovery, Architecture Blueprint, Build & Integration, and Production Deployment.',
    canonicalPath: '/process',
    schemaType: 'WebPage',
  },
  '/about': {
    title: 'Engineering Philosophy & Core Standards | IGRYbuilds',
    description: 'Why we engineer digital systems instead of superficial agency websites: deterministic code, zero proprietary lock-in, and measurable business outcomes.',
    canonicalPath: '/about',
    schemaType: 'WebPage',
  },
  '/contact': {
    title: 'Scope Your System | Submit a Smart Project Brief | IGRYbuilds',
    description: 'Submit your operational bottleneck or project parameters to receive an initial architecture review and investment quote within 24 hours.',
    canonicalPath: '/contact',
    schemaType: 'WebPage',
  },
  '/privacy': {
    title: 'Privacy Policy & Data Retention Standards | IGRYbuilds',
    description: 'Our data protection principles, transparent lead retention schedules, and GDPR-aligned data handling policies.',
    canonicalPath: '/privacy',
    schemaType: 'WebPage',
  },
  '/terms': {
    title: 'Terms of Service & Engagement Standards | IGRYbuilds',
    description: 'Commercial engagement terms: 100% intellectual property ownership, milestone approvals, and 30-day post-launch warranty.',
    canonicalPath: '/terms',
    schemaType: 'WebPage',
  },
};

/**
 * Updates document title, meta tags, and structured data on client-side route navigation
 */
export function updateRouteSeo(route: AppRoute | string): void {
  if (typeof document === 'undefined') return;

  const meta = ROUTE_METADATA[route] || {
    title: `${siteConfig.siteName} — 404 System Not Found`,
    description: 'The requested route does not exist in our systems architecture.',
    canonicalPath: route,
  };

  // Title
  document.title = meta.title;

  // Helpers to update or create meta tags
  const setMeta = (name: string, content: string, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  setMeta('description', meta.description);
  setMeta('og:title', meta.title, true);
  setMeta('og:description', meta.description, true);
  setMeta('og:url', `${siteConfig.siteUrl}${meta.canonicalPath}`, true);
  setMeta('og:site_name', siteConfig.siteName, true);
  setMeta('og:image', `${siteConfig.siteUrl}${siteConfig.ogImage}`, true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', meta.title);
  setMeta('twitter:description', meta.description);
  setMeta('twitter:image', `${siteConfig.siteUrl}${siteConfig.ogImage}`);

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.href = `${siteConfig.siteUrl}${meta.canonicalPath}`;
}
