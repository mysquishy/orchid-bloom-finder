
interface EnvironmentConfig {
  apiUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  plantNetApiKey?: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

class EnvironmentManager {
  private config: EnvironmentConfig;

  constructor() {
    this.config = {
      apiUrl: this.getApiUrl(),
      supabaseUrl: this.getRequiredEnv('VITE_SUPABASE_URL'),
      supabaseAnonKey: this.getRequiredEnv('VITE_SUPABASE_ANON_KEY'),
      plantNetApiKey: import.meta.env.VITE_PLANTNET_API_KEY,
      isDevelopment: import.meta.env.DEV,
      isProduction: import.meta.env.PROD,
    };

    this.validateConfig();
  }

  private getRequiredEnv(key: string): string {
    const value = import.meta.env[key];
    if (!value) {
      throw new Error(`Required environment variable ${key} is not set`);
    }
    return value;
  }

  private getApiUrl(): string {
    // For production, use the actual domain
    if (import.meta.env.PROD) {
      return window.location.origin;
    }
    
    // For development, use localhost
    return 'http://localhost:5173';
  }

  private validateConfig(): void {
    const errors: string[] = [];

    if (!this.config.supabaseUrl) {
      errors.push('Supabase URL is required');
    }

    if (!this.config.supabaseAnonKey) {
      errors.push('Supabase anon key is required');
    }

    if (this.config.isProduction && !this.config.plantNetApiKey) {
      console.warn('PlantNet API key not configured - plant identification will use fallback');
    }

    if (errors.length > 0) {
      throw new Error(`Environment configuration errors: ${errors.join(', ')}`);
    }
  }

  public getConfig(): EnvironmentConfig {
    return { ...this.config };
  }

  public isFeatureEnabled(feature: string): boolean {
    const featureFlags = {
      plantIdentification: !!this.config.plantNetApiKey || this.config.isDevelopment,
      analytics: this.config.isProduction,
      debugging: this.config.isDevelopment,
    };

    return featureFlags[feature as keyof typeof featureFlags] ?? false;
  }
}

export const environmentManager = new EnvironmentManager();
export const environment = environmentManager.getConfig();
