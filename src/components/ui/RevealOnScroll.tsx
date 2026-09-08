import React, { useState } from 'react';
import { useIntersectionReveal } from '../../lib/useIntersectionReveal';
import { useMotionPreference } from '../../context/MotionContext';

export interface RevealOnScrollProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  id?: string;
  delay?: number; // Delay in ms (e.g. 0, 100, 200, 300) for staggered cards
  duration?: number; // Duration in ms (default: 450ms for snappy, non-blocking performance)
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number; // Distance in px (default: 20px)
  priority?: boolean; // If true, immediate display (hard gate for LCP hero elements)
  threshold?: number;
  rootMargin?: string;
  style?: React.CSSProperties;
}

/**
 * RevealOnScroll: IntersectionObserver-powered progressive entrance wrapper.
 * 
 * Performance & Accessibility Architecture (Section 20 & Section 27):
 * - Hardware-accelerated compositor-only properties: transforms + opacity.
 * - Zero Cumulative Layout Shift (CLS): does not alter layout bounds or dimensions.
 * - Unobserves immediately upon entering viewport to release main thread resources (INP optimization).
 * - Bypasses all transitions if reducedMotion is enabled or prefers-reduced-motion is active.
 * - Manages will-change dynamically: cleaned up after transition completes to prevent GPU layer bloat.
 */
export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  as: Component = 'div',
  className = '',
  id,
  delay = 0,
  duration = 450,
  direction = 'up',
  distance = 20,
  priority = false,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  style = {},
}) => {
  const { reducedMotion } = useMotionPreference();
  const [ref, isVisible] = useIntersectionReveal<HTMLElement>({
    threshold,
    rootMargin,
    triggerOnce: true,
    priority,
  });

  const [transitionCompleted, setTransitionCompleted] = useState<boolean>(false);

  // If user requests reduced motion or priority LCP element, render directly without animation classes
  if (reducedMotion || priority) {
    return (
      <Component
        id={id}
        ref={ref}
        className={className}
        style={style}
      >
        {children}
      </Component>
    );
  }

  // Calculate composite-safe translate offsets
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

  const dynamicStyles: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : initialTransform,
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    // Clean up GPU will-change once transition finishes
    willChange: isVisible && transitionCompleted ? 'auto' : 'opacity, transform',
  };

  return (
    <Component
      id={id}
      ref={ref}
      className={className}
      style={dynamicStyles}
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

export { RevealAnimation } from './RevealAnimation';
export default RevealOnScroll;
