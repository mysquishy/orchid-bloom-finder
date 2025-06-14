
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Zap,
  Ticket,
  FlaskConical,
  TrendingDown,
  Database,
  Brain,
  Target,
  Monitor,
  Gauge,
  Activity,
  Globe
} from 'lucide-react';
import BusinessMetricsDashboard from './BusinessMetricsDashboard';
import UserSegmentationAnalysis from './UserSegmentationAnalysis';
import ApiCostOptimization from './ApiCostOptimization';
import SupportTicketManager from './SupportTicketManager';
import ABTestingManager from './ABTestingManager';
import ConversionFunnelAnalysis from './ConversionFunnelAnalysis';
import AdminMetrics from '@/components/AdminMetrics';
import PerformanceMonitor from '../performance/PerformanceMonitor';
import LoadBalancingManager from '../performance/LoadBalancingManager';
import UserJourneyAnalytics from './UserJourneyAnalytics';
import ProductOptimizationDashboard from './ProductOptimizationDashboard';
import PredictiveAnalyticsDashboard from './PredictiveAnalyticsDashboard';
import OperationalInsightsDashboard from './OperationalInsightsDashboard';

const ComprehensiveAdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 mb-4">
            Business <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Comprehensive analytics and management dashboard for OrchidAI
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 gap-1">
            <TabsTrigger value="overview" className="flex items-center gap-1 text-xs">
              <BarChart3 className="w-3 h-3" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-1 text-xs">
              <Users className="w-3 h-3" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="journey" className="flex items-center gap-1 text-xs">
              <Activity className="w-3 h-3" />
              <span className="hidden sm:inline">Journey</span>
            </TabsTrigger>
            <TabsTrigger value="product" className="flex items-center gap-1 text-xs">
              <Target className="w-3 h-3" />
              <span className="hidden sm:inline">Product</span>
            </TabsTrigger>
            <TabsTrigger value="predictive" className="flex items-center gap-1 text-xs">
              <Brain className="w-3 h-3" />
              <span className="hidden sm:inline">Predictive</span>
            </TabsTrigger>
            <TabsTrigger value="operational" className="flex items-center gap-1 text-xs">
              <Globe className="w-3 h-3" />
              <span className="hidden sm:inline">Operations</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-1 text-xs">
              <DollarSign className="w-3 h-3" />
              <span className="hidden sm:inline">Revenue</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-1 text-xs">
              <Zap className="w-3 h-3" />
              <span className="hidden sm:inline">API</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-1 text-xs">
              <Ticket className="w-3 h-3" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
            <TabsTrigger value="testing" className="flex items-center gap-1 text-xs">
              <FlaskConical className="w-3 h-3" />
              <span className="hidden sm:inline">A/B Tests</span>
            </TabsTrigger>
            <TabsTrigger value="funnel" className="flex items-center gap-1 text-xs">
              <TrendingDown className="w-3 h-3" />
              <span className="hidden sm:inline">Funnel</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-1 text-xs">
              <Database className="w-3 h-3" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <BusinessMetricsDashboard />
          </TabsContent>

          <TabsContent value="users">
            <UserSegmentationAnalysis />
          </TabsContent>

          <TabsContent value="journey">
            <UserJourneyAnalytics />
          </TabsContent>

          <TabsContent value="product">
            <ProductOptimizationDashboard />
          </TabsContent>

          <TabsContent value="predictive">
            <PredictiveAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="operational">
            <OperationalInsightsDashboard />
          </TabsContent>

          <TabsContent value="revenue">
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Analytics</h3>
              <p className="text-gray-600">
                Detailed revenue tracking, forecasting, and subscription analytics will be available here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <ApiCostOptimization />
          </TabsContent>

          <TabsContent value="support">
            <SupportTicketManager />
          </TabsContent>

          <TabsContent value="testing">
            <ABTestingManager />
          </TabsContent>

          <TabsContent value="funnel">
            <ConversionFunnelAnalysis />
          </TabsContent>

          <TabsContent value="system">
            <AdminMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveAdminDashboard;
