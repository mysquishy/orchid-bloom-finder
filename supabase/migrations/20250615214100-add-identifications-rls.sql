
-- Enable RLS on identifications table
ALTER TABLE public.identifications ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see their own identifications
CREATE POLICY "Users can view their own identifications" 
ON public.identifications FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for users to insert their own identifications
CREATE POLICY "Users can insert their own identifications" 
ON public.identifications FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own identifications
CREATE POLICY "Users can update their own identifications" 
ON public.identifications FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policy for users to delete their own identifications
CREATE POLICY "Users can delete their own identifications" 
ON public.identifications FOR DELETE 
USING (auth.uid() = user_id);
