
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FlaskConical, Target, TrendingUp, CheckCircle, AlertCircle, BarChart3, Zap, Settings } from 'lucide-react';

const ABTestingOptimization: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <FlaskConical className="w-16 h-16 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          A/B Testing & Optimization
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Design, execute, and analyze conversion experiments to optimize user experience, 
          feature adoption, and business outcomes through data-driven decision making.
        </p>
      </div>

      {/* Setting Up Experiments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Setting Up Conversion Experiments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Experiment Design Framework
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">1. Hypothesis Formation</h5>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div className="p-2 bg-blue-50 rounded">
                      <strong>Structure:</strong> &quot;If we [change], then [metric] will [improve] because [reason]&quot;
                    </div>
                    <div className="space-y-1">
                      <div><strong>Example:</strong></div>
                      <div className="italic text-gray-600">
                        &quot;If we simplify the onboarding flow from 5 steps to 3 steps, 
                        then completion rate will increase by 15% because users will 
                        experience less friction and abandonment.&quot;
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">2. Success Metrics Definition</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Primary Metric</span>
                      <Badge className="bg-green-100 text-green-800">Conversion Rate</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Secondary Metrics</span>
                      <Badge className="bg-blue-100 text-blue-800">Engagement</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Guardrail Metrics</span>
                      <Badge className="bg-orange-100 text-orange-800">Quality Score</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">3. Sample Size Calculation</h5>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• Baseline conversion rate: 12.4%</div>
                    <div>• Minimum detectable effect: 15% relative improvement</div>
                    <div>• Statistical power: 80%</div>
                    <div>• Significance level: 95%</div>
                    <div className="p-2 bg-purple-50 rounded font-medium">
                      Required sample size: 8,947 users per variant
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Current Active Experiments</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-green-800">Onboarding Flow V2</span>
                    <Badge className="bg-green-100 text-green-800">Running</Badge>
                  </div>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>• Variant A: Current 5-step flow</div>
                    <div>• Variant B: Simplified 3-step flow</div>
                    <div>• Progress: 67% complete (6,034/8,947 users)</div>
                    <div>• Early signal: +18% improvement</div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-blue-800">Premium CTA Placement</span>
                    <Badge className="bg-blue-100 text-blue-800">Running</Badge>
                  </div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• Variant A: Sidebar placement</div>
                    <div>• Variant B: Modal after 3rd identification</div>
                    <div>• Progress: 23% complete (2,058/8,947 users)</div>
                    <div>• Early signal: +34% click-through rate</div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-yellow-800">AI Confidence Display</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Planning</Badge>
                  </div>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <div>• Variant A: Percentage (87% confident)</div>
                    <div>• Variant B: Descriptive (Very confident)</div>
                    <div>• Start date: Next Monday</div>
                    <div>• Hypothesis: Descriptive improves trust</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading Test Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Reading Test Results and Significance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Statistical Significance Guide
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Statistically Significant</span>
                  </div>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>• P-value &lt; 0.05 (95% confidence)</div>
                    <div>• Confidence interval doesn&apos;t include 0</div>
                    <div>• Sufficient sample size reached</div>
                    <div>• Effect size is practically meaningful</div>
                  </div>
                  <div className="mt-2 p-2 bg-green-100 rounded text-xs text-green-800">
                    <strong>Action:</strong> Safe to implement winning variant
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Trending but Not Significant</span>
                  </div>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <div>• P-value between 0.05 - 0.10</div>
                    <div>• Effect size looks promising</div>
                    <div>• May need more time/traffic</div>
                    <div>• Monitor for significance</div>
                  </div>
                  <div className="mt-2 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
                    <strong>Action:</strong> Continue test, gather more data
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-800">No Significant Difference</span>
                  </div>
                  <div className="text-sm text-red-700 space-y-1">
                    <div>• P-value &gt; 0.10</div>
                    <div>• No clear winner</div>
                    <div>• Variants perform similarly</div>
                    <div>• Consider alternative approaches</div>
                  </div>
                  <div className="mt-2 p-2 bg-red-100 rounded text-xs text-red-800">
                    <strong>Action:</strong> Stop test, try different hypothesis
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Recent Test Results</h4>
              
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Email Subject Line Test</span>
                    <Badge className="bg-green-100 text-green-800">Winner: Variant B</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Variant A: &quot;Your orchid needs attention&quot;</span>
                      <span>18.2% open rate</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Variant B: &quot;🌺 Bloom alert for your orchid&quot;</span>
                      <span>24.7% open rate</span>
                    </div>
                    <div className="p-2 bg-green-50 rounded text-xs">
                      <strong>Result:</strong> +35.7% improvement (p=0.003)
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Pricing Page Layout</span>
                    <Badge className="bg-blue-100 text-blue-800">Winner: Variant A</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Variant A: Three-column layout</span>
                      <span>12.8% conversion</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Variant B: Single-column layout</span>
                      <span>9.4% conversion</span>
                    </div>
                    <div className="p-2 bg-blue-50 rounded text-xs">
                      <strong>Result:</strong> +36.2% improvement (p=0.001)
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Mobile Navigation</span>
                    <Badge className="bg-gray-100 text-gray-800">No Winner</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Variant A: Bottom tab navigation</span>
                      <span>67.3% engagement</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Variant B: Hamburger menu</span>
                      <span>65.8% engagement</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded text-xs">
                      <strong>Result:</strong> No significant difference (p=0.31)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Rollout Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Feature Rollout Strategies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                Rollout Methodologies
              </h4>
              
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-2">Gradual Rollout (Recommended)</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Week 1: Beta users (5%)</span>
                      <Progress value={5} className="w-20 h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Week 2: Power users (25%)</span>
                      <Progress value={25} className="w-20 h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Week 3: All premium (50%)</span>
                      <Progress value={50} className="w-20 h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Week 4: All users (100%)</span>
                      <Progress value={100} className="w-20 h-2" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-blue-600">
                    Allows for monitoring and quick rollback if issues arise
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-2">Feature Flags Approach</h5>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>• Enable/disable features without code deployment</div>
                    <div>• Real-time rollout control</div>
                    <div>• Instant rollback capability</div>
                    <div>• User segment targeting</div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-2">Blue-Green Deployment</h5>
                  <div className="text-sm text-purple-700 space-y-1">
                    <div>• Two identical production environments</div>
                    <div>• Switch traffic between environments</div>
                    <div>• Zero-downtime deployments</div>
                    <div>• Quick rollback to previous version</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Current Rollout Status</h4>
              
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">New AI Model v3.2</span>
                    <Badge className="bg-green-100 text-green-800">Week 3</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current rollout</span>
                      <span>50% of users</span>
                    </div>
                    <Progress value={50} className="h-2" />
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-medium">Accuracy</div>
                        <div className="text-green-600">+2.3%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">Errors</div>
                        <div className="text-green-600">-15%</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">Satisfaction</div>
                        <div className="text-green-600">+8%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Community Reputation System</span>
                    <Badge className="bg-blue-100 text-blue-800">Week 1</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current rollout</span>
                      <span>5% of users (Beta)</span>
                    </div>
                    <Progress value={5} className="h-2" />
                    <div className="text-xs text-gray-600">
                      Collecting feedback from beta users before broader rollout
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Advanced Camera Features</span>
                    <Badge className="bg-red-100 text-red-800">Rolled Back</Badge>
                  </div>
                  <div className="text-sm text-red-700 space-y-1">
                    <div>• Rolled back due to performance issues</div>
                    <div>• 23% increase in app crashes detected</div>
                    <div>• Investigating root cause</div>
                    <div>• Expected fix in next sprint</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Performance Optimization Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                High Impact Opportunities
              </h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h5 className="font-medium text-yellow-800 mb-1">Onboarding Completion</h5>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <div>Current: 67% completion rate</div>
                    <div>Potential: 85%+ with step reduction</div>
                    <div className="font-medium text-yellow-800">Impact: +2,847 new active users/month</div>
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-800 mb-1">Premium Conversion</h5>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>Current: 12.4% conversion</div>
                    <div>Potential: 16%+ with better timing</div>
                    <div className="font-medium text-green-800">Impact: +$89K additional MRR</div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-1">Feature Discovery</h5>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>Current: 43% discover key features</div>
                    <div>Potential: 70%+ with guided tours</div>
                    <div className="font-medium text-blue-800">Impact: +34% user engagement</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Quick Wins</h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-800">Email Subject Lines</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Add emojis and personalization for +35% open rates
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-800">CTA Button Colors</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Test high-contrast colors for +12% click rates
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-800">Social Proof</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Display user count for +8% trust and conversions
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-800">Mobile Forms</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Reduce form fields for +23% mobile completion
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Long-term Experiments</h4>
              
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-1">Personalized Experience</h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>• AI-driven content recommendations</div>
                    <div>• User behavior-based UI</div>
                    <div>• Dynamic pricing strategies</div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-1">Gamification Elements</h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>• Achievement systems</div>
                    <div>• Progress visualization</div>
                    <div>• Community challenges</div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-1">AI-Powered Features</h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>• Predictive care reminders</div>
                    <div>• Smart plant recommendations</div>
                    <div>• Automated problem detection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="py-8 text-center">
          <FlaskConical className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Data-Driven Optimization Culture
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            A/B testing transforms assumptions into evidence, guesses into insights, and 
            opinions into optimizations. Build a culture of experimentation that continuously 
            improves user experience and business outcomes.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-purple-100 text-purple-800">Scientific Approach</Badge>
            <Badge className="bg-pink-100 text-pink-800">Continuous Improvement</Badge>
            <Badge className="bg-blue-100 text-blue-800">Evidence-Based Decisions</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ABTestingOptimization;
