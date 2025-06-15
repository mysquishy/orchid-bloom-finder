
import React from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface GlobalLoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

const GlobalLoadingState: React.FC<GlobalLoadingStateProps> = ({ 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default GlobalLoadingState;
