
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Users, DollarSign, Target, Globe, Zap, Award } from 'lucide-react';

const ExecutiveDashboardOverview: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <BarChart3 className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Executive Dashboard Overview
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Strategic insights and key performance indicators to drive business growth, 
          understand market position, and make data-informed decisions for Orkhidly's future.
        </p>
      </div>

      {/* Key Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">Key Performance Indicators (KPIs)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">47,892</div>
              <div className="text-sm text-blue-700">Total Users</div>
              <div className="flex items-center justify-center mt-2 text-xs">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-600">+12.3% MoM</span>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">$289K</div>
              <div className="text-sm text-green-700">Monthly Revenue</div>
              <div className="flex items-center justify-center mt-2 text-xs">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-600">+18.7% MoM</span>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">87.2%</div>
              <div className="text-sm text-purple-700">AI Accuracy</div>
              <div className="flex items-center justify-center mt-2 text-xs">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-600">+2.1% MoM</span>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 text-center">
              <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">94.8%</div>
              <div className="text-sm text-orange-700">User Satisfaction</div>
              <div className="flex items-center justify-center mt-2 text-xs">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-green-600">+0.8% MoM</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Business Health Score</h4>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-green-800">Overall Score</span>
                  <span className="text-lg font-bold text-green-900">8.7/10</span>
                </div>
                <Progress value={87} className="h-2" />
                <div className="text-xs text-green-600 mt-1">Excellent growth trajectory</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Market Position</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Market Share</span>
                  <Badge className="bg-blue-100 text-blue-800">23%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Competitive Rank</span>
                  <Badge className="bg-green-100 text-green-800">#2</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Brand Recognition</span>
                  <Badge className="bg-purple-100 text-purple-800">High</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Strategic Goals Progress</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>50K Users by Q2</span>
                    <span>96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>$300K MRR by Q2</span>
                    <span>97%</span>
                  </div>
                  <Progress value={97} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>90% AI Accuracy</span>
                    <span>97%</span>
                  </div>
                  <Progress value={97} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Engagement & Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">User Engagement and Retention Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Engagement Metrics</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">Daily Active Users</span>
                    <span className="text-lg font-bold text-blue-900">12,847</span>
                  </div>
                  <div className="text-xs text-blue-600">26.8% of total user base</div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">Session Duration</span>
                    <span className="text-lg font-bold text-green-900">8.4m</span>
                  </div>
                  <div className="text-xs text-green-600">+1.2m vs last month</div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-purple-800">Feature Adoption</span>
                    <span className="text-lg font-bold text-purple-900">78%</span>
                  </div>
                  <div className="text-xs text-purple-600">AI identification: 94% • Care tracking: 67%</div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-800">Community Activity</span>
                    <span className="text-lg font-bold text-orange-900">3,247</span>
                  </div>
                  <div className="text-xs text-orange-600">Daily posts and interactions</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Retention Analysis</h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Day 1 Retention</span>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Users returning next day</span>
                    <span className="font-bold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Day 7 Retention</span>
                    <Badge className="bg-blue-100 text-blue-800">Strong</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Users active after 1 week</span>
                    <span className="font-bold">64%</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Day 30 Retention</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Users active after 1 month</span>
                    <span className="font-bold">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-1">Retention Insights</h5>
                  <div className="text-sm text-blue-700">
                    Users who complete onboarding have 67% higher 30-day retention
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue & Subscription Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">Revenue and Subscription Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Revenue Breakdown
              </h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">Premium Subscriptions</span>
                    <span className="font-bold text-green-900">$247K</span>
                  </div>
                  <div className="text-xs text-green-600">85% of total revenue</div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">Expert Consultations</span>
                    <span className="font-bold text-blue-900">$28K</span>
                  </div>
                  <div className="text-xs text-blue-600">10% of total revenue</div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-purple-800">Courses & Content</span>
                    <span className="font-bold text-purple-900">$14K</span>
                  </div>
                  <div className="text-xs text-purple-600">5% of total revenue</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Subscription Metrics</h4>
              
              <div className="space-y-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">8,947</div>
                  <div className="text-sm text-blue-700">Active Subscribers</div>
                  <div className="text-xs text-gray-600">18.7% of user base</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Conversion</span>
                    <span className="font-medium">12.4%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Churn Rate</span>
                    <span className="font-medium">3.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Average LTV</span>
                    <span className="font-medium">$184</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Financial Health</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-800 mb-1">Monthly Recurring Revenue</div>
                  <div className="text-xl font-bold text-green-900">$289K</div>
                  <div className="text-xs text-green-600">+18.7% growth rate</div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-800 mb-1">Customer Acquisition Cost</div>
                  <div className="text-xl font-bold text-blue-900">$23</div>
                  <div className="text-xs text-blue-600">8:1 LTV:CAC ratio</div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm font-medium text-purple-800 mb-1">Gross Margin</div>
                  <div className="text-xl font-bold text-purple-900">87%</div>
                  <div className="text-xs text-purple-600">Industry leading</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Penetration Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">Market Penetration Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Geographic Distribution
              </h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">North America</span>
                    <Badge className="bg-blue-100 text-blue-800">Primary</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>User Base</span>
                    <span className="font-bold">58% (27,778 users)</span>
                  </div>
                  <Progress value={58} className="h-2" />
                  <div className="text-xs text-gray-600 mt-1">Revenue: 62% • Growth: +15% MoM</div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Europe</span>
                    <Badge className="bg-green-100 text-green-800">Growing</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>User Base</span>
                    <span className="font-bold">28% (13,410 users)</span>
                  </div>
                  <Progress value={28} className="h-2" />
                  <div className="text-xs text-gray-600 mt-1">Revenue: 24% • Growth: +22% MoM</div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Asia-Pacific</span>
                    <Badge className="bg-purple-100 text-purple-800">Emerging</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>User Base</span>
                    <span className="font-bold">14% (6,705 users)</span>
                  </div>
                  <Progress value={14} className="h-2" />
                  <div className="text-xs text-gray-600 mt-1">Revenue: 14% • Growth: +34% MoM</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Market Opportunity</h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">Total Addressable Market</h5>
                  <div className="text-2xl font-bold text-green-900 mb-1">$2.4B</div>
                  <div className="text-sm text-green-700">Global houseplant market size</div>
                  <div className="text-xs text-green-600 mt-1">Growing at 8.1% CAGR</div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">Serviceable Addressable Market</h5>
                  <div className="text-2xl font-bold text-blue-900 mb-1">$180M</div>
                  <div className="text-sm text-blue-700">Digital orchid care segment</div>
                  <div className="text-xs text-blue-600 mt-1">Current penetration: 0.16%</div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-gray-800">Growth Opportunities</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Enterprise B2B solutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">International expansion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700">AI-powered hardware</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700">Expert marketplace expansion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="py-8">
          <div className="text-center mb-6">
            <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Strategic Business Intelligence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Growth Trajectory</h4>
              <p className="text-sm text-gray-600">
                Consistent 18.7% monthly growth with strong fundamentals and expanding market reach
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Market Leadership</h4>
              <p className="text-sm text-gray-600">
                #2 position in AI plant identification with 23% market share and premium positioning
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Innovation Edge</h4>
              <p className="text-sm text-gray-600">
                87.2% AI accuracy with continuous improvement and community-driven enhancement
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge className="bg-blue-100 text-blue-800">Market Leader</Badge>
              <Badge className="bg-green-100 text-green-800">High Growth</Badge>
              <Badge className="bg-purple-100 text-purple-800">Innovation Focus</Badge>
              <Badge className="bg-orange-100 text-orange-800">Strong Fundamentals</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveDashboardOverview;
