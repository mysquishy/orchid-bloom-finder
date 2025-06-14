
-- Create subscribers table to track subscription information
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT false,
  subscription_tier TEXT,
  subscription_end TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own subscription info
CREATE POLICY "select_own_subscription" ON public.subscribers
FOR SELECT
USING (user_id = auth.uid() OR email = auth.email());

-- Create policy for edge functions to update subscription info
CREATE POLICY "update_own_subscription" ON public.subscribers
FOR UPDATE
USING (true);

-- Create policy for edge functions to insert subscription info
CREATE POLICY "insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Create usage tracking table for free tier limits
CREATE TABLE public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  month_year TEXT NOT NULL, -- Format: 'YYYY-MM'
  identifications_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, month_year)
);

-- Enable RLS for usage tracking
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own usage
CREATE POLICY "select_own_usage" ON public.usage_tracking
FOR SELECT
USING (user_id = auth.uid());

-- Create policy for edge functions to manage usage
CREATE POLICY "manage_usage" ON public.usage_tracking
FOR ALL
USING (true);

-- Create RPC function to check and update usage
CREATE OR REPLACE FUNCTION public.check_identification_limit(user_id_param UUID)
RETURNS TABLE (
  can_identify BOOLEAN,
  remaining_count INTEGER,
  is_premium BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_month TEXT;
  usage_count INTEGER;
  is_subscribed BOOLEAN;
BEGIN
  current_month := to_char(NOW(), 'YYYY-MM');
  
  -- Check if user is premium
  SELECT subscribed INTO is_subscribed
  FROM public.subscribers
  WHERE user_id = user_id_param AND subscribed = true;
  
  IF is_subscribed IS NULL THEN
    is_subscribed := false;
  END IF;
  
  -- If premium, allow unlimited
  IF is_subscribed THEN
    RETURN QUERY SELECT true, -1, true;
    RETURN;
  END IF;
  
  -- Get current usage for free users
  SELECT identifications_count INTO usage_count
  FROM public.usage_tracking
  WHERE user_id = user_id_param AND month_year = current_month;
  
  IF usage_count IS NULL THEN
    usage_count := 0;
  END IF;
  
  RETURN QUERY SELECT 
    (usage_count < 3) as can_identify,
    (3 - usage_count) as remaining_count,
    false as is_premium;
END;
$$;

-- Create RPC function to increment usage
CREATE OR REPLACE FUNCTION public.increment_identification_usage(user_id_param UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_month TEXT;
BEGIN
  current_month := to_char(NOW(), 'YYYY-MM');
  
  INSERT INTO public.usage_tracking (user_id, month_year, identifications_count)
  VALUES (user_id_param, current_month, 1)
  ON CONFLICT (user_id, month_year)
  DO UPDATE SET 
    identifications_count = usage_tracking.identifications_count + 1,
    updated_at = NOW();
END;
$$;
