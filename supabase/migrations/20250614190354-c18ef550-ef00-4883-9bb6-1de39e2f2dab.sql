
-- Create enhanced profiles table with community features
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS orchid_experience_level TEXT DEFAULT 'beginner';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_expert BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS privacy_settings JSONB DEFAULT '{"profile_public": true, "collection_public": true}';

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_type TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Create follows table for user connections
CREATE TABLE public.user_follows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Create community posts table
CREATE TABLE public.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  orchid_species_id UUID REFERENCES public.orchid_species(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT,
  image_urls TEXT[] DEFAULT '{}',
  post_type TEXT NOT NULL DEFAULT 'general', -- general, care_update, identification, question
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post likes table
CREATE TABLE public.post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Create post comments table
CREATE TABLE public.post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create discussion forums table
CREATE TABLE public.discussion_forums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  orchid_species_id UUID REFERENCES public.orchid_species(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'species', -- species, general, care, identification
  member_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create forum topics table
CREATE TABLE public.forum_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  forum_id UUID REFERENCES public.discussion_forums(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  reply_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  last_reply_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create forum replies table
CREATE TABLE public.forum_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID REFERENCES public.forum_topics(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create plant trading table
CREATE TABLE public.plant_trades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  orchid_species_id UUID REFERENCES public.orchid_species(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  trade_type TEXT NOT NULL DEFAULT 'trade', -- trade, gift, sell
  location TEXT,
  image_urls TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active', -- active, completed, cancelled
  contact_info JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community challenges table
CREATE TABLE public.community_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge_type TEXT NOT NULL DEFAULT 'care', -- care, photo, growth, identification
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  prize_description TEXT,
  participant_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming', -- upcoming, active, completed
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create challenge participations table
CREATE TABLE public.challenge_participations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID REFERENCES public.community_challenges(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  submission_data JSONB DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  submission_text TEXT,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(challenge_id, user_id)
);

-- Create local societies table
CREATE TABLE public.local_societies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  contact_info JSONB DEFAULT '{}',
  member_count INTEGER DEFAULT 0,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create society memberships table
CREATE TABLE public.society_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  society_id UUID REFERENCES public.local_societies(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member', -- member, moderator, admin
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(society_id, user_id)
);

-- Create meetup events table
CREATE TABLE public.meetup_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  society_id UUID REFERENCES public.local_societies(id) ON DELETE CASCADE,
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  max_attendees INTEGER,
  attendee_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming', -- upcoming, ongoing, completed, cancelled
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create event attendances table
CREATE TABLE public.event_attendances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.meetup_events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'attending', -- attending, maybe, declined
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create expert verifications table
CREATE TABLE public.expert_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identification_id UUID REFERENCES public.identifications(id) ON DELETE CASCADE NOT NULL,
  expert_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  verified_species TEXT,
  confidence_score NUMERIC,
  verification_notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plant_trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_societies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.society_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetup_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_verifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for community features
CREATE POLICY "Users can view public user achievements" ON public.user_achievements FOR SELECT USING (true);
CREATE POLICY "Users can create their own achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view public follows" ON public.user_follows FOR SELECT USING (true);
CREATE POLICY "Users can manage their own follows" ON public.user_follows FOR ALL USING (auth.uid() = follower_id);

CREATE POLICY "Users can view public community posts" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Users can create their own posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.community_posts FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view public post likes" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage their own likes" ON public.post_likes FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view public comments" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.post_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.post_comments FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view public forums" ON public.discussion_forums FOR SELECT USING (true);
CREATE POLICY "Users can view public forum topics" ON public.forum_topics FOR SELECT USING (true);
CREATE POLICY "Users can create forum topics" ON public.forum_topics FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own topics" ON public.forum_topics FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view public forum replies" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "Users can create forum replies" ON public.forum_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own replies" ON public.forum_replies FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view public plant trades" ON public.plant_trades FOR SELECT USING (true);
CREATE POLICY "Users can manage their own trades" ON public.plant_trades FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view public challenges" ON public.community_challenges FOR SELECT USING (true);
CREATE POLICY "Users can view public challenge participations" ON public.challenge_participations FOR SELECT USING (true);
CREATE POLICY "Users can manage their own participations" ON public.challenge_participations FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view public societies" ON public.local_societies FOR SELECT USING (true);
CREATE POLICY "Users can view public society memberships" ON public.society_memberships FOR SELECT USING (true);
CREATE POLICY "Users can manage their own memberships" ON public.society_memberships FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view public events" ON public.meetup_events FOR SELECT USING (true);
CREATE POLICY "Users can create events" ON public.meetup_events FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Users can update their own events" ON public.meetup_events FOR UPDATE USING (auth.uid() = organizer_id);

CREATE POLICY "Users can view public event attendances" ON public.event_attendances FOR SELECT USING (true);
CREATE POLICY "Users can manage their own attendances" ON public.event_attendances FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view public expert verifications" ON public.expert_verifications FOR SELECT USING (true);
CREATE POLICY "Experts can create verifications" ON public.expert_verifications FOR INSERT WITH CHECK (auth.uid() = expert_id);

-- Create indexes for better performance
CREATE INDEX idx_user_follows_follower ON public.user_follows(follower_id);
CREATE INDEX idx_user_follows_following ON public.user_follows(following_id);
CREATE INDEX idx_community_posts_user ON public.community_posts(user_id);
CREATE INDEX idx_community_posts_created ON public.community_posts(created_at DESC);
CREATE INDEX idx_post_likes_post ON public.post_likes(post_id);
CREATE INDEX idx_post_comments_post ON public.post_comments(post_id);
CREATE INDEX idx_forum_topics_forum ON public.forum_topics(forum_id);
CREATE INDEX idx_forum_replies_topic ON public.forum_replies(topic_id);
CREATE INDEX idx_plant_trades_location ON public.plant_trades(location);
CREATE INDEX idx_plant_trades_status ON public.plant_trades(status);
CREATE INDEX idx_society_memberships_society ON public.society_memberships(society_id);
CREATE INDEX idx_society_memberships_user ON public.society_memberships(user_id);
