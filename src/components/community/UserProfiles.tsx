
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Award, MapPin, Calendar } from 'lucide-react';

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  location: string;
  orchid_experience_level: string;
  is_expert: boolean;
  avatar_url: string;
  created_at: string;
  user_orchid_collection: { count: number }[];
  user_achievements: Array<{
    achievement_name: string;
    achievement_type: string;
    earned_at: string;
  }>;
  follower_count: number;
  following_count: number;
}

const UserProfiles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExperience, setFilterExperience] = useState('all');

  const { data: profiles, isLoading } = useQuery({
    queryKey: ['user-profiles', searchTerm, filterExperience],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select(`
          *,
          user_orchid_collection (count),
          user_achievements (achievement_name, achievement_type, earned_at)
        `);

      if (searchTerm) {
        query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
      }

      if (filterExperience !== 'all') {
        query = query.eq('orchid_experience_level', filterExperience);
      }

      const { data, error } = await query.limit(20);
      if (error) throw error;

      // Add follower counts (placeholder for now)
      return (data as any[]).map(profile => ({
        ...profile,
        follower_count: Math.floor(Math.random() * 100),
        following_count: Math.floor(Math.random() * 50)
      })) as UserProfile[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Experience Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles?.map((profile) => (
          <Card key={profile.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-lg">
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {profile.first_name} {profile.last_name}
                  {profile.is_expert && (
                    <Badge variant="default" className="ml-2">Expert</Badge>
                  )}
                </h3>
                <Badge variant="outline" className="capitalize">
                  {profile.orchid_experience_level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.bio && (
                <p className="text-sm text-gray-600 line-clamp-3">{profile.bio}</p>
              )}
              
              {profile.location && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </div>
              )}

              <div className="flex justify-between text-sm">
                <div className="text-center">
                  <p className="font-semibold">{profile.user_orchid_collection?.[0]?.count || 0}</p>
                  <p className="text-gray-500">Plants</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{profile.follower_count}</p>
                  <p className="text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{profile.following_count}</p>
                  <p className="text-gray-500">Following</p>
                </div>
              </div>

              {profile.user_achievements && profile.user_achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Recent Achievements
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.user_achievements.slice(0, 3).map((achievement, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {achievement.achievement_name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button size="sm" className="flex-1">Follow</Button>
                <Button size="sm" variant="outline" className="flex-1">Message</Button>
              </div>

              <div className="text-xs text-gray-400 flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                Joined {new Date(profile.created_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {profiles && profiles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserProfiles;
