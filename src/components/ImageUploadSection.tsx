
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { plantIdentificationService } from '@/services/plantIdentificationService';
import { analyticsManager } from '@/utils/analyticsManager';
import { environmentManager } from '@/utils/environmentConfig';
import { useAuth } from '@/contexts/AuthContext';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import UsageIndicator from './image-upload/UsageIndicator';
import ImagePreview from './image-upload/ImagePreview';
import IdentificationResultComponent from './image-upload/IdentificationResult';
import UploadControls from './image-upload/UploadControls';

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
  const { toast } = useToast();
  const { user } = useAuth();
  const { checkFeatureAccess } = usePremiumAccess();

  const handleImageSelect = (file: File) => {
    console.log('Image selected for analysis:', file.name);
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
      console.log('Starting plant identification analysis...');
      
      analyticsManager.trackUserAction('image_upload_started', {
        fileSize: file.size,
        fileType: file.type,
      });

      const result = await plantIdentificationService.identifyPlant(file, user.id);
      
      console.log('Plant identification completed:', result);
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

      // Provide more specific error messages
      let errorMessage = "Please try again or contact support.";
      if (error.message?.includes('network')) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (error.message?.includes('limit')) {
        errorMessage = error.message;
      } else if (error.message?.includes('API')) {
        errorMessage = "Service temporarily unavailable. Please try again in a moment.";
      }

      toast({
        title: "Analysis failed",
        description: errorMessage,
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
      console.error('Save to collection error:', error);
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save to collection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    console.log('Clearing image upload section');
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsSavedToCollection(false);
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
          
          <UsageIndicator />

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
              {selectedImage && (
                <ImagePreview selectedImage={selectedImage} isAnalyzing={isAnalyzing} />
              )}

              {analysisResult && !isAnalyzing && (
                <IdentificationResultComponent
                  result={analysisResult}
                  isSaving={isSaving}
                  isSavedToCollection={isSavedToCollection}
                  onSaveToCollection={handleSaveToCollection}
                />
              )}

              <UploadControls
                selectedImage={selectedImage}
                isAnalyzing={isAnalyzing}
                onImageSelect={handleImageSelect}
                onClear={handleClear}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ImageUploadSection;
