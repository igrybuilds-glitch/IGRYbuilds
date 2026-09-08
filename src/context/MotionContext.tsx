import React, { createContext, useContext, useState, useEffect } from 'react';

interface MotionContextType {
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  toggleReducedMotion: () => void;
}

export const MotionContext = createContext<MotionContextType>({
  reducedMotion: false,
  setReducedMotion: () => {},
  toggleReducedMotion: () => {},
});

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('igry_reduced_motion');
      if (stored !== null) {
        return stored === 'true';
      }
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleChange = (e: MediaQueryListEvent) => {
        const stored = localStorage.getItem('igry_reduced_motion');
        // Only sync if user has not explicitly manually overridden in UI
        if (stored === null) {
          setReducedMotionState(e.matches);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const setReducedMotion = (reduced: boolean) => {
    setReducedMotionState(reduced);
    if (typeof window !== 'undefined') {
      localStorage.setItem('igry_reduced_motion', String(reduced));
    }
  };

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
  };

  return (
    <MotionContext.Provider value={{ reducedMotion, setReducedMotion, toggleReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotionPreference = (): MotionContextType => {
  const context = useContext(MotionContext);
  if (!context) {
    return {
      reducedMotion: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      setReducedMotion: () => {},
      toggleReducedMotion: () => {},
    };
  }
  return context;
};

export const useMotionContext = useMotionPreference;

