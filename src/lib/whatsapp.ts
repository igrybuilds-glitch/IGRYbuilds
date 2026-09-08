import { siteConfig } from '../config/site';
import { trackEvent } from './analytics';

export type WhatsAppContextType = 
  | 'general'
  | 'website'
  | 'automation'
  | 'ai_agent'
  | 'creative'
  | 'case_study'
  | 'post_submit';

export interface WhatsAppContextOptions {
  serviceName?: string;
  caseStudyTitle?: string;
  caseStudySlug?: string;
  businessName?: string;
  leadId?: string;
  sourceCta?: string;
  customNote?: string;
}

/**
 * Centralized WhatsApp URL Builder (Section 10)
 * Formats context-preserving messages and creates direct chat URLs.
 */
export function buildWhatsAppUrl(
  context: WhatsAppContextType = 'general',
  options: WhatsAppContextOptions = {}
): string {
  const number = siteConfig.whatsappNumber;
  let message = '';

  switch (context) {
    case 'website':
      message = options.customNote
        ? `Hi IGRYbuilds — I’m interested in building a high-conversion web system for ${options.customNote}. Could we discuss architecture and timing?`
        : `Hi IGRYbuilds — I’m interested in building a high-conversion custom web system for my business.`;
      break;

    case 'automation':
      message = options.customNote
        ? `Hi IGRYbuilds — I’d like to explore workflow automation for our business. Current bottleneck: ${options.customNote}.`
        : `Hi IGRYbuilds — I’d like to explore workflow automation to eliminate manual triage and connect our CRM.`;
      break;

    case 'ai_agent':
      message = options.customNote
        ? `Hi IGRYbuilds — Looking to deploy an autonomous AI agent for: ${options.customNote}.`
        : `Hi IGRYbuilds — I want to explore deploying an autonomous WhatsApp or Voice agent for our qualification pipeline.`;
      break;

    case 'creative':
      message = options.customNote
        ? `Hi IGRYbuilds — Exploring programmatic ad creative pipelines for ${options.customNote}.`
        : `Hi IGRYbuilds — I’d like to discuss scaling our video ad creative velocity with an automated AI pipeline.`;
      break;

    case 'case_study':
      message = options.caseStudyTitle
        ? `Hi IGRYbuilds — I was reviewing your prototype for "${options.caseStudyTitle}" and want to see how this architecture applies to my business.`
        : `Hi IGRYbuilds — I’m reviewing your system case studies and would like to discuss a similar architecture.`;
      break;

    case 'post_submit':
      message = options.leadId
        ? `Hi IGRYbuilds — I just submitted a Project Brief (Ref: ${options.leadId}${options.businessName ? ` for ${options.businessName}` : ''}). Connecting here for faster communication.`
        : `Hi IGRYbuilds — I just submitted a Project Brief and wanted to connect directly here on WhatsApp.`;
      break;

    case 'general':
    default:
      message = options.customNote
        ? `Hi IGRYbuilds — ${options.customNote}`
        : `Hi IGRYbuilds — I’d like to discuss a custom digital system build for my business.`;
      break;
  }

  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Reusable helper to track conversion and open WhatsApp
 */
export function openWhatsApp(
  context: WhatsAppContextType = 'general',
  options: WhatsAppContextOptions | string = {}
): void {
  const normalizedOptions: WhatsAppContextOptions = 
    typeof options === 'string' ? { customNote: options } : options;

  try {
    trackEvent('whatsapp_click', {
      context,
      ...normalizedOptions,
    });
  } catch {
    // Analytics failure must never break user action
  }

  const url = buildWhatsAppUrl(context, normalizedOptions);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
