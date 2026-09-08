import { useState, useEffect, useRef, RefObject } from 'react';
import { useMotionPreference } from '../context/MotionContext';

export interface UseIntersectionRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  priority?: boolean; // For critical above-the-fold / LCP sections
}

/**
 * High-performance IntersectionObserver hook following Section 20 Core Web Vitals best practices:
 * - Immediately unobserves entry upon intersection to prevent ongoing scroll event loops.
 * - Guarantees zero Cumulative Layout Shift (CLS) through composite-only transforms.
 * - Strictly respects prefers-reduced-motion / accessibility toggles (Section 27).
 * - Safe fallback for unsupported browsers and server-side contexts.
 */
export function useIntersectionReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionRevealOptions = {}
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true,
    priority = false,
  } = options;

  const { reducedMotion } = useMotionPreference();
  const ref = useRef<T | null>(null);

  // Initialize immediately true if priority or reduced motion is active
  const [isVisible, setIsVisible] = useState<boolean>(() => priority || reducedMotion);

  useEffect(() => {
    // If reduced motion or priority, always stay visible
    if (priority || reducedMotion) {
      setIsVisible(true);
      return;
    }

    // SSR or browsers without IntersectionObserver support
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // If already revealed and triggerOnce is enabled, no observer needed
    if (isVisible && triggerOnce) return;

    let observer: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce && observer && entry.target) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [reducedMotion, priority, threshold, rootMargin, triggerOnce, isVisible]);

  return [ref, isVisible];
}
