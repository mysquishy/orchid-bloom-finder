
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Star, Users, CheckCircle, Award, BookOpen } from 'lucide-react';

const ExpertVerificationSystem: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Expert Verification System</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how to become a verified expert, understand your responsibilities, 
          and contribute to the highest quality orchid care knowledge in our community.
        </p>
        <Badge className="bg-purple-100 text-purple-800">Expert Program</Badge>
      </div>

      {/* Becoming a Verified Expert */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Shield className="w-6 h-6" />
            How to Become a Verified Expert
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-4">Verification Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Experience Criteria</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• <strong>5+ years</strong> of hands-on orchid growing experience</li>
                  <li>• <strong>Successfully grown</strong> at least 20 different orchid species</li>
                  <li>• <strong>Documented success</strong> with challenging species</li>
                  <li>• <strong>Experience with propagation</strong> and advanced techniques</li>
                  <li>• <strong>Track record</strong> of helping others succeed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-3">Community Contributions</h4>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• <strong>50+ helpful answers</strong> with high community ratings</li>
                  <li>• <strong>Quality content creation</strong> (guides, tips, photos)</li>
                  <li>• <strong>Positive reputation</strong> from community interactions</li>
                  <li>• <strong>Consistent participation</strong> over 6+ months</li>
                  <li>• <strong>Zero violations</strong> of community guidelines</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-medium text-blue-800 mb-1">Application</h4>
              <p className="text-xs text-blue-700">Submit credentials and portfolio</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-medium text-green-800 mb-1">Review</h4>
              <p className="text-xs text-green-700">Expert panel evaluation</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-orange-600 font-bold">3</span>
              </div>
              <h4 className="font-medium text-orange-800 mb-1">Assessment</h4>
              <p className="text-xs text-orange-700">Knowledge test and interview</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">4</span>
              </div>
              <h4 className="font-medium text-purple-800 mb-1">Verification</h4>
              <p className="text-xs text-purple-700">Badge and privileges granted</p>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-800 mb-2">Professional Credentials (Optional)</h4>
            <p className="text-sm text-amber-700 mb-2">
              While not required, these credentials can strengthen your application:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-amber-700">
              <div>• Horticultural degree or certification</div>
              <div>• Botanical garden or nursery experience</div>
              <div>• Orchid society leadership roles</div>
              <div>• Published articles or research</div>
              <div>• Teaching or workshop experience</div>
              <div>• Award-winning cultivation achievements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expert Responsibilities */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-6 h-6" />
            Expert Responsibility and Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-4">Core Responsibilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-800 mb-3">Knowledge Accuracy</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Provide scientifically accurate information</li>
                  <li>• Cite sources when making claims</li>
                  <li>• Acknowledge uncertainty when appropriate</li>
                  <li>• Stay updated with current best practices</li>
                  <li>• Correct misinformation respectfully</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-3">Community Leadership</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Model positive community behavior</li>
                  <li>• Mentor newcomers patiently</li>
                  <li>• Facilitate productive discussions</li>
                  <li>• Report quality issues promptly</li>
                  <li>• Participate in expert consultations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <Star className="w-8 h-8 text-blue-600 mb-2" />
                <h4 className="font-medium text-blue-900 mb-2">Quality Standards</h4>
                <p className="text-sm text-blue-700">
                  Maintain high standards in all contributions, from detailed answers to photo quality.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <Users className="w-8 h-8 text-purple-600 mb-2" />
                <h4 className="font-medium text-purple-900 mb-2">Mentorship</h4>
                <p className="text-sm text-purple-700">
                  Guide newcomers with patience and encourage their learning journey.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <BookOpen className="w-8 h-8 text-orange-600 mb-2" />
                <h4 className="font-medium text-orange-900 mb-2">Education</h4>
                <p className="text-sm text-orange-700">
                  Create educational content that helps the community learn and grow.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">⚠️ Expert Code of Conduct</h4>
            <div className="text-sm text-red-700 space-y-1">
              <p>• Never provide medical advice for humans or pets</p>
              <p>• Avoid recommending dangerous chemicals or practices</p>
              <p>• Disclose any commercial interests or affiliations</p>
              <p>• Respect intellectual property and attribution</p>
              <p>• Maintain professional standards in all interactions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mentoring Guidelines */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Users className="w-6 h-6" />
            Mentoring New Plant Parents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Effective Mentoring Approaches</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">Teaching Strategies</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• <strong>Start Simple:</strong> Begin with basic concepts before advanced techniques</li>
                  <li>• <strong>Use Analogies:</strong> Relate orchid care to familiar concepts</li>
                  <li>• <strong>Visual Learning:</strong> Include photos and diagrams when possible</li>
                  <li>• <strong>Progressive Steps:</strong> Break complex tasks into manageable steps</li>
                  <li>• <strong>Encourage Questions:</strong> Create a safe space for learning</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Building Confidence</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-3">Confidence Building</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• <strong>Celebrate Wins:</strong> Acknowledge all successes, big and small</li>
                  <li>• <strong>Normalize Mistakes:</strong> Share your own learning experiences</li>
                  <li>• <strong>Provide Reassurance:</strong> Help overcome orchid care anxiety</li>
                  <li>• <strong>Set Realistic Goals:</strong> Help set achievable milestones</li>
                  <li>• <strong>Follow Up:</strong> Check on progress and offer ongoing support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-4">Mentoring Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-purple-800 mb-2">Active Listening</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Read questions carefully</li>
                  <li>• Address specific concerns</li>
                  <li>• Ask clarifying questions</li>
                  <li>• Validate their feelings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-2">Personalized Guidance</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Consider their experience level</li>
                  <li>• Adapt to their learning style</li>
                  <li>• Respect their goals</li>
                  <li>• Account for their environment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-2">Ongoing Support</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Offer to answer follow-ups</li>
                  <li>• Check on plant progress</li>
                  <li>• Provide encouragement</li>
                  <li>• Connect them with resources</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plant Identification Validation */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <Award className="w-6 h-6" />
            Contributing to Plant Identification Validation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-50 p-6 rounded-lg">
            <h3 className="font-semibold text-amber-900 mb-4">Validation Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-amber-800 mb-3">Expert Review Steps</h4>
                <ol className="text-sm text-amber-700 space-y-2">
                  <li><strong>1. Photo Analysis:</strong> Examine submitted photos for key identifying features</li>
                  <li><strong>2. AI Comparison:</strong> Review AI-suggested identifications for accuracy</li>
                  <li><strong>3. Confidence Assessment:</strong> Rate your confidence level in the identification</li>
                  <li><strong>4. Documentation:</strong> Note specific features that support the identification</li>
                  <li><strong>5. Alternative Suggestions:</strong> Provide alternatives if uncertain</li>
                </ol>
              </div>
              <div>
                <h4 className="font-medium text-amber-800 mb-3">Quality Criteria</h4>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li>• <strong>Clear Photos:</strong> Adequate image quality for identification</li>
                  <li>• <strong>Multiple Views:</strong> Flowers, leaves, growth habit visible</li>
                  <li>• <strong>Morphological Features:</strong> Key identifying characteristics present</li>
                  <li>• <strong>Context Information:</strong> Origin, growing conditions, etc.</li>
                  <li>• <strong>Expert Consensus:</strong> Agreement among multiple experts</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-green-800 mb-1">Confirmed</h4>
              <p className="text-xs text-green-700">High confidence, multiple expert agreement</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <h4 className="font-medium text-yellow-800 mb-1">Likely</h4>
              <p className="text-xs text-yellow-700">Good confidence, some expert agreement</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-medium text-orange-800 mb-1">Uncertain</h4>
              <p className="text-xs text-orange-700">Low confidence, conflicting opinions</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Star className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h4 className="font-medium text-red-800 mb-1">Needs Review</h4>
              <p className="text-xs text-red-700">Insufficient information for identification</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Best Practices for Validation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <strong>When Confirming:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Cite specific identifying features</li>
                  <li>• Provide confidence level (1-10)</li>
                  <li>• Mention any distinguishing characteristics</li>
                  <li>• Suggest care considerations for that species</li>
                </ul>
              </div>
              <div>
                <strong>When Uncertain:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• List possible alternatives</li>
                  <li>• Explain what additional info would help</li>
                  <li>• Suggest getting a second opinion</li>
                  <li>• Recommend professional consultation if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expert Benefits */}
      <Card className="bg-gradient-to-r from-purple-50 to-amber-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center text-purple-800">Expert Program Benefits & Recognition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Verified Badge</h4>
              <p className="text-sm text-gray-600">
                Display your expertise with a verified expert badge visible throughout the community.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Priority Features</h4>
              <p className="text-sm text-gray-600">
                Early access to new features, consultation opportunities, and expert-only tools.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Community Impact</h4>
              <p className="text-sm text-gray-600">
                Help shape the future of orchid care knowledge and mentor the next generation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertVerificationSystem;
