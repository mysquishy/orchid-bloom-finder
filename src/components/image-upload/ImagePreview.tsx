
import React from 'react';
import { Loader2 } from 'lucide-react';

interface ImagePreviewProps {
  selectedImage: File;
  isAnalyzing: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ selectedImage, isAnalyzing }) => {
  return (
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
    </div>
  );
};

export default ImagePreview;
