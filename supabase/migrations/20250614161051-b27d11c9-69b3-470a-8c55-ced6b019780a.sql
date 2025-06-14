
-- Create RPC functions for analytics operations
CREATE OR REPLACE FUNCTION public.insert_analytics(
  event_type TEXT,
  event_data JSONB DEFAULT '{}',
  user_id UUID DEFAULT NULL,
  session_id TEXT DEFAULT NULL,
  user_agent TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.app_analytics (event_type, event_data, user_id, session_id, user_agent)
  VALUES (event_type, event_data, user_id, session_id, user_agent);
END;
$$;

-- Create RPC function for error logging
CREATE OR REPLACE FUNCTION public.insert_error_log(
  error_type TEXT,
  error_message TEXT,
  stack_trace TEXT DEFAULT NULL,
  user_id UUID DEFAULT NULL,
  url TEXT DEFAULT NULL,
  context JSONB DEFAULT '{}',
  user_agent TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.error_logs (error_type, error_message, stack_trace, user_id, url, context, user_agent)
  VALUES (error_type, error_message, stack_trace, user_id, url, context, user_agent);
END;
$$;

-- Create RPC function for rate limiting operations
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  identifier_param TEXT,
  endpoint_param TEXT,
  limit_count INTEGER DEFAULT 100,
  window_minutes INTEGER DEFAULT 60
)
RETURNS TABLE (
  allowed BOOLEAN,
  current_count INTEGER,
  reset_time TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  window_start_time TIMESTAMP WITH TIME ZONE;
  current_requests INTEGER;
BEGIN
  window_start_time := date_trunc('hour', NOW()) + (EXTRACT(minute FROM NOW())::INTEGER / window_minutes) * (window_minutes || ' minutes')::INTERVAL;
  
  -- Get current count or create new record
  SELECT request_count INTO current_requests
  FROM public.api_rate_limits
  WHERE identifier = identifier_param 
    AND endpoint = endpoint_param 
    AND window_start = window_start_time;
  
  IF current_requests IS NULL THEN
    -- First request in this window
    INSERT INTO public.api_rate_limits (identifier, endpoint, request_count, window_start)
    VALUES (identifier_param, endpoint_param, 1, window_start_time);
    current_requests := 1;
  ELSE
    -- Increment existing count
    UPDATE public.api_rate_limits 
    SET request_count = request_count + 1, updated_at = NOW()
    WHERE identifier = identifier_param 
      AND endpoint = endpoint_param 
      AND window_start = window_start_time;
    current_requests := current_requests + 1;
  END IF;
  
  RETURN QUERY SELECT 
    (current_requests <= limit_count) as allowed,
    current_requests as current_count,
    (window_start_time + (window_minutes || ' minutes')::INTERVAL) as reset_time;
END;
$$;
