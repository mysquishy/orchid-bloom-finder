
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, MapPin, Users, Zap, TrendingUp, Shield, Globe, Clock } from 'lucide-react';

const BusinessDashboardSuite: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Business Dashboard Suite</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive business intelligence and management tools designed for multi-location 
          operations, team oversight, and data-driven decision making.
        </p>
        <Badge className="bg-blue-100 text-blue-800">Enterprise Analytics</Badge>
      </div>

      {/* Multi-Location Management */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <MapPin className="w-6 h-6" />
            Multi-Location Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">Centralized Location Oversight</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Location Analytics</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• Real-time usage metrics per location</li>
                  <li>• Identification accuracy by region</li>
                  <li>• Species discovery trending</li>
                  <li>• User engagement comparisons</li>
                  <li>• Resource utilization tracking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Operational Insights</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• Peak usage patterns by location</li>
                  <li>• Staff productivity metrics</li>
                  <li>• Training completion rates</li>
                  <li>• Technology adoption curves</li>
                  <li>• Cost-per-location analysis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                <h4 className="font-medium text-green-900 mb-2">Performance Tracking</h4>
                <p className="text-sm text-green-700">Monitor KPIs across all locations with automated alerts</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <Globe className="w-8 h-8 text-purple-600 mb-2" />
                <h4 className="font-medium text-purple-900 mb-2">Geographic Insights</h4>
                <p className="text-sm text-purple-700">Regional plant distribution and climate correlations</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <Shield className="w-8 h-8 text-orange-600 mb-2" />
                <h4 className="font-medium text-orange-900 mb-2">Compliance Monitoring</h4>
                <p className="text-sm text-orange-700">Ensure consistent standards across all facilities</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Team Performance Analytics */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Users className="w-6 h-6" />
            Team Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-4">Comprehensive Team Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-800 mb-3">Individual Performance</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Identification accuracy rates</li>
                  <li>• Knowledge base contributions</li>
                  <li>• Peer mentoring activities</li>
                  <li>• Training progress tracking</li>
                  <li>• Community engagement scores</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-3">Team Dynamics</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Collaboration patterns</li>
                  <li>• Knowledge sharing frequency</li>
                  <li>• Cross-team project success</li>
                  <li>• Communication effectiveness</li>
                  <li>• Innovation and improvement suggestions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Success Metrics & Benchmarks</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-yellow-700">
              <div>
                <strong>Productivity:</strong> 15% improvement in identification speed
              </div>
              <div>
                <strong>Accuracy:</strong> Maintain 95%+ identification accuracy
              </div>
              <div>
                <strong>Engagement:</strong> 80% active participation in training
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Reporting */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <BarChart3 className="w-6 h-6" />
            Custom Reporting and Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-3">Report Builder</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• Drag-and-drop report creation</li>
                <li>• Custom date range selection</li>
                <li>• Multi-dimensional data filtering</li>
                <li>• Automated report scheduling</li>
                <li>• White-label report templates</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-3">Data Visualization</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Interactive charts and graphs</li>
                <li>• Heatmaps and geographic plots</li>
                <li>• Trend analysis visualizations</li>
                <li>• Comparative analytics dashboards</li>
                <li>• Export to PDF, Excel, PowerPoint</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Pre-Built Report Templates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
              <div className="bg-white p-2 rounded border">Monthly Usage Summary</div>
              <div className="bg-white p-2 rounded border">Species Discovery Report</div>
              <div className="bg-white p-2 rounded border">User Engagement Analysis</div>
              <div className="bg-white p-2 rounded border">ROI and Cost Analysis</div>
              <div className="bg-white p-2 rounded border">Training Effectiveness</div>
              <div className="bg-white p-2 rounded border">Geographic Distribution</div>
              <div className="bg-white p-2 rounded border">Seasonal Trends</div>
              <div className="bg-white p-2 rounded border">Compliance Audit</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business System Integration */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Zap className="w-6 h-6" />
            Integration with Business Systems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-4">Seamless System Connectivity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-orange-800 mb-3">CRM Integration</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Salesforce data synchronization</li>
                  <li>• HubSpot contact management</li>
                  <li>• Customer journey tracking</li>
                  <li>• Lead scoring and qualification</li>
                  <li>• Automated follow-up workflows</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-800 mb-3">Business Intelligence</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Tableau dashboard integration</li>
                  <li>• Power BI data connections</li>
                  <li>• Custom API endpoints</li>
                  <li>• Real-time data streaming</li>
                  <li>• Data warehouse compatibility</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Implementation Timeline</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Week 1-2: System assessment and planning</li>
                <li>• Week 3-6: API development and testing</li>
                <li>• Week 7-8: Data migration and validation</li>
                <li>• Week 9: Go-live and monitoring</li>
              </ul>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Resource Requirements</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 2 senior developers for integration</li>
                <li>• 1 data architect for design</li>
                <li>• Client IT team coordination</li>
                <li>• Ongoing technical support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-center text-blue-800">Business Dashboard Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Phase 1: Foundation (Weeks 1-4)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Infrastructure setup and security configuration</li>
                <li>• Multi-location data architecture</li>
                <li>• Basic dashboard deployment</li>
                <li>• User access and permissions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Phase 2: Enhancement (Weeks 5-8)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Custom reporting tools integration</li>
                <li>• Advanced analytics implementation</li>
                <li>• Business system connections</li>
                <li>• Training and user adoption</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Expected ROI Timeline</h4>
            <p className="text-sm text-green-700">
              Most clients see 25-40% improvement in operational efficiency within 6 months, 
              with full ROI typically achieved within 12-18 months of implementation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessDashboardSuite;
