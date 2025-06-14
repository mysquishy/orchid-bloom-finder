
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Clock, Gift, Repeat, DollarSign, Plus, Filter } from 'lucide-react';

interface PlantTrade {
  id: string;
  title: string;
  description: string;
  trade_type: string;
  location: string;
  image_urls: string[];
  status: string;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
    avatar_url: string;
    location: string;
  };
  orchid_species?: {
    common_name: string;
    scientific_name: string;
  };
}

const PlantTrading: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('');

  const { data: trades, isLoading } = useQuery({
    queryKey: ['plant-trades', searchTerm, filterType, filterLocation],
    queryFn: async () => {
      let query = supabase
        .from('plant_trades')
        .select(`
          *,
          profiles (first_name, last_name, avatar_url, location),
          orchid_species (common_name, scientific_name)
        `)
        .eq('status', 'active');

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      if (filterType !== 'all') {
        query = query.eq('trade_type', filterType);
      }

      if (filterLocation) {
        query = query.ilike('location', `%${filterLocation}%`);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as PlantTrade[];
    }
  });

  const tradeTypes = [
    { value: 'all', label: 'All Types', icon: Filter },
    { value: 'trade', label: 'Trade', icon: Repeat },
    { value: 'gift', label: 'Gift', icon: Gift },
    { value: 'sell', label: 'Sell', icon: DollarSign }
  ];

  const getTradeTypeIcon = (type: string) => {
    switch (type) {
      case 'trade': return Repeat;
      case 'gift': return Gift;
      case 'sell': return DollarSign;
      default: return Repeat;
    }
  };

  const getTradeTypeColor = (type: string) => {
    switch (type) {
      case 'trade': return 'bg-blue-100 text-blue-800';
      case 'gift': return 'bg-green-100 text-green-800';
      case 'sell': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Plant Trading & Exchange</h2>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Listing
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Filter by location..."
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              {tradeTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Trade Type Quick Filters */}
          <div className="flex gap-2 flex-wrap">
            {tradeTypes.slice(1).map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.value}
                  variant={filterType === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(filterType === type.value ? 'all' : type.value)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {type.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Trades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trades?.map((trade) => {
          const TradeIcon = getTradeTypeIcon(trade.trade_type);
          return (
            <Card key={trade.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={trade.profiles.avatar_url} />
                      <AvatarFallback>
                        {trade.profiles.first_name?.[0]}{trade.profiles.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">
                        {trade.profiles.first_name} {trade.profiles.last_name}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {trade.profiles.location || trade.location}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${getTradeTypeColor(trade.trade_type)} flex items-center gap-1`}>
                    <TradeIcon className="w-3 h-3" />
                    {trade.trade_type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{trade.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{trade.description}</p>
                </div>

                {trade.orchid_species && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-sm">{trade.orchid_species.common_name}</p>
                    <p className="text-xs text-gray-600 italic">
                      {trade.orchid_species.scientific_name}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(trade.created_at).toLocaleDateString()}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {trade.status}
                  </Badge>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button size="sm" className="flex-1">
                    Contact
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {trades && trades.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Repeat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or be the first to create a listing</p>
            <Button>Create First Listing</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlantTrading;
