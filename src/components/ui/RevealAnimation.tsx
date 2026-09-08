import React, { useState, useEffect, useRef } from 'react';
import { useMotionPreference, MotionContext } from '../../context/MotionContext';

export interface RevealAnimationProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  id?: string;
  delay?: number; // Delay in milliseconds (e.g. 0, 100, 200) for staggered entrances
  duration?: number; // Animation duration in milliseconds (default: 450ms)
  distance?: number; // Slide-up distance in pixels (default: 20px)
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'; // Default is 'up' (slide-up)
  threshold?: number; // Intersection observer threshold (default: 0.1)
  rootMargin?: string; // Intersection observer root margin (default: '0px 0px -40px 0px')
  priority?: boolean; // For critical above-the-fold elements (immediate render without animation)
  triggerOnce?: boolean; // Unobserve once triggered (default: true)
  style?: React.CSSProperties;
  onReveal?: () => void;
}

/**
 * RevealAnimation: Reusable wrapper component triggering fade-in and slide-up entry animations
 * using the Intersection Observer API.
 * 
 * - Strictly respects the `reducedMotion` state from `MotionContext` (and system prefers-reduced-motion).
 * - Adheres to Section 20 Core Web Vitals: uses composite-only properties (opacity + transform) to guarantee 0 CLS.
 * - Immediately unobserves targets upon intersection to avoid scroll-thread overhead and preserve INP.
 * - Cleans up `will-change` after transition end to prevent GPU layer bloat.
 */
export const RevealAnimation: React.FC<RevealAnimationProps> = ({
  children,
  as: Component = 'div',
  className = '',
  id,
  delay = 0,
  duration = 450,
  distance = 20,
  direction = 'up',
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  priority = false,
  triggerOnce = true,
  style = {},
  onReveal,
}) => {
  const { reducedMotion } = useMotionPreference();
  const elementRef = useRef<HTMLElement | null>(null);

  // Initialize immediately visible if priority is set or user has reduced motion preference
  const [isVisible, setIsVisible] = useState<boolean>(() => priority || reducedMotion);
  const [transitionCompleted, setTransitionCompleted] = useState<boolean>(false);

  useEffect(() => {
    // If reduced motion is requested or this element has priority, keep visible immediately
    if (reducedMotion || priority) {
      setIsVisible(true);
      return;
    }

    // Fallback for SSR or non-supporting browsers
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    // If already visible and only triggers once, skip observer setup
    if (isVisible && triggerOnce) return;

    let observer: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (onReveal) {
              onReveal();
            }
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

    observer.observe(node);

    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [reducedMotion, priority, threshold, rootMargin, triggerOnce, isVisible, onReveal]);

  // When reduced motion is active or priority is enabled, render directly without animation transforms
  if (reducedMotion || priority) {
    return (
      <Component
        id={id}
        ref={elementRef}
        className={className}
        style={style}
      >
        {children}
      </Component>
    );
  }

  // Calculate composite-only transform offset based on direction
  let initialTransform = 'translate3d(0, 0, 0)';
  if (!isVisible) {
    switch (direction) {
      case 'up':
        initialTransform = `translate3d(0, ${distance}px, 0)`;
        break;
      case 'down':
        initialTransform = `translate3d(0, -${distance}px, 0)`;
        break;
      case 'left':
        initialTransform = `translate3d(${distance}px, 0, 0)`;
        break;
      case 'right':
        initialTransform = `translate3d(-${distance}px, 0, 0)`;
        break;
      case 'none':
        initialTransform = 'translate3d(0, 0, 0)';
        break;
    }
  }

  const animationStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : initialTransform,
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    willChange: isVisible && transitionCompleted ? 'auto' : 'opacity, transform',
  };

  return (
    <Component
      id={id}
      ref={elementRef}
      className={className}
      style={animationStyle}
      onTransitionEnd={() => {
        if (isVisible) {
          setTransitionCompleted(true);
        }
      }}
    >
      {children}
    </Component>
  );
};

export default RevealAnimation;
