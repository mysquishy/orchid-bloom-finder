
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Droplets, Scissors, Flower, Heart, Edit, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GardenDashboard from './GardenDashboard';
import CareCalendar from './CareCalendar';

interface UserOrchidCollection {
  id: string;
  orchid_species_id: string;
  identification_id?: string;
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
  identifications?: {
    id: string;
    image_url: string;
    orchid_species: string;
    confidence_score: number;
    created_at: string;
  };
}

const MyGarden: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('dashboard');

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
          ),
          identifications:identification_id (
            id,
            image_url,
            orchid_species,
            confidence_score,
            created_at
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

  const handleTaskComplete = (taskId: string) => {
    // Parse task ID to extract orchid ID and action
    const [action, orchidId] = taskId.split('-');
    const orchid = gardenOrchids.find(o => o.id === orchidId);
    
    if (orchid && ['water', 'fertilize', 'repot'].includes(action)) {
      const actionMap = { water: 'watered', fertilize: 'fertilized', repot: 'repotted' };
      updateCareAction(orchid.id, actionMap[action as keyof typeof actionMap] as any);
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

  // Function to get the best image to display
  const getOrchidImage = (item: UserOrchidCollection) => {
    // Priority: User's uploaded image > Species stock image > Fallback
    if (item.identifications?.image_url) {
      return item.identifications.image_url;
    }
    return item.orchid_species.high_quality_image_urls?.[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96';
  };

  // Calculate dashboard stats
  const stats = {
    totalOrchids: gardenOrchids.length,
    bloomingOrchids: gardenOrchids.filter(o => o.current_bloom_status === 'blooming').length,
    healthyOrchids: gardenOrchids.filter(o => 
      o.current_bloom_status === 'blooming' || o.current_bloom_status === 'growing'
    ).length,
    needsAttention: gardenOrchids.filter(o => {
      const lastWatered = o.last_watered ? new Date(o.last_watered) : null;
      const needsWater = !lastWatered || (Date.now() - lastWatered.getTime()) > (7 * 24 * 60 * 60 * 1000);
      return needsWater || o.current_bloom_status === 'dormant';
    }).length,
    careStreak: 5, // This would be calculated based on consistent care
    completedTasks: 12, // This would be tracked in a separate table
    upcomingTasks: 3
  };

  // Generate recent activity (mock data for now)
  const recentActivity = gardenOrchids.slice(0, 5).map((orchid, index) => ({
    id: `activity-${index}`,
    action: 'Watered',
    orchidName: orchid.orchid_species.common_name,
    date: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
    type: 'watering' as const
  }));

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
                Start building your collection by identifying orchids with our camera feature.
              </p>
              <Button onClick={() => window.location.href = '/'}>
                Identify Your First Orchid
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="calendar">Care Calendar</TabsTrigger>
              <TabsTrigger value="collection">My Collection</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <GardenDashboard stats={stats} recentActivity={recentActivity} />
            </TabsContent>

            <TabsContent value="calendar">
              <CareCalendar orchids={gardenOrchids} onTaskComplete={handleTaskComplete} />
            </TabsContent>

            <TabsContent value="collection">
              {/* Garden Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gardenOrchids.map((item) => (
                  <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-green-200 overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg group">
                        <img
                          src={getOrchidImage(item)}
                          alt={item.orchid_species.common_name}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96';
                          }}
                        />
                        
                        {/* Gradient overlay for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        
                        {/* Image Source Indicator */}
                        <div className="absolute top-3 left-3">
                          {item.identifications?.image_url ? (
                            <Badge className="bg-blue-500/90 text-white border-blue-400 text-xs backdrop-blur-sm">
                              <Camera className="w-3 h-3 mr-1" />
                              Your Photo
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-500/90 text-white border-gray-400 text-xs backdrop-blur-sm">
                              Stock Photo
                            </Badge>
                          )}
                        </div>

                        {/* Bloom Status Badge */}
                        <div className="absolute top-3 right-3">
                          <Badge className={`${getBloomStatusColor(item.current_bloom_status)} backdrop-blur-sm`}>
                            {item.current_bloom_status || 'growing'}
                          </Badge>
                        </div>

                        {/* Identification Info */}
                        {item.identifications && (
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="bg-black/70 text-white text-xs p-3 rounded-lg backdrop-blur-sm">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Identified: {(item.identifications.confidence_score * 100).toFixed(0)}% confidence</span>
                                <span className="text-gray-200">{new Date(item.identifications.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="p-5">
                      <div className="mb-4">
                        <h3 className="font-bold text-xl text-gray-900 mb-1">
                          {item.orchid_species.common_name}
                        </h3>
                        <p className="text-sm italic text-gray-600 mb-1">
                          {item.orchid_species.scientific_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Added {new Date(item.date_added).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Care Status */}
                      <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                        <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg transition-colors hover:bg-blue-100">
                          <Droplets className="w-5 h-5 text-blue-600 mb-2" />
                          <span className="text-gray-600 font-medium">
                            {item.last_watered ? new Date(item.last_watered).toLocaleDateString() : 'Never'}
                          </span>
                          <span className="text-gray-400 text-xs">Watered</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg transition-colors hover:bg-green-100">
                          <Flower className="w-5 h-5 text-green-600 mb-2" />
                          <span className="text-gray-600 font-medium">
                            {item.last_fertilized ? new Date(item.last_fertilized).toLocaleDateString() : 'Never'}
                          </span>
                          <span className="text-gray-400 text-xs">Fed</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg transition-colors hover:bg-purple-100">
                          <Scissors className="w-5 h-5 text-purple-600 mb-2" />
                          <span className="text-gray-600 font-medium">
                            {item.last_repotted ? new Date(item.last_repotted).toLocaleDateString() : 'Never'}
                          </span>
                          <span className="text-gray-400 text-xs">Repotted</span>
                        </div>
                      </div>

                      {/* Care Actions */}
                      <div className="flex gap-2 mb-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs hover:bg-blue-50 hover:border-blue-200"
                          onClick={() => updateCareAction(item.id, 'watered')}
                        >
                          <Droplets className="w-4 h-4 mr-1" />
                          Water
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs hover:bg-green-50 hover:border-green-200"
                          onClick={() => updateCareAction(item.id, 'fertilized')}
                        >
                          <Flower className="w-4 h-4 mr-1" />
                          Feed
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs hover:bg-purple-50 hover:border-purple-200"
                          onClick={() => updateCareAction(item.id, 'repotted')}
                        >
                          <Scissors className="w-4 h-4 mr-1" />
                          Repot
                        </Button>
                      </div>

                      {/* Care Notes */}
                      {item.care_notes && (
                        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border-l-4 border-green-400">
                          <strong className="text-gray-800">Notes:</strong> {item.care_notes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default MyGarden;
