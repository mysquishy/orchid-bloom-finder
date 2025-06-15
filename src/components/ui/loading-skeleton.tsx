
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className, children }) => {
  return (
    <div className={cn('animate-pulse bg-gray-200 rounded', className)}>
      {children}
    </div>
  );
};

export default LoadingSkeleton;
