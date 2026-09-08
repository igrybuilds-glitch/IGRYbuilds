import React, { useState, useEffect } from 'react';
import { AppRoute } from './types';
import { serviceSystems } from './data/servicesData';
import { caseStudies } from './data/workData';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SmartProjectBrief } from './components/forms/SmartProjectBrief';
import { TelemetryDrawer } from './components/telemetry/TelemetryDrawer';
import { CookieConsentBanner } from './components/ui/CookieConsentBanner';
import { VoiceConsultationModal } from './components/voice/VoiceConsultationModal';
import { ClientPortalModal } from './components/dashboard/ClientPortalModal';
import { HomeView } from './views/HomeView';
import { ServicesOverviewView } from './views/ServicesOverviewView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { WorkListView } from './views/WorkListView';
import { WorkDetailView } from './views/WorkDetailView';
import { ProcessView } from './views/ProcessView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { PrivacyView } from './views/PrivacyView';
import { TermsView } from './views/TermsView';
import { NotFoundView } from './views/NotFoundView';
import { trackEvent } from './lib/analytics';
import { initAttribution } from './lib/attribution';
import { updateRouteSeo } from './lib/seo';
import { MotionProvider, useMotionPreference } from './context/MotionContext';
import { AuthProvider } from './context/AuthContext';

const validRoutes: AppRoute[] = [
  '/',
  '/services',
  '/services/web-experiences',
  '/services/ai-automation',
  '/services/ai-agents',
  '/services/creative',
  '/work',
  '/work/apex-solar',
  '/work/nexus-logistics',
  '/work/lumina-health',
  '/work/verve-commerce',
  '/work/dental-growth-system',
  '/work/manufacturing-rfq-system',
  '/work/car-service-automation',
  '/work/restaurant-booking-system',
  '/work/real-estate-lead-system',
  '/work/ecommerce-customer-system',
  '/process',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('/');
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [briefModalOpen, setBriefModalOpen] = useState<boolean>(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState<boolean>(false);
  const [portalModalOpen, setPortalModalOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [telemetryOpen, setTelemetryOpen] = useState<boolean>(false);
  const { reducedMotion, toggleReducedMotion } = useMotionPreference();

  // Initialize attribution & initial route
  useEffect(() => {
    initAttribution();

    if (typeof window !== 'undefined') {
      const path = window.location.pathname as AppRoute;
      if (validRoutes.includes(path)) {
        setCurrentRoute(path);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }

      // Popstate listener for browser back/forward
      const handlePopState = () => {
        const currentPath = window.location.pathname as AppRoute;
        if (validRoutes.includes(currentPath)) {
          setCurrentRoute(currentPath);
          setIsNotFound(false);
        } else {
          setIsNotFound(true);
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  // Update SEO meta tags & schema on route changes
  useEffect(() => {
    if (!isNotFound) {
      updateRouteSeo(currentRoute);
    } else {
      updateRouteSeo('/404');
    }
  }, [currentRoute, isNotFound]);

  const navigate = (route: AppRoute) => {
    if (validRoutes.includes(route)) {
      setCurrentRoute(route);
      setIsNotFound(false);
    } else {
      setIsNotFound(true);
    }

    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
      trackEvent('route_change', { destination: route });
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const openBriefModal = (serviceSlug?: string) => {
    setPreselectedService(serviceSlug);
    setBriefModalOpen(true);
  };

  const closeBriefModal = () => {
    setBriefModalOpen(false);
    setPreselectedService(undefined);
  };

  // Render view router based on currentRoute
  const renderView = () => {
    if (isNotFound) {
      return <NotFoundView navigate={navigate} />;
    }

    if (currentRoute === '/') {
      return (
        <HomeView
          navigate={navigate}
          openBriefModal={() => openBriefModal()}
          reducedMotion={reducedMotion}
        />
      );
    }

    if (currentRoute === '/services') {
      return (
        <ServicesOverviewView
          navigate={navigate}
          openBriefModal={() => openBriefModal()}
        />
      );
    }

    if (currentRoute.startsWith('/services/')) {
      const slug = currentRoute.replace('/services/', '');
      const system = serviceSystems.find((s) => s.slug === slug);
      if (system) {
        return (
          <ServiceDetailView
            system={system}
            navigate={navigate}
            openBriefModal={() => openBriefModal(system.slug)}
          />
        );
      }
      return <NotFoundView navigate={navigate} />;
    }

    if (currentRoute === '/work') {
      return (
        <WorkListView
          navigate={navigate}
          openBriefModal={() => openBriefModal()}
        />
      );
    }

    if (currentRoute.startsWith('/work/')) {
      const slug = currentRoute.replace('/work/', '');
      const study = caseStudies.find((s) => s.slug === slug);
      if (study) {
        return (
          <WorkDetailView
            study={study}
            navigate={navigate}
            openBriefModal={() => openBriefModal()}
          />
        );
      }
      return <NotFoundView navigate={navigate} />;
    }

    if (currentRoute === '/process') {
      return (
        <ProcessView
          navigate={navigate}
          openBriefModal={() => openBriefModal()}
        />
      );
    }

    if (currentRoute === '/about') {
      return (
        <AboutView
          navigate={navigate}
          openBriefModal={() => openBriefModal()}
        />
      );
    }

    if (currentRoute === '/contact') {
      return <ContactView navigate={navigate} />;
    }

    if (currentRoute === '/privacy') {
      return <PrivacyView navigate={navigate} />;
    }

    if (currentRoute === '/terms') {
      return <TermsView navigate={navigate} />;
    }

    return <NotFoundView navigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col selection:bg-[#4F46E5] selection:text-white">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#4F46E5] text-white font-mono text-xs font-bold rounded-lg shadow-lg"
      >
        Skip to main content
      </a>

      {/* Global Sticky Navigation */}
      <Navbar
        currentRoute={currentRoute}
        navigate={navigate}
        reducedMotion={reducedMotion}
        toggleReducedMotion={toggleReducedMotion}
        toggleTelemetry={() => setTelemetryOpen(!telemetryOpen)}
        openBriefModal={() => openBriefModal()}
        openVoiceModal={() => setVoiceModalOpen(true)}
        openPortalModal={() => setPortalModalOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full" tabIndex={-1}>
        {renderView()}
      </main>

      {/* Global Footer */}
      <Footer
        navigate={navigate}
        openBriefModal={() => openBriefModal()}
      />

      {/* Smart Project Brief Modal */}
      <SmartProjectBrief
        isOpen={briefModalOpen}
        onClose={closeBriefModal}
        preselectedService={preselectedService}
        source={currentRoute}
      />

      {/* Live Voice Consultation Modal (Gemini Live API) */}
      <VoiceConsultationModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        openBriefModal={() => openBriefModal()}
      />

      {/* Client Portal & Firestore Architecture Manager */}
      <ClientPortalModal
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
        openBriefModal={() => openBriefModal()}
      />

      {/* Live Telemetry Inspector Drawer */}
      <TelemetryDrawer
        isOpen={telemetryOpen}
        onClose={() => setTelemetryOpen(false)}
      />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner navigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MotionProvider>
        <AppContent />
      </MotionProvider>
    </AuthProvider>
  );
}
