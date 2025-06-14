
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import OrchidCard from './OrchidCard';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedSubfamily, setSelectedSubfamily] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [userCollection, setUserCollection] = useState<Set<string>>(new Set());

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

  // Filter orchids based on search and filters
  const filteredOrchids = orchids.filter(orchid => {
    const matchesSearch = 
      orchid.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orchid.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orchid.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty = selectedDifficulty === 'all' || orchid.care_difficulty === selectedDifficulty;
    const matchesSubfamily = selectedSubfamily === 'all' || orchid.subfamily === selectedSubfamily;

    return matchesSearch && matchesDifficulty && matchesSubfamily;
  });

  // Get unique subfamilies for filter
  const subfamilies = Array.from(new Set(orchids.map(o => o.subfamily).filter(Boolean)));

  const handleToggleCollection = () => {
    // Refetch collection data
    window.location.reload(); // Simple refresh for now
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

        {/* Search and Filters */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Search Input */}
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by name, species, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Difficulty Filter */}
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              {/* Subfamily Filter */}
              <div>
                <select
                  value={selectedSubfamily}
                  onChange={(e) => setSelectedSubfamily(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Subfamilies</option>
                  {subfamilies.map(subfamily => (
                    <option key={subfamily} value={subfamily}>
                      {subfamily}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Showing {filteredOrchids.length} of {orchids.length} orchids
                </span>
              </div>
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
          </CardContent>
        </Card>

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
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedDifficulty('all');
              setSelectedSubfamily('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrchidDatabase;
