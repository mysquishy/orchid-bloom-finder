
import React, { createContext, useContext } from 'react';
import { Toaster } from '@/components/ui/toaster';

interface ToastContextType {
  // Toast context can be extended here if needed
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastContext.Provider value={{}}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};
