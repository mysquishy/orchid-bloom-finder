
-- Let's check what's actually in the identifications table
SELECT * FROM public.identifications ORDER BY created_at DESC LIMIT 10;

-- Check if there are any identifications for your specific user
SELECT * FROM public.identifications WHERE user_id = 'a1d7829f-86b8-4e87-a870-eca4856e21a6';

-- Check the usage_tracking table
SELECT * FROM public.usage_tracking WHERE user_id = 'a1d7829f-86b8-4e87-a870-eca4856e21a6';

-- Check if RLS policies are blocking the data
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'identifications';
