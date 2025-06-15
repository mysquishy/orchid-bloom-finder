
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MousePointer, Eye, Clock, TrendingDown, Users, Zap, Target, AlertTriangle } from 'lucide-react';

const UserBehaviorAnalytics: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <MousePointer className="w-16 h-16 text-orange-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          User Behavior Analytics
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Deep insights into user interactions, feature adoption patterns, conversion pathways, 
          and behavioral trends that drive engagement and business growth.
        </p>
      </div>

      {/* Feature Adoption Rates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-orange-800">Feature Adoption Rates and Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Core Feature Adoption</h4>
              
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">AI Plant Identification</span>
                    <Badge className="bg-green-100 text-green-800">Universal</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Adoption Rate</span>
                    <span className="font-bold">94.2%</span>
                  </div>
                  <Progress value={94} className="h-2 mb-1" />
                  <div className="text-xs text-gray-600">
                    Average time to first use: 2.3 minutes • Daily usage: 67%
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Care Calendar</span>
                    <Badge className="bg-blue-100 text-blue-800">High</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Adoption Rate</span>
                    <span className="font-bold">67.8%</span>
                  </div>
                  <Progress value={68} className="h-2 mb-1" />
                  <div className="text-xs text-gray-600">
                    Average time to first use: 4.1 days • Weekly usage: 89%
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Community Forums</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Adoption Rate</span>
                    <span className="font-bold">43.2%</span>
                  </div>
                  <Progress value={43} className="h-2 mb-1" />
                  <div className="text-xs text-gray-600">
                    Average time to first use: 12.6 days • Monthly usage: 56%
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Expert Consultations</span>
                    <Badge className="bg-purple-100 text-purple-800">Premium</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Adoption Rate</span>
                    <span className="font-bold">18.7%</span>
                  </div>
                  <Progress value={19} className="h-2 mb-1" />
                  <div className="text-xs text-gray-600">
                    Premium users: 89% • Average booking: 28 days after signup
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Adoption Pathway Analysis</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h5 className="font-medium text-green-800 mb-1">Fast Adopters (24%)</h5>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>• Use 3+ features within first week</div>
                    <div>• 87% convert to premium within 30 days</div>
                    <div>• High community engagement scores</div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h5 className="font-medium text-blue-800 mb-1">Gradual Adopters (51%)</h5>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• Adopt features over 2-8 weeks</div>
                    <div>• 34% convert to premium within 60 days</div>
                    <div>• Moderate feature exploration</div>
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                  <h5 className="font-medium text-orange-800 mb-1">Limited Adopters (25%)</h5>
                  <div className="text-sm text-orange-700 space-y-1">
                    <div>• Stick to 1-2 core features</div>
                    <div>• 12% convert to premium</div>
                    <div>• High churn risk after 30 days</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-purple-800 mb-2">Adoption Insights</h5>
                <div className="text-sm text-purple-700 space-y-1">
                  <div>• Onboarding completion increases adoption by 67%</div>
                  <div>• First successful identification drives 89% retention</div>
                  <div>• Community engagement correlates with premium conversion</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Journey Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-orange-800">User Journey and Conversion Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Conversion Funnel
              </h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">Website Visitors</span>
                    <span className="text-lg font-bold text-blue-900">100%</span>
                  </div>
                  <div className="text-xs text-blue-600">124,892 monthly visitors</div>
                </div>

                <div className="ml-4 border-l-2 border-gray-300 pl-4 space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-800">Sign-up Started</span>
                      <span className="text-lg font-bold text-green-900">23.4%</span>
                    </div>
                    <div className="text-xs text-green-600">29,225 users began registration</div>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-yellow-800">Registration Complete</span>
                      <span className="text-lg font-bold text-yellow-900">18.7%</span>
                    </div>
                    <div className="text-xs text-yellow-600">23,355 completed accounts (80% completion)</div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-purple-800">First Identification</span>
                      <span className="text-lg font-bold text-purple-900">16.2%</span>
                    </div>
                    <div className="text-xs text-purple-600">20,233 used core feature (87% of registered)</div>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-orange-800">Premium Conversion</span>
                      <span className="text-lg font-bold text-orange-900">2.1%</span>
                    </div>
                    <div className="text-xs text-orange-600">2,623 premium subscribers (13% of active users)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Journey Optimization Points</h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800">High Drop-off Point</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <strong>Registration Process:</strong> 20% abandonment
                  </div>
                  <div className="text-xs text-gray-600">
                    Opportunity: Simplify form, add social login, reduce required fields
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Conversion Opportunity</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <strong>First Week Engagement:</strong> Critical period
                  </div>
                  <div className="text-xs text-gray-600">
                    Users active 3+ days in first week have 78% higher retention
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-800">Premium Trigger</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    <strong>Feature Limitation Hit:</strong> Prime conversion moment
                  </div>
                  <div className="text-xs text-gray-600">
                    67% of conversions happen when users reach free tier limits
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">Journey Insights</h5>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>• Mobile users have 23% higher conversion rates</div>
                  <div>• Organic traffic converts 2.4x better than paid</div>
                  <div>• Tutorial completion increases retention by 89%</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Churn Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-orange-800">Churn Prediction and Intervention</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                Churn Risk Factors
              </h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <h5 className="font-medium text-red-800 mb-1">High Risk Indicators</h5>
                  <div className="text-sm text-red-700 space-y-1">
                    <div>• No activity for 7+ days (78% churn probability)</div>
                    <div>• Failed identification attempts (65% churn probability)</div>
                    <div>• No feature exploration after 14 days (71% churn probability)</div>
                    <div>• Single session only (89% churn probability)</div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <h5 className="font-medium text-yellow-800 mb-1">Medium Risk Indicators</h5>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <div>• Decreased session frequency (45% churn probability)</div>
                    <div>• Support ticket without resolution (52% churn probability)</div>
                    <div>• Premium trial not activated (38% churn probability)</div>
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h5 className="font-medium text-green-800 mb-1">Low Risk Profile</h5>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>• Regular feature usage (8% churn probability)</div>
                    <div>• Community participation (4% churn probability)</div>
                    <div>• Multiple successful identifications (6% churn probability)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Intervention Strategies</h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Automated Interventions</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Re-engagement emails</span>
                      <Badge className="bg-blue-100 text-blue-800">67% open rate</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Push notifications</span>
                      <Badge className="bg-green-100 text-green-800">34% click rate</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>In-app tips</span>
                      <Badge className="bg-purple-100 text-purple-800">89% view rate</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Personal Outreach</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Customer success calls</span>
                      <Badge className="bg-yellow-100 text-yellow-800">78% save rate</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Premium trial offers</span>
                      <Badge className="bg-orange-100 text-orange-800">45% acceptance</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Expert consultation vouchers</span>
                      <Badge className="bg-pink-100 text-pink-800">62% usage rate</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">Success Metrics</h5>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>• Overall churn rate reduced by 34% with interventions</div>
                    <div>• High-risk user retention improved by 56%</div>
                    <div>• Cost per retained user: $12.40</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Usage Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-orange-800">Seasonal Usage Pattern Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Seasonal Activity Trends
              </h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-800">Spring Peak (Mar-May)</span>
                    <Badge className="bg-green-100 text-green-800">+47% activity</Badge>
                  </div>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>• Identification requests: +67%</div>
                    <div>• New registrations: +52%</div>
                    <div>• Premium conversions: +38%</div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-yellow-800">Summer Maintenance (Jun-Aug)</span>
                    <Badge className="bg-yellow-100 text-yellow-800">+23% activity</Badge>
                  </div>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <div>• Care calendar usage: +78%</div>
                    <div>• Problem-solving searches: +45%</div>
                    <div>• Expert consultations: +34%</div>
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-orange-800">Fall Preparation (Sep-Nov)</span>
                    <Badge className="bg-orange-100 text-orange-800">Baseline</Badge>
                  </div>
                  <div className="text-sm text-orange-700 space-y-1">
                    <div>• Educational content: +28%</div>
                    <div>• Community discussions: +15%</div>
                    <div>• Planning features: +22%</div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-blue-800">Winter Dormancy (Dec-Feb)</span>
                    <Badge className="bg-blue-100 text-blue-800">-18% activity</Badge>
                  </div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• Lower overall engagement</div>
                    <div>• Learning content focus</div>
                    <div>• Planning for next season</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Behavioral Adaptations</h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Geographic Variations</h5>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div>• Northern users: Strong seasonal patterns</div>
                    <div>• Southern users: More consistent year-round</div>
                    <div>• Indoor growers: Less seasonal variation</div>
                    <div>• Greenhouse users: Extended peak seasons</div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Feature Usage Shifts</h5>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div>• Spring: Identification & setup features</div>
                    <div>• Summer: Monitoring & troubleshooting</div>
                    <div>• Fall: Planning & educational content</div>
                    <div>• Winter: Community & learning features</div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h5 className="font-medium text-purple-800 mb-2">Strategic Implications</h5>
                  <div className="text-sm text-purple-700 space-y-1">
                    <div>• Spring marketing campaigns yield 67% higher ROI</div>
                    <div>• Winter content strategy reduces churn by 23%</div>
                    <div>• Seasonal feature promotion increases adoption by 45%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="py-8 text-center">
          <MousePointer className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Data-Driven User Experience
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Understanding user behavior is the key to building features people love, 
            optimizing conversion paths, and creating experiences that keep users engaged 
            and successful in their orchid care journey.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-orange-100 text-orange-800">Behavioral Insights</Badge>
            <Badge className="bg-red-100 text-red-800">Conversion Optimization</Badge>
            <Badge className="bg-purple-100 text-purple-800">User-Centric Design</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBehaviorAnalytics;
