
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Droplets, Scissors, Flower, Heart, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserOrchidCollection {
  id: string;
  orchid_species_id: string;
  date_added: string;
  care_notes?: string;
  last_watered?: string;
  last_fertilized?: string;
  last_repotted?: string;
  current_bloom_status?: 'budding' | 'blooming' | 'dormant' | 'growing';
  orchid_species: {
    id: string;
    scientific_name: string;
    common_name: string;
    description: string;
    flower_colors: string[];
    care_difficulty: string;
    water_frequency: string;
    fertilizer_schedule: string;
    repotting_frequency: string;
    high_quality_image_urls?: string[];
  };
}

const MyGarden: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('all');

  const { data: gardenOrchids = [], isLoading, refetch } = useQuery({
    queryKey: ['my-garden', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_orchid_collection')
        .select(`
          *,
          orchid_species:orchid_species_id (
            id,
            scientific_name,
            common_name,
            description,
            flower_colors,
            care_difficulty,
            water_frequency,
            fertilizer_schedule,
            repotting_frequency,
            high_quality_image_urls
          )
        `)
        .eq('user_id', user.id)
        .order('date_added', { ascending: false });

      if (error) throw error;
      return data as UserOrchidCollection[];
    },
    enabled: !!user,
  });

  const updateCareAction = async (collectionId: string, action: 'watered' | 'fertilized' | 'repotted') => {
    const updateData: any = {};
    const today = new Date().toISOString().split('T')[0];

    switch (action) {
      case 'watered':
        updateData.last_watered = today;
        break;
      case 'fertilized':
        updateData.last_fertilized = today;
        break;
      case 'repotted':
        updateData.last_repotted = today;
        break;
    }

    try {
      const { error } = await supabase
        .from('user_orchid_collection')
        .update(updateData)
        .eq('id', collectionId);

      if (error) throw error;

      toast({
        title: "Care Updated",
        description: `Successfully recorded ${action} action.`,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update care record.",
        variant: "destructive",
      });
    }
  };

  const getBloomStatusColor = (status?: string) => {
    switch (status) {
      case 'blooming': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'budding': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'growing': return 'bg-green-100 text-green-800 border-green-200';
      case 'dormant': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const filteredOrchids = gardenOrchids.filter(item => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'blooming') return item.current_bloom_status === 'blooming';
    if (selectedTab === 'needs-care') {
      const today = new Date();
      const lastWatered = item.last_watered ? new Date(item.last_watered) : null;
      const needsWater = !lastWatered || (today.getTime() - lastWatered.getTime()) > (7 * 24 * 60 * 60 * 1000);
      return needsWater;
    }
    return true;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Sign in to view your garden</h2>
          <p className="text-gray-600">Create an account to start collecting and tracking your orchids.</p>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 mb-4">
            My <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">Garden</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Track and care for your {gardenOrchids.length} orchid{gardenOrchids.length !== 1 ? 's' : ''}
          </p>
        </div>

        {gardenOrchids.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your garden is empty</h3>
              <p className="text-gray-600 mb-6">
                Start building your collection by browsing our orchid database and saving your favorites.
              </p>
              <Button onClick={() => window.location.href = '/database'}>
                Browse Orchids
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="all">All Plants ({gardenOrchids.length})</TabsTrigger>
                <TabsTrigger value="blooming">
                  Blooming ({gardenOrchids.filter(o => o.current_bloom_status === 'blooming').length})
                </TabsTrigger>
                <TabsTrigger value="needs-care">Needs Care</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Garden Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrchids.map((item) => (
                <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={item.orchid_species.high_quality_image_urls?.[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96'}
                        alt={item.orchid_species.common_name}
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96';
                        }}
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className={getBloomStatusColor(item.current_bloom_status)}>
                          {item.current_bloom_status || 'growing'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                        {item.orchid_species.common_name}
                      </h3>
                      <p className="text-sm italic text-gray-600">
                        {item.orchid_species.scientific_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Added {new Date(item.date_added).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Care Status */}
                    <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                      <div className="flex flex-col items-center p-2 bg-blue-50 rounded">
                        <Droplets className="w-4 h-4 text-blue-600 mb-1" />
                        <span className="text-gray-600">
                          {item.last_watered ? new Date(item.last_watered).toLocaleDateString() : 'Never'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-green-50 rounded">
                        <Flower className="w-4 h-4 text-green-600 mb-1" />
                        <span className="text-gray-600">
                          {item.last_fertilized ? new Date(item.last_fertilized).toLocaleDateString() : 'Never'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-purple-50 rounded">
                        <Scissors className="w-4 h-4 text-purple-600 mb-1" />
                        <span className="text-gray-600">
                          {item.last_repotted ? new Date(item.last_repotted).toLocaleDateString() : 'Never'}
                        </span>
                      </div>
                    </div>

                    {/* Care Actions */}
                    <div className="flex gap-1 mb-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={() => updateCareAction(item.id, 'watered')}
                      >
                        <Droplets className="w-3 h-3 mr-1" />
                        Water
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={() => updateCareAction(item.id, 'fertilized')}
                      >
                        <Flower className="w-3 h-3 mr-1" />
                        Feed
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={() => updateCareAction(item.id, 'repotted')}
                      >
                        <Scissors className="w-3 h-3 mr-1" />
                        Repot
                      </Button>
                    </div>

                    {/* Care Notes */}
                    {item.care_notes && (
                      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        <strong>Notes:</strong> {item.care_notes}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyGarden;
