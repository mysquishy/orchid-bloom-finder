
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file.name, file.size, file.type);

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

    // Clear the input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    onImageSelect(file);
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
          onClick={() => fileInputRef.current?.click()}
          disabled={isAnalyzing}
          className="flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>{selectedImage ? 'Choose Different Photo' : 'Choose File'}</span>
        </Button>
        
        {selectedImage && (
          <Button
            onClick={onClear}
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
