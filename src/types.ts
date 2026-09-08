import { SiteConfig, SocialLink } from './config/site';

export type AppRoute = 
  | '/'
  | '/services'
  | '/services/web-experiences'
  | '/services/ai-automation'
  | '/services/ai-agents'
  | '/services/creative'
  | '/work'
  | '/work/dental-growth-system'
  | '/work/manufacturing-rfq-system'
  | '/work/car-service-automation'
  | '/work/restaurant-booking-system'
  | '/work/real-estate-lead-system'
  | '/work/ecommerce-customer-system'
  | '/work/apex-solar'
  | '/work/nexus-logistics'
  | '/work/lumina-health'
  | '/work/verve-commerce'
  | '/process'
  | '/about'
  | '/contact'
  | '/privacy'
  | '/terms'
  | '/404';

export interface CTA {
  id: string;
  label: string;
  action: 'open_brief' | 'navigate' | 'open_whatsapp';
  destination?: AppRoute | string;
  serviceContext?: string;
  subtext?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  change: string;
}

/**
 * Work items strictly distinguish between real verified engagements,
 * interactive prototypes, and architectural concepts (Sections 1 & 4 & 37).
 */
export type WorkType = 'real' | 'demo' | 'concept';

export interface CaseStudy {
  slug: string;
  title: string;
  type: WorkType;
  conceptDisclaimer?: string;
  client: string;
  industry?: string;
  category: string;
  tagline: string;
  summary: string;
  objective?: string;
  problem: string;
  oldWorkflowSteps?: string[];
  solution: string;
  newArchitectureSteps?: string[];
  outcome: string;
  metrics: MetricItem[];
  stack: string[];
  deliverables: string[];
  timeline: string;
  featured: boolean;
  accentColor: string;
  systemDiagramSteps: string[];
  customerJourneyStages?: { stage: string; action: string; automated: boolean }[];
  scaleLevels?: { level: string; name: string; description: string }[];
  integrations?: string[];
}

export interface ServiceSystem {
  slug: string;
  route: AppRoute;
  name: string;
  categoryTag: string;
  headline: string;
  subhead: string;
  outcome: string;
  fixes: string[];
  deliverables: string[];
  integrations: string[];
  timeline: string;
  beforeState: string;
  afterState: string;
  faqs: { question: string; answer: string }[];
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Engineering' | 'Pricing' | 'AI & Automation';
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  phaseName: string;
  duration: string;
  summary: string;
  activities: string[];
  deliverables: string[];
  outcome: string;
  clientTimeCommitment: string;
}

export interface Testimonial {
  id: string;
  type: 'verified_client' | 'concept_sample';
  quote: string;
  author: string;
  role: string;
  company: string;
  verified: boolean;
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST';

export interface LeadAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
  current_page?: string;
  first_touch_source?: string;
  last_touch_source?: string;
}

export interface LeadFormData {
  name: string;
  business: string;
  email: string;
  phone?: string;
  website?: string;
  goal: string;
  services: string[];
  budget?: string;
  timeline?: string;
  message?: string;
  consent: boolean;
  // Anti-Spam Honeypot field (must remain empty for humans)
  hp_company_field?: string;
  // Submission velocity tracking
  form_rendered_at?: number;
  // Context preservation
  sourceCta?: string;
  sourcePage?: string;
  attribution?: LeadAttribution;
}

export interface LeadRecord extends LeadFormData {
  id: string;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
  last_contacted_at?: string | null;
  internal_notes?: string;
}

export type AnalyticsEventType = 
  | 'page_view'
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'form_error'
  | 'service_open'
  | 'work_open'
  | 'whatsapp_click'
  | 'scroll_depth'
  | 'outbound_click'
  | 'route_change';

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  timestamp: string;
  route: string;
  metadata?: Record<string, any>;
}

export { type SiteConfig, type SocialLink };
