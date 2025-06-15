
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
  const [imageUrl, setImageUrl] = React.useState<string>('');

  React.useEffect(() => {
    // Create object URL for the selected image
    try {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);
      setImageError(false);
      setImageLoading(true);

      // Cleanup function to revoke the object URL
      return () => {
        URL.revokeObjectURL(url);
      };
    } catch (error) {
      console.error('Error creating object URL:', error);
      setImageError(true);
      setImageLoading(false);
    }
  }, [selectedImage]);

  const handleImageLoad = () => {
    console.log('Image loaded successfully');
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error('Error loading image');
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        {imageLoading && !imageError && (
          <LoadingSkeleton className="w-full h-64 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </LoadingSkeleton>
        )}
        
        {imageError ? (
          <div className="w-full h-64 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Failed to load image</p>
              <p className="text-xs text-gray-500 mt-1">Please try a different image</p>
            </div>
          </div>
        ) : (
          imageUrl && (
            <img
              src={imageUrl}
              alt="Selected plant"
              className={`max-w-full h-64 object-cover rounded-lg mx-auto transition-opacity duration-200 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )
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
