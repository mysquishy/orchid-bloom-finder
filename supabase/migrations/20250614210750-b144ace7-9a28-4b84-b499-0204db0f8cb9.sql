
-- Create user_integrations table for integration storage
CREATE TABLE IF NOT EXISTS public.user_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT false,
  credentials JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create API keys table for public API access
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  key_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  permissions JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics events table for tracking
CREATE TABLE IF NOT EXISTS public.app_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL DEFAULT '{}',
  user_id UUID REFERENCES auth.users,
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create error logs table
CREATE TABLE IF NOT EXISTS public.error_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  error_type TEXT NOT NULL,
  error_message TEXT NOT NULL,
  stack_trace TEXT,
  user_id UUID REFERENCES auth.users,
  url TEXT,
  context JSONB DEFAULT '{}',
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS public.api_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(identifier, endpoint, window_start)
);

-- Create marketing campaigns table
CREATE TABLE IF NOT EXISTS public.marketing_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  campaign_type TEXT NOT NULL DEFAULT 'email',
  status TEXT NOT NULL DEFAULT 'draft',
  target_audience JSONB NOT NULL DEFAULT '{}',
  content JSONB NOT NULL DEFAULT '{}',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  metrics JSONB NOT NULL DEFAULT '{}',
  created_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog posts table for SEO content
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author_id UUID REFERENCES auth.users NOT NULL,
  category TEXT NOT NULL DEFAULT 'care-guide',
  tags TEXT[] DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.user_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_integrations
CREATE POLICY "Users can view their own integrations" ON public.user_integrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own integrations" ON public.user_integrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own integrations" ON public.user_integrations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own integrations" ON public.user_integrations
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for api_keys
CREATE POLICY "Users can view their own API keys" ON public.api_keys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own API keys" ON public.api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own API keys" ON public.api_keys
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API keys" ON public.api_keys
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for blog_posts (public read, author write)
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Authors can view their own blog posts" ON public.blog_posts
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Authors can create blog posts" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own blog posts" ON public.blog_posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own blog posts" ON public.blog_posts
  FOR DELETE USING (auth.uid() = author_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_integrations_user_id ON public.user_integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON public.api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_app_analytics_event_type ON public.app_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_app_analytics_user_id ON public.app_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(is_published, published_at);
