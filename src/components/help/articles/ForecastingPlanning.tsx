import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Calendar, Target, Globe, DollarSign, Users, Zap } from 'lucide-react';

const ForecastingPlanning: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <TrendingUp className="w-16 h-16 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Forecasting & Planning
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Leverage predictive analytics and forecasting models to plan for growth, 
          anticipate market opportunities, and make strategic decisions based on data-driven insights.
        </p>
      </div>

      {/* User Growth Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-800">User Growth Projection Models</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Growth Trajectory Analysis
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">Current Growth Metrics</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Growth Rate</span>
                      <span className="font-bold text-blue-900">18.7%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Current User Base</span>
                      <span className="font-bold text-blue-900">47,892</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Organic Growth Rate</span>
                      <span className="font-bold text-blue-900">12.3%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Paid Acquisition Growth</span>
                      <span className="font-bold text-blue-900">6.4%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">6-Month Projections</h5>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Conservative (12% growth)</span>
                        <span className="font-bold text-green-900">95,247</span>
                      </div>
                      <Progress value={60} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Expected (18% growth)</span>
                        <span className="font-bold text-green-900">123,671</span>
                      </div>
                      <Progress value={80} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Optimistic (25% growth)</span>
                        <span className="font-bold text-green-900">167,438</span>
                      </div>
                      <Progress value={100} className="h-1" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">Growth Drivers</h5>
                  <div className="space-y-1 text-sm text-purple-700">
                    <div>• Product-market fit strength: High</div>
                    <div>• Word-of-mouth coefficient: 1.7x</div>
                    <div>• Seasonal demand patterns: +34% spring boost</div>
                    <div>• Competitive landscape: Favorable</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Scenario Planning</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h5 className="font-medium text-green-800 mb-1">Bull Case (30% probability)</h5>
                  <div className="text-sm text-green-700 space-y-1">
                    <div><strong>Triggers:</strong> Viral growth, major partnership</div>
                    <div><strong>6M Target:</strong> 180,000+ users</div>
                    <div><strong>Growth Rate:</strong> 28%+ monthly</div>
                    <div><strong>Key Metrics:</strong> 95%+ retention, 25% conversion</div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h5 className="font-medium text-blue-800 mb-1">Base Case (50% probability)</h5>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div><strong>Triggers:</strong> Steady execution, normal market</div>
                    <div><strong>6M Target:</strong> 120,000-130,000 users</div>
                    <div><strong>Growth Rate:</strong> 16-20% monthly</div>
                    <div><strong>Key Metrics:</strong> 85% retention, 15% conversion</div>
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <h5 className="font-medium text-orange-800 mb-1">Bear Case (20% probability)</h5>
                  <div className="text-sm text-orange-700 space-y-1">
                    <div><strong>Triggers:</strong> Economic downturn, competition</div>
                    <div><strong>6M Target:</strong> 80,000-95,000 users</div>
                    <div><strong>Growth Rate:</strong> 8-12% monthly</div>
                    <div><strong>Key Metrics:</strong> 75% retention, 10% conversion</div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h5 className="font-medium text-indigo-800 mb-2">Strategic Recommendations</h5>
                  <div className="text-sm text-indigo-700 space-y-1">
                    <div>• Plan infrastructure for 150,000 users</div>
                    <div>• Hire 2-3 additional engineers by Q2</div>
                    <div>• Expand customer success team by 40%</div>
                    <div>• Budget for $180K additional server costs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Forecasting */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-800">Revenue Forecasting Methodologies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Revenue Model Breakdown
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">Subscription Revenue (85%)</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current MRR</span>
                      <span className="font-bold">$289,400</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth Rate</span>
                      <span className="font-bold">+18.7% MoM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Churn Rate</span>
                      <span className="font-bold">3.2% monthly</span>
                    </div>
                    <div className="p-2 bg-green-100 rounded text-xs text-green-800">
                      6M Projection: $678,000 MRR (Conservative: $598K)
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">Expert Services (10%)</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Monthly</span>
                      <span className="font-bold">$28,940</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Session</span>
                      <span className="font-bold">$95</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sessions/Month</span>
                      <span className="font-bold">305</span>
                    </div>
                    <div className="p-2 bg-blue-100 rounded text-xs text-blue-800">
                      6M Projection: $67,900 monthly (720 sessions)
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">Course Sales (5%)</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Monthly</span>
                      <span className="font-bold">$14,470</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Course Price</span>
                      <span className="font-bold">$127</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Courses Sold/Month</span>
                      <span className="font-bold">114</span>
                    </div>
                    <div className="p-2 bg-purple-100 rounded text-xs text-purple-800">
                      6M Projection: $33,950 monthly (267 courses)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Forecasting Models</h4>
              
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Cohort-Based Model</h5>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div>• Tracks user behavior by signup month</div>
                    <div>• Predicts LTV based on cohort performance</div>
                    <div>• Accounts for seasonal variations</div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong>Accuracy:</strong> ±12% over 6 months
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Time Series Analysis</h5>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div>• Uses historical data patterns</div>
                    <div>• Identifies seasonal trends</div>
                    <div>• Adjusts for external factors</div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong>Accuracy:</strong> ±8% for monthly revenue
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Bottom-Up Forecasting</h5>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div>• Builds from individual metrics</div>
                    <div>• User acquisition × conversion × LTV</div>
                    <div>• Most granular and controllable</div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong>Accuracy:</strong> ±15% but highest control
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h5 className="font-medium text-indigo-800 mb-2">6-Month Revenue Forecast</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Conservative Scenario</span>
                      <span className="font-bold text-indigo-900">$758K MRR</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Expected Scenario</span>
                      <span className="font-bold text-indigo-900">$889K MRR</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Optimistic Scenario</span>
                      <span className="font-bold text-indigo-900">$1.2M MRR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Demand Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-800">Seasonal Demand Prediction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                Seasonal Pattern Analysis
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-800">Spring Peak (Mar-May)</span>
                    <Badge className="bg-green-100 text-green-800">+47% demand</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-green-700">
                    <div>• Peak orchid buying season</div>
                    <div>• Highest new user acquisition</div>
                    <div>• Premium conversion peak: +38%</div>
                    <div>• Expert consultation demand: +56%</div>
                  </div>
                  <div className="mt-2 p-2 bg-green-100 rounded text-xs text-green-800">
                    <strong>Strategy:</strong> Scale marketing spend by 60% in Q1
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-yellow-800">Summer Care (Jun-Aug)</span>
                    <Badge className="bg-yellow-100 text-yellow-800">+23% demand</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-yellow-700">
                    <div>• High care calendar usage</div>
                    <div>• Problem-solving feature peak</div>
                    <div>• Community engagement increases</div>
                    <div>• Mobile usage +34% (outdoor care)</div>
                  </div>
                  <div className="mt-2 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
                    <strong>Strategy:</strong> Focus on mobile features and problem-solving content
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-orange-800">Fall Preparation (Sep-Nov)</span>
                    <Badge className="bg-orange-100 text-orange-800">Baseline</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-orange-700">
                    <div>• Educational content consumption</div>
                    <div>• Planning for winter care</div>
                    <div>• Course enrollment peak</div>
                    <div>• Equipment purchase recommendations</div>
                  </div>
                  <div className="mt-2 p-2 bg-orange-100 rounded text-xs text-orange-800">
                    <strong>Strategy:</strong> Launch educational campaigns and winter prep guides
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-blue-800">Winter Dormancy (Dec-Feb)</span>
                    <Badge className="bg-blue-100 text-blue-800">-18% demand</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div>• Lowest activity period</div>
                    <div>• Higher churn risk</div>
                    <div>• Gift subscription opportunities</div>
                    <div>• Planning for next year</div>
                  </div>
                  <div className="mt-2 p-2 bg-blue-100 rounded text-xs text-blue-800">
                    <strong>Strategy:</strong> Retention campaigns and holiday promotions
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Demand Forecasting Model</h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h5 className="font-medium text-indigo-800 mb-2">Next 12 Months Prediction</h5>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-xs text-center">
                      <div className="p-2 bg-green-100 rounded">
                        <div className="font-bold text-green-800">Q2 2024</div>
                        <div className="text-green-600">Spring Peak</div>
                        <div className="font-medium">+52% growth</div>
                      </div>
                      <div className="p-2 bg-yellow-100 rounded">
                        <div className="font-bold text-yellow-800">Q3 2024</div>
                        <div className="text-yellow-600">Summer Care</div>
                        <div className="font-medium">+28% growth</div>
                      </div>
                      <div className="p-2 bg-orange-100 rounded">
                        <div className="font-bold text-orange-800">Q4 2024</div>
                        <div className="text-orange-600">Fall Prep</div>
                        <div className="font-medium">+15% growth</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-xs text-center mt-2">
                      <div className="p-2 bg-blue-100 rounded">
                        <div className="font-bold text-blue-800">Q1 2025</div>
                        <div className="text-blue-600">Winter Low → Spring Ramp</div>
                        <div className="font-medium">-12% → +45% growth</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Key Demand Drivers</h5>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Seasonal gardening trends</span>
                      <Badge variant="outline">45% influence</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Holiday gift seasons</span>
                      <Badge variant="outline">23% influence</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Indoor plant popularity</span>
                      <Badge variant="outline">18% influence</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Economic conditions</span>
                      <Badge variant="outline">14% influence</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-medium text-purple-800 mb-2">Resource Planning</h5>
                  <div className="text-sm text-purple-700 space-y-1">
                    <div>• Scale support team by 40% before spring</div>
                    <div>• Increase server capacity by 60% in Q1</div>
                    <div>• Hire seasonal content creators</div>
                    <div>• Stock up on promotional materials</div>
                    <div>• Plan expert availability scaling</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Expansion */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-800">Market Expansion Opportunity Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                Geographic Expansion Targets
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-800">Europe Expansion</span>
                    <Badge className="bg-green-100 text-green-800">Priority 1</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-green-700">
                    <div><strong>Market Size:</strong> €48M addressable</div>
                    <div><strong>Competition:</strong> Fragmented, no clear leader</div>
                    <div><strong>Timeline:</strong> Q3 2024 launch</div>
                    <div><strong>Investment:</strong> $180K (localization + marketing)</div>
                  </div>
                  <div className="mt-2 p-2 bg-green-100 rounded text-xs text-green-800">
                    <strong>Projected:</strong> 15,000 users by Q4 2024, €67K MRR
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-blue-800">Australia/NZ</span>
                    <Badge className="bg-blue-100 text-blue-800">Priority 2</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div><strong>Market Size:</strong> $12M addressable</div>
                    <div><strong>Competition:</strong> Limited digital solutions</div>
                    <div><strong>Timeline:</strong> Q1 2025 launch</div>
                    <div><strong>Investment:</strong> $89K (regional adaptation)</div>
                  </div>
                  <div className="mt-2 p-2 bg-blue-100 rounded text-xs text-blue-800">
                    <strong>Projected:</strong> 7,500 users by Q2 2025, $34K MRR
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-purple-800">Asia-Pacific</span>
                    <Badge className="bg-purple-100 text-purple-800">Priority 3</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-purple-700">
                    <div><strong>Market Size:</strong> $156M addressable</div>
                    <div><strong>Competition:</strong> Local players, high barriers</div>
                    <div><strong>Timeline:</strong> Q3 2025 research phase</div>
                    <div><strong>Investment:</strong> $340K (full localization)</div>
                  </div>
                  <div className="mt-2 p-2 bg-purple-100 rounded text-xs text-purple-800">
                    <strong>Projected:</strong> 25,000 users by Q4 2025, $89K MRR
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Product Expansion Opportunities</h4>
              
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">AI Garden Planning</span>
                    <Badge className="bg-green-100 text-green-800">High Potential</Badge>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><strong>TAM:</strong> $45M in garden planning software</div>
                    <div><strong>Development:</strong> 6 months, $120K</div>
                    <div><strong>Revenue Model:</strong> Premium feature addon</div>
                    <div><strong>Projected:</strong> +$67K MRR within 12 months</div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">IoT Sensor Integration</span>
                    <Badge className="bg-blue-100 text-blue-800">Medium Potential</Badge>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><strong>TAM:</strong> $23M in smart gardening devices</div>
                    <div><strong>Development:</strong> 12 months, $280K</div>
                    <div><strong>Revenue Model:</strong> Hardware sales + subscriptions</div>
                    <div><strong>Projected:</strong> +$123K MRR within 18 months</div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">B2B Greenhouse Solutions</span>
                    <Badge className="bg-purple-100 text-purple-800">High Value</Badge>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><strong>TAM:</strong> $156M commercial greenhouse software</div>
                    <div><strong>Development:</strong> 18 months, $450K</div>
                    <div><strong>Revenue Model:</strong> Enterprise licensing</div>
                    <div><strong>Projected:</strong> +$234K MRR within 24 months</div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h5 className="font-medium text-indigo-800 mb-2">Strategic Recommendations</h5>
                  <div className="text-sm text-indigo-700 space-y-1">
                    <div>1. Focus on Europe expansion in Q3 2024</div>
                    <div>2. Develop AI garden planning as premium feature</div>
                    <div>3. Research B2B market for 2025 roadmap</div>
                    <div>4. Partner with IoT companies for sensor integration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="py-8 text-center">
          <TrendingUp className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Strategic Foresight & Planning
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Successful businesses don't just react to the future - they anticipate it. 
            Use data-driven forecasting to make strategic decisions, allocate resources effectively, 
            and position Orkhidly for sustained growth in evolving markets.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-indigo-100 text-indigo-800">Predictive Analytics</Badge>
            <Badge className="bg-purple-100 text-purple-800">Strategic Planning</Badge>
            <Badge className="bg-blue-100 text-blue-800">Market Intelligence</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastingPlanning;
