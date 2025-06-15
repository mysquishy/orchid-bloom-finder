
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface UploadControlsProps {
  selectedImage: File | null;
  isAnalyzing: boolean;
  onImageSelect: (file: File) => void;
  onClear: () => void;
}

const UploadControls: React.FC<UploadControlsProps> = ({
  selectedImage,
  isAnalyzing,
  onImageSelect,
  onClear
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  console.log('UploadControls: Rendering with props:', {
    hasSelectedImage: !!selectedImage,
    isAnalyzing,
    hasUser: !!user,
    userId: user?.id
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('UploadControls: File upload triggered');
    const file = event.target.files?.[0];
    if (!file) {
      console.log('UploadControls: No file selected');
      return;
    }

    console.log('UploadControls: File selected:', {
      name: file.name,
      size: file.size,
      type: file.type,
      userId: user?.id
    });

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('UploadControls: Invalid file type:', file.type);
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, WebP).",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      console.error('UploadControls: File too large:', file.size);
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    // Clear the input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    console.log('UploadControls: Calling onImageSelect with file');
    try {
      onImageSelect(file);
      console.log('UploadControls: onImageSelect called successfully');
    } catch (error) {
      console.error('UploadControls: Error calling onImageSelect:', error);
      toast({
        title: "Upload Error",
        description: "Failed to process the selected image.",
        variant: "destructive",
      });
    }
  };

  const handleButtonClick = () => {
    console.log('UploadControls: Upload button clicked');
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error('UploadControls: File input ref is null');
    }
  };

  const handleClear = () => {
    console.log('UploadControls: Clear button clicked');
    try {
      onClear();
      console.log('UploadControls: onClear called successfully');
    } catch (error) {
      console.error('UploadControls: Error calling onClear:', error);
    }
  };

  return (
    <>
      {!selectedImage ? (
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
      ) : null}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button
          onClick={handleButtonClick}
          disabled={isAnalyzing}
          className="flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>{selectedImage ? 'Choose Different Photo' : 'Choose File'}</span>
        </Button>
        
        {selectedImage && (
          <Button
            onClick={handleClear}
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
    </>
  );
};

export default UploadControls;
