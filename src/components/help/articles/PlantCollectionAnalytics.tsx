
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Camera, Calendar, TrendingUp, Flower, MapPin, Thermometer, Clock } from 'lucide-react';

const PlantCollectionAnalytics: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Flower className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Plant Collection Analytics
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform your orchid collection into insights with comprehensive analytics that track 
          diversity, success rates, growth patterns, and optimize your seasonal care calendar.
        </p>
      </div>

      {/* Collection Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Collection Diversity Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Collection Composition
              </h4>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-900">23</div>
                  <div className="text-sm text-green-700">Total Orchids</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-800">Phalaenopsis</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-16 h-2" />
                      <span className="text-xs font-medium">8</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-800">Cattleya</span>
                    <div className="flex items-center gap-2">
                      <Progress value={30} className="w-16 h-2" />
                      <span className="text-xs font-medium">5</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-800">Dendrobium</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-16 h-2" />
                      <span className="text-xs font-medium">4</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-800">Other varieties</span>
                    <div className="flex items-center gap-2">
                      <Progress value={35} className="w-16 h-2" />
                      <span className="text-xs font-medium">6</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                <h5 className="font-medium text-blue-800 mb-1">Diversity Score</h5>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="flex-1 h-2" />
                  <span className="text-sm font-bold text-blue-900">78%</span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Excellent variety! Consider adding epiphytic orchids for 85%+ diversity.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Collection Health Overview</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-green-50 rounded text-center">
                  <div className="text-2xl font-bold text-green-600">19</div>
                  <div className="text-xs text-green-700">Healthy Plants</div>
                  <div className="text-xs text-gray-600">83% of collection</div>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded text-center">
                  <div className="text-2xl font-bold text-yellow-600">3</div>
                  <div className="text-xs text-yellow-700">Need Attention</div>
                  <div className="text-xs text-gray-600">13% of collection</div>
                </div>
                
                <div className="p-3 bg-purple-50 rounded text-center">
                  <div className="text-2xl font-bold text-purple-600">7</div>
                  <div className="text-xs text-purple-700">Currently Blooming</div>
                  <div className="text-xs text-gray-600">30% of collection</div>
                </div>
                
                <div className="p-3 bg-orange-50 rounded text-center">
                  <div className="text-2xl font-bold text-orange-600">1</div>
                  <div className="text-xs text-orange-700">Recovery Mode</div>
                  <div className="text-xs text-gray-600">4% of collection</div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-800">Recent Acquisitions</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Phalaenopsis 'Purple Rain'</span>
                    <span className="text-gray-500">2 weeks ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cattleya 'Sunset Glory'</span>
                    <span className="text-gray-500">1 month ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Dendrobium nobile</span>
                    <span className="text-gray-500">6 weeks ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Care Success Rates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Care Success Rates by Plant Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Different orchid types respond differently to your care approaches. Understanding these patterns 
            helps you tailor your techniques for maximum success with each variety.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Success Rates by Species</h4>
              
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Phalaenopsis</span>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Success Rate</span>
                    <span className="font-bold">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  <div className="text-xs text-gray-600 mt-1">
                    8/8 plants thriving • Average bloom cycle: 4.2 months
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Cattleya</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Success Rate</span>
                    <span className="font-bold">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                  <div className="text-xs text-gray-600 mt-1">
                    4/5 plants healthy • Challenge: humidity requirements
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Dendrobium</span>
                    <Badge className="bg-orange-100 text-orange-800">Improving</Badge>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Success Rate</span>
                    <span className="font-bold">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <div className="text-xs text-gray-600 mt-1">
                    3/4 plants stable • Learning optimal watering schedule
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Care Technique Effectiveness</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Temperature Control</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Consistency Score</span>
                    <span className="font-bold text-green-900">91%</span>
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    Maintaining 65-75°F has improved bloom success by 28%
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Watering Schedule</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-700">Adherence Rate</span>
                    <span className="font-bold text-blue-900">87%</span>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    Consistent timing has reduced plant stress by 35%
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-800">Placement Strategy</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-700">Optimization Score</span>
                    <span className="font-bold text-purple-900">82%</span>
                  </div>
                  <div className="text-xs text-purple-600 mt-1">
                    Strategic positioning has improved light exposure by 22%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Growth Tracking and Photo Comparisons</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-600" />
                Photo Progress Timeline
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Phalaenopsis 'White Angel'</span>
                    <Badge className="bg-green-100 text-green-800">Active Tracking</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Photos Captured</span>
                      <span className="font-medium">47 photos</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tracking Duration</span>
                      <span className="font-medium">8 months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth Milestones</span>
                      <span className="font-medium">6 documented</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                    Latest: New flower spike detected (2 weeks ago)
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Cattleya 'Sunset Gold'</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Monthly Review</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Photos Captured</span>
                      <span className="font-medium">23 photos</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tracking Duration</span>
                      <span className="font-medium">4 months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth Milestones</span>
                      <span className="font-medium">3 documented</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-700">
                    Latest: Pseudobulb development (1 week ago)
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Growth Insights</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h5 className="font-medium text-green-800 mb-1">Fastest Growing</h5>
                  <div className="text-sm text-green-700">
                    <strong>Phalaenopsis 'Pink Princess'</strong>
                  </div>
                  <div className="text-xs text-green-600">
                    New leaf every 6.2 weeks • 3 new aerial roots in 2 months
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h5 className="font-medium text-blue-800 mb-1">Most Consistent Bloomer</h5>
                  <div className="text-sm text-blue-700">
                    <strong>Phalaenopsis 'White Angel'</strong>
                  </div>
                  <div className="text-xs text-blue-600">
                    Blooms every 4.2 months • Average 8 flowers per spike
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <h5 className="font-medium text-purple-800 mb-1">Biggest Improvement</h5>
                  <div className="text-sm text-purple-700">
                    <strong>Dendrobium 'Golden Charm'</strong>
                  </div>
                  <div className="text-xs text-purple-600">
                    Health score improved from 4.2 to 8.1 in 3 months
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <h5 className="font-medium text-yellow-800 mb-1">Needs Attention</h5>
                  <div className="text-sm text-yellow-700">
                    <strong>Cattleya 'Midnight Blue'</strong>
                  </div>
                  <div className="text-xs text-yellow-600">
                    No growth detected in 6 weeks • Consider environmental changes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Care Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">Seasonal Care Calendar Optimization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Your collection's care needs change throughout the year. This optimized calendar is based on 
            your plants' historical responses and seasonal patterns specific to your growing environment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Seasonal Care Schedule
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Spring (Current)</span>
                  </div>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• Water: Every 5-7 days</div>
                    <div>• Fertilize: Weekly (balanced)</div>
                    <div>• Repot: Check 8 plants this month</div>
                    <div>• Humidity: Maintain 60-70%</div>
                  </div>
                  <div className="mt-2 p-2 bg-green-100 rounded text-xs text-green-800">
                    Peak growing season - 94% success rate last year
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Summer (Upcoming)</span>
                  </div>
                  <div className="space-y-1 text-sm text-yellow-700">
                    <div>• Water: Every 4-5 days</div>
                    <div>• Fertilize: Bi-weekly (low nitrogen)</div>
                    <div>• Shade: Protect from direct sun</div>
                    <div>• Air circulation: Increase</div>
                  </div>
                  <div className="mt-2 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
                    Heat stress prevention - 78% success rate last year
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Optimization Insights</h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Best Performing Season</h5>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Spring: 94% success rate</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Optimal growth conditions align with natural orchid cycles
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Areas for Improvement</h5>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Winter: 71% success rate</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Consider supplemental humidity and heating adjustments
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">Upcoming Recommendations</h5>
                  <div className="space-y-1 text-xs text-blue-700">
                    <div>• Install grow lights for winter preparation</div>
                    <div>• Schedule summer shade cloth installation</div>
                    <div>• Plan vacation care for peak summer</div>
                    <div>• Order winter humidity trays</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-medium text-purple-800 mb-2">Collection Health Forecast</h5>
                <div className="text-sm text-purple-700">
                  Based on current trends and seasonal patterns, your collection 
                  is projected to achieve <strong>89% success rate</strong> this year.
                </div>
                <div className="text-xs text-purple-600 mt-1">
                  +5% improvement from last year's performance
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-50 to-purple-50 border-green-200">
        <CardContent className="py-8 text-center">
          <Flower className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Data-Driven Orchid Excellence
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Your collection analytics provide the insights needed to optimize care, 
            predict needs, and achieve consistent success with every orchid in your care. 
            Keep tracking, keep growing, keep improving.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-green-100 text-green-800">Smart Care</Badge>
            <Badge className="bg-blue-100 text-blue-800">Growth Tracking</Badge>
            <Badge className="bg-purple-100 text-purple-800">Predictive Insights</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantCollectionAnalytics;
