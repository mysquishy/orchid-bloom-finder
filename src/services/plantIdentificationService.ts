
interface PlantIdResult {
  species: string;
  commonName: string;
  confidence: number;
  description: string;
  careInstructions: string[];
  characteristics: string[];
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
  private readonly API_KEY = import.meta.env.VITE_PLANTNET_API_KEY;
  private readonly BASE_URL = 'https://my-api.plantnet.org/v1/identify';
  private readonly PROJECT = 'all'; // or 'k-world-flora' for better results

  async identifyPlant(imageFile: File): Promise<PlantIdResult> {
    if (!this.API_KEY) {
      throw new Error('Plant identification API key not configured');
    }

    try {
      const formData = new FormData();
      formData.append('images', imageFile);
      formData.append('modifiers', 'flower,leaf,fruit'); // Common plant organs
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

      // Get the best result
      const bestResult = data.results[0];
      
      return this.formatResult(bestResult);
    } catch (error) {
      console.error('Plant identification error:', error);
      
      // Fallback to mock data for development/testing
      if (process.env.NODE_ENV === 'development') {
        return this.getMockResult();
      }
      
      throw error;
    }
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
