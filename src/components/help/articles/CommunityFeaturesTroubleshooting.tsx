
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Shield, Upload, Star, AlertTriangle, Clock, CheckCircle, UserCheck, Flag } from 'lucide-react';

const CommunityFeaturesTroubleshooting: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Users className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Community Features Troubleshooting
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Resolve issues with user-generated content, expert verification, Q&A system, and community profiles
        </p>
      </div>

      {/* User-Generated Content Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-800 flex items-center gap-3">
            <Upload className="w-6 h-6" />
            User-Generated Content Submission Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Upload className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">Photo Upload Failures</h4>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Images fail to upload to community galleries or Q&A posts.
              </p>
              <div className="space-y-2">
                <div><strong>Resolution Steps:</strong></div>
                <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                  <li>Verify image meets size requirements (under 10MB)</li>
                  <li>Check supported formats (JPG, PNG, HEIC)</li>
                  <li>Test internet connection stability</li>
                  <li>Clear browser cache and retry</li>
                  <li>Try different browser or device</li>
                </ol>
                <div className="text-xs text-blue-600 mt-2">
                  <strong>Escalation:</strong> Contact support if uploads consistently fail after troubleshooting.
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-3">
                <Flag className="w-5 h-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800">Content Moderation Delays</h4>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                Submitted content stuck in moderation queue longer than expected.
              </p>
              <div className="space-y-2">
                <div><strong>Expected Timelines:</strong></div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Standard posts: 2-4 hours</li>
                  <li>• Expert submissions: 1-2 hours</li>
                  <li>• Sensitive content: 6-12 hours</li>
                  <li>• Appeals: 24-48 hours</li>
                </ul>
                <div className="text-xs text-yellow-600 mt-2">
                  <strong>Check Status:</strong> View moderation status in your profile dashboard.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expert Verification Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800 flex items-center gap-3">
            <Shield className="w-6 h-6" />
            Expert Verification Program Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Verification Application Delays</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Expert verification applications taking longer than expected to process.
                </p>
                <div className="space-y-2">
                  <div><strong>Application Timeline:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Initial review: 5-7 business days</li>
                    <li>• Credential verification: 10-14 business days</li>
                    <li>• Final approval: 3-5 business days</li>
                    <li>• Total process: 3-4 weeks</li>
                  </ul>
                  <div className="text-xs text-gray-500 mt-2">
                    <strong>Status Check:</strong> Monitor progress in expert application dashboard.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Credential Documentation Issues</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Problems uploading or verifying professional credentials.
                </p>
                <div className="space-y-2">
                  <div><strong>Required Documents:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Educational certificates (botany, horticulture)</li>
                    <li>• Professional licenses or certifications</li>
                    <li>• Employment verification (nurseries, universities)</li>
                    <li>• Published research or articles (if applicable)</li>
                  </ul>
                  <div><strong>Upload Requirements:</strong></div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Clear, high-resolution scans (PDF or JPG)</li>
                    <li>• Documents in English or with translations</li>
                    <li>• Current and unexpired certifications</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Badge Not Displaying</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Verified expert status not showing on profile or contributions.
                </p>
                <div className="space-y-2">
                  <div><strong>Troubleshooting Steps:</strong></div>
                  <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                    <li>Refresh browser cache and reload page</li>
                    <li>Check verification email for confirmation</li>
                    <li>Verify profile settings are public</li>
                    <li>Contact support with verification ID</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Q&A System Problems */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800 flex items-center gap-3">
            <MessageSquare className="w-6 h-6" />
            Q&A System Malfunctions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold text-orange-800">Questions Not Posting</h4>
              </div>
              <p className="text-sm text-orange-700 mb-3">
                New questions fail to appear in Q&A feed or show error messages.
              </p>
              <div className="space-y-2">
                <div><strong>Common Causes:</strong></div>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Content flagged by auto-moderation</li>
                  <li>• Missing required tags or categories</li>
                  <li>• Duplicate question detection</li>
                  <li>• Account posting limitations</li>
                </ul>
                <div><strong>Solutions:</strong></div>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Review community guidelines</li>
                  <li>• Add appropriate tags and categories</li>
                  <li>• Search existing questions first</li>
                  <li>• Contact moderators for review</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-800">Answer Rating Issues</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Problems voting on answers or incorrect rating calculations.
              </p>
              <div className="space-y-2">
                <div><strong>Voting Requirements:</strong></div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Minimum account age: 7 days</li>
                  <li>• Community reputation score: 50+</li>
                  <li>• Cannot vote on own content</li>
                  <li>• Limited votes per user per day</li>
                </ul>
                <div><strong>Rating Algorithm:</strong></div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Expert votes weighted higher</li>
                  <li>• Time decay factor applied</li>
                  <li>• Spam/abuse detection filters</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile and Showcase Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-800 flex items-center gap-3">
            <UserCheck className="w-6 h-6" />
            Profile and Showcase Problems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Profile Privacy Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div><strong>Public Profile Elements:</strong></div>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Username and display name</li>
                    <li>• Expert verification badge</li>
                    <li>• Public orchid collections</li>
                    <li>• Q&A contributions</li>
                    <li>• Community reputation score</li>
                  </ul>
                </div>
                <div>
                  <div><strong>Private Information:</strong></div>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Email address and contact info</li>
                    <li>• Private collection items</li>
                    <li>• Personal notes and care logs</li>
                    <li>• Analytics and performance data</li>
                    <li>• Account security settings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
              <h4 className="font-semibold text-pink-800 mb-3">Showcase Gallery Issues</h4>
              <div className="space-y-2">
                <div><strong>Common Problems:</strong></div>
                <ul className="text-sm text-pink-700 space-y-1">
                  <li>• Images not displaying in gallery</li>
                  <li>• Showcase categories not saving</li>
                  <li>• Featured items not highlighting</li>
                  <li>• Gallery sharing links broken</li>
                </ul>
                <div><strong>Troubleshooting:</strong></div>
                <ol className="list-decimal list-inside text-sm text-pink-700 space-y-1">
                  <li>Clear browser cache and cookies</li>
                  <li>Check image file formats and sizes</li>
                  <li>Verify gallery privacy settings</li>
                  <li>Test showcase links in incognito mode</li>
                  <li>Contact support with specific error messages</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Guidelines & Reporting */}
      <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
        <CardContent className="py-8">
          <div className="text-center mb-6">
            <Flag className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Community Guidelines & Reporting
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              How to report inappropriate content, harassment, or community violations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Reporting Process</h4>
              <ol className="list-decimal list-inside text-sm text-red-700 space-y-1">
                <li>Click report button on content</li>
                <li>Select violation category</li>
                <li>Provide detailed description</li>
                <li>Submit with evidence if available</li>
              </ol>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Response Timeline</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Initial review: 2-4 hours</li>
                <li>• Investigation: 24-48 hours</li>
                <li>• Resolution: 3-5 business days</li>
                <li>• Appeal process: 5-7 business days</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Prevention Tips</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Read community guidelines</li>
                <li>• Block problematic users</li>
                <li>• Use privacy settings effectively</li>
                <li>• Report issues promptly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityFeaturesTroubleshooting;
