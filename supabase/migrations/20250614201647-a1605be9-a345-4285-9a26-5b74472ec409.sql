
-- Create experts table
CREATE TABLE public.experts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  credentials TEXT[],
  specializations TEXT[],
  years_experience INTEGER,
  hourly_rate_cents INTEGER,
  profile_image_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create consultations table
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  expert_id UUID REFERENCES public.experts NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  consultation_type TEXT NOT NULL CHECK (consultation_type IN ('identification', 'health_assessment', 'care_plan', 'collection_review')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER DEFAULT 30,
  price_cents INTEGER NOT NULL,
  meeting_url TEXT,
  notes TEXT,
  expert_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create expert courses table
CREATE TABLE public.expert_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  expert_id UUID REFERENCES public.experts NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_hours INTEGER,
  price_cents INTEGER NOT NULL,
  max_participants INTEGER,
  course_type TEXT NOT NULL CHECK (course_type IN ('webinar', 'workshop', 'course', 'certification')),
  is_premium_only BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  syllabus JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course enrollments table
CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  course_id UUID REFERENCES public.expert_courses NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER DEFAULT 0,
  certificate_url TEXT,
  UNIQUE(user_id, course_id)
);

-- Create expert availability table
CREATE TABLE public.expert_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  expert_id UUID REFERENCES public.experts NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create expert reviews table
CREATE TABLE public.expert_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  expert_id UUID REFERENCES public.experts NOT NULL,
  consultation_id UUID REFERENCES public.consultations,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, consultation_id)
);

-- Update existing support_tickets table with expert consultation fields
ALTER TABLE public.support_tickets 
ADD COLUMN IF NOT EXISTS expert_id UUID REFERENCES public.experts,
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS response_time_sla_hours INTEGER,
ADD COLUMN IF NOT EXISTS first_response_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general' CHECK (category IN ('identification', 'care', 'disease', 'general', 'technical'));

-- Enable RLS on new tables
ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for experts
CREATE POLICY "Anyone can view verified experts" ON public.experts
  FOR SELECT USING (is_verified = true AND is_active = true);

CREATE POLICY "Experts can update their own profile" ON public.experts
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for consultations
CREATE POLICY "Users can view their own consultations" ON public.consultations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Experts can view their consultations" ON public.consultations
  FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.experts WHERE id = expert_id));

CREATE POLICY "Users can create consultations" ON public.consultations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Experts can update their consultations" ON public.consultations
  FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM public.experts WHERE id = expert_id));

-- RLS Policies for courses
CREATE POLICY "Anyone can view published courses" ON public.expert_courses
  FOR SELECT USING (is_published = true);

CREATE POLICY "Experts can manage their courses" ON public.expert_courses
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.experts WHERE id = expert_id));

-- RLS Policies for enrollments
CREATE POLICY "Users can view their enrollments" ON public.course_enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses" ON public.course_enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for availability
CREATE POLICY "Anyone can view expert availability" ON public.expert_availability
  FOR SELECT USING (true);

CREATE POLICY "Experts can manage their availability" ON public.expert_availability
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM public.experts WHERE id = expert_id));

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews" ON public.expert_reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON public.expert_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Additional RLS policies for existing support_tickets with expert features
CREATE POLICY "Experts can view assigned tickets" ON public.support_tickets
  FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.experts WHERE id = expert_id));

-- Create function to get available consultation slots
CREATE OR REPLACE FUNCTION public.get_available_slots(
  expert_id_param UUID,
  date_start DATE,
  date_end DATE
)
RETURNS TABLE(
  slot_datetime TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH expert_schedule AS (
    SELECT 
      ea.day_of_week,
      ea.start_time,
      ea.end_time
    FROM public.expert_availability ea
    WHERE ea.expert_id = expert_id_param 
      AND ea.is_available = true
  ),
  date_series AS (
    SELECT generate_series(date_start::date, date_end::date, '1 day'::interval)::date as date
  ),
  time_slots AS (
    SELECT 
      ds.date + ea.start_time as slot_start,
      ds.date + ea.end_time as slot_end
    FROM date_series ds
    CROSS JOIN expert_schedule ea
    WHERE EXTRACT(dow FROM ds.date) = ea.day_of_week
  ),
  thirty_min_slots AS (
    SELECT 
      generate_series(
        ts.slot_start,
        ts.slot_end - interval '30 minutes',
        interval '30 minutes'
      ) as slot_time
    FROM time_slots ts
  )
  SELECT 
    tms.slot_time,
    30 as duration_minutes
  FROM thirty_min_slots tms
  WHERE tms.slot_time > NOW()
    AND NOT EXISTS (
      SELECT 1 FROM public.consultations c
      WHERE c.expert_id = expert_id_param
        AND c.scheduled_at = tms.slot_time
        AND c.status IN ('scheduled', 'in_progress')
    )
  ORDER BY tms.slot_time;
END;
$$;

-- Create function to calculate expert ratings
CREATE OR REPLACE FUNCTION public.get_expert_rating(expert_id_param UUID)
RETURNS TABLE(
  average_rating NUMERIC,
  total_reviews INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(AVG(rating), 0)::NUMERIC as average_rating,
    COUNT(*)::INTEGER as total_reviews
  FROM public.expert_reviews
  WHERE expert_id = expert_id_param;
END;
$$;

-- Create triggers for updated_at on new tables
CREATE TRIGGER update_experts_updated_at
  BEFORE UPDATE ON public.experts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expert_courses_updated_at
  BEFORE UPDATE ON public.expert_courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
