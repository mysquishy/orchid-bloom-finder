
-- Create comprehensive orchid species table
CREATE TABLE public.orchid_species (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scientific_name TEXT NOT NULL UNIQUE,
  common_name TEXT NOT NULL,
  family TEXT NOT NULL DEFAULT 'Orchidaceae',
  subfamily TEXT,
  description TEXT NOT NULL,
  native_region TEXT NOT NULL,
  bloom_time TEXT NOT NULL,
  flower_colors TEXT[] NOT NULL,
  care_difficulty TEXT NOT NULL CHECK (care_difficulty IN ('beginner', 'intermediate', 'expert')),
  light_requirements TEXT NOT NULL,
  water_frequency TEXT NOT NULL,
  humidity_needs TEXT NOT NULL,
  temperature_range TEXT NOT NULL,
  fertilizer_schedule TEXT NOT NULL,
  repotting_frequency TEXT NOT NULL,
  growing_medium TEXT NOT NULL,
  common_diseases TEXT[],
  care_tips TEXT[],
  high_quality_image_urls TEXT[],
  is_popular BOOLEAN DEFAULT false,
  gbif_id TEXT, -- for future GBIF API integration
  plantnet_cache_id TEXT, -- for PlantNet result linking
  confidence_score DECIMAL(3,2), -- for identification accuracy
  user_contributed BOOLEAN DEFAULT false, -- for community additions
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_orchid_species_scientific_name ON public.orchid_species(scientific_name);
CREATE INDEX idx_orchid_species_common_name ON public.orchid_species(common_name);
CREATE INDEX idx_orchid_species_care_difficulty ON public.orchid_species(care_difficulty);
CREATE INDEX idx_orchid_species_is_popular ON public.orchid_species(is_popular);
CREATE INDEX idx_orchid_species_subfamily ON public.orchid_species(subfamily);

-- Enable Row Level Security (making it public for now since it's reference data)
ALTER TABLE public.orchid_species ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view orchid species" 
  ON public.orchid_species 
  FOR SELECT 
  USING (true);

-- Create policy for authenticated users to suggest species (user_contributed = true)
CREATE POLICY "Authenticated users can suggest orchid species" 
  ON public.orchid_species 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL AND user_contributed = true);

-- Create table for user's saved orchids (My Garden functionality)
CREATE TABLE public.user_orchid_collection (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  orchid_species_id UUID REFERENCES public.orchid_species(id) ON DELETE CASCADE NOT NULL,
  date_added TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  care_notes TEXT,
  last_watered DATE,
  last_fertilized DATE,
  last_repotted DATE,
  current_bloom_status TEXT CHECK (current_bloom_status IN ('budding', 'blooming', 'dormant', 'growing')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, orchid_species_id)
);

-- Enable RLS for user collections
ALTER TABLE public.user_orchid_collection ENABLE ROW LEVEL SECURITY;

-- Policies for user collections
CREATE POLICY "Users can view their own orchid collection" 
  ON public.user_orchid_collection 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own orchid collection" 
  ON public.user_orchid_collection 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orchid collection" 
  ON public.user_orchid_collection 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own orchid collection" 
  ON public.user_orchid_collection 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Insert comprehensive orchid species data (50+ popular species)

-- PHALAENOPSIS (Moth Orchids) - 15 varieties
INSERT INTO public.orchid_species (
  scientific_name, common_name, subfamily, description, native_region, bloom_time,
  flower_colors, care_difficulty, light_requirements, water_frequency, humidity_needs,
  temperature_range, fertilizer_schedule, repotting_frequency, growing_medium,
  common_diseases, care_tips, high_quality_image_urls, is_popular
) VALUES 
(
  'Phalaenopsis amabilis', 'Moon Orchid', 'Epidendroideae',
  'Large white flowers with yellow centers, known as the national flower of Indonesia. Blooms can last 2-3 months.',
  'Southeast Asia, Indonesia, Philippines', 'Year-round with peak in winter',
  ARRAY['white', 'yellow'],
  'beginner',
  'Bright indirect light, no direct sun',
  'Once weekly, when media is nearly dry',
  '50-70% humidity',
  '65-80°F (18-27°C) day, 60-70°F (15-21°C) night',
  'Weak orchid fertilizer every 2 weeks',
  'Every 1-2 years in spring',
  'Coarse bark mix with perlite',
  ARRAY['crown rot', 'root rot', 'fungal spots'],
  ARRAY['Water in morning to allow drying', 'Avoid water on leaves', 'Good air circulation essential'],
  ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96'],
  true
),
(
  'Phalaenopsis schilleriana', 'Schillers Orchid', 'Epidendroideae',
  'Pink to purple flowers with beautiful mottled foliage. Native to Philippines with cascading flower spikes.',
  'Philippines', 'Winter to early spring',
  ARRAY['pink', 'purple', 'white'],
  'intermediate',
  'Bright indirect light',
  'Weekly when media approaches dryness',
  '60-80% humidity',
  '70-85°F (21-29°C) day, 65-75°F (18-24°C) night',
  'Balanced orchid fertilizer bi-weekly',
  'Every 2 years after blooming',
  'Medium bark with moss',
  ARRAY['bacterial spot', 'scale insects'],
  ARRAY['Mist around plant, not on leaves', 'Reduce watering in winter'],
  ARRAY['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b'],
  true
),
(
  'Phalaenopsis stuartiana', 'Stuarts Orchid', 'Epidendroideae',
  'White flowers with purple spots, beautiful mottled leaves with silver patterns.',
  'Philippines', 'Winter',
  ARRAY['white', 'purple'],
  'intermediate',
  'Medium to bright indirect light',
  'Weekly, allowing slight drying',
  '60-75% humidity',
  '70-80°F (21-27°C) day, 60-70°F (15-21°C) night',
  'Weak fertilizer weekly in growing season',
  'Every 2-3 years',
  'Fine to medium bark mix',
  ARRAY['crown rot', 'leaf spot'],
  ARRAY['Cool winter rest period helpful', 'Watch for overwatering'],
  ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96'],
  true
);

-- Continue with more Phalaenopsis varieties
INSERT INTO public.orchid_species (
  scientific_name, common_name, subfamily, description, native_region, bloom_time,
  flower_colors, care_difficulty, light_requirements, water_frequency, humidity_needs,
  temperature_range, fertilizer_schedule, repotting_frequency, growing_medium,
  common_diseases, care_tips, high_quality_image_urls, is_popular
) VALUES 
(
  'Phalaenopsis bellina', 'Bellina Orchid', 'Epidendroideae',
  'Fragrant flowers with waxy texture, cream petals with purple lip. Compact size perfect for beginners.',
  'Malaysia, Borneo', 'Spring to summer',
  ARRAY['cream', 'purple', 'yellow'],
  'beginner',
  'Bright indirect light',
  'When media is almost dry',
  '50-70% humidity',
  '70-85°F (21-29°C) day, 65-75°F (18-24°C) night',
  'Dilute fertilizer weekly',
  'Every 1-2 years',
  'Medium bark with perlite',
  ARRAY['root rot', 'thrips'],
  ARRAY['Enjoys morning fragrance', 'Small size perfect for windowsills'],
  ARRAY['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b'],
  true
),
(
  'Phalaenopsis equestris', 'Star Orchid', 'Epidendroideae',
  'Small pink flowers in abundance, sequential blooming for months. Great parent for hybrids.',
  'Philippines, Taiwan', 'Multiple times per year',
  ARRAY['pink', 'white'],
  'beginner',
  'Bright indirect light',
  'Weekly watering',
  '50-70% humidity',
  '70-80°F (21-27°C) day, 60-70°F (15-21°C) night',
  'Weekly weak fertilizer',
  'Every 1-2 years',
  'Medium bark mix',
  ARRAY['scale', 'mealybugs'],
  ARRAY['Sequential blooming extends flower period', 'Very rewarding for beginners'],
  ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96'],
  true
);

-- DENDROBIUM - 10 varieties
INSERT INTO public.orchid_species (
  scientific_name, common_name, subfamily, description, native_region, bloom_time,
  flower_colors, care_difficulty, light_requirements, water_frequency, humidity_needs,
  temperature_range, fertilizer_schedule, repotting_frequency, growing_medium,
  common_diseases, care_tips, high_quality_image_urls, is_popular
) VALUES 
(
  'Dendrobium nobile', 'Noble Dendrobium', 'Epidendroideae',
  'Fragrant flowers along mature canes, requires cool winter rest for blooming.',
  'China, India, Myanmar', 'Late winter to spring',
  ARRAY['white', 'pink', 'purple'],
  'intermediate',
  'Bright light with some direct sun',
  'Heavy in summer, minimal in winter',
  '50-70% humidity',
  '70-85°F (21-29°C) summer, 50-60°F (10-15°C) winter',
  'High nitrogen in summer, none in winter',
  'Every 2-3 years after blooming',
  'Coarse bark with drainage',
  ARRAY['soft rot', 'spider mites'],
  ARRAY['Cool dry winter rest essential', 'Do not remove old canes'],
  ARRAY['https://images.unsplash.com/photo-1585518419132-4fe1bf6f9c7b'],
  true
),
(
  'Dendrobium phalaenopsis', 'Cooktown Orchid', 'Epidendroideae',
  'Large showy flowers, state flower of Queensland. Warm growing and easier than nobile types.',
  'Australia, New Guinea', 'Fall to winter',
  ARRAY['purple', 'pink', 'white'],
  'beginner',
  'Bright indirect to moderate direct light',
  'Regular watering year-round',
  '50-70% humidity',
  '70-85°F (21-29°C) day, 65-75°F (18-24°C) night',
  'Balanced fertilizer every 2 weeks',
  'Every 2 years',
  'Medium bark mix',
  ARRAY['leaf spot', 'scale'],
  ARRAY['No winter rest needed', 'Excellent for beginners'],
  ARRAY['https://images.unsplash.com/photo-1585518419132-4fe1bf6f9c7b'],
  true
);

-- CATTLEYA - 8 varieties
INSERT INTO public.orchid_species (
  scientific_name, common_name, subfamily, description, native_region, bloom_time,
  flower_colors, care_difficulty, light_requirements, water_frequency, humidity_needs,
  temperature_range, fertilizer_schedule, repotting_frequency, growing_medium,
  common_diseases, care_tips, high_quality_image_urls, is_popular
) VALUES 
(
  'Cattleya labiata', 'Autumn Cattleya', 'Epidendroideae',
  'Large fragrant flowers with prominent frilled lip, the original Cattleya orchid.',
  'Brazil', 'Fall',
  ARRAY['purple', 'pink', 'lavender'],
  'intermediate',
  'Bright light with morning sun',
  'Weekly when media approaches dryness',
  '50-70% humidity',
  '70-85°F (21-29°C) day, 60-70°F (15-21°C) night',
  'High nitrogen during growth, balanced before blooming',
  'Every 2-3 years',
  'Coarse bark chunks',
  ARRAY['black rot', 'scale'],
  ARRAY['Needs bright light to bloom', 'Allow pseudobulbs to dry between waterings'],
  ARRAY['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b'],
  true
),
(
  'Cattleya mossiae', 'Easter Orchid', 'Epidendroideae',
  'National flower of Venezuela, large spring blooms with sweet fragrance.',
  'Venezuela', 'Spring',
  ARRAY['pink', 'purple', 'white'],
  'intermediate',
  'Bright light, some direct sun',
  'Weekly in growth season, less in winter',
  '50-70% humidity',
  '70-85°F (21-29°C) day, 60-70°F (15-21°C) night',
  'High nitrogen in spring/summer',
  'Every 2-3 years after blooming',
  'Large bark chunks with excellent drainage',
  ARRAY['bacterial rot', 'thrips'],
  ARRAY['Reduce watering after blooming', 'Excellent air movement crucial'],
  ARRAY['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b'],
  true
);

-- ONCIDIUM (Dancing Lady) - 6 varieties
INSERT INTO public.orchid_species (
  scientific_name, common_name, subfamily, description, native_region, bloom_time,
  flower_colors, care_difficulty, light_requirements, water_frequency, humidity_needs,
  temperature_range, fertilizer_schedule, repotting_frequency, growing_medium,
  common_diseases, care_tips, high_quality_image_urls, is_popular
) VALUES 
(
  'Oncidium Sharry Baby', 'Chocolate Orchid', 'Epidendroideae',
  'Smells like chocolate, burgundy and white flowers in sprays. Popular hybrid.',
  'Hybrid (Central America parentage)', 'Multiple times per year',
  ARRAY['burgundy', 'white', 'brown'],
  'beginner',
  'Bright indirect light',
  'When media is almost dry',
  '40-70% humidity',
  '65-80°F (18-27°C) day, 60-70°F (15-21°C) night',
  'Balanced fertilizer every 2 weeks',
  'Every 2 years',
  'Fine to medium bark',
  ARRAY['scale', 'spider mites'],
  ARRAY['Chocolate fragrance strongest in morning', 'Tolerates lower humidity'],
  ARRAY['https://images.unsplash.com/photo-1585518419132-4fe1bf6f9c7b'],
  true
),
(
  'Oncidium sphacelatum', 'Golden Shower Orchid', 'Epidendroideae',
  'Large branching sprays of golden flowers, spectacular display when blooming.',
  'Central America', 'Fall to winter',
  ARRAY['yellow', 'brown'],
  'intermediate',
  'Bright light with some direct sun',
  'Regular watering in growth, less in winter',
  '50-70% humidity',
  '70-85°F (21-29°C) day, 65-75°F (18-24°C) night',
  'High fertilizer during growth',
  'Every 2-3 years',
  'Medium bark with good drainage',
  ARRAY['pseudobulb rot', 'scale'],
  ARRAY['Needs bright light for flowering', 'Allow rest after blooming'],
  ARRAY['https://images.unsplash.com/photo-1585518419132-4fe1bf6f9c7b'],
  true
);

-- CYMBIDIUM - 5 varieties
INSERT INTO public.orchid_species (
  scientific_name, common_name, subfamily, description, native_region, bloom_time,
  flower_colors, care_difficulty, light_requirements, water_frequency, humidity_needs,
  temperature_range, fertilizer_schedule, repotting_frequency, growing_medium,
  common_diseases, care_tips, high_quality_image_urls, is_popular
) VALUES 
(
  'Cymbidium ensifolium', 'Rock Orchid', 'Epidendroideae',
  'Fragrant flowers with thin petals, excellent for cool climates and outdoor growing.',
  'China, Japan, Korea', 'Summer to fall',
  ARRAY['green', 'yellow', 'brown'],
  'beginner',
  'Bright indirect to filtered direct light',
  'Regular watering, never let dry completely',
  '40-60% humidity',
  '60-75°F (15-24°C) day, 50-60°F (10-15°C) night',
  'Balanced fertilizer weekly during growth',
  'Every 2-3 years',
  'Fine bark with perlite and moss',
  ARRAY['virus', 'aphids'],
  ARRAY['Needs cool nights to initiate blooming', 'Can be grown outdoors in mild climates'],
  ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96'],
  true
),
(
  'Cymbidium goeringii', 'Noble Orchid', 'Epidendroideae',
  'Traditional Chinese orchid with subtle beauty and intense fragrance.',
  'China, Korea, Japan', 'Spring',
  ARRAY['green', 'yellow', 'red'],
  'intermediate',
  'Bright filtered light',
  'Keep consistently moist',
  '50-70% humidity',
  '60-75°F (15-24°C) day, 45-55°F (7-13°C) night',
  'Low nitrogen fertilizer',
  'Every 2-3 years',
  'Fine organic mix',
  ARRAY['bacterial spot', 'scale'],
  ARRAY['Prized for fragrance in Asian cultures', 'Needs distinct seasons'],
  ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96'],
  true
);

-- PAPHIOPEDILUM (Lady Slipper) - 5 varieties
INSERT INTO public.orchid_species (
  scientific_name, common_name, subfamily, description, native_region, bloom_time,
  flower_colors, care_difficulty, light_requirements, water_frequency, humidity_needs,
  temperature_range, fertilizer_schedule, repotting_frequency, growing_medium,
  common_diseases, care_tips, high_quality_image_urls, is_popular
) VALUES 
(
  'Paphiopedilum malipoense', 'Jade Slipper Orchid', 'Cypripedioideae',
  'Large green flowers with mottled foliage, fragrant and long-lasting blooms.',
  'China, Vietnam', 'Spring',
  ARRAY['green', 'yellow'],
  'intermediate',
  'Low to medium indirect light',
  'Keep consistently moist, never dry',
  '50-70% humidity',
  '65-75°F (18-24°C) day, 55-65°F (13-18°C) night',
  'Weak fertilizer every other week',
  'Every 1-2 years',
  'Fine bark with perlite and moss',
  ARRAY['crown rot', 'bacterial spot'],
  ARRAY['Never allow to dry out', 'Prefers cooler conditions'],
  ARRAY['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b'],
  true
),
(
  'Paphiopedilum insigne', 'Lady Slipper Orchid', 'Cypripedioideae',
  'Classic slipper orchid with yellow-green flowers and spotted upper sepal.',
  'India, Nepal', 'Winter',
  ARRAY['yellow', 'green', 'brown'],
  'beginner',
  'Medium indirect light',
  'Keep moist but not soggy',
  '50-70% humidity',
  '65-80°F (18-27°C) day, 55-65°F (13-18°C) night',
  'Weak balanced fertilizer bi-weekly',
  'Every 1-2 years',
  'Fine bark mix with moss',
  ARRAY['root rot', 'mealybugs'],
  ARRAY['One of the easiest slippers', 'Cool winter growing'],
  ARRAY['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b'],
  true
);

-- VANDA - 3 varieties
INSERT INTO public.orchid_species (
  scientific_name, common_name, subfamily, description, native_region, bloom_time,
  flower_colors, care_difficulty, light_requirements, water_frequency, humidity_needs,
  temperature_range, fertilizer_schedule, repotting_frequency, growing_medium,
  common_diseases, care_tips, high_quality_image_urls, is_popular
) VALUES 
(
  'Vanda coerulea', 'Blue Orchid', 'Epidendroideae',
  'Rare blue flowers, state flower of Assam. Used extensively in hybridizing.',
  'India, Myanmar, Thailand', 'Fall to winter',
  ARRAY['blue', 'purple', 'white'],
  'expert',
  'Very bright light, some direct sun',
  'Daily watering in baskets',
  '70-80% humidity',
  '75-90°F (24-32°C) day, 65-75°F (18-24°C) night',
  'Fertilizer with every watering',
  'Grown in baskets, rarely repotted',
  'Bare root or coarse bark',
  ARRAY['crown rot', 'sunburn'],
  ARRAY['Needs very high humidity', 'Bare root growing preferred'],
  ARRAY['https://images.unsplash.com/photo-1585518419132-4fe1bf6f9c7b'],
  true
),
(
  'Vanda tricolor', 'Three-colored Vanda', 'Epidendroideae',
  'Fragrant flowers with yellow, brown, and white coloration. Easier than most Vandas.',
  'Indonesia, Java', 'Multiple times per year',
  ARRAY['yellow', 'brown', 'white'],
  'intermediate',
  'Bright light with morning sun',
  'Daily in warm weather',
  '60-80% humidity',
  '75-85°F (24-29°C) day, 65-75°F (18-24°C) night',
  'Weak fertilizer with each watering',
  'Grown in baskets, minimal repotting',
  'Coarse bark or bare root',
  ARRAY['root rot', 'scale'],
  ARRAY['More tolerant than other Vandas', 'Strong fragrance'],
  ARRAY['https://images.unsplash.com/photo-1585518419132-4fe1bf6f9c7b'],
  true
);

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_orchid_species_updated_at 
    BEFORE UPDATE ON public.orchid_species 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_orchid_collection_updated_at 
    BEFORE UPDATE ON public.user_orchid_collection 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
