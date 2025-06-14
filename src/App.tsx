
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import NetworkStatus from "@/components/NetworkStatus";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import ElegantQuickActions from "@/components/widgets/ElegantQuickActions";
import { useSwipeGestures } from "@/hooks/useSwipeGestures";
import { useVoiceCommands } from "@/hooks/useVoiceCommands";
import { backgroundSync } from "@/utils/backgroundSync";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MyGarden from "./pages/MyGarden";
import OrchidDatabase from "./pages/OrchidDatabase";
import Analytics from "./pages/Analytics";
import HealthMonitoring from "./pages/HealthMonitoring";
import WeatherSystem from "./pages/WeatherSystem";
import DataExport from "./pages/DataExport";
import Community from "./pages/Community";
import Admin from "./pages/Admin";
import BusinessIntelligence from "./pages/BusinessIntelligence";
import Pricing from "./pages/Pricing";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import ExpertConsultations from "./pages/ExpertConsultations";
import Gamification from "./pages/Gamification";
import Integrations from "./pages/Integrations";
import MarketingTools from "./pages/MarketingTools";
import ProductionLaunch from "./pages/ProductionLaunch";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  // Voice commands
  const voiceCommands = [
    {
      command: /water.*plant/i,
      action: () => console.log('Voice: Water plants'),
      description: 'Watering logged'
    },
    {
      command: /take.*photo/i,
      action: () => console.log('Voice: Take photo'),
      description: 'Camera activated'
    },
    {
      command: /identify.*plant/i,
      action: () => window.location.href = '/#identify',
      description: 'Opening plant identification'
    }
  ];

  const { toggleListening } = useVoiceCommands(voiceCommands);

  // Swipe gestures
  useSwipeGestures({
    onSwipeLeft: () => console.log('Swiped left'),
    onSwipeRight: () => console.log('Swiped right'),
  });

  // Initialize PWA features
  useEffect(() => {
    // Initialize background sync
    backgroundSync.init();

    // Request notification permissions
    backgroundSync.requestNotificationPermission();

    // Set up keyboard shortcuts
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'k':
            event.preventDefault();
            toggleListening();
            break;
          case '/':
            event.preventDefault();
            // Focus search
            const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
            searchInput?.focus();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      backgroundSync.stop();
    };
  }, [toggleListening]);

  const showBottomNav = !['/admin', '/business', '/launch', '/help'].includes(location.pathname);
  const showQuickActions = ['/', '/dashboard', '/garden'].includes(location.pathname);

  return (
    <>
      <Toaster />
      <Sonner />
      <NetworkStatus />
      <PWAInstallPrompt />
      
      <div className={showBottomNav ? 'pb-16 md:pb-0' : ''}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/garden" element={<MyGarden />} />
          <Route path="/database" element={<OrchidDatabase />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/health" element={<HealthMonitoring />} />
          <Route path="/weather" element={<WeatherSystem />} />
          <Route path="/export" element={<DataExport />} />
          <Route path="/community" element={<Community />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/business" element={<BusinessIntelligence />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/subscription-success" element={<SubscriptionSuccess />} />
          <Route path="/expert-consultations" element={<ExpertConsultations />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/marketing" element={<MarketingTools />} />
          <Route path="/launch" element={<ProductionLaunch />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {showBottomNav && <BottomNavigation />}
      {showQuickActions && <ElegantQuickActions />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <ErrorBoundary>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </ErrorBoundary>
          </TooltipProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
