import { supabase } from '@/integrations/supabase/client';

interface PlantIdResult {
  species: string;
  commonName: string;
  confidence: number;
  description: string;
  careInstructions: string[];
  characteristics: string[];
  id?: string; // Add ID for database record
}

interface PlantNetResponse {
  results: Array<{
    species: {
      scientificNameWithoutAuthor: string;
      scientificNameAuthorship: string;
      genus: {
        scientificNameWithoutAuthor: string;
      };
      family: {
        scientificNameWithoutAuthor: string;
      };
      commonNames: string[];
    };
    score: number;
    gbif?: {
      id: number;
    };
  }>;
  query: {
    project: string;
    images: Array<{
      organ: string;
      author: string;
      license: string;
      date: {
        timestamp: number;
      };
    }>;
    modifiers: string[];
    apiKey: string;
  };
  remainingIdentificationRequests: number;
}

class PlantIdentificationService {
  private readonly API_KEY = import.meta.env.VITE_PLANTNET_API_KEY || '2b109ViD2Tp2StgPwVdDBJI2W';
  private readonly BASE_URL = 'https://my-api.plantnet.org/v1/identify';
  private readonly PROJECT = 'all';

  async identifyPlant(imageFile: File, userId?: string): Promise<PlantIdResult> {
    if (!this.API_KEY) {
      throw new Error('Plant identification API key not configured');
    }

    // Check usage limits first
    if (userId) {
      const { data: limitCheck } = await supabase.rpc('check_identification_limit', {
        user_id_param: userId
      });

      if (limitCheck && !limitCheck[0]?.can_identify) {
        throw new Error('Monthly identification limit reached. Upgrade to Premium for unlimited identifications.');
      }
    }

    try {
      const formData = new FormData();
      formData.append('images', imageFile);
      formData.append('modifiers', 'flower,leaf,fruit');
      formData.append('project', this.PROJECT);
      formData.append('api-key', this.API_KEY);

      const response = await fetch(`${this.BASE_URL}/${this.PROJECT}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data: PlantNetResponse = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error('No plant identification results found');
      }

      const bestResult = data.results[0];
      const result = this.formatResult(bestResult);

      // Save to database and increment usage
      if (userId) {
        const savedRecord = await this.saveIdentificationResult(result, imageFile, userId);
        result.id = savedRecord.id;
        
        // Increment usage count
        await supabase.rpc('increment_identification_usage', {
          user_id_param: userId
        });
      }

      return result;
    } catch (error) {
      console.error('Plant identification error:', error);
      
      // Fallback to mock data for development/testing
      if (import.meta.env.DEV) {
        const mockResult = this.getMockResult();
        if (userId) {
          const savedRecord = await this.saveIdentificationResult(mockResult, imageFile, userId);
          mockResult.id = savedRecord.id;
        }
        return mockResult;
      }
      
      throw error;
    }
  }

  private async saveIdentificationResult(result: PlantIdResult, imageFile: File, userId: string) {
    // Upload image to storage first
    const imageUrl = await this.uploadIdentificationImage(imageFile, userId);

    // Save identification record
    const { data, error } = await supabase
      .from('identifications')
      .insert({
        user_id: userId,
        orchid_species: result.species,
        confidence_score: result.confidence,
        image_url: imageUrl,
        notes: result.description,
        is_saved: false
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private async uploadIdentificationImage(file: File, userId: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('identification-images')
      .upload(fileName, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('identification-images')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }

  async saveToCollection(identificationId: string, userId: string): Promise<void> {
    // First, get the identification
    const { data: identification, error: identError } = await supabase
      .from('identifications')
      .select('orchid_species')
      .eq('id', identificationId)
      .eq('user_id', userId)
      .single();

    if (identError) throw identError;

    // Find or create orchid species
    let { data: orchidSpecies, error: speciesError } = await supabase
      .from('orchid_species')
      .select('id')
      .eq('scientific_name', identification.orchid_species)
      .single();

    if (speciesError && speciesError.code === 'PGRST116') {
      // Species doesn't exist, create it
      const { data: newSpecies, error: createError } = await supabase
        .from('orchid_species')
        .insert({
          scientific_name: identification.orchid_species,
          common_name: identification.orchid_species,
          description: 'Identified orchid species',
          flower_colors: ['unknown'],
          care_difficulty: 'intermediate',
          light_requirements: 'bright indirect',
          water_frequency: 'weekly',
          temperature_range: '18-24°C',
          humidity_needs: '50-70%',
          fertilizer_schedule: 'monthly',
          repotting_frequency: 'every 2 years',
          growing_medium: 'orchid bark mix',
          bloom_time: 'varies',
          native_region: 'unknown',
          user_contributed: true
        })
        .select()
        .single();

      if (createError) throw createError;
      orchidSpecies = newSpecies;
    } else if (speciesError) {
      throw speciesError;
    }

    // Add to user's collection
    const { error: collectionError } = await supabase
      .from('user_orchid_collection')
      .insert({
        user_id: userId,
        orchid_species_id: orchidSpecies.id,
        current_bloom_status: 'growing'
      });

    if (collectionError && collectionError.code !== '23505') { // Ignore duplicate entries
      throw collectionError;
    }

    // Mark identification as saved
    await supabase
      .from('identifications')
      .update({ is_saved: true })
      .eq('id', identificationId);
  }

  private formatResult(result: PlantNetResponse['results'][0]): PlantIdResult {
    const species = result.species;
    const commonName = species.commonNames?.[0] || 'Unknown Orchid';
    const scientificName = species.scientificNameWithoutAuthor;
    
    return {
      species: scientificName,
      commonName,
      confidence: result.score,
      description: this.generateDescription(scientificName, commonName),
      careInstructions: this.getGenericCareInstructions(),
      characteristics: this.getGenericCharacteristics()
    };
  }

  private generateDescription(scientificName: string, commonName: string): string {
    return `${scientificName} (${commonName}) is a beautiful orchid species. This identification is based on visual analysis of the provided image.`;
  }

  private getGenericCareInstructions(): string[] {
    return [
      'Provide bright, indirect light',
      'Water when potting medium is nearly dry',
      'Maintain humidity around 50-70%',
      'Use orchid-specific potting medium',
      'Fertilize monthly with diluted orchid fertilizer'
    ];
  }

  private getGenericCharacteristics(): string[] {
    return [
      'Epiphytic growth habit',
      'Pseudobulbs for water storage',
      'Aerial root system',
      'Bilateral flower symmetry'
    ];
  }

  private getMockResult(): PlantIdResult {
    return {
      species: 'Phalaenopsis amabilis',
      commonName: 'Moth Orchid',
      confidence: 0.89,
      description: 'A popular epiphytic orchid native to Southeast Asia, known for its elegant white flowers.',
      careInstructions: this.getGenericCareInstructions(),
      characteristics: this.getGenericCharacteristics()
    };
  }
}

export const plantIdentificationService = new PlantIdentificationService();
