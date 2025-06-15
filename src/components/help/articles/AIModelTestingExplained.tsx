
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, MapPin, Calendar, Users, Lightbulb } from 'lucide-react';

const AIModelTestingExplained: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Brain className="w-16 h-16 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          AI Model Testing Explained
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how Orkhidly continuously improves accuracy, your role in providing feedback, 
          and why some identifications are more challenging than others.
        </p>
      </div>

      {/* Continuous Improvement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">How Orkhidly Continuously Improves</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Daily Learning Cycle</h4>
              </div>
              <p className="text-gray-700">
                Our AI processes thousands of new orchid photos every day. Each identification, 
                whether confirmed or corrected by users, becomes part of our training data. 
                This means our model gets smarter with every interaction.
              </p>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-medium text-purple-800 mb-2">What happens behind the scenes:</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Automated accuracy testing on new photo sets</li>
                  <li>• Community feedback integration</li>
                  <li>• Expert validation incorporation</li>
                  <li>• Model parameter optimization</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Community-Driven Enhancement</h4>
              </div>
              <p className="text-gray-700">
                Your feedback directly impacts model improvements. When you mark an identification 
                as correct, incorrect, or uncertain, you're teaching our AI to recognize patterns 
                it might have missed before.
              </p>
              
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-green-400 bg-green-50">
                  <div className="font-medium text-green-800">Positive Feedback</div>
                  <div className="text-sm text-green-700">Reinforces correct identification patterns</div>
                </div>
                <div className="p-3 border-l-4 border-red-400 bg-red-50">
                  <div className="font-medium text-red-800">Correction Feedback</div>
                  <div className="text-sm text-red-700">Helps avoid similar mistakes in the future</div>
                </div>
                <div className="p-3 border-l-4 border-yellow-400 bg-yellow-50">
                  <div className="font-medium text-yellow-800">Uncertainty Feedback</div>
                  <div className="text-sm text-yellow-700">Flags challenging cases for expert review</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Role in Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Your Role in Providing Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Every Voice Matters</h4>
            <p className="text-gray-700">
              Whether you're a beginner or expert, your feedback is valuable. Beginners often catch 
              obvious errors that experts might overlook, while experts provide nuanced corrections 
              for similar species.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <Lightbulb className="w-8 h-8 text-blue-600 mx-auto" />
                  <h4 className="font-semibold text-blue-800">Beginner Contributors</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Spot obvious mismatches</li>
                    <li>• Report photo quality issues</li>
                    <li>• Share care experiences</li>
                    <li>• Ask clarifying questions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <Users className="w-8 h-8 text-green-600 mx-auto" />
                  <h4 className="font-semibold text-green-800">Community Members</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Validate borderline cases</li>
                    <li>• Share regional variations</li>
                    <li>• Provide seasonal insights</li>
                    <li>• Cross-reference care data</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <Brain className="w-8 h-8 text-purple-600 mx-auto" />
                  <h4 className="font-semibold text-purple-800">Expert Contributors</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Distinguish similar species</li>
                    <li>• Identify rare varieties</li>
                    <li>• Verify hybrid classifications</li>
                    <li>• Provide scientific accuracy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal and Regional Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Understanding Seasonal and Regional Variations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Seasonal Challenges</h4>
              </div>
              <p className="text-gray-700">
                Orchids look dramatically different throughout their blooming cycle. Our AI has been 
                trained on flowers in various stages, but some periods are naturally more challenging.
              </p>
              
              <div className="space-y-2">
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                  <div className="font-medium text-green-800">Peak Bloom (Easiest)</div>
                  <div className="text-sm text-green-700">95%+ accuracy when flowers are fully open and fresh</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <div className="font-medium text-yellow-800">Early/Late Bloom (Moderate)</div>
                  <div className="text-sm text-yellow-700">80-90% accuracy as characteristics develop or fade</div>
                </div>
                <div className="p-3 bg-red-50 rounded border-l-4 border-red-400">
                  <div className="font-medium text-red-800">Off-Season (Challenging)</div>
                  <div className="text-sm text-red-700">Vegetative growth only - requires expert knowledge</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Regional Differences</h4>
              </div>
              <p className="text-gray-700">
                The same orchid species can look quite different when grown in different climates, 
                lighting conditions, or care environments. Our AI learns these variations over time.
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="font-medium text-blue-800">Tropical Regions</div>
                  <div className="text-sm text-blue-700">Larger, more vibrant flowers; outdoor growing common</div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="font-medium text-gray-800">Temperate Zones</div>
                  <div className="text-sm text-gray-700">Indoor growing effects; different seasonal timing</div>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <div className="font-medium text-purple-800">High Altitude</div>
                  <div className="text-sm text-purple-700">Compact growth; intensified colors; shorter blooms</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edge Cases and Challenging Identifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Edge Cases and Challenging Identifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700">
            Some orchid identifications are inherently difficult, even for human experts. 
            Understanding these challenges helps set realistic expectations and know when to seek additional input.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-800 mb-2">Hybrid Varieties</h4>
                <p className="text-sm text-red-700 mb-3">
                  Man-made crosses with unpredictable characteristics that may not exist in our training data.
                </p>
                <Badge variant="outline" className="text-red-600 border-red-300">Accuracy: 40-60%</Badge>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Rare Species</h4>
                <p className="text-sm text-yellow-700 mb-3">
                  Uncommon varieties with limited training examples and highly specialized characteristics.
                </p>
                <Badge variant="outline" className="text-yellow-600 border-yellow-300">Accuracy: 50-70%</Badge>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Similar Species</h4>
                <p className="text-sm text-orange-700 mb-3">
                  Closely related orchids with subtle differences requiring expert-level knowledge.
                </p>
                <Badge variant="outline" className="text-orange-600 border-orange-300">Accuracy: 70-85%</Badge>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Multiple Plants</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Photos containing several orchids or overlapping flowers confuse detection algorithms.
                </p>
                <Badge variant="outline" className="text-purple-600 border-purple-300">Accuracy: 60-75%</Badge>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Damaged Plants</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Disease, pests, or physical damage obscure identifying characteristics.
                </p>
                <Badge variant="outline" className="text-gray-600 border-gray-300">Accuracy: 45-65%</Badge>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Poor Lighting</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Color accuracy is crucial for orchid ID; poor lighting significantly impacts results.
                </p>
                <Badge variant="outline" className="text-blue-600 border-blue-300">Accuracy: 55-75%</Badge>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="py-8 text-center">
          <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Be Part of the AI Evolution
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Every photo you submit, every feedback you provide, and every question you ask contributes 
            to making orchid identification more accurate for everyone. You're not just using AI - 
            you're helping to improve it for the entire global community of orchid enthusiasts.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-purple-100 text-purple-800">Continuous Learning</Badge>
            <Badge className="bg-blue-100 text-blue-800">Community Driven</Badge>
            <Badge className="bg-green-100 text-green-800">Always Improving</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIModelTestingExplained;
