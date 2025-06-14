
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Flower, Search, Camera, Heart, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  illustration
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="mb-6"
      >
        {illustration ? (
          illustration
        ) : (
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
        )}
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="text-xl font-semibold text-gray-900 mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="text-gray-600 max-w-md mb-6"
      >
        {description}
      </motion.p>
      
      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button
            onClick={onAction}
            className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700"
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export const NoOrchidsFound = ({ onReset }: { onReset?: () => void }) => (
  <EmptyState
    icon={<Search className="w-12 h-12 text-green-500" />}
    title="No orchids found"
    description="We couldn't find any orchids matching your search criteria. Try adjusting your filters or search terms."
    actionLabel="Clear Filters"
    onAction={onReset}
  />
);

export const EmptyGarden = ({ onAddOrchid }: { onAddOrchid?: () => void }) => (
  <EmptyState
    icon={<Heart className="w-12 h-12 text-pink-500" />}
    title="Your garden is empty"
    description="Start building your orchid collection by exploring our database and saving your favorite species."
    actionLabel="Explore Orchids"
    onAction={onAddOrchid}
  />
);

export const NoSearchResults = () => (
  <EmptyState
    icon={<Sparkles className="w-12 h-12 text-purple-500" />}
    title="Start your orchid journey"
    description="Use the search filters above to discover beautiful orchid species and learn about their care requirements."
  />
);

export const CameraNotAvailable = ({ onUpload }: { onUpload?: () => void }) => (
  <EmptyState
    icon={<Camera className="w-12 h-12 text-blue-500" />}
    title="Camera not available"
    description="Unable to access your camera. You can still upload photos from your device to identify orchids."
    actionLabel="Upload Photo"
    onAction={onUpload}
  />
);

export default EmptyState;
