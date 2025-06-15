
-- Create storage bucket for identification images
INSERT INTO storage.buckets (id, name, public)
VALUES ('identification-images', 'identification-images', true);

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Users can upload identification images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'identification-images' AND 
  auth.role() = 'authenticated'
);

-- Create policy to allow public read access to images
CREATE POLICY "Public read access for identification images" ON storage.objects
FOR SELECT USING (bucket_id = 'identification-images');

-- Create policy to allow users to update their own images
CREATE POLICY "Users can update their own identification images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'identification-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create policy to allow users to delete their own images
CREATE POLICY "Users can delete their own identification images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'identification-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
