
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const PhotoHealthAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const healthAnalysisHistory = [
    {
      date: '2024-06-10',
      plant: 'Phalaenopsis #1',
      healthScore: 92,
      issues: [],
      improvements: ['Excellent leaf color', 'Strong root system visible'],
      image: '/api/placeholder/150/150'
    },
    {
      date: '2024-06-08',
      plant: 'Cattleya',
      healthScore: 78,
      issues: ['Slight yellowing on lower leaves'],
      improvements: ['Good overall structure', 'New growth detected'],
      image: '/api/placeholder/150/150'
    },
    {
      date: '2024-06-05',
      plant: 'Dendrobium',
      healthScore: 65,
      issues: ['Root discoloration', 'Slow growth rate'],
      improvements: ['Stable condition'],
      image: '/api/placeholder/150/150'
    }
  ];

  const analysisFeatures = [
    {
      feature: 'Leaf Health Analysis',
      description: 'AI analyzes leaf color, texture, and patterns to detect health issues',
      accuracy: '94%'
    },
    {
      feature: 'Root System Assessment',
      description: 'Evaluates root color, density, and overall health from visible portions',
      accuracy: '89%'
    },
    {
      feature: 'Growth Rate Tracking',
      description: 'Compares photos over time to track growth patterns and development',
      accuracy: '91%'
    },
    {
      feature: 'Disease Detection',
      description: 'Identifies common orchid diseases and pest infestations early',
      accuracy: '87%'
    },
    {
      feature: 'Bloom Readiness',
      description: 'Predicts bloom timing based on spike development and plant maturity',
      accuracy: '85%'
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePhoto = async () => {
    setAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Photo Upload and Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            AI Photo Health Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {selectedImage ? (
                  <img 
                    src={selectedImage} 
                    alt="Selected plant" 
                    className="max-w-full h-48 object-cover mx-auto rounded-lg"
                  />
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-600">Upload a photo of your orchid for AI analysis</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button variant="outline" className="w-full" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </span>
                  </Button>
                </label>
                <Button 
                  onClick={analyzePhoto}
                  disabled={!selectedImage || analyzing}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                >
                  {analyzing ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">AI Analysis Features</h4>
              {analysisFeatures.map((feature, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-gray-900">{feature.feature}</h5>
                    <Badge variant="outline">{feature.accuracy}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Photo Analysis History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthAnalysisHistory.map((analysis, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-4">
                  <img 
                    src={analysis.image} 
                    alt={analysis.plant}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{analysis.plant}</h4>
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full ${getScoreBg(analysis.healthScore)}`}>
                          <span className={`font-bold ${getScoreColor(analysis.healthScore)}`}>
                            {analysis.healthScore}/100
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{analysis.date}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysis.issues.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1 mb-2">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-medium text-red-900">Issues Detected</span>
                          </div>
                          <ul className="text-sm text-red-800 space-y-1">
                            {analysis.issues.map((issue, issueIndex) => (
                              <li key={issueIndex}>• {issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div>
                        <div className="flex items-center gap-1 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-900">Positive Findings</span>
                        </div>
                        <ul className="text-sm text-green-800 space-y-1">
                          {analysis.improvements.map((improvement, impIndex) => (
                            <li key={impIndex}>• {improvement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Photo Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Photo Guidelines for Best Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📸 Photo Quality</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use good lighting (natural preferred)</li>
                <li>• Ensure sharp focus</li>
                <li>• Take multiple angles</li>
                <li>• Include scale reference if possible</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🌿 Plant Coverage</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Capture entire plant when possible</li>
                <li>• Show leaves clearly</li>
                <li>• Include visible roots</li>
                <li>• Document any concerning areas</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">⏰ Timing</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Take weekly progress photos</li>
                <li>• Document before/after care</li>
                <li>• Capture seasonal changes</li>
                <li>• Record bloom development</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoHealthAnalysis;
