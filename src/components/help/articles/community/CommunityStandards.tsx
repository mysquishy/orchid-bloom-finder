
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, Users, Flag, Heart } from 'lucide-react';

const CommunityStandards: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Community Standards</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our community thrives on mutual respect, quality content, and shared passion for orchids. 
          Learn about our standards, moderation process, and how to contribute to a positive environment.
        </p>
        <Badge className="bg-blue-100 text-blue-800">Community Guidelines</Badge>
      </div>

      {/* Content Quality Expectations */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-6 h-6" />
            Content Quality Expectations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-4">High-Quality Content Standards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-800 mb-3">Written Content</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• <strong>Clear & Helpful:</strong> Provide actionable, understandable advice</li>
                  <li>• <strong>Accurate Information:</strong> Share verified facts and cite sources</li>
                  <li>• <strong>Personal Experience:</strong> Draw from real, hands-on experience</li>
                  <li>• <strong>Respectful Tone:</strong> Use encouraging, non-judgmental language</li>
                  <li>• <strong>Proper Grammar:</strong> Use clear spelling and grammar</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-3">Visual Content</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• <strong>High Resolution:</strong> Submit clear, well-lit photos</li>
                  <li>• <strong>Relevant Focus:</strong> Show the subject matter clearly</li>
                  <li>• <strong>Appropriate Content:</strong> Keep images family-friendly</li>
                  <li>• <strong>Original Work:</strong> Share your own photos and experiences</li>
                  <li>• <strong>Helpful Context:</strong> Include explanatory captions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2">Educational Value</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Content should teach, inform, or help others learn something new about orchid care.
                </p>
                <Badge variant="outline" className="text-xs">Essential</Badge>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-purple-900 mb-2">Community Relevance</h4>
                <p className="text-sm text-purple-700 mb-3">
                  All content must relate to orchid care, cultivation, or community building.
                </p>
                <Badge variant="outline" className="text-xs">Required</Badge>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-orange-900 mb-2">Constructive Nature</h4>
                <p className="text-sm text-orange-700 mb-3">
                  Contributions should build up the community and support member growth.
                </p>
                <Badge variant="outline" className="text-xs">Valued</Badge>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Respectful Interaction Guidelines */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Heart className="w-6 h-6" />
            Respectful Interaction Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">Building a Supportive Community</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Positive Interactions</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• <strong>Encourage Learning:</strong> Support questions at all experience levels</li>
                  <li>• <strong>Celebrate Success:</strong> Acknowledge others' achievements</li>
                  <li>• <strong>Offer Help:</strong> Share knowledge generously and patiently</li>
                  <li>• <strong>Show Empathy:</strong> Understand that plant care can be emotional</li>
                  <li>• <strong>Build Connections:</strong> Foster genuine relationships</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-3">Communication Best Practices</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• <strong>Be Patient:</strong> Remember everyone learns at different speeds</li>
                  <li>• <strong>Stay Constructive:</strong> Offer solutions, not just criticism</li>
                  <li>• <strong>Ask Questions:</strong> Seek clarification before making assumptions</li>
                  <li>• <strong>Share Credit:</strong> Acknowledge others' contributions</li>
                  <li>• <strong>Assume Good Intent:</strong> Give others the benefit of the doubt</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
              <h4 className="font-medium text-green-800 mb-2">✅ Examples of Respectful Communication</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• "That's a great question! I had the same concern when I started..."</li>
                <li>• "Based on my experience with similar orchids, you might try..."</li>
                <li>• "Beautiful bloom! What care routine helped you achieve this?"</li>
                <li>• "I'm not certain about this - perhaps another member can help?"</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded border-l-4 border-red-400">
              <h4 className="font-medium text-red-800 mb-2">❌ Examples to Avoid</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• "This is obvious" or "You should know this by now"</li>
                <li>• "That's completely wrong" without explanation</li>
                <li>• Dismissive responses to beginner questions</li>
                <li>• Claiming expertise without backing it up</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expert Knowledge Verification */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Shield className="w-6 h-6" />
            Expert Knowledge Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-4">Ensuring Information Accuracy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Source Verification</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• <strong>Cite Expertise:</strong> Mention your experience level and background</li>
                  <li>• <strong>Reference Sources:</strong> Link to scientific studies or reputable guides</li>
                  <li>• <strong>Share Context:</strong> Explain the conditions where advice applies</li>
                  <li>• <strong>Acknowledge Limits:</strong> Be clear about what you don't know</li>
                  <li>• <strong>Encourage Verification:</strong> Suggest members research further</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Quality Assurance</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• <strong>Peer Review:</strong> Expert members review complex advice</li>
                  <li>• <strong>Fact Checking:</strong> Community flags potentially harmful information</li>
                  <li>• <strong>Update Process:</strong> Information is updated as science evolves</li>
                  <li>• <strong>Multiple Perspectives:</strong> Different approaches are welcomed</li>
                  <li>• <strong>Evidence-Based:</strong> Preference for proven methods</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-800 mb-2">🔬 Scientific Standards</h4>
            <div className="text-sm text-amber-700 space-y-2">
              <p><strong>When sharing care advice:</strong> Base recommendations on established horticultural practices or documented personal success</p>
              <p><strong>When discussing plant health:</strong> Avoid diagnosing serious problems without sufficient expertise</p>
              <p><strong>When citing research:</strong> Link to peer-reviewed sources or acknowledged experts</p>
              <p><strong>When uncertain:</strong> Clearly state when information is speculative or needs verification</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reporting Inappropriate Content */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Flag className="w-6 h-6" />
            Reporting Inappropriate Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">When to Report Content</h3>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-3">Report These Issues</h4>
                <ul className="text-sm text-orange-700 space-y-2">
                  <li>• <strong>Spam or Self-Promotion:</strong> Excessive commercial content</li>
                  <li>• <strong>Misinformation:</strong> Clearly false or harmful advice</li>
                  <li>• <strong>Inappropriate Images:</strong> Off-topic or unsuitable photos</li>
                  <li>• <strong>Harassment:</strong> Personal attacks or bullying behavior</li>
                  <li>• <strong>Copyright Violation:</strong> Stolen images or content</li>
                  <li>• <strong>Dangerous Advice:</strong> Information that could harm plants or people</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">How to Report</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">Reporting Process</h4>
                <ol className="text-sm text-blue-700 space-y-2">
                  <li><strong>1. Use Report Button:</strong> Click the flag icon on any post or comment</li>
                  <li><strong>2. Select Category:</strong> Choose the most appropriate violation type</li>
                  <li><strong>3. Provide Details:</strong> Explain the issue clearly and specifically</li>
                  <li><strong>4. Include Evidence:</strong> Reference specific examples or quotes</li>
                  <li><strong>5. Submit Report:</strong> Our moderation team will review within 24 hours</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">⚖️ Community Self-Moderation</h4>
            <p className="text-sm text-yellow-700 mb-3">
              Before reporting, consider if the issue can be resolved through community discussion:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <strong>Minor Issues (Try Community Response First):</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Unclear or confusing information</li>
                  <li>• Minor disagreements about methods</li>
                  <li>• Questions about source credibility</li>
                  <li>• Requests for additional information</li>
                </ul>
              </div>
              <div>
                <strong>Serious Issues (Report Immediately):</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Personal attacks or harassment</li>
                  <li>• Clearly false medical claims</li>
                  <li>• Spam or excessive self-promotion</li>
                  <li>• Content that violates platform rules</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Moderation Process */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-6 h-6" />
            Content Moderation Process
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-4">How Moderation Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium text-red-800 mb-1">Report Received</h4>
                <p className="text-xs text-red-700">Community member flags content for review</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-medium text-red-800 mb-1">Initial Review</h4>
                <p className="text-xs text-red-700">Moderator assesses content against standards</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <h4 className="font-medium text-red-800 mb-1">Action Taken</h4>
                <p className="text-xs text-red-700">Appropriate response based on violation severity</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <h4 className="font-medium text-red-800 mb-1">Follow-Up</h4>
                <p className="text-xs text-red-700">Notification sent to affected users</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Possible Actions</h3>
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                  <h4 className="font-medium text-yellow-800">Content Warning</h4>
                  <p className="text-sm text-yellow-700">Minor issues - content marked for improvement</p>
                </div>
                <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                  <h4 className="font-medium text-orange-800">Content Removal</h4>
                  <p className="text-sm text-orange-700">Moderate violations - content removed with explanation</p>
                </div>
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                  <h4 className="font-medium text-red-800">Account Action</h4>
                  <p className="text-sm text-red-700">Serious/repeat violations - temporary or permanent restrictions</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Appeal Process</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">If You Disagree With a Decision</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Submit an appeal within 7 days</li>
                  <li>• Provide additional context or clarification</li>
                  <li>• Senior moderator will review the case</li>
                  <li>• Decision will be communicated within 48 hours</li>
                  <li>• Learn from feedback to improve future contributions</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Success */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-center text-green-800">Together We Grow Stronger</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Supportive Environment</h4>
              <p className="text-sm text-gray-600">
                Our standards create a welcoming space where everyone feels comfortable learning and sharing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Quality Knowledge</h4>
              <p className="text-sm text-gray-600">
                High standards ensure the information shared helps orchid parents succeed in their journey.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Lasting Connections</h4>
              <p className="text-sm text-gray-600">
                Respectful interactions build meaningful relationships that extend beyond orchid care.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityStandards;
