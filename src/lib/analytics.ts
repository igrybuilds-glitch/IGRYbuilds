import { AnalyticsEvent, AnalyticsEventType } from '../types';

type Listener = (events: AnalyticsEvent[]) => void;
const eventLog: AnalyticsEvent[] = [];
const listeners: Set<Listener> = new Set();

export function trackEvent(type: AnalyticsEventType, metadata?: Record<string, any>): void {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const event: AnalyticsEvent = {
    id: `ev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type,
    timestamp: new Date().toLocaleTimeString(),
    route: currentPath,
    metadata,
  };

  eventLog.unshift(event);
  if (eventLog.length > 50) {
    eventLog.pop();
  }

  // Debug log in development
  if (process.env.NODE_ENV !== 'production') {
    console.info(`[IGRY Analytics] ${type}:`, event);
  }

  listeners.forEach(fn => fn([...eventLog]));
}

export function subscribeAnalytics(listener: Listener): () => void {
  listeners.add(listener);
  listener([...eventLog]);
  return () => {
    listeners.delete(listener);
  };
}

export function getEventLog(): AnalyticsEvent[] {
  return [...eventLog];
}
