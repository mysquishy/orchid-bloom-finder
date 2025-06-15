
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { plantIdentificationService } from '@/services/plantIdentificationService';
import { analyticsManager } from '@/utils/analyticsManager';
import { environmentManager } from '@/utils/environmentConfig';

const ImageUploadSection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setAnalysisResult(null);
    analyzeImage(file);
  };

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      analyticsManager.trackUserAction('image_upload_started', {
        fileSize: file.size,
        fileType: file.type,
      });

      const result = await plantIdentificationService.identifyPlant(file);
      
      setAnalysisResult(result);
      
      analyticsManager.trackPlantIdentification(result.confidence, result.species);
      
      toast({
        title: "Plant identified!",
        description: `Found: ${result.species} with ${Math.round(result.confidence * 100)}% confidence`,
      });
    } catch (error) {
      console.error('Plant identification error:', error);
      
      analyticsManager.trackError(error as Error, {
        context: 'plant_identification',
        fileSize: file.size,
        fileType: file.type,
      });

      const isApiConfigured = environmentManager.isFeatureEnabled('plantIdentification');
      
      toast({
        title: "Analysis failed",
        description: isApiConfigured 
          ? "Please try again or contact support."
          : "Plant identification API not configured. Using demo mode.",
        variant: isApiConfigured ? "destructive" : "default",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPG, PNG, WebP).",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      handleImageSelect(file);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI Plant Identification
          </h2>
          <p className="text-lg text-gray-600">
            Upload a photo of your orchid and get instant identification with care tips
          </p>
          {!environmentManager.isFeatureEnabled('plantIdentification') && (
            <div className="flex items-center justify-center mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800 text-sm">
                Demo mode - Configure PlantNet API for real identification
              </span>
            </div>
          )}
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {selectedImage ? (
                <div className="space-y-4">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected plant"
                    className="max-w-full h-64 object-cover rounded-lg mx-auto"
                  />
                  
                  {isAnalyzing && (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing your plant...</span>
                    </div>
                  )}

                  {analysisResult && !isAnalyzing && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                      <h3 className="font-semibold text-green-900 mb-2">
                        {analysisResult.species}
                      </h3>
                      <p className="text-green-800 mb-2">{analysisResult.commonName}</p>
                      <p className={`text-sm ${getConfidenceColor(analysisResult.confidence)}`}>
                        Confidence: {Math.round(analysisResult.confidence * 100)}%
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 space-y-4">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Upload a plant photo
                    </p>
                    <p className="text-gray-500">
                      JPG, PNG, WebP up to 10MB
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing}
                  className="flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose File</span>
                </Button>
                
                {selectedImage && (
                  <Button
                    onClick={() => {
                      setSelectedImage(null);
                      setAnalysisResult(null);
                    }}
                    variant="outline"
                    disabled={isAnalyzing}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ImageUploadSection;
