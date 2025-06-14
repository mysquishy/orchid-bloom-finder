
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Filter,
  GraduationCap,
  Video,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  duration_hours: number;
  price_cents: number;
  max_participants: number;
  course_type: string;
  is_premium_only: boolean;
  thumbnail_url: string;
  expert: {
    name: string;
    profile_image_url: string;
    title: string;
  };
}

const ExpertCourses: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const { user } = useAuth();
  const { hasAccess } = usePremiumAccess();
  const { toast } = useToast();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['expert-courses', selectedType, selectedDifficulty],
    queryFn: async () => {
      let query = supabase
        .from('expert_courses')
        .select(`
          *,
          expert:experts(name, profile_image_url, title)
        `)
        .eq('is_published', true);

      if (selectedType) {
        query = query.eq('course_type', selectedType);
      }

      if (selectedDifficulty) {
        query = query.eq('difficulty_level', selectedDifficulty);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: ['my-enrollments'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('course_enrollments')
        .select('course_id, progress_percentage, completed_at')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  const handleEnroll = async (courseId: string, isPremiumOnly: boolean) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to enroll in courses.",
        variant: "destructive",
      });
      return;
    }

    if (isPremiumOnly && !hasAccess) {
      toast({
        title: "Premium Required",
        description: "This course is only available to premium subscribers.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('course_enrollments')
        .insert([{
          user_id: user.id,
          course_id: courseId
        }]);

      if (error) throw error;

      toast({
        title: "Enrolled Successfully!",
        description: "You have been enrolled in the course.",
      });
    } catch (error) {
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling in the course.",
        variant: "destructive",
      });
    }
  };

  const getEnrollmentStatus = (courseId: string) => {
    return enrollments.find(e => e.course_id === courseId);
  };

  const courseTypes = [
    { value: 'webinar', label: 'Webinars', icon: Video },
    { value: 'workshop', label: 'Workshops', icon: Users },
    { value: 'course', label: 'Courses', icon: BookOpen },
    { value: 'certification', label: 'Certifications', icon: Award }
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'advanced', label: 'Advanced', color: 'bg-red-100 text-red-800' }
  ];

  if (isLoading) {
    return <LoadingSpinner text="Loading courses..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Expert <span className="text-green-600">Courses</span>
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Learn from certified orchid experts through interactive courses and workshops
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="">All Types</option>
            {courseTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="">All Levels</option>
            {difficultyLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const enrollment = getEnrollmentStatus(course.id);
          const CourseIcon = courseTypes.find(t => t.value === course.course_type)?.icon || BookOpen;
          const difficultyStyle = difficultyLevels.find(d => d.value === course.difficulty_level)?.color || 'bg-gray-100 text-gray-800';

          return (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CourseIcon className="w-5 h-5 text-green-600" />
                    <Badge variant="outline" className="capitalize">
                      {course.course_type}
                    </Badge>
                  </div>
                  <Badge className={`${difficultyStyle} capitalize`}>
                    {course.difficulty_level}
                  </Badge>
                </div>
                
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                
                {/* Expert Info */}
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={course.expert.profile_image_url} />
                    <AvatarFallback className="text-xs">
                      {course.expert.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{course.expert.name}</p>
                    <p className="text-xs text-gray-600">{course.expert.title}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {course.description}
                </p>

                {/* Course Details */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration_hours}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Max {course.max_participants}</span>
                  </div>
                </div>

                {/* Premium Badge */}
                {course.is_premium_only && (
                  <Badge className="bg-purple-100 text-purple-800">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    Premium Only
                  </Badge>
                )}

                {/* Enrollment Status */}
                {enrollment && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-green-800">Enrolled</span>
                      <span className="text-sm text-green-600">
                        {enrollment.progress_percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${enrollment.progress_percentage}%` }}
                      />
                    </div>
                    {enrollment.completed_at && (
                      <Badge className="mt-2 bg-green-600">
                        <Award className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                )}

                {/* Pricing and Action */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-lg font-semibold text-green-600">
                    ${(course.price_cents / 100).toFixed(2)}
                  </div>
                  
                  {enrollment ? (
                    <Button variant="outline" size="sm">
                      Continue Learning
                    </Button>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => handleEnroll(course.id, course.is_premium_only)}
                      disabled={course.is_premium_only && !hasAccess && !user}
                    >
                      Enroll Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">
            Check back soon for new expert-led courses and workshops.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpertCourses;
