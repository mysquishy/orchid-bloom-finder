
import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  gradient?: boolean;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  isLoading = false,
  loadingText = "Loading...",
  icon,
  gradient = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          gradient && "bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        <motion.div
          className="flex items-center gap-2"
          initial={false}
          animate={{ opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
          ) : icon ? (
            icon
          ) : null}
          <span>{isLoading ? loadingText : children}</span>
        </motion.div>
      </Button>
    </motion.div>
  );
};
