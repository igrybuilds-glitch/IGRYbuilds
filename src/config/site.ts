/**
 * Centralized Brand Configuration Module
 * Single Source of Truth for IGRYbuilds
 * Satisfies Section 2 (BRAND LOCK) and Section 3 (CONTENT SOURCE OF TRUTH)
 */

export interface SocialLink {
  platform: 'github' | 'x' | 'linkedin' | 'whatsapp' | 'email';
  label: string;
  url: string;
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  siteDescription: string;
  tagline: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  contactEmail: string;
  socialLinks: SocialLink[];
  logo: {
    mark: string;
    text: string;
  };
  favicon: string;
  ogImage: string;
  brandAccent: string;
  primaryFont: string;
  secondaryFont: string;
  copyrightYear: number;
}

export const SITE_NAME = 'IGRYbuilds';
export const SITE_URL = 'https://igrybuilds.com';
export const SITE_DESCRIPTION = 
  'Digital systems studio engineering high-conversion web engines, autonomous AI workflows, and zero-latency business pipelines.';
export const TAGLINE = 'Engineered Digital Systems for High-Growth Businesses';
export const WHATSAPP_NUMBER = '447000000000'; // Studio communication line placeholder
export const WHATSAPP_DISPLAY = '+44 7000 000000';
export const CONTACT_EMAIL = 'igrybuilds@gmail.com';
export const BRAND_ACCENT = '#4F46E5'; // Vibrant Indigo
export const PRIMARY_FONT = 'Plus Jakarta Sans, sans-serif';
export const SECONDARY_FONT = 'Space Grotesk, monospace';
export const FAVICON = '/favicon.svg';
export const OG_IMAGE = '/og-preview.png';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/igrybuilds',
  },
  {
    platform: 'x',
    label: 'X (Twitter)',
    url: 'https://x.com/igrybuilds',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/company/igrybuilds',
  },
  {
    platform: 'whatsapp',
    label: 'WhatsApp',
    url: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    platform: 'email',
    label: 'Direct Email',
    url: `mailto:${CONTACT_EMAIL}`,
  },
];

export const siteConfig: SiteConfig = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  siteDescription: SITE_DESCRIPTION,
  tagline: TAGLINE,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDisplay: WHATSAPP_DISPLAY,
  contactEmail: CONTACT_EMAIL,
  socialLinks: SOCIAL_LINKS,
  logo: {
    mark: '⚡',
    text: 'IGRYbuilds',
  },
  favicon: FAVICON,
  ogImage: OG_IMAGE,
  brandAccent: BRAND_ACCENT,
  primaryFont: PRIMARY_FONT,
  secondaryFont: SECONDARY_FONT,
  copyrightYear: 2026,
};
