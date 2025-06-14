
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidationMessageProps {
  message?: string;
  type?: 'error' | 'success' | 'warning';
  className?: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  message,
  type = 'error',
  className
}) => {
  if (!message) return null;

  const icons = {
    error: <AlertCircle className="w-4 h-4" />,
    success: <CheckCircle className="w-4 h-4" />,
    warning: <AlertCircle className="w-4 h-4" />
  };

  const styles = {
    error: 'text-red-600 bg-red-50 border-red-200',
    success: 'text-green-600 bg-green-50 border-green-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md border text-sm',
          styles[type],
          className
        )}
      >
        {icons[type]}
        <span>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
};

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  warning?: string;
  required?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  error,
  success,
  warning,
  required,
  className,
  ...props
}) => {
  const hasError = !!error;
  const hasSuccess = !!success;
  const hasWarning = !!warning;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        className={cn(
          'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors',
          hasError && 'border-red-300 focus:border-red-500 focus:ring-red-500',
          hasSuccess && 'border-green-300 focus:border-green-500 focus:ring-green-500',
          hasWarning && 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500',
          !hasError && !hasSuccess && !hasWarning && 'border-gray-300 focus:border-green-500 focus:ring-green-500',
          className
        )}
        {...props}
      />
      
      <ValidationMessage message={error} type="error" />
      <ValidationMessage message={success} type="success" />
      <ValidationMessage message={warning} type="warning" />
    </div>
  );
};
