
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { offlineManager } from '@/utils/offlineManager';

const ImageUploadSection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    analyzeImage(file);
  };

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResult = {
        id: `id_${Date.now()}`,
        species: 'Phalaenopsis orchid',
        commonName: 'Moth Orchid',
        confidence: 0.95,
        description: 'A beautiful epiphytic orchid with large, moth-like flowers.',
        careInstructions: ['Water weekly', 'Bright indirect light', 'High humidity'],
        characteristics: ['Large flowers', 'Thick leaves', 'Aerial roots'],
        imageUrl: URL.createObjectURL(file)
      };

      // Store identification offline
      await offlineManager.storeIdentification(mockResult);
      
      toast({
        title: "Orchid identified!",
        description: `Found: ${mockResult.species} with ${Math.round(mockResult.confidence * 100)}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Try Our AI Identification
          </h2>
          <p className="text-lg text-gray-600">
            Upload a photo of your orchid and get instant identification with care tips
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {selectedImage ? (
                <div className="space-y-4">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected orchid"
                    className="max-w-full h-64 object-cover rounded-lg mx-auto"
                  />
                  {isAnalyzing && (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing your orchid...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 space-y-4">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Upload an orchid photo
                    </p>
                    <p className="text-gray-500">
                      JPG, PNG up to 10MB
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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ImageUploadSection;
