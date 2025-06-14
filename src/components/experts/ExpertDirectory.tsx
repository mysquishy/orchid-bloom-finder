
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Search, Clock, Award, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Expert {
  id: string;
  name: string;
  title: string;
  bio: string;
  credentials: string[];
  specializations: string[];
  years_experience: number;
  hourly_rate_cents: number;
  profile_image_url: string;
  is_verified: boolean;
}

const ExpertDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const { toast } = useToast();

  const { data: experts = [], isLoading } = useQuery({
    queryKey: ['experts', searchTerm, selectedSpecialization],
    queryFn: async () => {
      let query = supabase
        .from('experts')
        .select('*')
        .eq('is_verified', true)
        .eq('is_active', true);

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,title.ilike.%${searchTerm}%,specializations.cs.{${searchTerm}}`);
      }

      if (selectedSpecialization) {
        query = query.contains('specializations', [selectedSpecialization]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });

  const { data: expertRatings = {} } = useQuery({
    queryKey: ['expert-ratings', experts.map(e => e.id)],
    queryFn: async () => {
      const ratings: Record<string, { average: number; total: number }> = {};
      
      for (const expert of experts) {
        const { data } = await supabase.rpc('get_expert_rating', {
          expert_id_param: expert.id
        });
        
        if (data?.[0]) {
          ratings[expert.id] = {
            average: parseFloat(data[0].average_rating.toString()) || 0,
            total: data[0].total_reviews || 0
          };
        }
      }
      
      return ratings;
    },
    enabled: experts.length > 0
  });

  const allSpecializations = [...new Set(experts.flatMap(e => e.specializations || []))];

  const handleBookConsultation = (expertId: string) => {
    // Navigate to booking page or open booking modal
    toast({
      title: "Booking System",
      description: "Consultation booking will be implemented next.",
    });
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading experts..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Expert <span className="text-green-600">Botanists</span>
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Get personalized advice from verified orchid experts
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search experts by name, title, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          >
            <option value="">All Specializations</option>
            {allSpecializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expert Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => {
          const rating = expertRatings[expert.id] || { average: 0, total: 0 };
          
          return (
            <Card key={expert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={expert.profile_image_url} alt={expert.name} />
                    <AvatarFallback className="text-lg">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  {expert.name}
                  {expert.is_verified && (
                    <Award className="w-5 h-5 text-blue-500" />
                  )}
                </CardTitle>
                <p className="text-gray-600">{expert.title}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rating.average)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {rating.average.toFixed(1)} ({rating.total} reviews)
                  </span>
                </div>

                {/* Experience */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{expert.years_experience} years experience</span>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap justify-center gap-1">
                  {expert.specializations?.slice(0, 3).map((spec) => (
                    <Badge key={spec} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {expert.specializations?.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{expert.specializations.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 line-clamp-3">
                  {expert.bio}
                </p>

                {/* Pricing */}
                <div className="text-center">
                  <span className="text-lg font-semibold text-green-600">
                    ${(expert.hourly_rate_cents / 100).toFixed(0)}/hour
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleBookConsultation(expert.id)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Book Consultation
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {experts.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No experts found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or check back later for new experts.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpertDirectory;
