
import { z } from 'zod';

// Orchid species validation schema
export const orchidSpeciesSchema = z.object({
  common_name: z.string().min(2, 'Common name must be at least 2 characters'),
  scientific_name: z.string().regex(/^[A-Z][a-z]+ [a-z]+/, 'Scientific name must be in format "Genus species"'),
  family: z.string().min(1, 'Family is required'),
  subfamily: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  native_region: z.string().min(1, 'Native region is required'),
  bloom_time: z.string().min(1, 'Bloom time is required'),
  flower_colors: z.array(z.string()).min(1, 'At least one flower color is required'),
  care_difficulty: z.enum(['beginner', 'intermediate', 'expert']),
  light_requirements: z.string().min(1, 'Light requirements are required'),
  water_frequency: z.string().min(1, 'Water frequency is required'),
  humidity_needs: z.string().min(1, 'Humidity needs are required'),
  temperature_range: z.string().min(1, 'Temperature range is required'),
  fertilizer_schedule: z.string().min(1, 'Fertilizer schedule is required'),
  repotting_frequency: z.string().min(1, 'Repotting frequency is required'),
  growing_medium: z.string().min(1, 'Growing medium is required'),
  care_tips: z.array(z.string()).optional(),
  common_diseases: z.array(z.string()).optional(),
  high_quality_image_urls: z.array(z.string().url()).optional(),
  is_popular: z.boolean().optional(),
  user_contributed: z.boolean().optional()
});

// User collection validation schema
export const userCollectionSchema = z.object({
  orchid_species_id: z.string().uuid('Invalid species ID'),
  date_added: z.date().optional(),
  care_notes: z.string().optional(),
  current_bloom_status: z.string().optional(),
  last_watered: z.date().optional(),
  last_fertilized: z.date().optional(),
  last_repotted: z.date().optional()
});

// Identification validation schema
export const identificationSchema = z.object({
  orchid_species: z.string().optional(),
  confidence_score: z.number().min(0).max(1).optional(),
  image_url: z.string().url().optional(),
  notes: z.string().optional(),
  is_saved: z.boolean().optional()
});

export const validateOrchidSpecies = (data: unknown) => {
  return orchidSpeciesSchema.safeParse(data);
};

export const validateUserCollection = (data: unknown) => {
  return userCollectionSchema.safeParse(data);
};

export const validateIdentification = (data: unknown) => {
  return identificationSchema.safeParse(data);
};

// Database validation function
export const validateDatabaseIntegrity = async () => {
  const issues = [];
  
  // This would be called from the admin panel or monitoring system
  try {
    const response = await fetch('/api/validate-database');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Database validation failed:', error);
    return { issues: ['Failed to validate database'] };
  }
};
