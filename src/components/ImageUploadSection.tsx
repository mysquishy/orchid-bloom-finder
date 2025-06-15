
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, Loader2, AlertCircle, Heart, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { plantIdentificationService } from '@/services/plantIdentificationService';
import { analyticsManager } from '@/utils/analyticsManager';
import { environmentManager } from '@/utils/environmentConfig';
import { useAuth } from '@/contexts/AuthContext';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';

interface IdentificationResult {
  id?: string;
  species: string;
  commonName: string;
  confidence: number;
  description: string;
  careInstructions: string[];
  characteristics: string[];
}

const ImageUploadSection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<IdentificationResult | null>(null);
  const [isSavedToCollection, setIsSavedToCollection] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { checkFeatureAccess, remainingIdentifications } = usePremiumAccess();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setAnalysisResult(null);
    setIsSavedToCollection(false);
    analyzeImage(file);
  };

  const analyzeImage = async (file: File) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to identify plants.",
        variant: "destructive",
      });
      return;
    }

    // Check feature access
    const access = checkFeatureAccess('identification');
    if (!access.hasAccess) {
      toast({
        title: "Identification Limit Reached",
        description: access.reason === 'limit-exceeded' 
          ? "You've reached your monthly limit. Upgrade to Premium for unlimited identifications."
          : "Premium subscription required for plant identification.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      analyticsManager.trackUserAction('image_upload_started', {
        fileSize: file.size,
        fileType: file.type,
      });

      const result = await plantIdentificationService.identifyPlant(file, user.id);
      
      setAnalysisResult(result);
      
      analyticsManager.trackPlantIdentification(result.confidence, result.species);
      
      toast({
        title: "Plant identified!",
        description: `Found: ${result.species} with ${Math.round(result.confidence * 100)}% confidence`,
      });
    } catch (error: any) {
      console.error('Plant identification error:', error);
      
      analyticsManager.trackError(error, {
        context: 'plant_identification',
        fileSize: file.size,
        fileType: file.type,
      });

      toast({
        title: "Analysis failed",
        description: error.message || "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToCollection = async () => {
    if (!analysisResult?.id || !user) return;

    setIsSaving(true);
    try {
      await plantIdentificationService.saveToCollection(analysisResult.id, user.id);
      setIsSavedToCollection(true);
      
      toast({
        title: "Saved to Collection!",
        description: `${analysisResult.commonName} has been added to your garden.`,
      });

      analyticsManager.trackUserAction('plant_saved_to_collection', {
        species: analysisResult.species,
        confidence: analysisResult.confidence,
      });
    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save to collection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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
          
          {/* Usage indicator for authenticated users */}
          {user && !checkFeatureAccess('identification').hasAccess && (
            <div className="flex items-center justify-center mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800 text-sm">
                Monthly limit reached - Upgrade to Premium for unlimited identifications
              </span>
            </div>
          )}
          
          {user && remainingIdentifications !== undefined && remainingIdentifications >= 0 && (
            <div className="flex items-center justify-center mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-blue-800 text-sm">
                {remainingIdentifications} free identifications remaining this month
              </span>
            </div>
          )}

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
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-left">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-green-900 text-xl">
                          {analysisResult.species}
                        </h3>
                        <span className={`text-sm font-medium ${getConfidenceColor(analysisResult.confidence)}`}>
                          {Math.round(analysisResult.confidence * 100)}% confident
                        </span>
                      </div>
                      
                      <p className="text-green-800 mb-2 text-lg">{analysisResult.commonName}</p>
                      <p className="text-gray-700 mb-4">{analysisResult.description}</p>
                      
                      {/* Care Instructions Preview */}
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Quick Care Tips:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {analysisResult.careInstructions.slice(0, 3).map((tip, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Save to Collection Button */}
                      {user && analysisResult.id && (
                        <Button
                          onClick={handleSaveToCollection}
                          disabled={isSaving || isSavedToCollection}
                          className={`w-full ${isSavedToCollection ? 'bg-green-600 hover:bg-green-700' : ''}`}
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : isSavedToCollection ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Saved to Garden!
                            </>
                          ) : (
                            <>
                              <Heart className="w-4 h-4 mr-2" />
                              Save to My Garden
                            </>
                          )}
                        </Button>
                      )}
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
                  disabled={isAnalyzing || (!user && selectedImage)}
                  className="flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>{selectedImage ? 'Choose Different Photo' : 'Choose File'}</span>
                </Button>
                
                {selectedImage && (
                  <Button
                    onClick={() => {
                      setSelectedImage(null);
                      setAnalysisResult(null);
                      setIsSavedToCollection(false);
                    }}
                    variant="outline"
                    disabled={isAnalyzing}
                  >
                    Clear
                  </Button>
                )}
              </div>

              {!user && (
                <p className="text-sm text-gray-600">
                  <a href="/auth" className="text-green-600 hover:text-green-700 font-medium">
                    Sign in
                  </a>
                  {' '}to save identifications and track your garden
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ImageUploadSection;
