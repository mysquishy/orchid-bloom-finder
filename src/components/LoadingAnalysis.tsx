
import React from 'react';
import { Loader2, Camera, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface LoadingAnalysisProps {
  progress: number;
  message: string;
}

const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({ progress, message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardContent className="p-8 text-center">
          {/* Animated Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
            <Loader2 className="w-24 h-24 text-green-500 animate-spin absolute -top-2 -left-2" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Analyzing Your Orchid
          </h3>

          {/* Message */}
          <p className="text-gray-600 mb-6">{message}</p>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-500">{progress}% complete</p>
          </div>

          {/* Loading Steps */}
          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <div className={`flex items-center space-x-2 ${progress >= 25 ? 'text-green-600' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${progress >= 25 ? 'bg-green-600' : 'bg-gray-300'}`} />
              <span>Processing image...</span>
            </div>
            <div className={`flex items-center space-x-2 ${progress >= 50 ? 'text-green-600' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${progress >= 50 ? 'bg-green-600' : 'bg-gray-300'}`} />
              <span>Analyzing features...</span>
            </div>
            <div className={`flex items-center space-x-2 ${progress >= 75 ? 'text-green-600' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${progress >= 75 ? 'bg-green-600' : 'bg-gray-300'}`} />
              <span>Matching species...</span>
            </div>
            <div className={`flex items-center space-x-2 ${progress >= 100 ? 'text-green-600' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${progress >= 100 ? 'bg-green-600' : 'bg-gray-300'}`} />
              <span>Generating results...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingAnalysis;
