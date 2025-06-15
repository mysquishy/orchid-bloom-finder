
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Check, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface IdentificationResult {
  id?: string;
  species: string;
  commonName: string;
  confidence: number;
  description: string;
  careInstructions: string[];
  characteristics: string[];
}

interface IdentificationResultProps {
  result: IdentificationResult;
  isSaving: boolean;
  isSavedToCollection: boolean;
  onSaveToCollection: () => void;
}

const IdentificationResultComponent: React.FC<IdentificationResultProps> = ({
  result,
  isSaving,
  isSavedToCollection,
  onSaveToCollection
}) => {
  const { user } = useAuth();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-left">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-green-900 text-xl">
          {result.species}
        </h3>
        <span className={`text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
          {Math.round(result.confidence * 100)}% confident
        </span>
      </div>
      
      <p className="text-green-800 mb-2 text-lg">{result.commonName}</p>
      <p className="text-gray-700 mb-4">{result.description}</p>
      
      {/* Care Instructions Preview */}
      <div className="bg-white rounded-lg p-4 mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Quick Care Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {result.careInstructions.slice(0, 3).map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Save to Collection Button */}
      {user && result.id && (
        <Button
          onClick={onSaveToCollection}
          disabled={isSaving || isSavedToCollection}
          className={`w-full ${isSavedToCollection ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : isSavedToCollection ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved to Garden!
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 mr-2" />
              Save to My Garden
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default IdentificationResultComponent;
