import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import NetworkStatus from "@/components/NetworkStatus";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import Gamification from "@/pages/Gamification";

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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <ErrorBoundary>
              <Toaster />
              <Sonner />
              <NetworkStatus />
              <PWAInstallPrompt />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/garden" element={<MyGarden />} />
                  <Route path="/database" element={<OrchidDatabase />} />
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
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ErrorBoundary>
          </TooltipProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
