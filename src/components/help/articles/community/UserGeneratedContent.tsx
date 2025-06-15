
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Edit, Heart, Share, TrendingUp, Users } from 'lucide-react';

const UserGeneratedContent: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Sharing Your Plant Journey</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create compelling content that inspires, educates, and connects with fellow orchid enthusiasts. 
          Share your successes, challenges, and discoveries with the community.
        </p>
        <Badge className="bg-green-100 text-green-800">Content Creation</Badge>
      </div>

      {/* Photo Submission Best Practices */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Camera className="w-6 h-6" />
            Photo Submission Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-4">Creating Instagram-Worthy Plant Photos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-800 mb-3">Technical Excellence</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• <strong>Natural Light:</strong> Use soft, diffused natural light when possible</li>
                  <li>• <strong>Stable Camera:</strong> Use a tripod or steady surface to avoid blur</li>
                  <li>• <strong>Clean Background:</strong> Remove distracting elements from the frame</li>
                  <li>• <strong>Multiple Angles:</strong> Capture overall plant and close-up details</li>
                  <li>• <strong>High Resolution:</strong> Use your camera's highest quality setting</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-3">Composition Tips</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• <strong>Rule of Thirds:</strong> Place key elements along grid lines</li>
                  <li>• <strong>Fill the Frame:</strong> Get close to show important details</li>
                  <li>• <strong>Leading Lines:</strong> Use plant structure to guide the eye</li>
                  <li>• <strong>Color Harmony:</strong> Consider background colors that complement flowers</li>
                  <li>• <strong>Depth of Field:</strong> Blur backgrounds to make subjects pop</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2">Before & After</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Document transformation journeys from rescue to thriving health.
                </p>
                <Badge variant="outline" className="text-xs">Popular</Badge>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-purple-900 mb-2">Bloom Progress</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Capture the magic of bud development to full flowering.
                </p>
                <Badge variant="outline" className="text-xs">Inspiring</Badge>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-orange-900 mb-2">Collection Showcases</h4>
                <p className="text-sm text-orange-700 mb-3">
                  Show your growing space and how you arrange your orchids.
                </p>
                <Badge variant="outline" className="text-xs">Educational</Badge>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-green-900 mb-2">Problem Diagnosis</h4>
                <p className="text-sm text-green-700 mb-3">
                  Clear photos that help others identify and solve similar issues.
                </p>
                <Badge variant="outline" className="text-xs">Helpful</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Photo Series Ideas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <strong>Time-Lapse Series:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Weekly growth progression</li>
                  <li>• Seasonal changes documentation</li>
                  <li>• Recovery from problems</li>
                  <li>• Root development stages</li>
                </ul>
              </div>
              <div>
                <strong>Educational Series:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Repotting step-by-step process</li>
                  <li>• Different watering techniques</li>
                  <li>• Comparison of growing media</li>
                  <li>• Light condition experiments</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Writing Compelling Care Stories */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Edit className="w-6 h-6" />
            Writing Compelling Care Stories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">Story Structure That Engages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium text-blue-800 mb-2">Hook (Opening)</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Start with an intriguing problem</li>
                  <li>• Share an emotional moment</li>
                  <li>• Pose a compelling question</li>
                  <li>• Describe a dramatic change</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium text-blue-800 mb-2">Journey (Middle)</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Detail your decision-making process</li>
                  <li>• Share failures and learning moments</li>
                  <li>• Explain what you tried and why</li>
                  <li>• Include specific timing and methods</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium text-blue-800 mb-2">Resolution (Ending)</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Reveal the outcome</li>
                  <li>• Share lessons learned</li>
                  <li>• Offer advice to others</li>
                  <li>• Connect to broader principles</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Engaging Story Elements</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">Personal Connection</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Share your emotional journey</li>
                  <li>• Describe your attachment to the plant</li>
                  <li>• Explain why this story matters to you</li>
                  <li>• Include personal discoveries</li>
                  <li>• Connect to your overall orchid journey</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Technical Details</h3>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-3">Actionable Information</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Specific products or techniques used</li>
                  <li>• Environmental conditions and changes</li>
                  <li>• Timeline of actions and results</li>
                  <li>• Measurements and observations</li>
                  <li>• Resources that helped you succeed</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Story Ideas That Resonate</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <strong>Rescue & Recovery:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• "From Death's Door to Spectacular Bloom"</li>
                  <li>• "My First Orchid Rescue Success"</li>
                  <li>• "Saving a Neglected Orchid Collection"</li>
                </ul>
              </div>
              <div>
                <strong>Learning & Growth:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• "My Biggest Orchid Care Mistake"</li>
                  <li>• "How I Finally Got My Orchid to Bloom"</li>
                  <li>• "Overcoming My Fear of Repotting"</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Creating Troubleshooting Content */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <TrendingUp className="w-6 h-6" />
            Creating Helpful Troubleshooting Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-4">Problem-Solution Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Identifying the Problem</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• <strong>Visual Symptoms:</strong> Describe exactly what you observed</li>
                  <li>• <strong>Timeline:</strong> When did symptoms first appear?</li>
                  <li>• <strong>Context:</strong> What changed in care routine or environment?</li>
                  <li>• <strong>Progression:</strong> How did the problem develop over time?</li>
                  <li>• <strong>Documentation:</strong> Include clear, diagnostic photos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Presenting Solutions</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• <strong>Root Cause:</strong> Explain the underlying issue</li>
                  <li>• <strong>Immediate Action:</strong> What to do right now</li>
                  <li>• <strong>Long-term Fix:</strong> How to prevent recurrence</li>
                  <li>• <strong>Alternative Approaches:</strong> Different methods that work</li>
                  <li>• <strong>Expected Timeline:</strong> When to expect improvement</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-red-900 mb-2">Emergency Issues</h4>
                <p className="text-sm text-red-700 mb-3">
                  Quick-action guides for urgent problems like root rot or pest infestations.
                </p>
                <Badge variant="outline" className="text-xs bg-red-100">Critical</Badge>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-orange-900 mb-2">Common Concerns</h4>
                <p className="text-sm text-orange-700 mb-3">
                  Address frequent worries like yellowing leaves or failure to bloom.
                </p>
                <Badge variant="outline" className="text-xs bg-orange-100">Frequent</Badge>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2">Preventive Care</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Share techniques to avoid problems before they start.
                </p>
                <Badge variant="outline" className="text-xs bg-blue-100">Proactive</Badge>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Care Contributions */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Heart className="w-6 h-6" />
            Seasonal Care Tip Contributions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-4">Creating Seasonal Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 text-xs font-bold">SPRING</span>
                </div>
                <h4 className="font-medium text-orange-800 mb-1">Growth Season</h4>
                <ul className="text-xs text-orange-700 space-y-1">
                  <li>• Repotting guides</li>
                  <li>• Fertilizer schedules</li>
                  <li>• Pest prevention</li>
                  <li>• New growth care</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-yellow-600 text-xs font-bold">SUMMER</span>
                </div>
                <h4 className="font-medium text-orange-800 mb-1">Active Care</h4>
                <ul className="text-xs text-orange-700 space-y-1">
                  <li>• Heat protection</li>
                  <li>• Humidity management</li>
                  <li>• Watering adjustments</li>
                  <li>• Outdoor care tips</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 text-xs font-bold">FALL</span>
                </div>
                <h4 className="font-medium text-orange-800 mb-1">Preparation</h4>
                <ul className="text-xs text-orange-700 space-y-1">
                  <li>• Indoor transition</li>
                  <li>• Light adjustments</li>
                  <li>• Fertilizer reduction</li>
                  <li>• Health assessment</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 text-xs font-bold">WINTER</span>
                </div>
                <h4 className="font-medium text-orange-800 mb-1">Rest Period</h4>
                <ul className="text-xs text-orange-700 space-y-1">
                  <li>• Dormancy care</li>
                  <li>• Reduced watering</li>
                  <li>• Temperature control</li>
                  <li>• Bloom spike care</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
              <h4 className="font-medium text-green-800 mb-2">Regional Adaptations</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Share location-specific tips</li>
                <li>• Discuss climate considerations</li>
                <li>• Address local growing challenges</li>
                <li>• Include altitude and humidity factors</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
              <h4 className="font-medium text-blue-800 mb-2">Timing Variations</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Account for species differences</li>
                <li>• Mention indoor vs. outdoor timing</li>
                <li>• Include growth stage considerations</li>
                <li>• Address individual plant needs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Impact */}
      <Card className="bg-gradient-to-r from-green-50 to-purple-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-center text-green-800">Your Content Makes a Difference!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Inspire Others</h4>
              <p className="text-sm text-gray-600">
                Your success stories motivate newcomers and show what's possible with dedication.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Share className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Share Knowledge</h4>
              <p className="text-sm text-gray-600">
                Your practical experiences become valuable resources for the entire community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Build Expertise</h4>
              <p className="text-sm text-gray-600">
                Creating quality content establishes your reputation and grows your expertise.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGeneratedContent;
