
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, AlertTriangle, MapPin, Calendar, Target } from 'lucide-react';

const AIModelPerformanceDashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <BarChart3 className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          AI Model Performance Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive guide to reading accuracy metrics, understanding performance trends, 
          and analyzing seasonal and geographic variations in AI identification accuracy.
        </p>
        <Badge className="bg-red-100 text-red-800">Admin & Business Users Only</Badge>
      </div>

      {/* Reading Accuracy Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">Reading Accuracy Metrics and Trends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Key Performance Indicators</h4>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Overall Accuracy</span>
                    <Badge className="bg-green-100 text-green-800">87.3%</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Percentage of identifications that match expert verification or community consensus.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">High Confidence Accuracy</span>
                    <Badge className="bg-blue-100 text-blue-800">94.6%</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Accuracy rate for identifications with 85%+ AI confidence scores.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Processing Speed</span>
                    <Badge className="bg-purple-100 text-purple-800">2.3s avg</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Average time from photo upload to initial identification result.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Daily Volume</span>
                    <Badge className="bg-amber-100 text-amber-800">15,847</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Number of identification requests processed in the last 24 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Trend Analysis</h4>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">7-Day Trend</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Accuracy:</span>
                    <span className="text-green-800 font-medium">+2.1% ↗</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Volume:</span>
                    <span className="text-green-800 font-medium">+12.3% ↗</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Speed:</span>
                    <span className="text-green-800 font-medium">-0.4s ↗</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">30-Day Metrics</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Peak Accuracy Day:</span>
                    <span className="text-blue-800 font-medium">Monday (91.2%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Highest Volume:</span>
                    <span className="text-blue-800 font-medium">18,934 requests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Model Updates:</span>
                    <span className="text-blue-800 font-medium">3 deployments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* False Positive/Negative Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">Understanding False Positive/Negative Rates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">False Positives (7.2%)</span>
                </div>
                <p className="text-sm text-red-700 mb-3">
                  AI provides high confidence identification that is later corrected by experts.
                </p>
                <div className="space-y-2 text-xs">
                  <div><strong>Common Causes:</strong></div>
                  <ul className="list-disc list-inside space-y-1 text-red-600">
                    <li>Similar species with subtle differences</li>
                    <li>Hybrid varieties not in training data</li>
                    <li>Regional variations in flower characteristics</li>
                    <li>Lighting affecting color perception</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">False Negatives (5.5%)</span>
                </div>
                <p className="text-sm text-yellow-700 mb-3">
                  AI provides low confidence or incorrect ID for a clearly identifiable orchid.
                </p>
                <div className="space-y-2 text-xs">
                  <div><strong>Common Causes:</strong></div>
                  <ul className="list-disc list-inside space-y-1 text-yellow-600">
                    <li>Poor photo quality or unusual angles</li>
                    <li>Rare species with limited training examples</li>
                    <li>Damaged or diseased plants</li>
                    <li>Multiple plants in single image</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Error Impact Analysis</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded">
                  <div className="font-medium text-gray-900 mb-1">High Impact Errors</div>
                  <div className="text-sm text-gray-600 mb-2">
                    Misidentifications affecting plant care or rare species
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Rate: 1.8%</span>
                    <Badge className="bg-red-100 text-red-800">Priority Fix</Badge>
                  </div>
                </div>

                <div className="p-3 border rounded">
                  <div className="font-medium text-gray-900 mb-1">Medium Impact Errors</div>
                  <div className="text-sm text-gray-600 mb-2">
                    Similar species with comparable care requirements
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Rate: 6.4%</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Monitor</Badge>
                  </div>
                </div>

                <div className="p-3 border rounded">
                  <div className="font-medium text-gray-900 mb-1">Low Impact Errors</div>
                  <div className="text-sm text-gray-600 mb-2">
                    Variety-level differences within same species
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Rate: 4.5%</span>
                    <Badge className="bg-green-100 text-green-800">Acceptable</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Accuracy Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">Seasonal Accuracy Variations Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            AI performance varies significantly with seasonal factors, blooming cycles, 
            and user behavior patterns. Understanding these variations helps optimize model deployment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-green-800 mb-2">Spring (Mar-May)</h4>
                <div className="text-2xl font-bold text-green-600 mb-1">92.1%</div>
                <div className="text-sm text-green-700 space-y-1">
                  <div>Peak blooming season</div>
                  <div>High photo quality</div>
                  <div>Most orchids in flower</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-blue-800 mb-2">Summer (Jun-Aug)</h4>
                <div className="text-2xl font-bold text-blue-600 mb-1">88.7%</div>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>Variable bloom timing</div>
                  <div>Heat stress effects</div>
                  <div>Outdoor growing variations</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-amber-800 mb-2">Fall (Sep-Nov)</h4>
                <div className="text-2xl font-bold text-amber-600 mb-1">85.3%</div>
                <div className="text-sm text-amber-700 space-y-1">
                  <div>End of bloom cycles</div>
                  <div>Transitional growth</div>
                  <div>Fewer clear examples</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <h4 className="font-semibold text-purple-800 mb-2">Winter (Dec-Feb)</h4>
                <div className="text-2xl font-bold text-purple-600 mb-1">79.4%</div>
                <div className="text-sm text-purple-700 space-y-1">
                  <div>Dormancy period</div>
                  <div>Indoor lighting issues</div>
                  <div>Limited flowering</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Seasonal Optimization Strategies</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">High Performance Periods</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Deploy new model versions in spring</li>
                  <li>• Collect training data during peak bloom</li>
                  <li>• Run accuracy benchmarks in April-May</li>
                  <li>• Minimize system changes during high volume</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Low Performance Mitigation</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Increase expert validation in winter</li>
                  <li>• Adjust confidence thresholds seasonally</li>
                  <li>• Provide alternative identification methods</li>
                  <li>• Focus on user education during off-seasons</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Geographic Performance Differences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">Geographic Performance Differences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Regional growing conditions, local species preferences, and cultural practices 
            significantly impact AI accuracy across different geographic areas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Tropical Regions</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Accuracy:</span>
                    <span className="font-medium text-green-800">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Volume:</span>
                    <span className="font-medium text-green-800">High</span>
                  </div>
                  <div className="text-green-700 mt-3">
                    <strong>Advantages:</strong> Natural growing conditions, 
                    excellent lighting, diverse species representation
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Temperate Zones</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Accuracy:</span>
                    <span className="font-medium text-blue-800">87.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Volume:</span>
                    <span className="font-medium text-blue-800">Medium</span>
                  </div>
                  <div className="text-blue-700 mt-3">
                    <strong>Challenges:</strong> Indoor growing effects, 
                    artificial lighting, seasonal variations
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <h4 className="font-semibold text-amber-800">Arid/Cold Regions</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Accuracy:</span>
                    <span className="font-medium text-amber-800">81.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Volume:</span>
                    <span className="font-medium text-amber-800">Low</span>
                  </div>
                  <div className="text-amber-700 mt-3">
                    <strong>Issues:</strong> Limited species variety, 
                    greenhouse-only growing, specialized conditions
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Regional Performance Factors</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h5 className="font-medium text-gray-800">Positive Factors</h5>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span><strong>Natural habitat:</strong> Orchids grown in native conditions match training data better</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span><strong>Expert communities:</strong> Regions with active orchid societies provide better validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span><strong>Species diversity:</strong> Areas with many native orchids have broader representation</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium text-gray-800">Challenge Factors</h5>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                    <span><strong>Artificial environments:</strong> Greenhouse growing creates different appearance patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                    <span><strong>Limited species:</strong> Few local varieties reduce training data diversity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                    <span><strong>Cultural preferences:</strong> Regional growing styles may favor different orchid types</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="py-8 text-center">
          <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Data-Driven AI Optimization
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Use these metrics to make informed decisions about model deployment, training data collection, 
            and system optimization. Regular monitoring ensures our AI continues to improve and serve 
            users effectively across all conditions and regions.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-blue-100 text-blue-800">Performance Monitoring</Badge>
            <Badge className="bg-purple-100 text-purple-800">Continuous Improvement</Badge>
            <Badge className="bg-green-100 text-green-800">Global Optimization</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelPerformanceDashboard;
