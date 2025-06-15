
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Users, CheckCircle, AlertTriangle, Camera, Star } from 'lucide-react';

const UnderstandingConfidenceScores: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Brain className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Understanding AI Confidence Scores
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn what confidence percentages mean, when to trust results, and how community validation 
          makes our AI more accurate over time.
        </p>
      </div>

      {/* Confidence Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">What Confidence Scores Tell You</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* High Confidence */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">High Confidence (85-99%)</h3>
              </div>
              <p className="text-green-700 mb-3">
                Very reliable identification with clear visual markers matching our training data.
              </p>
              <div className="space-y-2 text-sm">
                <div className="font-medium text-green-800">When this happens:</div>
                <ul className="list-disc list-inside space-y-1 text-green-700">
                  <li>Clear, well-lit photo of the flower</li>
                  <li>Distinctive species characteristics visible</li>
                  <li>Common orchid variety in our database</li>
                  <li>No visual obstructions or damage</li>
                </ul>
              </div>
            </div>

            {/* Medium Confidence */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-800">Medium Confidence (65-84%)</h3>
              </div>
              <p className="text-yellow-700 mb-3">
                Good identification but consider community validation for confirmation.
              </p>
              <div className="space-y-2 text-sm">
                <div className="font-medium text-yellow-800">Common reasons:</div>
                <ul className="list-disc list-inside space-y-1 text-yellow-700">
                  <li>Similar species with subtle differences</li>
                  <li>Partial view of identifying features</li>
                  <li>Lighting conditions affecting colors</li>
                  <li>Young or mature plants with varying characteristics</li>
                </ul>
              </div>
            </div>

            {/* Low Confidence */}
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">Low Confidence (Below 65%)</h3>
              </div>
              <p className="text-red-700 mb-3">
                Uncertain identification - definitely seek community or expert input.
              </p>
              <div className="space-y-2 text-sm">
                <div className="font-medium text-red-800">Why confidence is low:</div>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  <li>Rare or hybrid varieties</li>
                  <li>Poor photo quality or unusual angle</li>
                  <li>Damaged or diseased plants</li>
                  <li>Multiple plants in the image</li>
                </ul>
              </div>
            </div>

            {/* Community Validated */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-800">Community Validated</h3>
              </div>
              <p className="text-purple-700 mb-3">
                AI result confirmed by fellow orchid enthusiasts and experts.
              </p>
              <div className="space-y-2 text-sm">
                <div className="font-medium text-purple-800">Enhanced accuracy through:</div>
                <ul className="list-disc list-inside space-y-1 text-purple-700">
                  <li>Expert botanist verification</li>
                  <li>Community member consensus</li>
                  <li>Cross-referencing with care data</li>
                  <li>Regional growing pattern confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decision Framework */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">When to Trust vs Question Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-800 mb-2">Proceed with Confidence</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 85%+ confidence</li>
                    <li>• Clear photo quality</li>
                    <li>• Common species</li>
                    <li>• Matches your expectations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-yellow-800 mb-2">Seek Community Input</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 65-84% confidence</li>
                    <li>• Unfamiliar species</li>
                    <li>• Unusual characteristics</li>
                    <li>• Important care decisions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-red-800 mb-2">Take New Photos</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Below 65% confidence</li>
                    <li>• Blurry or dark images</li>
                    <li>• Multiple plants visible</li>
                    <li>• Significant plant damage</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Validation Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">How Community Validation Improves Accuracy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Real-World Validation</h4>
              <p className="text-gray-700">
                Our community includes botanists, professional growers, and experienced hobbyists who 
                can spot details our AI might miss. They provide context about regional variations, 
                seasonal changes, and care-related characteristics.
              </p>
              
              <h4 className="font-semibold text-gray-900">Continuous Learning</h4>
              <p className="text-gray-700">
                Every community validation helps train our AI. When experts correct identifications 
                or confirm uncertain results, this feedback directly improves future accuracy for 
                similar cases.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Edge Case Coverage</h4>
              <p className="text-gray-700">
                AI excels with common, clear examples but struggles with hybrids, rare varieties, 
                and unusual conditions. Community experts fill these gaps with specialized knowledge.
              </p>
              
              <h4 className="font-semibold text-gray-900">Quality Assurance</h4>
              <p className="text-gray-700">
                Multiple community members reviewing the same identification creates a consensus 
                that's often more accurate than any single source, including our AI.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photography Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">Tips for Getting Better AI Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <Camera className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Photo Quality</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Use natural lighting when possible</li>
                <li>Keep the camera steady</li>
                <li>Fill the frame with the flower</li>
                <li>Avoid shadows on key features</li>
              </ul>
            </div>

            <div className="text-center p-4">
              <Star className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Best Angles</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Front view of the flower face</li>
                <li>Include the full flower structure</li>
                <li>Show distinctive markings clearly</li>
                <li>Capture color patterns accurately</li>
              </ul>
            </div>

            <div className="text-center p-4">
              <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">What to Include</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>One flower per photo ideally</li>
                <li>Clean background if possible</li>
                <li>Multiple photos from different angles</li>
                <li>Include leaves/pseudobulbs if visible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real Examples */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="py-8 text-center">
          <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Understanding Builds Confidence
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            The more you understand how our AI works and when to seek help, the more successful 
            your orchid identification and care journey becomes. Remember, every question you ask 
            and every validation you provide helps our entire community grow smarter together.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-blue-100 text-blue-800">Trust the process</Badge>
            <Badge className="bg-purple-100 text-purple-800">Learn from experts</Badge>
            <Badge className="bg-green-100 text-green-800">Share your knowledge</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnderstandingConfidenceScores;
