
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, Users, Clock, Plus, Search } from 'lucide-react';

interface MeetupEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  max_attendees: number;
  attendee_count: number;
  status: string;
  created_at: string;
  organizer: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
  local_societies?: {
    name: string;
    location: string;
  };
}

interface LocalSociety {
  id: string;
  name: string;
  description: string;
  location: string;
  member_count: number;
  website_url: string;
  created_at: string;
}

const CommunityEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'societies'>('events');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['meetup-events', searchTerm, locationFilter],
    queryFn: async () => {
      let query = supabase
        .from('meetup_events')
        .select(`
          *,
          organizer:profiles!organizer_id (first_name, last_name, avatar_url),
          local_societies (name, location)
        `)
        .gte('event_date', new Date().toISOString());

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      if (locationFilter) {
        query = query.ilike('location', `%${locationFilter}%`);
      }

      const { data, error } = await query
        .order('event_date', { ascending: true })
        .limit(20);

      if (error) throw error;
      return data as MeetupEvent[];
    },
    enabled: activeTab === 'events'
  });

  const { data: societies, isLoading: societiesLoading } = useQuery({
    queryKey: ['local-societies', searchTerm, locationFilter],
    queryFn: async () => {
      let query = supabase
        .from('local_societies')
        .select('*');

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      if (locationFilter) {
        query = query.ilike('location', `%${locationFilter}%`);
      }

      const { data, error } = await query
        .order('member_count', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as LocalSociety[];
    },
    enabled: activeTab === 'societies'
  });

  const getEventStatusColor = (status: string, date: string) => {
    const eventDate = new Date(date);
    const now = new Date();
    
    if (eventDate < now) return 'bg-gray-100 text-gray-800';
    if (status === 'ongoing') return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  const formatEventDate = (date: string) => {
    const eventDate = new Date(date);
    return {
      date: eventDate.toLocaleDateString(),
      time: eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Community Events & Societies</h2>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {activeTab === 'events' ? 'Create Event' : 'Register Society'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tab Navigation */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'events' ? 'default' : 'outline'}
              onClick={() => setActiveTab('events')}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Events
            </Button>
            <Button
              variant={activeTab === 'societies' ? 'default' : 'outline'}
              onClick={() => setActiveTab('societies')}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Local Societies
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsLoading ? (
            <div className="col-span-full flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              {events?.map((event) => {
                const { date, time } = formatEventDate(event.event_date);
                return (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge className={getEventStatusColor(event.status, event.event_date)}>
                          {event.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm font-medium">{date}</p>
                          <p className="text-xs text-gray-500">{time}</p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          {event.attendee_count} / {event.max_attendees || '∞'} attendees
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={event.organizer.avatar_url} />
                          <AvatarFallback>
                            {event.organizer.first_name?.[0]}{event.organizer.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {event.organizer.first_name} {event.organizer.last_name}
                          </p>
                          {event.local_societies && (
                            <p className="text-xs text-gray-500">{event.local_societies.name}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button size="sm" className="flex-1">
                          Join Event
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {events && events.length === 0 && (
                <div className="col-span-full">
                  <Card>
                    <CardContent className="text-center py-12">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events</h3>
                      <p className="text-gray-500 mb-4">Be the first to organize an orchid meetup in your area</p>
                      <Button>Create Event</Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Societies Tab */}
      {activeTab === 'societies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {societiesLoading ? (
            <div className="col-span-full flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              {societies?.map((society) => (
                <Card key={society.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{society.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {society.location}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {society.description && (
                      <p className="text-sm text-gray-600 line-clamp-3">{society.description}</p>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{society.member_count} members</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        Since {new Date(society.created_at).getFullYear()}
                      </div>
                    </div>

                    {society.website_url && (
                      <div className="pt-2">
                        <a
                          href={society.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Visit Website →
                        </a>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm" className="flex-1">
                        Join Society
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {societies && societies.length === 0 && (
                <div className="col-span-full">
                  <Card>
                    <CardContent className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No societies found</h3>
                      <p className="text-gray-500 mb-4">Start the first orchid society in your area</p>
                      <Button>Register Society</Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityEvents;
