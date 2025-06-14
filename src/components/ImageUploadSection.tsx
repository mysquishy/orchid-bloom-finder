import React, { useState } from 'react';
import { Camera, ArrowUp } from 'lucide-react';
import AdvancedPhotoCapture from './camera/AdvancedPhotoCapture';
import LoadingAnalysis from './LoadingAnalysis';
import ResultsPage from './ResultsPage';
import PremiumGate from './PremiumGate';
import UpgradePrompt from './UpgradePrompt';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';
import { offlineManager } from '@/utils/offlineManager';

const ImageUploadSection = () => {
  const [dragOver, setDragOver] = useState(false);
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const { user } = useAuth();
  const { checkFeatureAccess } = usePremiumAccess();
  const { refreshUsage } = useSubscription();

  // Mock result data - in a real app, this would come from your AI service
  const mockResult = {
    species: 'Phalaenopsis amabilis',
    commonName: 'Moon Orchid',
    confidence: 0.92,
    description: 'The Moon Orchid is one of the most popular orchid species, known for its elegant white flowers and graceful appearance. Native to Southeast Asia, it\'s often called the "Moth Orchid" due to its resembling a moth in flight.',
    careInstructions: [
      'Water weekly, allowing water to drain completely',
      'Provide bright, indirect light',
      'Maintain humidity between 50-70%',
      'Keep temperature between 65-80°F (18-27°C)',
      'Fertilize monthly with orchid fertilizer'
    ],
    characteristics: [
      'Pure white petals with yellow center',
      'Arching flower spikes',
      'Thick, leathery leaves',
      'Aerial roots visible',
      'Blooms can last 2-3 months'
    ],
    image: '/placeholder.svg'
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageCapture(files[0]);
    }
  };

  const handleImageCapture = async (file: File) => {
    // Check if user can identify
    const access = checkFeatureAccess('identification');
    if (!access.hasAccess) {
      return; // This should be blocked by the PremiumGate component
    }

    setCapturedImage(URL.createObjectURL(file));
    setShowPhotoCapture(false);
    
    // Save to offline storage
    if (user) {
      const identification = {
        id: `id-${Date.now()}`,
        species: mockResult.species,
        commonName: mockResult.commonName,
        confidence: mockResult.confidence,
        description: mockResult.description,
        careInstructions: mockResult.careInstructions,
        characteristics: mockResult.characteristics,
        imageUrl: URL.createObjectURL(file),
        timestamp: Date.now(),
        synced: false
      };
      
      await offlineManager.saveIdentification(identification);
    }
    
    // Increment usage for free users
    if (user && access.reason === 'free-limit') {
      try {
        await supabase.rpc('increment_identification_usage', {
          user_id_param: user.id
        });
        // Refresh usage data
        await refreshUsage();
      } catch (error) {
        console.error('Error updating usage:', error);
      }
    }
    
    simulateAnalysis();
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisMessage('Preparing your image for analysis...');

    const messages = [
      'Preparing your image for analysis...',
      'Extracting visual features...',
      'Comparing with orchid database...',
      'Generating identification results...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + 25;
        if (newProgress <= 100) {
          if (currentStep < messages.length) {
            setAnalysisMessage(messages[currentStep]);
            currentStep++;
          }
          return newProgress;
        } else {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowResults(true);
          return 100;
        }
      });
    }, 800);
  };

  const handleRetake = () => {
    setShowResults(false);
    setCapturedImage(null);
    setAnalysisProgress(0);
  };

  const handleSave = () => {
    // In a real app, this would save to the user's collection
    console.log('Saving orchid to collection...');
  };

  const handleBack = () => {
    setShowResults(false);
    setCapturedImage(null);
    setAnalysisProgress(0);
  };

  if (showResults && capturedImage) {
    return (
      <ResultsPage
        result={mockResult}
        capturedImage={capturedImage}
        onRetake={handleRetake}
        onSave={handleSave}
        onBack={handleBack}
      />
    );
  }

  return (
    <>
      <section id="identify" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-playfair text-gray-900 mb-6">
              Start
              <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent"> Identifying</span>
            </h2>
            <p className="text-xl text-gray-600">
              Upload an image or take a photo to identify your orchid
            </p>
          </div>

          {/* Premium Gate for Identification */}
          <PremiumGate feature="identification">
            {/* Upload Area */}
            <div className="bg-gradient-to-br from-green-50 to-purple-50 rounded-3xl p-8 border-2 border-dashed border-green-200">
              <div
                className={`text-center py-16 transition-all duration-300 ${
                  dragOver ? 'scale-105' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ArrowUp className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Drop your orchid image here
                </h3>
                <p className="text-gray-600 mb-8">
                  or click to browse from your device
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowPhotoCapture(true)}
                    className="bg-gradient-to-r from-green-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Choose File
                  </button>
                  <button
                    onClick={() => setShowPhotoCapture(true)}
                    className="flex items-center justify-center space-x-2 text-gray-700 px-8 py-3 rounded-full font-semibold border-2 border-gray-200 hover:border-green-300 hover:text-green-600 transition-all duration-300"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Advanced Camera</span>
                  </button>
                </div>
              </div>
            </div>
          </PremiumGate>

          {/* Enhanced Tips */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-green-50 rounded-2xl">
              <h4 className="font-semibold text-gray-900 mb-2">Pro Camera Tools</h4>
              <p className="text-gray-600 text-sm">Advanced controls for perfect plant photos</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-2xl">
              <h4 className="font-semibold text-gray-900 mb-2">Offline Ready</h4>
              <p className="text-gray-600 text-sm">Works even when you're disconnected</p>
            </div>
            <div className="p-6 bg-green-50 rounded-2xl">
              <h4 className="font-semibold text-gray-900 mb-2">Voice Commands</h4>
              <p className="text-gray-600 text-sm">Say "take photo" for hands-free capture</p>
            </div>
          </div>

          {/* Show upgrade prompt for free users */}
          {user && !checkFeatureAccess('identification').hasAccess && (
            <div className="mt-12">
              <UpgradePrompt 
                title="You've reached your monthly limit"
                description="Get unlimited identifications with premium access"
                features={[
                  "Unlimited plant identifications",
                  "Advanced camera tools",
                  "Offline functionality",
                  "Voice commands",
                  "Export your plant data"
                ]}
              />
            </div>
          )}
        </div>
      </section>

      {/* Advanced Photo Capture Modal */}
      {showPhotoCapture && (
        <AdvancedPhotoCapture
          onImageCapture={handleImageCapture}
          onCancel={() => setShowPhotoCapture(false)}
        />
      )}

      {/* Loading Analysis */}
      {isAnalyzing && (
        <LoadingAnalysis
          progress={analysisProgress}
          message={analysisMessage}
        />
      )}
    </>
  );
};

export default ImageUploadSection;
