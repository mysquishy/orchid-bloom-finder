
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Upload, RotateCw, Crop, Check, X, AlertCircle, Zap, Focus, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface AdvancedPhotoCaptureProps {
  onImageCapture: (file: File) => void;
  onCancel: () => void;
}

const AdvancedPhotoCapture: React.FC<AdvancedPhotoCaptureProps> = ({ onImageCapture, onCancel }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraSettings, setCameraSettings] = useState({
    zoom: 1,
    brightness: 0,
    contrast: 0,
    flashMode: 'off' as 'off' | 'on' | 'auto'
  });
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number } | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Camera constraints without unsupported properties
  const getCameraConstraints = () => ({
    video: {
      facingMode: 'environment',
      width: { ideal: 1920 },
      height: { ideal: 1080 }
    }
  });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(getCameraConstraints());
      setCameraStream(stream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access or choose a file instead",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };

  // Handle tap-to-focus (visual feedback only since API support varies)
  const handleVideoClick = async (event: React.MouseEvent<HTMLVideoElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = video.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    setFocusPoint({ x: x * 100, y: y * 100 });
    
    // Clear focus indicator after 2 seconds
    setTimeout(() => setFocusPoint(null), 2000);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Apply filters based on settings
    if (ctx) {
      ctx.filter = `brightness(${100 + cameraSettings.brightness}%) contrast(${100 + cameraSettings.contrast}%)`;
      ctx.drawImage(video, 0, 0);
    }
    
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(imageDataUrl);
    stopCamera();
  };

  const updateCameraSetting = (setting: string, value: number | string) => {
    setCameraSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please choose an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please choose an image file",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
    } catch (error) {
      toast({
        title: "Error processing image",
        description: "Please try again with a different image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirm = async () => {
    if (!capturedImage) return;

    setIsProcessing(true);
    
    try {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], 'orchid-photo.jpg', { type: 'image/jpeg' });
      
      onImageCapture(file);
    } catch (error) {
      toast({
        title: "Error processing image",
        description: "Please try capturing the image again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Voice command support
  useEffect(() => {
    if (!showCamera) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        capturePhoto();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showCamera]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-white mx-4">
        <CardContent className="p-4">
          {!showCamera && !capturedImage && (
            <div className="text-center space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Capture Your Orchid</h3>
              <p className="text-gray-600">Choose how you'd like to add your orchid photo</p>
              
              <div className="space-y-4">
                <Button
                  onClick={startCamera}
                  className="w-full bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
                  size="lg"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Advanced Camera
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full border-green-200 hover:border-green-300"
                  size="lg"
                  disabled={isProcessing}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  {isProcessing ? 'Processing...' : 'Choose from Gallery'}
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <Button
                onClick={onCancel}
                variant="ghost"
                className="w-full text-gray-500 hover:text-gray-700"
              >
                Cancel
              </Button>
            </div>
          )}

          {showCamera && (
            <div className="space-y-4">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg cursor-crosshair"
                  onClick={handleVideoClick}
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Focus indicator */}
                {focusPoint && (
                  <div 
                    className="absolute w-8 h-8 border-2 border-green-400 rounded-full animate-ping"
                    style={{ 
                      left: `${focusPoint.x}%`, 
                      top: `${focusPoint.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                )}
                
                {/* Camera controls overlay */}
                <div className="absolute top-2 left-2 right-2 bg-black bg-opacity-50 rounded-lg p-3 space-y-2">
                  {/* Zoom control (visual only) */}
                  <div className="flex items-center space-x-2">
                    <Focus className="w-4 h-4 text-white" />
                    <Slider
                      value={[cameraSettings.zoom]}
                      onValueChange={(value) => updateCameraSetting('zoom', value[0])}
                      min={1}
                      max={3}
                      step={0.1}
                      className="flex-1"
                    />
                    <span className="text-white text-sm">{cameraSettings.zoom.toFixed(1)}x</span>
                  </div>
                  
                  {/* Brightness control */}
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-white" />
                    <Slider
                      value={[cameraSettings.brightness]}
                      onValueChange={(value) => updateCameraSetting('brightness', value[0])}
                      min={-50}
                      max={50}
                      step={1}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={capturePhoto}
                  className="flex-1 bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Capture
                </Button>
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                Tap on the image to focus • Press space bar to capture
              </p>
            </div>
          )}

          {capturedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Captured orchid"
                  className="w-full rounded-lg"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
                >
                  <Check className="mr-2 h-4 w-4" />
                  {isProcessing ? 'Processing...' : 'Use Photo'}
                </Button>
                <Button
                  onClick={handleRetake}
                  variant="outline"
                  className="flex-1"
                  disabled={isProcessing}
                >
                  <X className="mr-2 h-4 w-4" />
                  Retake
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedPhotoCapture;
