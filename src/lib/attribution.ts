import { LeadAttribution } from '../types';

const STORAGE_KEY_FIRST_TOUCH = 'igry_first_touch';
const STORAGE_KEY_ATTRIBUTION = 'igry_attribution';

/**
 * Initializes and captures UTM parameters and referrer metadata
 * without collecting personal information (Section 6).
 */
export function captureAttribution(): LeadAttribution {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get('utm_source') || undefined;
    const utm_medium = urlParams.get('utm_medium') || undefined;
    const utm_campaign = urlParams.get('utm_campaign') || undefined;
    const utm_content = urlParams.get('utm_content') || undefined;
    const utm_term = urlParams.get('utm_term') || undefined;

    const referrer = document.referrer ? new URL(document.referrer).hostname : 'direct';
    const current_page = window.location.pathname;

    // Get or store first touch
    let first_touch_source = sessionStorage.getItem(STORAGE_KEY_FIRST_TOUCH) || undefined;
    if (!first_touch_source) {
      first_touch_source = utm_source || referrer || 'direct';
      sessionStorage.setItem(STORAGE_KEY_FIRST_TOUCH, first_touch_source);
    }

    const last_touch_source = utm_source || referrer || 'direct';

    const attribution: LeadAttribution = {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      referrer: document.referrer || undefined,
      landing_page: sessionStorage.getItem('igry_landing_page') || current_page,
      current_page,
      first_touch_source,
      last_touch_source,
    };

    if (!sessionStorage.getItem('igry_landing_page')) {
      sessionStorage.setItem('igry_landing_page', current_page);
    }

    sessionStorage.setItem(STORAGE_KEY_ATTRIBUTION, JSON.stringify(attribution));
    return attribution;
  } catch {
    return {
      current_page: window.location.pathname,
    };
  }
}

export const initAttribution = captureAttribution;

export function getStoredAttribution(): LeadAttribution {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY_ATTRIBUTION);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore storage parse failure
  }
  return captureAttribution();
}
