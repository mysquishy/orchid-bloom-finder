
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Calendar, Trophy, Target, Droplets, Sun, Thermometer } from 'lucide-react';

const PersonalPlantCareDashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <BarChart3 className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Your Personal Plant Care Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master your orchid care with detailed analytics, success tracking, and personalized insights 
          to help your collection thrive throughout every season.
        </p>
      </div>

      {/* Dashboard Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Understanding Your Care Success Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Your personal dashboard transforms your daily care actions into meaningful insights. 
            Every time you water, fertilize, or check on your orchids, you're building a comprehensive 
            picture of your growing success.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Care Success Rate
              </h4>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-green-800">Overall Success</span>
                  <span className="text-lg font-bold text-green-900">87%</span>
                </div>
                <Progress value={87} className="h-3 mb-2" />
                <p className="text-xs text-green-700">
                  Based on plant health improvements, bloom frequency, and care consistency
                </p>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-gray-800">What this measures:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Improvement in plant health scores over time</li>
                  <li>• Successful blooming cycles achieved</li>
                  <li>• Consistency of care schedule adherence</li>
                  <li>• Recovery from plant stress or disease</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Care Consistency Score
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-blue-800">Watering Schedule</span>
                    <Badge className="bg-blue-100 text-blue-800">92%</Badge>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">On-time watering: 11/12 weeks</div>
                </div>
                
                <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-purple-800">Fertilizing Routine</span>
                    <Badge className="bg-purple-100 text-purple-800">78%</Badge>
                  </div>
                  <div className="text-xs text-purple-600 mt-1">Monthly fertilizing: 7/9 months</div>
                </div>
                
                <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-400">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-orange-800">Health Monitoring</span>
                    <Badge className="bg-orange-100 text-orange-800">95%</Badge>
                  </div>
                  <div className="text-xs text-orange-600 mt-1">Weekly check-ins: 19/20 weeks</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plant Health Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Plant Health Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Track how your orchids respond to different care approaches and environmental changes. 
            This analysis helps you identify what works best for each plant and adjust your care accordingly.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Individual Plant Performance</h4>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Phalaenopsis 'White Angel'</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Health Score</span>
                      <span className="font-medium">8.7/10</span>
                    </div>
                    <Progress value={87} className="h-2" />
                    <div className="text-xs text-gray-600">
                      +2.3 points since last month • Excellent bloom development
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Cattleya 'Sunset Gold'</span>
                    <TrendingUp className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Health Score</span>
                      <span className="font-medium">7.4/10</span>
                    </div>
                    <Progress value={74} className="h-2" />
                    <div className="text-xs text-gray-600">
                      +0.8 points since last month • New growth visible
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Environmental Impact Tracking</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Humidity Changes</span>
                  </div>
                  <div className="text-sm text-blue-700">
                    Increased humidity from 45% to 60% resulted in 23% better leaf health scores
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Light Adjustments</span>
                  </div>
                  <div className="text-sm text-yellow-700">
                    Moving to east-facing window improved blooming success by 40%
                  </div>
                </div>

                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800">Temperature Stability</span>
                  </div>
                  <div className="text-sm text-red-700">
                    Maintaining 65-75°F range increased overall health scores by 15%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Care Streaks and Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Care Streak Tracking and Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Current Streaks
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900">Daily Check-ins</div>
                      <div className="text-sm text-gray-600">Consistent plant monitoring</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">23</div>
                      <div className="text-xs text-gray-500">days</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900">Perfect Watering</div>
                      <div className="text-sm text-gray-600">On-schedule watering routine</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">8</div>
                      <div className="text-xs text-gray-500">weeks</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-900">Learning Journey</div>
                      <div className="text-sm text-gray-600">Article reading consistency</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">12</div>
                      <div className="text-xs text-gray-500">days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Recent Achievements</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-yellow-800">Bloom Master</div>
                    <div className="text-sm text-yellow-600">Successfully guided 3 orchids to bloom</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-green-800">Care Consistency</div>
                    <div className="text-sm text-green-600">30 days of perfect care routine</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-blue-800">Data Enthusiast</div>
                    <div className="text-sm text-blue-600">Tracked 100+ care events</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Seasonal Care Pattern Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Your care patterns change with the seasons, and so do your orchids' needs. 
            Understanding these patterns helps you anticipate and prepare for seasonal care adjustments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Seasonal Care Frequency</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-800">Spring (Growth Season)</span>
                    <Badge className="bg-green-100 text-green-800">High Activity</Badge>
                  </div>
                  <div className="text-sm text-green-600 mt-1">
                    Watering: 2x/week • Fertilizing: Weekly • Repotting: Peak season
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-yellow-800">Summer (Bloom Focus)</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Moderate Activity</Badge>
                  </div>
                  <div className="text-sm text-yellow-600 mt-1">
                    Watering: 2x/week • Fertilizing: Bi-weekly • Humidity management
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-orange-800">Fall (Preparation)</span>
                    <Badge className="bg-orange-100 text-orange-800">Moderate Activity</Badge>
                  </div>
                  <div className="text-sm text-orange-600 mt-1">
                    Watering: 1-2x/week • Fertilizing: Monthly • Light adjustments
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-800">Winter (Rest Period)</span>
                    <Badge className="bg-blue-100 text-blue-800">Low Activity</Badge>
                  </div>
                  <div className="text-sm text-blue-600 mt-1">
                    Watering: 1x/week • Fertilizing: Minimal • Temperature control
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Success Rate by Season</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Spring Success Rate</span>
                  <div className="flex items-center gap-2">
                    <Progress value={92} className="w-20 h-2" />
                    <span className="text-sm font-bold">92%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Summer Success Rate</span>
                  <div className="flex items-center gap-2">
                    <Progress value={78} className="w-20 h-2" />
                    <span className="text-sm font-bold">78%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Fall Success Rate</span>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="w-20 h-2" />
                    <span className="text-sm font-bold">85%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Winter Success Rate</span>
                  <div className="flex items-center gap-2">
                    <Progress value={71} className="w-20 h-2" />
                    <span className="text-sm font-bold">71%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">Key Insight</h5>
                <p className="text-sm text-blue-700">
                  Your winter success rate could improve with more consistent humidity control. 
                  Consider using a humidifier during dry months.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="py-8 text-center">
          <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Master Your Orchid Care Journey
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Your personal dashboard is your guide to becoming an expert orchid caregiver. 
            Use these insights to refine your techniques, celebrate your successes, and 
            learn from every challenge along the way.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-green-100 text-green-800">Data-Driven Care</Badge>
            <Badge className="bg-blue-100 text-blue-800">Continuous Learning</Badge>
            <Badge className="bg-purple-100 text-purple-800">Expert Growth</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalPlantCareDashboard;
