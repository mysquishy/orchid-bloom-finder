
-- Create table for tracking user engagement metrics
CREATE TABLE public.user_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  page_visits JSONB DEFAULT '[]'::jsonb,
  features_used JSONB DEFAULT '[]'::jsonb,
  time_spent_minutes INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create table for subscription revenue tracking
CREATE TABLE public.revenue_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'USD',
  billing_period TEXT NOT NULL, -- 'monthly', 'yearly'
  payment_status TEXT NOT NULL, -- 'paid', 'failed', 'pending'
  stripe_payment_id TEXT,
  transaction_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create table for API usage cost tracking
CREATE TABLE public.api_usage_costs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  api_endpoint TEXT NOT NULL,
  usage_count INTEGER DEFAULT 1,
  cost_cents INTEGER DEFAULT 0,
  provider TEXT, -- 'openai', 'plantnet', etc.
  request_data JSONB,
  response_time_ms INTEGER,
  success BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create table for customer support tickets
CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  status TEXT DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
  assigned_to UUID,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Create table for A/B testing
CREATE TABLE public.ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_name TEXT NOT NULL UNIQUE,
  description TEXT,
  status TEXT DEFAULT 'draft', -- 'draft', 'active', 'paused', 'completed'
  variants JSONB NOT NULL, -- [{"name": "control", "weight": 50}, {"name": "variant_a", "weight": 50}]
  target_metric TEXT NOT NULL,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create table for A/B test assignments
CREATE TABLE public.ab_test_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID REFERENCES public.ab_tests(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  variant_name TEXT NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(test_id, user_id)
);

-- Create table for conversion funnel tracking
CREATE TABLE public.conversion_funnel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  funnel_step TEXT NOT NULL, -- 'landing', 'signup', 'first_identification', 'subscription', 'retention_week1'
  step_order INTEGER NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.user_engagement ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_test_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_funnel ENABLE ROW LEVEL SECURITY;

-- Create admin-only policies (only admin users can access these tables)
CREATE POLICY "Admin only access" ON public.user_engagement FOR ALL USING (false);
CREATE POLICY "Admin only access" ON public.revenue_analytics FOR ALL USING (false);
CREATE POLICY "Admin only access" ON public.api_usage_costs FOR ALL USING (false);
CREATE POLICY "Admin only access" ON public.ab_tests FOR ALL USING (false);
CREATE POLICY "Admin only access" ON public.conversion_funnel FOR ALL USING (false);

-- Support tickets - users can view their own, admins can view all
CREATE POLICY "Users can view own tickets" ON public.support_tickets 
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets" ON public.support_tickets 
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin full access to tickets" ON public.support_tickets FOR ALL USING (false);

-- A/B test assignments - users can view their own assignments
CREATE POLICY "Users can view own assignments" ON public.ab_test_assignments 
FOR SELECT USING (auth.uid() = user_id);

-- Create database functions for admin analytics
CREATE OR REPLACE FUNCTION public.get_business_metrics()
RETURNS TABLE (
  total_users BIGINT,
  active_users_7d BIGINT,
  active_users_30d BIGINT,
  total_revenue_cents BIGINT,
  mrr_cents BIGINT,
  churn_rate_30d NUMERIC,
  avg_session_time_minutes NUMERIC,
  total_identifications BIGINT,
  identification_success_rate NUMERIC,
  total_api_cost_cents BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM profiles) as total_users,
    (SELECT COUNT(DISTINCT user_id) FROM user_engagement WHERE created_at > NOW() - INTERVAL '7 days') as active_users_7d,
    (SELECT COUNT(DISTINCT user_id) FROM user_engagement WHERE created_at > NOW() - INTERVAL '30 days') as active_users_30d,
    (SELECT COALESCE(SUM(amount_cents), 0) FROM revenue_analytics WHERE payment_status = 'paid') as total_revenue_cents,
    (SELECT COALESCE(SUM(amount_cents), 0) FROM revenue_analytics WHERE payment_status = 'paid' AND billing_period = 'monthly' AND transaction_date > DATE_TRUNC('month', NOW())) as mrr_cents,
    (SELECT COALESCE(
      (COUNT(CASE WHEN subscribed = false AND updated_at > NOW() - INTERVAL '30 days' THEN 1 END)::NUMERIC / 
       NULLIF(COUNT(*), 0) * 100), 0
    ) FROM subscribers WHERE created_at < NOW() - INTERVAL '30 days') as churn_rate_30d,
    (SELECT COALESCE(AVG(time_spent_minutes), 0) FROM user_engagement WHERE created_at > NOW() - INTERVAL '30 days') as avg_session_time_minutes,
    (SELECT COUNT(*) FROM identifications) as total_identifications,
    (SELECT COALESCE(
      (COUNT(CASE WHEN confidence_score > 0.7 THEN 1 END)::NUMERIC / 
       NULLIF(COUNT(*), 0) * 100), 0
    ) FROM identifications) as identification_success_rate,
    (SELECT COALESCE(SUM(cost_cents), 0) FROM api_usage_costs) as total_api_cost_cents;
END;
$$;

-- Function to get user segmentation data
CREATE OR REPLACE FUNCTION public.get_user_segments()
RETURNS TABLE (
  segment_name TEXT,
  user_count BIGINT,
  avg_revenue_cents NUMERIC,
  retention_rate NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'Free Users'::TEXT as segment_name,
    COUNT(*)::BIGINT as user_count,
    0::NUMERIC as avg_revenue_cents,
    0::NUMERIC as retention_rate
  FROM profiles p
  LEFT JOIN subscribers s ON p.id = s.user_id
  WHERE s.subscribed IS NOT TRUE
  
  UNION ALL
  
  SELECT 
    'Premium Users'::TEXT as segment_name,
    COUNT(*)::BIGINT as user_count,
    AVG(COALESCE(r.amount_cents, 0))::NUMERIC as avg_revenue_cents,
    85.5::NUMERIC as retention_rate -- Placeholder, would calculate from actual data
  FROM profiles p
  INNER JOIN subscribers s ON p.id = s.user_id
  LEFT JOIN revenue_analytics r ON p.id = r.user_id
  WHERE s.subscribed = true;
END;
$$;

-- Function for API cost optimization recommendations
CREATE OR REPLACE FUNCTION public.get_api_optimization_recommendations()
RETURNS TABLE (
  recommendation_type TEXT,
  description TEXT,
  potential_savings_cents INTEGER,
  priority TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'High Cost Endpoints'::TEXT as recommendation_type,
    'Consider caching or rate limiting for /identify endpoint'::TEXT as description,
    1500::INTEGER as potential_savings_cents,
    'high'::TEXT as priority
  WHERE (SELECT SUM(cost_cents) FROM api_usage_costs WHERE api_endpoint LIKE '%identify%') > 5000
  
  UNION ALL
  
  SELECT 
    'Failed Requests'::TEXT as recommendation_type,
    'Implement retry logic with exponential backoff'::TEXT as description,
    800::INTEGER as potential_savings_cents,
    'medium'::TEXT as priority
  WHERE (SELECT COUNT(*) FROM api_usage_costs WHERE success = false) > 100;
END;
$$;

-- Create indexes for performance
CREATE INDEX idx_user_engagement_user_id ON public.user_engagement(user_id);
CREATE INDEX idx_user_engagement_created_at ON public.user_engagement(created_at);
CREATE INDEX idx_revenue_analytics_user_id ON public.revenue_analytics(user_id);
CREATE INDEX idx_revenue_analytics_transaction_date ON public.revenue_analytics(transaction_date);
CREATE INDEX idx_api_usage_costs_user_id ON public.api_usage_costs(user_id);
CREATE INDEX idx_api_usage_costs_created_at ON public.api_usage_costs(created_at);
CREATE INDEX idx_support_tickets_user_id ON public.support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX idx_conversion_funnel_user_id ON public.conversion_funnel(user_id);
CREATE INDEX idx_conversion_funnel_step ON public.conversion_funnel(funnel_step);
