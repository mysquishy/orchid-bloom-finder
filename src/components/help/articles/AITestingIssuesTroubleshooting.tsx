
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Camera, RefreshCw, MessageSquare, CheckCircle, Clock } from 'lucide-react';

const AITestingIssuesTroubleshooting: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          AI Testing Issues Troubleshooting
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Resolve identification conflicts, understand validation discrepancies, and improve 
          your photo quality for better AI testing results.
        </p>
      </div>

      {/* Common AI Testing Problems */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-red-800">Common AI Testing Problems</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-800">Low Confidence Scores</h4>
                </div>
                <p className="text-sm text-red-700 mb-3">
                  AI consistently returns confidence below 65% for clear orchid photos.
                </p>
                <div className="space-y-2 text-xs">
                  <div><strong>Common Causes:</strong></div>
                  <ul className="list-disc list-inside space-y-1 text-red-600">
                    <li>Poor lighting or image quality</li>
                    <li>Rare or hybrid varieties not in training data</li>
                    <li>Multiple plants in single image</li>
                    <li>Damaged or diseased flowers</li>
                    <li>Unusual angles or partial views</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-800">Inconsistent Results</h4>
                </div>
                <p className="text-sm text-yellow-700 mb-3">
                  Same orchid photo gives different identifications on repeated attempts.
                </p>
                <div className="space-y-2 text-xs">
                  <div><strong>Possible Reasons:</strong></div>
                  <ul className="list-disc list-inside space-y-1 text-yellow-600">
                    <li>Model uncertainty near decision boundaries</li>
                    <li>Server load affecting processing</li>
                    <li>Recent model updates changing behavior</li>
                    <li>Borderline cases between similar species</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Community Disagreement</h4>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  AI and community validators provide conflicting identifications.
                </p>
                <div className="space-y-2 text-xs">
                  <div><strong>Resolution Steps:</strong></div>
                  <ul className="list-disc list-inside space-y-1 text-blue-600">
                    <li>Request expert verification</li>
                    <li>Provide additional photo angles</li>
                    <li>Share growing conditions context</li>
                    <li>Check for regional variations</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-purple-800">Processing Delays</h4>
                </div>
                <p className="text-sm text-purple-700 mb-3">
                  Unusually long wait times for identification results.
                </p>
                <div className="space-y-2 text-xs">
                  <div><strong>Check These:</strong></div>
                  <ul className="list-disc list-inside space-y-1 text-purple-600">
                    <li>Internet connection stability</li>
                    <li>Image file size (should be under 10MB)</li>
                    <li>System maintenance announcements</li>
                    <li>Peak usage times (evenings/weekends)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Problem Resolution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-red-800">Step-by-Step Problem Resolution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Identify the Problem Type</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Determine whether you're experiencing low confidence, wrong identification, 
                  processing issues, or validation conflicts.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Badge variant="outline" className="text-xs">Low Confidence</Badge>
                  <Badge variant="outline" className="text-xs">Wrong ID</Badge>
                  <Badge variant="outline" className="text-xs">Processing Error</Badge>
                  <Badge variant="outline" className="text-xs">Validation Conflict</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Check Photo Quality</h4>
                <p className="text-gray-700 text-sm mb-3">
                  Most AI issues stem from photo quality problems. Review these key factors:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-800">Technical Quality</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Image is in focus and sharp</li>
                      <li>• Adequate lighting (natural preferred)</li>
                      <li>• No shadows obscuring features</li>
                      <li>• File size appropriate (2-8MB)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-800">Content Quality</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Single orchid flower clearly visible</li>
                      <li>• Key identifying features included</li>
                      <li>• Minimal background distractions</li>
                      <li>• Color accuracy preserved</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Try Alternative Approaches</h4>
                <p className="text-gray-700 text-sm mb-3">
                  If the first attempt doesn't yield good results, try these alternatives:
                </p>
                <div className="space-y-2">
                  <div className="p-3 border rounded">
                    <div className="font-medium text-gray-800">Multiple Angles</div>
                    <div className="text-sm text-gray-600">Take photos from front, side, and top views</div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="font-medium text-gray-800">Different Lighting</div>
                    <div className="text-sm text-gray-600">Try natural window light vs. artificial lighting</div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="font-medium text-gray-800">Focus on Details</div>
                    <div className="text-sm text-gray-600">Close-up shots of distinctive features (lip, column, markings)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Engage Community Support</h4>
                <p className="text-gray-700 text-sm mb-3">
                  When technical approaches don't work, leverage our community expertise:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="text-center p-3 border rounded">
                    <MessageSquare className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-medium text-blue-800">Ask Community</div>
                    <div className="text-xs text-blue-600">Post in Q&A section</div>
                  </div>
                  <div className="text-center p-3 border rounded">
                    <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="font-medium text-green-800">Request Validation</div>
                    <div className="text-xs text-green-600">Submit for expert review</div>
                  </div>
                  <div className="text-center p-3 border rounded">
                    <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="font-medium text-purple-800">Report Issue</div>
                    <div className="text-xs text-purple-600">Flag for development team</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Improving Photo Quality Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-red-800">Improving Photo Quality for Better Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Camera className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-green-800 mb-2">Optimal Conditions</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Natural daylight (not direct sun)</li>
                  <li>• Stable hand or tripod</li>
                  <li>• Clean camera lens</li>
                  <li>• Appropriate distance (12-18 inches)</li>
                  <li>• Flower fills 60-80% of frame</li>
                </ul>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Camera Settings</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Macro mode if available</li>
                  <li>• Auto-focus on flower center</li>
                  <li>• No digital zoom (move closer instead)</li>
                  <li>• Highest resolution setting</li>
                  <li>• Disable flash (use natural light)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3">Avoid These Common Mistakes</h4>
                <div className="space-y-2 text-sm text-red-700">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                    <span>Blurry photos from camera shake or poor focus</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                    <span>Dark photos that hide color and detail</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                    <span>Photos with multiple flowers confusing the AI</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                    <span>Extreme close-ups missing flower structure</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                    <span>Busy backgrounds that distract from the orchid</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-3">When to Seek Expert Help</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Rare or unusual orchid varieties</li>
                  <li>• Hybrid plants not in databases</li>
                  <li>• Damaged or diseased flowers</li>
                  <li>• Very young or very old blooms</li>
                  <li>• Orchids without flowers (vegetative state)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Help */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardContent className="py-8 text-center">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Still Having Issues?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            If you've tried these troubleshooting steps and are still experiencing problems, 
            don't hesitate to reach out for help. Our community and support team are here 
            to ensure you get the most accurate identification possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
              Report Technical Issue
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Ask Community for Help
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Request Expert Review
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITestingIssuesTroubleshooting;
