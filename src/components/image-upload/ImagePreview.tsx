
import React from 'react';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import LoadingSkeleton from '@/components/ui/loading-skeleton';

interface ImagePreviewProps {
  selectedImage: File;
  isAnalyzing: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ selectedImage, isAnalyzing }) => {
  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="relative">
        {imageLoading && (
          <LoadingSkeleton className="w-full h-64 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </LoadingSkeleton>
        )}
        
        {imageError ? (
          <div className="w-full h-64 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Failed to load image</p>
            </div>
          </div>
        ) : (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected plant"
            className={`max-w-full h-64 object-cover rounded-lg mx-auto transition-opacity duration-200 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        )}
      </div>
      
      {isAnalyzing && (
        <div className="flex items-center justify-center space-x-2 p-4 bg-blue-50 rounded-lg">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-blue-800 font-medium">Analyzing your plant...</span>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
