
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Camera, Heart, Share, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface IdentificationResult {
  species: string;
  commonName: string;
  confidence: number;
  description: string;
  careInstructions: string[];
  characteristics: string[];
  image: string;
}

interface ResultsPageProps {
  result: IdentificationResult;
  capturedImage: string;
  onRetake: () => void;
  onSave: () => void;
  onBack: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  result,
  capturedImage,
  onRetake,
  onSave,
  onBack
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    onSave();
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Upload
          </Button>
          
          <div className="flex space-x-2">
            <Button
              onClick={onRetake}
              variant="outline"
              className="border-green-200 hover:border-green-300"
            >
              <Camera className="mr-2 h-4 w-4" />
              Retake Photo
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaved}
              className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
            >
              <Heart className="mr-2 h-4 w-4" />
              {isSaved ? 'Saved!' : 'Save to Collection'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-lg font-playfair text-gray-900">Your Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={capturedImage}
                  alt="Captured orchid"
                  className="w-full rounded-lg shadow-lg"
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardContent className="p-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-200 hover:border-green-300"
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-200 hover:border-purple-300"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Identification Result */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-playfair text-gray-900">
                    Identification Result
                  </CardTitle>
                  <Badge className={getConfidenceColor(result.confidence)}>
                    {Math.round(result.confidence * 100)}% confident
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {result.species}
                  </h3>
                  <p className="text-lg text-gray-600 italic">{result.commonName}</p>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  {result.description}
                </p>
              </CardContent>
            </Card>

            {/* Characteristics */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg font-playfair text-gray-900">
                  Key Characteristics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.characteristics.map((characteristic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{characteristic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Care Instructions */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="text-lg font-playfair text-gray-900">
                  Care Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.careInstructions.map((instruction, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-gray-700 text-sm">{instruction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
