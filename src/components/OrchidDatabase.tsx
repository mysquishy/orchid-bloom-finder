
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import OrchidCard from './OrchidCard';
import OrchidSearch from './OrchidSearch';

interface OrchidSpecies {
  id: string;
  scientific_name: string;
  common_name: string;
  subfamily?: string;
  description: string;
  native_region: string;
  bloom_time: string;
  flower_colors: string[];
  care_difficulty: 'beginner' | 'intermediate' | 'expert';
  light_requirements: string;
  water_frequency: string;
  humidity_needs: string;
  temperature_range: string;
  fertilizer_schedule: string;
  repotting_frequency: string;
  growing_medium: string;
  common_diseases?: string[];
  care_tips?: string[];
  high_quality_image_urls?: string[];
  is_popular: boolean;
}

const OrchidDatabase: React.FC = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [userCollection, setUserCollection] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    searchTerm: '',
    difficulty: 'all',
    lightRequirements: 'all',
    bloomingSeason: 'all',
    flowerColors: [] as string[],
    nativeRegion: 'all',
    subfamily: 'all'
  });

  // Fetch orchid species
  const { data: orchids = [], isLoading } = useQuery({
    queryKey: ['orchid-species'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orchid_species')
        .select('*')
        .order('is_popular', { ascending: false })
        .order('common_name');

      if (error) throw error;
      return data as OrchidSpecies[];
    },
  });

  // Fetch user's collection
  const { data: collection } = useQuery({
    queryKey: ['user-orchid-collection', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_orchid_collection')
        .select('orchid_species_id')
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (collection) {
      setUserCollection(new Set(collection.map(item => item.orchid_species_id)));
    }
  }, [collection]);

  // Advanced filtering logic
  const filteredOrchids = orchids.filter(orchid => {
    // Search term filter
    const searchLower = filters.searchTerm.toLowerCase();
    const matchesSearch = !searchLower || 
      orchid.common_name.toLowerCase().includes(searchLower) ||
      orchid.scientific_name.toLowerCase().includes(searchLower) ||
      orchid.description.toLowerCase().includes(searchLower) ||
      orchid.care_difficulty.toLowerCase().includes(searchLower) ||
      orchid.light_requirements.toLowerCase().includes(searchLower) ||
      orchid.native_region.toLowerCase().includes(searchLower) ||
      (orchid.care_tips?.some(tip => tip.toLowerCase().includes(searchLower)));

    // Basic filters
    const matchesDifficulty = filters.difficulty === 'all' || orchid.care_difficulty === filters.difficulty;
    const matchesSubfamily = filters.subfamily === 'all' || orchid.subfamily === filters.subfamily;
    
    // Light requirements filter
    const matchesLight = filters.lightRequirements === 'all' || 
      orchid.light_requirements.toLowerCase().includes(filters.lightRequirements.toLowerCase());
    
    // Native region filter
    const matchesRegion = filters.nativeRegion === 'all' || 
      orchid.native_region.includes(filters.nativeRegion);
    
    // Blooming season filter
    const matchesSeason = filters.bloomingSeason === 'all' || 
      orchid.bloom_time.toLowerCase().includes(filters.bloomingSeason.toLowerCase()) ||
      (filters.bloomingSeason === 'year-round' && orchid.bloom_time.toLowerCase().includes('year'));
    
    // Flower colors filter
    const matchesColors = filters.flowerColors.length === 0 || 
      filters.flowerColors.some(color => 
        orchid.flower_colors.some(orchidColor => 
          orchidColor.toLowerCase().includes(color.toLowerCase())
        )
      );

    return matchesSearch && matchesDifficulty && matchesSubfamily && 
           matchesLight && matchesRegion && matchesSeason && matchesColors;
  });

  const handleToggleCollection = () => {
    // Refetch collection data
    window.location.reload(); // Simple refresh for now
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      difficulty: 'all',
      lightRequirements: 'all',
      bloomingSeason: 'all',
      flowerColors: [],
      nativeRegion: 'all',
      subfamily: 'all'
    });
  };

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
            Orchid <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">Database</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Explore our comprehensive collection of {orchids.length}+ orchid species with detailed care guides.
          </p>
        </div>

        {/* Advanced Search Component */}
        <OrchidSearch
          filters={filters}
          onFiltersChange={setFilters}
          orchidCount={filteredOrchids.length}
          totalCount={orchids.length}
          onClearFilters={clearFilters}
        />

        {/* View Mode Toggle */}
        <div className="flex justify-end items-center mb-6">
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Orchid Grid/List */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
        }>
          {filteredOrchids.map((orchid) => (
            <OrchidCard
              key={orchid.id}
              orchid={orchid}
              isInCollection={userCollection.has(orchid.id)}
              onToggleCollection={handleToggleCollection}
            />
          ))}
        </div>

        {filteredOrchids.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No orchids match your search criteria.</p>
            <Button onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrchidDatabase;
