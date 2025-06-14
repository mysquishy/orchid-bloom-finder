
import React from 'react';
import { Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PremiumBadgeProps {
  variant?: 'default' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ 
  variant = 'gradient', 
  size = 'md',
  showIcon = true,
  className = ''
}) => {
  const baseClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  const variantClasses = {
    default: 'bg-purple-600 text-white',
    outline: 'border-purple-600 text-purple-600',
    gradient: 'bg-gradient-to-r from-green-500 to-purple-600 text-white border-0'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <Badge 
      className={`
        ${baseClasses[size]} 
        ${variantClasses[variant]} 
        ${className}
        inline-flex items-center gap-1 font-semibold
      `}
    >
      {showIcon && <Crown className={iconSizes[size]} />}
      Premium
    </Badge>
  );
};

export default PremiumBadge;
