
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Brain, TestTube, TrendingDown, BarChart3, Shield, Users, MessageSquare, CheckCircle, Clock, RefreshCw, Zap } from 'lucide-react';

const AITestingIssuesTroubleshooting: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Brain className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          AI & Testing Issues Troubleshooting
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Resolve AI model accuracy concerns, validation discrepancies, and Phase 4 testing features
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge className="bg-blue-100 text-blue-800">AI Testing</Badge>
          <Badge className="bg-purple-100 text-purple-800">Model Validation</Badge>
          <Badge className="bg-green-100 text-green-800">Performance Monitoring</Badge>
        </div>
      </div>

      {/* AI Model Accuracy Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800 flex items-center gap-3">
            <Brain className="w-6 h-6" />
            AI Model Accuracy & Validation Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-red-800">Low Confidence Scores</h4>
              </div>
              <p className="text-sm text-red-700 mb-3">
                AI consistently returns confidence below 65% for clear orchid photos.
              </p>
              <div className="space-y-3">
                <div>
                  <strong className="text-red-800">Resolution Steps:</strong>
                  <ol className="list-decimal list-inside text-sm text-red-700 mt-2 space-y-1">
                    <li>Check photo quality against Phase 4 standards</li>
                    <li>Submit for community validation via Q&A system</li>
                    <li>Use AI testing dashboard to report accuracy issues</li>
                    <li>Request expert verification through new verification program</li>
                    <li>Monitor model performance metrics in analytics dashboard</li>
                  </ol>
                </div>
                <div className="text-xs text-red-600">
                  <strong>Escalation:</strong> If confidence remains low after photo optimization, submit to expert review panel.
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-3">
                <TestTube className="w-5 h-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800">Model Performance Regression</h4>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                Accuracy has decreased compared to baseline performance metrics.
              </p>
              <div className="space-y-3">
                <div>
                  <strong className="text-yellow-800">Diagnostic Steps:</strong>
                  <ol className="list-decimal list-inside text-sm text-yellow-700 mt-2 space-y-1">
                    <li>Access analytics dashboard performance trends</li>
                    <li>Compare current vs. historical accuracy metrics</li>
                    <li>Review recent model update notifications</li>
                    <li>Check community validation disagreement rates</li>
                    <li>Submit regression report via admin tools</li>
                  </ol>
                </div>
                <div className="text-xs text-yellow-600">
                  <strong>Escalation:</strong> Critical regressions automatically notify development team.
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-purple-800">Validation Conflicts</h4>
              </div>
              <p className="text-sm text-purple-700 mb-3">
                AI results conflict with community expert validation.
              </p>
              <div className="space-y-3">
                <div>
                  <strong className="text-purple-800">Resolution Process:</strong>
                  <ol className="list-decimal list-inside text-sm text-purple-700 mt-2 space-y-1">
                    <li>Review validation history in community dashboard</li>
                    <li>Check expert credentials and verification status</li>
                    <li>Submit to secondary expert review panel</li>
                    <li>Use A/B testing framework for model comparison</li>
                    <li>Document edge case for model training updates</li>
                  </ol>
                </div>
                <div className="text-xs text-purple-600">
                  <strong>Prevention:</strong> Enable real-time validation notifications.
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">Edge Case Identification</h4>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Unusual orchid varieties or hybrid species not properly identified.
              </p>
              <div className="space-y-3">
                <div>
                  <strong className="text-blue-800">Handling Procedure:</strong>
                  <ol className="list-decimal list-inside text-sm text-blue-700 mt-2 space-y-1">
                    <li>Flag as edge case in AI testing dashboard</li>
                    <li>Submit to specialized botanist network</li>
                    <li>Contribute to community knowledge base</li>
                    <li>Request inclusion in next model training cycle</li>
                    <li>Monitor similar case patterns in analytics</li>
                  </ol>
                </div>
                <div className="text-xs text-blue-600">
                  <strong>Timeline:</strong> Edge cases reviewed weekly by expert panel.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Testing Dashboard Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800 flex items-center gap-3">
            <TestTube className="w-6 h-6" />
            AI Testing Dashboard Problems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Testing Interface Not Loading</h4>
                <p className="text-gray-700 text-sm mb-3">
                  AI testing dashboard shows blank screen or loading errors.
                </p>
                <div className="space-y-2">
                  <div><strong>Quick Fixes:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Clear browser cache and refresh</li>
                    <li>• Check network connection stability</li>
                    <li>• Verify account has testing permissions</li>
                    <li>• Try incognito/private browsing mode</li>
                  </ul>
                  <div><strong>Advanced Solutions:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Check developer console for JavaScript errors</li>
                    <li>• Verify API connectivity in network tab</li>
                    <li>• Submit support ticket with error logs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Test Results Not Updating</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Submitted tests don't show results or status updates.
                </p>
                <div className="space-y-2">
                  <div><strong>Diagnostic Steps:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Check test queue status in dashboard</li>
                    <li>• Verify image upload completed successfully</li>
                    <li>• Review processing time estimates</li>
                    <li>• Check for system maintenance notifications</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Performance Metrics Discrepancies</h4>
                <p className="text-gray-700 text-sm mb-3">
                  AI performance data doesn't match expected values or shows inconsistencies.
                </p>
                <div className="space-y-2">
                  <div><strong>Verification Process:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Cross-reference with community validation data</li>
                    <li>• Check calculation methodology documentation</li>
                    <li>• Review data collection time periods</li>
                    <li>• Submit discrepancy report to analytics team</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Self-Service Diagnostic Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800 flex items-center gap-3">
            <Zap className="w-6 h-6" />
            Self-Service Diagnostic Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <TestTube className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-blue-800 mb-2">AI Model Test</h4>
              <p className="text-sm text-blue-600 mb-3">Run diagnostic test on current AI model</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                Run Test
              </button>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-green-800 mb-2">Performance Check</h4>
              <p className="text-sm text-green-600 mb-3">Analyze your account's AI accuracy</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                Check Performance
              </button>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Shield className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-purple-800 mb-2">Validation Status</h4>
              <p className="text-sm text-purple-600 mb-3">Review community validation history</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700">
                View Status
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Response Procedures */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardContent className="py-8">
          <div className="text-center mb-6">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Critical AI System Issues
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              For severe accuracy problems, system outages, or data integrity issues
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Immediate Actions</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Document the issue with screenshots</li>
                <li>• Note exact time and conditions</li>
                <li>• Submit critical issue report</li>
                <li>• Switch to manual validation mode</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Escalation Path</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Auto-notification to on-call team</li>
                <li>• Expert panel immediate review</li>
                <li>• Development team assessment</li>
                <li>• User communication protocol</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Recovery Process</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• System rollback if necessary</li>
                <li>• Model retraining initiation</li>
                <li>• Performance monitoring increase</li>
                <li>• User notification of resolution</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITestingIssuesTroubleshooting;
