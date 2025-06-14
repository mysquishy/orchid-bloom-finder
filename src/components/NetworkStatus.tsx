
import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { Card } from '@/components/ui/card';
import { WifiOff, Wifi } from 'lucide-react';

const NetworkStatus: React.FC = () => {
  const { isOnline } = useNetworkStatus();

  if (isOnline) return null;

  return (
    <Card className="fixed top-20 left-4 right-4 z-50 bg-red-50 border-red-200">
      <div className="flex items-center justify-center p-3 text-red-800">
        <WifiOff className="w-5 h-5 mr-2" />
        <span className="font-medium">You're offline. Some features may not work.</span>
      </div>
    </Card>
  );
};

export default NetworkStatus;
