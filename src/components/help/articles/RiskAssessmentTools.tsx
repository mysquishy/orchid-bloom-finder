
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, TrendingDown, Monitor, Zap, Users, Target, Activity } from 'lucide-react';

const RiskAssessmentTools: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Shield className="w-16 h-16 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Risk Assessment Tools
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive risk management framework to identify, assess, and mitigate business threats 
          while ensuring continuity, performance, and competitive advantage in a dynamic market.
        </p>
      </div>

      {/* Churn Risk Identification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-red-800">Churn Risk Identification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                Churn Prediction Model
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h5 className="font-medium text-red-800 mb-2">High Risk Users (8.3%)</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total at-risk users</span>
                      <span className="font-bold text-red-900">3,975</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Predicted churn in 30 days</span>
                      <span className="font-bold text-red-900">78%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Revenue at risk</span>
                      <span className="font-bold text-red-900">$67,340</span>
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-red-100 rounded text-xs text-red-800">
                    <strong>Action Required:</strong> Immediate intervention campaigns
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h5 className="font-medium text-yellow-800 mb-2">Medium Risk Users (14.7%)</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total at-risk users</span>
                      <span className="font-bold text-yellow-900">7,041</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Predicted churn in 60 days</span>
                      <span className="font-bold text-yellow-900">45%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Revenue at risk</span>
                      <span className="font-bold text-yellow-900">$89,230</span>
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
                    <strong>Action Required:</strong> Proactive engagement programs
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">Low Risk Users (77%)</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Stable user base</span>
                      <span className="font-bold text-green-900">36,876</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Predicted retention</span>
                      <span className="font-bold text-green-900">94%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Stable revenue</span>
                      <span className="font-bold text-green-900">$412,890</span>
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-green-100 rounded text-xs text-green-800">
                    <strong>Status:</strong> Maintain current engagement levels
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Risk Factors Analysis</h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Top Churn Indicators</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">No login for 14+ days</span>
                      <Badge className="bg-red-100 text-red-800">89% churn prob.</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Support ticket unresolved</span>
                      <Badge className="bg-orange-100 text-orange-800">67% churn prob.</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Failed AI identifications</span>
                      <Badge className="bg-yellow-100 text-yellow-800">54% churn prob.</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">No feature exploration</span>
                      <Badge className="bg-yellow-100 text-yellow-800">48% churn prob.</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Protective Factors</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Community participation</span>
                      <Badge className="bg-green-100 text-green-800">4% churn prob.</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Premium subscription</span>
                      <Badge className="bg-green-100 text-green-800">6% churn prob.</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Regular care tracking</span>
                      <Badge className="bg-green-100 text-green-800">8% churn prob.</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Expert consultation</span>
                      <Badge className="bg-green-100 text-green-800">12% churn prob.</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">Intervention Success Rates</h5>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div>• Email re-engagement: 34% save rate</div>
                    <div>• Personal outreach calls: 67% save rate</div>
                    <div>• Premium trial offers: 45% save rate</div>
                    <div>• Expert consultation vouchers: 78% save rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Continuity Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-red-800">Business Continuity Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-blue-600" />
                Operational Resilience
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">System Uptime</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current month</span>
                      <span className="font-bold text-green-900">99.97%</span>
                    </div>
                    <Progress value={99.97} className="h-2" />
                    <div className="text-xs text-green-600">
                      Target: 99.9% • Last incident: 3 weeks ago (4min downtime)
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">Data Backup Status</h5>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div>• Real-time replication: Active</div>
                    <div>• Daily snapshots: Automated</div>
                    <div>• Geographic backup: 3 regions</div>
                    <div>• Recovery testing: Weekly</div>
                  </div>
                  <div className="mt-2 p-2 bg-blue-100 rounded text-xs text-blue-800">
                    <strong>RTO:</strong> < 15 minutes • <strong>RPO:</strong> < 1 minute
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">Security Posture</h5>
                  <div className="space-y-2 text-sm text-purple-700">
                    <div>• Vulnerability scan: Weekly</div>
                    <div>• Penetration testing: Quarterly</div>
                    <div>• SOC 2 compliance: Active</div>
                    <div>• Incident response: 24/7</div>
                  </div>
                  <div className="mt-2 p-2 bg-purple-100 rounded text-xs text-purple-800">
                    <strong>Last audit:</strong> No critical findings
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Financial Stability</h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">Cash Flow Health</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Runway at current burn</span>
                      <span className="font-bold text-green-900">18 months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly recurring revenue</span>
                      <span className="font-bold text-green-900">$289,400</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth rate (MoM)</span>
                      <span className="font-bold text-green-900">+18.7%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h5 className="font-medium text-yellow-800 mb-2">Revenue Concentration Risk</h5>
                  <div className="space-y-2 text-sm text-yellow-700">
                    <div>• Top 10 customers: 23% of revenue</div>
                    <div>• Largest customer: 4.2% of revenue</div>
                    <div>• Premium subscriptions: 85% of revenue</div>
                    <div>• Geographic concentration: 58% North America</div>
                  </div>
                  <div className="mt-2 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
                    <strong>Risk Level:</strong> Moderate - diversification recommended
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">Key Metrics Stability</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Customer acquisition cost</span>
                      <Badge className="bg-green-100 text-green-800">Stable</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Lifetime value</span>
                      <Badge className="bg-green-100 text-green-800">Growing</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Gross margin</span>
                      <Badge className="bg-green-100 text-green-800">87%</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Burn rate</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Monitored</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Threat Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-red-800">Competitive Threat Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                Competitive Landscape
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-red-800">Direct Competitors</span>
                    <Badge className="bg-red-100 text-red-800">High Threat</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-red-700">
                    <div><strong>PlantNet AI:</strong> Free, academic backing</div>
                    <div>• Market share: 34%</div>
                    <div>• Threat: Feature parity push</div>
                    <div>• Mitigation: Premium care features</div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-orange-800">Indirect Competitors</span>
                    <Badge className="bg-orange-100 text-orange-800">Medium Threat</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-orange-700">
                    <div><strong>Garden Assistant Apps:</strong> Broader focus</div>
                    <div>• Market share: 28%</div>
                    <div>• Threat: Orchid feature addition</div>
                    <div>• Mitigation: Deep orchid specialization</div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-yellow-800">New Entrants</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Emerging Threat</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-yellow-700">
                    <div><strong>Big Tech Ventures:</strong> Resource advantage</div>
                    <div>• Probability: 25% in next 12 months</div>
                    <div>• Threat: Market disruption</div>
                    <div>• Mitigation: Community moats</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Threat Monitoring</h4>
              
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Competitive Intelligence</h5>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• Feature tracking: Automated weekly scans</div>
                    <div>• Pricing monitoring: Daily price checks</div>
                    <div>• App store reviews: Sentiment analysis</div>
                    <div>• Social media: Brand mention tracking</div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Early Warning Indicators</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Market share erosion</span>
                      <Badge className="bg-green-100 text-green-800">Stable</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">User acquisition cost increase</span>
                      <Badge className="bg-yellow-100 text-yellow-800">+12% QoQ</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Competitive feature launches</span>
                      <Badge className="bg-orange-100 text-orange-800">2 this quarter</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Churn to competitors</span>
                      <Badge className="bg-green-100 text-green-800">Low (8%)</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">Competitive Advantages</h5>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• Orchid-specific AI training data</div>
                    <div>• Expert community network</div>
                    <div>• Comprehensive care tracking</div>
                    <div>• Strong user engagement (8.4min sessions)</div>
                    <div>• Premium positioning and pricing power</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Performance Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-red-800">Technology Performance Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                AI Model Performance
              </h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-1">Accuracy Metrics</h5>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>Overall accuracy: 87.2%</div>
                    <div>Confidence correlation: 94%</div>
                    <div>False positive rate: 3.1%</div>
                    <div>Response time: 1.2s avg</div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h5 className="font-medium text-yellow-800 mb-1">Performance Degradation</h5>
                  <div className="space-y-1 text-sm text-yellow-700">
                    <div>Rare species: -12% accuracy</div>
                    <div>Low light photos: -18% accuracy</div>
                    <div>Multiple plants: -23% accuracy</div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-1">Model Health</h5>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>Training data: 2.3M images</div>
                    <div>Last retrain: 2 weeks ago</div>
                    <div>Drift detection: Stable</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Infrastructure Health</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-1">Server Performance</h5>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>CPU utilization: 67% avg</div>
                    <div>Memory usage: 78% avg</div>
                    <div>Disk I/O: Optimal</div>
                    <div>Network latency: 23ms avg</div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-1">Database Performance</h5>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>Query response: 45ms avg</div>
                    <div>Connection pool: 78% utilized</div>
                    <div>Replication lag: < 1ms</div>
                    <div>Storage usage: 67%</div>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-1">CDN & Assets</h5>
                  <div className="space-y-1 text-sm text-purple-700">
                    <div>Cache hit ratio: 94%</div>
                    <div>Image optimization: Active</div>
                    <div>Global edge nodes: 12</div>
                    <div>Bandwidth usage: 2.3TB/day</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Risk Mitigation</h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-1">Auto-scaling</h5>
                  <div className="text-sm text-gray-700">
                    Handles 5x traffic spikes automatically
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-1">Failover Systems</h5>
                  <div className="text-sm text-gray-700">
                    Multi-region deployment with instant failover
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-1">Monitoring</h5>
                  <div className="text-sm text-gray-700">
                    24/7 alerts with PagerDuty integration
                  </div>
                </div>

                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <h5 className="font-medium text-red-800 mb-1">Critical Alerts</h5>
                  <div className="space-y-1 text-sm text-red-700">
                    <div>• AI accuracy < 80%</div>
                    <div>• Response time > 5s</div>
                    <div>• Error rate > 1%</div>
                    <div>• Uptime < 99.9%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardContent className="py-8 text-center">
          <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Proactive Risk Management
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Effective risk management isn't about avoiding all risks - it's about understanding, 
            monitoring, and mitigating them strategically. Build resilient systems and processes 
            that can adapt and thrive in the face of uncertainty.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-red-100 text-red-800">Risk Awareness</Badge>
            <Badge className="bg-orange-100 text-orange-800">Proactive Monitoring</Badge>
            <Badge className="bg-yellow-100 text-yellow-800">Strategic Mitigation</Badge>
            <Badge className="bg-green-100 text-green-800">Business Resilience</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentTools;
