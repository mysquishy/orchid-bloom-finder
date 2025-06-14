
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Info, Droplets, Sun, Thermometer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OrchidSpecies {
  id: string;
  scientific_name: string;
  common_name: string;
  description: string;
  flower_colors: string[];
  care_difficulty: 'beginner' | 'intermediate' | 'expert';
  light_requirements: string;
  water_frequency: string;
  temperature_range: string;
  high_quality_image_urls?: string[];
  is_popular: boolean;
}

interface OrchidCardProps {
  orchid: OrchidSpecies;
  isInCollection?: boolean;
  onToggleCollection?: () => void;
}

const OrchidCard: React.FC<OrchidCardProps> = ({ 
  orchid, 
  isInCollection = false, 
  onToggleCollection 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getColorBadgeStyle = (color: string) => {
    const colorMap: { [key: string]: string } = {
      white: 'bg-gray-50 text-gray-700 border-gray-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      brown: 'bg-amber-100 text-amber-800 border-amber-200',
      burgundy: 'bg-red-200 text-red-900 border-red-300',
      cream: 'bg-amber-50 text-amber-700 border-amber-200',
      lavender: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return colorMap[color.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleSaveToGarden = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save orchids to your garden.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isInCollection) {
        const { error } = await supabase
          .from('user_orchid_collection')
          .delete()
          .eq('user_id', user.id)
          .eq('orchid_species_id', orchid.id);

        if (error) throw error;

        toast({
          title: "Removed from Garden",
          description: `${orchid.common_name} has been removed from your garden.`,
        });
      } else {
        const { error } = await supabase
          .from('user_orchid_collection')
          .insert({
            user_id: user.id,
            orchid_species_id: orchid.id,
            current_bloom_status: 'growing'
          });

        if (error) throw error;

        toast({
          title: "Added to Garden",
          description: `${orchid.common_name} has been added to your garden!`,
        });
      }
      
      onToggleCollection?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update your garden. Please try again.",
        variant: "destructive",
      });
    }
  };

  const imageUrl = orchid.high_quality_image_urls?.[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96';

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-white border-green-100">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={orchid.common_name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96';
            }}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {orchid.is_popular && (
              <Badge className="bg-yellow-500 text-white">
                Popular
              </Badge>
            )}
            <Badge className={getDifficultyColor(orchid.care_difficulty)}>
              {orchid.care_difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-900 mb-1">
            {orchid.common_name}
          </h3>
          <p className="text-sm italic text-gray-600">
            {orchid.scientific_name}
          </p>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {orchid.description}
        </p>

        {/* Flower Colors */}
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-600 mb-2">Flower Colors:</p>
          <div className="flex flex-wrap gap-1">
            {orchid.flower_colors.map((color, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`text-xs ${getColorBadgeStyle(color)}`}
              >
                {color}
              </Badge>
            ))}
          </div>
        </div>

        {/* Care Icons */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            <Sun className="w-3 h-3" />
            <span className="truncate">Light</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Droplets className="w-3 h-3" />
            <span className="truncate">Water</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Thermometer className="w-3 h-3" />
            <span className="truncate">Temp</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {/* TODO: Open detail modal */}}
          >
            <Info className="w-4 h-4 mr-1" />
            Details
          </Button>
          <Button
            variant={isInCollection ? "default" : "outline"}
            size="sm"
            onClick={handleSaveToGarden}
            className={isInCollection ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <Heart className={`w-4 h-4 ${isInCollection ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrchidCard;
