
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Camera, Edit, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';

const ContributingKnowledgeBase: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Contributing to the Knowledge Base</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Help build the world's most comprehensive orchid care resource by sharing your experiences, 
          success stories, and expert knowledge with the community.
        </p>
        <Badge className="bg-blue-100 text-blue-800">Knowledge Sharing</Badge>
      </div>

      {/* Care Success Stories */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <TrendingUp className="w-6 h-6" />
            Submitting Care Success Stories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-4">What Makes a Great Success Story</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-800 mb-3">Story Elements</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• <strong>Challenge:</strong> What problem did you face?</li>
                  <li>• <strong>Solution:</strong> What specific actions did you take?</li>
                  <li>• <strong>Timeline:</strong> How long did results take?</li>
                  <li>• <strong>Outcome:</strong> What were the final results?</li>
                  <li>• <strong>Lessons:</strong> What would you do differently?</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-3">Documentation Tips</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Include specific dates and conditions</li>
                  <li>• Mention your location and climate</li>
                  <li>• Detail products or techniques used</li>
                  <li>• Note any unexpected discoveries</li>
                  <li>• Share resources that helped you</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2">Rescue Stories</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Document how you saved a struggling orchid from decline to thriving health.
                </p>
                <Badge variant="outline" className="text-xs">High Impact</Badge>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-purple-900 mb-2">Blooming Success</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Share your journey from non-blooming orchid to spectacular flowering.
                </p>
                <Badge variant="outline" className="text-xs">Popular</Badge>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-orange-900 mb-2">Propagation Wins</h4>
                <p className="text-sm text-orange-700 mb-3">
                  Document successful propagation techniques and keiki development.
                </p>
                <Badge variant="outline" className="text-xs">Advanced</Badge>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Photo Sharing */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Camera className="w-6 h-6" />
            Sharing Before/After Plant Photos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">Photo Submission Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Technical Requirements</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• High resolution (minimum 1080p)</li>
                  <li>• Good lighting (natural light preferred)</li>
                  <li>• Clear focus on the orchid</li>
                  <li>• Multiple angles when helpful</li>
                  <li>• Consistent background when possible</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Content Guidelines</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Include date stamps</li>
                  <li>• Show the whole plant and close-ups</li>
                  <li>• Document progression over time</li>
                  <li>• Include care environment context</li>
                  <li>• Highlight specific changes or issues</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Camera className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-green-800 mb-1">Initial State</h4>
              <p className="text-xs text-green-700">Document starting condition</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Edit className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="font-medium text-yellow-800 mb-1">Care Changes</h4>
              <p className="text-xs text-yellow-700">Show interventions made</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-medium text-orange-800 mb-1">Progress</h4>
              <p className="text-xs text-orange-700">Document improvements</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-purple-800 mb-1">Final Result</h4>
              <p className="text-xs text-purple-700">Show successful outcome</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Writing Care Tips */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Edit className="w-6 h-6" />
            Writing Helpful Care Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-4">Effective Tip Writing Structure</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-purple-800 mb-2">1. Clear Title</h4>
                  <p className="text-sm text-purple-700">
                    Use specific, searchable titles that describe the exact tip or technique.
                  </p>
                  <div className="mt-2 text-xs text-purple-600">
                    <strong>Good:</strong> "Increase Humidity with Pebble Trays"<br/>
                    <strong>Poor:</strong> "Humidity Help"
                  </div>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-purple-800 mb-2">2. Context</h4>
                  <p className="text-sm text-purple-700">
                    Explain when, why, and for which orchid types this tip is most useful.
                  </p>
                  <div className="mt-2 text-xs text-purple-600">
                    Include climate, season, orchid species, and experience level.
                  </div>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-purple-800 mb-2">3. Step-by-Step</h4>
                  <p className="text-sm text-purple-700">
                    Provide clear, actionable instructions that others can easily follow.
                  </p>
                  <div className="mt-2 text-xs text-purple-600">
                    Include materials needed, timing, and expected results.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
              <h4 className="font-medium text-green-800 mb-2">High-Value Tip Categories</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Seasonal care adjustments</li>
                <li>• Problem-solving techniques</li>
                <li>• Budget-friendly solutions</li>
                <li>• Beginner-friendly shortcuts</li>
                <li>• Advanced propagation methods</li>
                <li>• Species-specific care notes</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
              <h4 className="font-medium text-blue-800 mb-2">Quality Indicators</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Based on personal experience</li>
                <li>• Includes specific measurements</li>
                <li>• Mentions potential risks or variations</li>
                <li>• Cites credible sources when applicable</li>
                <li>• Provides troubleshooting advice</li>
                <li>• Includes visual aids or photos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Q&A Participation */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <MessageSquare className="w-6 h-6" />
            Participating in Q&A Discussions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Asking Great Questions</h3>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-3">Question Template</h4>
                <div className="text-sm text-orange-700 space-y-2">
                  <div><strong>Situation:</strong> Describe your orchid and its current state</div>
                  <div><strong>Problem:</strong> What specific issue are you facing?</div>
                  <div><strong>Attempts:</strong> What have you already tried?</div>
                  <div><strong>Environment:</strong> Location, light, humidity, temperature</div>
                  <div><strong>Timeline:</strong> When did the problem start?</div>
                  <div><strong>Photos:</strong> Include clear, relevant images</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Providing Helpful Answers</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">Answer Structure</h4>
                <div className="text-sm text-blue-700 space-y-2">
                  <div><strong>Assessment:</strong> Analyze what you see in photos/description</div>
                  <div><strong>Diagnosis:</strong> Explain likely causes</div>
                  <div><strong>Treatment:</strong> Provide specific action steps</div>
                  <div><strong>Prevention:</strong> How to avoid this in the future</div>
                  <div><strong>Follow-up:</strong> What to watch for next</div>
                  <div><strong>Experience:</strong> Share relevant personal experience</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Community Interaction Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <strong>For Question Askers:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Thank responders publicly</li>
                  <li>• Update with results</li>
                  <li>• Mark helpful answers</li>
                  <li>• Share follow-up photos</li>
                </ul>
              </div>
              <div>
                <strong>For Answer Providers:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Check back for updates</li>
                  <li>• Offer additional help if needed</li>
                  <li>• Learn from other responses</li>
                  <li>• Build on others' answers constructively</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contribution Recognition */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center text-purple-800">Your Knowledge Contributions Matter!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Build the Database</h4>
              <p className="text-sm text-gray-600">
                Your contributions help create the world's most comprehensive orchid care resource.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Gain Recognition</h4>
              <p className="text-sm text-gray-600">
                Quality contributions earn you expert status and community respect.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Help Others Succeed</h4>
              <p className="text-sm text-gray-600">
                Your shared knowledge directly helps other orchid parents achieve success.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContributingKnowledgeBase;
