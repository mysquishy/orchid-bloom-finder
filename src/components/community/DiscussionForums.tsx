
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Clock, Pin, Lock, Search, Plus } from 'lucide-react';

interface Forum {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
  post_count: number;
  created_at: string;
  orchid_species?: {
    common_name: string;
    scientific_name: string;
  };
}

interface ForumTopic {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  is_locked: boolean;
  reply_count: number;
  view_count: number;
  last_reply_at: string;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
    is_expert: boolean;
  };
}

const DiscussionForums: React.FC = () => {
  const [selectedForum, setSelectedForum] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: forums, isLoading: forumsLoading } = useQuery({
    queryKey: ['forums', selectedCategory, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('discussion_forums')
        .select(`
          *,
          orchid_species (common_name, scientific_name)
        `);

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      const { data, error } = await query.order('post_count', { ascending: false });
      if (error) throw error;
      return data as Forum[];
    }
  });

  const { data: topics, isLoading: topicsLoading } = useQuery({
    queryKey: ['forum-topics', selectedForum],
    queryFn: async () => {
      if (!selectedForum) return [];

      const { data, error } = await supabase
        .from('forum_topics')
        .select(`
          *,
          profiles (first_name, last_name, is_expert)
        `)
        .eq('forum_id', selectedForum)
        .order('is_pinned', { ascending: false })
        .order('last_reply_at', { ascending: false });

      if (error) throw error;
      return data as ForumTopic[];
    },
    enabled: !!selectedForum
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'species', label: 'Species Discussion' },
    { value: 'general', label: 'General' },
    { value: 'care', label: 'Care & Maintenance' },
    { value: 'identification', label: 'Plant Identification' }
  ];

  if (forumsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forums List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Discussion Forums</h3>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Forum
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search forums..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {forums?.map((forum) => (
              <Card
                key={forum.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedForum === forum.id ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setSelectedForum(forum.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{forum.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {forum.category}
                      </Badge>
                    </div>
                    
                    {forum.description && (
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {forum.description}
                      </p>
                    )}

                    {forum.orchid_species && (
                      <p className="text-xs text-green-600 font-medium">
                        {forum.orchid_species.common_name}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {forum.member_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {forum.post_count}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Forum Topics */}
        <div className="lg:col-span-2">
          {selectedForum ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Forum Topics</h3>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Topic
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {topicsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topics?.map((topic) => (
                      <div
                        key={topic.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center gap-1">
                            {topic.is_pinned && <Pin className="w-4 h-4 text-blue-500" />}
                            {topic.is_locked && <Lock className="w-4 h-4 text-gray-500" />}
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium hover:text-green-600">
                                {topic.title}
                              </h4>
                              <div className="text-xs text-gray-500">
                                {new Date(topic.last_reply_at).toLocaleDateString()}
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {topic.content}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700">
                                  by {topic.profiles.first_name} {topic.profiles.last_name}
                                </span>
                                {topic.profiles.is_expert && (
                                  <Badge variant="default" className="text-xs">Expert</Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="w-3 h-3" />
                                  {topic.reply_count}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {topic.view_count} views
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {topics && topics.length === 0 && (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No topics yet</h4>
                        <p className="text-gray-500 mb-4">Be the first to start a discussion in this forum</p>
                        <Button>Create First Topic</Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Forum</h3>
                <p className="text-gray-500">Choose a forum from the left to view topics and discussions</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionForums;
