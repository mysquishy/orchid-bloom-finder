
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Plus, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  image_urls: string[];
  post_type: string;
  tags: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  profiles: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
  orchid_species?: {
    common_name: string;
    scientific_name: string;
  };
}

const CommunityFeed: React.FC = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    post_type: 'general',
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['community-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles (id, first_name, last_name, avatar_url),
          orchid_species (common_name, scientific_name)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as CommunityPost[];
    }
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('community_posts')
        .insert({
          ...postData,
          user_id: user.id
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      setNewPost({ title: '', content: '', post_type: 'general', tags: [] });
      setShowCreatePost(false);
      toast({
        title: "Success",
        description: "Your post has been created!"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    }
  });

  const likePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('post_likes')
        .insert({
          user_id: user.id,
          post_id: postId
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    }
  });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both title and content.",
        variant: "destructive"
      });
      return;
    }

    createPostMutation.mutate(newPost);
  };

  const addTag = () => {
    if (tagInput.trim() && !newPost.tags.includes(tagInput.trim())) {
      setNewPost({
        ...newPost,
        tags: [...newPost.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter(tag => tag !== tagToRemove)
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Create Post Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Share with the Community</h3>
            <Button
              onClick={() => setShowCreatePost(!showCreatePost)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Post
            </Button>
          </div>
        </CardHeader>
        {showCreatePost && (
          <CardContent className="space-y-4">
            <Input
              placeholder="Post title..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              placeholder="Share your orchid experience, ask questions, or showcase your plants..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={4}
            />
            <div className="flex gap-2">
              <Input
                placeholder="Add tags..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="flex-1"
              />
              <Button onClick={addTag} variant="outline">Add Tag</Button>
            </div>
            {newPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {newPost.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Button
                onClick={handleCreatePost}
                disabled={createPostMutation.isPending}
                className="flex-1"
              >
                {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
              </Button>
              <Button
                onClick={() => setShowCreatePost(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts?.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={post.profiles.avatar_url} />
                  <AvatarFallback>
                    {post.profiles.first_name?.[0]}{post.profiles.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">
                      {post.profiles.first_name} {post.profiles.last_name}
                    </h4>
                    <Badge variant="outline">{post.post_type}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
              
              {post.orchid_species && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium">{post.orchid_species.common_name}</p>
                  <p className="text-sm text-gray-600 italic">
                    {post.orchid_species.scientific_name}
                  </p>
                </div>
              )}

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => likePostMutation.mutate(post.id)}
                  className="flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  {post.likes_count}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments_count}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
