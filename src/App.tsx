
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from '@/components/ui/toast-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import NetworkStatus from '@/components/NetworkStatus';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

// Import monitoring service to initialize it
import '@/utils/monitoring';

// Page imports
import Index from '@/pages/Index';
import OrchidDatabase from '@/pages/OrchidDatabase';
import Dashboard from '@/pages/Dashboard';
import MyGarden from '@/pages/MyGarden';
import Pricing from '@/pages/Pricing';
import HelpCenter from '@/pages/HelpCenter';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import NotFound from '@/pages/NotFound';
import ServerError from '@/pages/ServerError';
import AnalyticsDashboard from '@/pages/AnalyticsDashboard';
import WeatherDashboard from '@/components/weather/WeatherDashboard';
import ExpertConsultations from '@/pages/ExpertConsultations';
import GamificationDashboard from '@/pages/GamificationDashboard';
import HealthDashboard from '@/pages/HealthDashboard';
import DataExport from '@/pages/DataExport';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <AuthProvider>
              <SubscriptionProvider>
                <Router>
                  <div className="min-h-screen bg-white flex flex-col">
                    <NetworkStatus />
                    <Navigation />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/database" element={<OrchidDatabase />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/garden" element={<MyGarden />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/help" element={<HelpCenter />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/server-error" element={<ServerError />} />
                        
                        <Route path="/analytics" element={<AnalyticsDashboard />} />
                        <Route path="/weather" element={<WeatherDashboard />} />
                        <Route path="/expert-consultations" element={<ExpertConsultations />} />
                        <Route path="/gamification" element={<GamificationDashboard />} />
                        <Route path="/health" element={<HealthDashboard />} />
                        <Route path="/export" element={<DataExport />} />
                        
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                    <CookieConsent />
                    <PWAInstallPrompt />
                  </div>
                  <Toaster />
                </Router>
              </SubscriptionProvider>
            </AuthProvider>
          </ToastProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
