import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import NetworkStatus from "@/components/NetworkStatus";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MyGarden from "./pages/MyGarden";
import Analytics from "./pages/Analytics";
import HealthMonitoring from "./pages/HealthMonitoring";
import WeatherSystem from "./pages/WeatherSystem";
import DataExport from "./pages/DataExport";
import OrchidDatabase from "./pages/OrchidDatabase";
import Pricing from "./pages/Pricing";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import Admin from "./pages/Admin";
import BusinessIntelligence from "./pages/BusinessIntelligence";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { registerOptimizedServiceWorker } from '@/utils/serviceWorkerOptimizations';
import { optimizeNetworkRequests, trackPerformanceMetrics } from '@/utils/performance';
import { errorMonitor } from '@/utils/errorMonitoring';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on 404s or auth errors
        if (error?.status === 404 || error?.message?.includes('auth')) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App: React.FC = () => {
  // Initialize performance optimizations
  React.useEffect(() => {
    // Register enhanced service worker
    registerOptimizedServiceWorker();
    
    // Optimize network requests
    optimizeNetworkRequests();
    
    // Track initial performance metrics
    setTimeout(trackPerformanceMetrics, 1000);
    
    // Request notification permission for error alerts
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    console.log('Performance optimizations initialized');
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SubscriptionProvider>
              <NetworkStatus />
              <PWAInstallPrompt />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/database" element={<OrchidDatabase />} />
                  <Route path="/garden" element={<MyGarden />} />
                  <Route path="/health" element={<HealthMonitoring />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/weather" element={<WeatherSystem />} />
                  <Route path="/export" element={<DataExport />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/subscription-success" element={<SubscriptionSuccess />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/business-intelligence" element={<BusinessIntelligence />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SubscriptionProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
