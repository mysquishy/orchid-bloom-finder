
import { supabase } from '@/integrations/supabase/client';

export interface IntegrationConfig {
  id: string;
  type: 'api' | 'smart-home' | 'calendar' | 'storage' | 'shopping' | 'weather';
  provider: string;
  settings: Record<string, any>;
  isActive: boolean;
  credentials?: Record<string, string>;
}

export interface SyncJob {
  id: string;
  integrationType: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
  endTime?: Date;
  error?: string;
  data?: any;
}

class IntegrationManager {
  private integrations: Map<string, IntegrationConfig> = new Map();
  private syncJobs: Map<string, SyncJob> = new Map();

  // Initialize integrations from user settings
  async loadUserIntegrations(userId: string): Promise<IntegrationConfig[]> {
    try {
      const { data, error } = await supabase
        .from('user_integrations')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      const configs = (data || []).map(row => ({
        id: row.id,
        type: row.type as IntegrationConfig['type'],
        provider: row.provider,
        settings: row.settings || {},
        isActive: row.is_active,
        credentials: row.credentials || {}
      }));

      return configs;
    } catch (error) {
      console.error('Failed to load integrations:', error);
      return [];
    }
  }

  // Save integration configuration
  async saveIntegration(userId: string, config: IntegrationConfig): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_integrations')
        .upsert({
          id: config.id,
          user_id: userId,
          type: config.type,
          provider: config.provider,
          settings: config.settings,
          is_active: config.isActive,
          credentials: config.credentials
        });

      if (error) throw error;

      this.integrations.set(config.id, config);
      return true;
    } catch (error) {
      console.error('Failed to save integration:', error);
      return false;
    }
  }

  // Smart Home Integration Methods
  async configureAlexaSkill(userId: string, accountId: string): Promise<boolean> {
    const config: IntegrationConfig = {
      id: 'alexa-skill',
      type: 'smart-home',
      provider: 'amazon-alexa',
      settings: { accountId },
      isActive: true,
      credentials: { accountId }
    };

    return this.saveIntegration(userId, config);
  }

  async configureGoogleHome(userId: string, tokens: any): Promise<boolean> {
    const config: IntegrationConfig = {
      id: 'google-home',
      type: 'smart-home',
      provider: 'google-assistant',
      settings: { connectedAt: new Date().toISOString() },
      isActive: true,
      credentials: tokens
    };

    return this.saveIntegration(userId, config);
  }

  // Calendar Integration Methods
  async syncWithGoogleCalendar(userId: string, events: any[]): Promise<SyncJob> {
    const jobId = `calendar-sync-${Date.now()}`;
    const job: SyncJob = {
      id: jobId,
      integrationType: 'google-calendar',
      status: 'pending',
      progress: 0,
      startTime: new Date(),
      data: { eventCount: events.length }
    };

    this.syncJobs.set(jobId, job);

    // Simulate sync process
    this.simulateSyncProgress(jobId);

    return job;
  }

  // Cloud Storage Integration Methods
  async syncWithGooglePhotos(userId: string, photos: File[]): Promise<SyncJob> {
    const jobId = `photos-sync-${Date.now()}`;
    const job: SyncJob = {
      id: jobId,
      integrationType: 'google-photos',
      status: 'pending',
      progress: 0,
      startTime: new Date(),
      data: { photoCount: photos.length }
    };

    this.syncJobs.set(jobId, job);
    this.simulateSyncProgress(jobId);

    return job;
  }

  // Weather Integration Methods
  async configureWeatherProviders(userId: string, providers: any[]): Promise<boolean> {
    const config: IntegrationConfig = {
      id: 'weather-multi',
      type: 'weather',
      provider: 'multi-provider',
      settings: { 
        providers,
        failoverEnabled: true,
        alertsEnabled: true
      },
      isActive: true
    };

    return this.saveIntegration(userId, config);
  }

  // Shopping Integration Methods
  async configureAffiliatePrograms(userId: string, programs: any[]): Promise<boolean> {
    const config: IntegrationConfig = {
      id: 'affiliate-shopping',
      type: 'shopping',
      provider: 'multi-affiliate',
      settings: { 
        programs,
        recommendationsEnabled: true,
        trackingEnabled: true
      },
      isActive: true
    };

    return this.saveIntegration(userId, config);
  }

  // API Integration Methods
  generateApiKey(userId: string, permissions: string[]): string {
    const keyPrefix = 'orchid_live_pk_';
    const randomString = Math.random().toString(36).substring(2, 15) + 
                        Math.random().toString(36).substring(2, 15);
    return keyPrefix + randomString;
  }

  async saveApiKey(userId: string, keyData: any): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('api_keys')
        .insert({
          user_id: userId,
          key_id: keyData.id,
          name: keyData.name,
          key_hash: this.hashApiKey(keyData.key),
          permissions: keyData.permissions,
          is_active: true
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Failed to save API key:', error);
      return false;
    }
  }

  // Utility methods
  private hashApiKey(key: string): string {
    // In production, use proper hashing
    return btoa(key).substring(0, 32);
  }

  private simulateSyncProgress(jobId: string) {
    const job = this.syncJobs.get(jobId);
    if (!job) return;

    job.status = 'running';
    this.syncJobs.set(jobId, job);

    const interval = setInterval(() => {
      const currentJob = this.syncJobs.get(jobId);
      if (!currentJob) {
        clearInterval(interval);
        return;
      }

      currentJob.progress = Math.min(currentJob.progress + Math.random() * 20, 100);
      
      if (currentJob.progress >= 100) {
        currentJob.status = 'completed';
        currentJob.endTime = new Date();
        clearInterval(interval);
      }

      this.syncJobs.set(jobId, currentJob);
    }, 1000);
  }

  // Get sync job status
  getSyncJob(jobId: string): SyncJob | undefined {
    return this.syncJobs.get(jobId);
  }

  // Get all user integrations
  getUserIntegrations(userId: string): IntegrationConfig[] {
    return Array.from(this.integrations.values());
  }

  // Test integration connection
  async testIntegration(integrationId: string): Promise<boolean> {
    const integration = this.integrations.get(integrationId);
    if (!integration) return false;

    // Simulate connection test
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.1); // 90% success rate
      }, 1000);
    });
  }
}

export const integrationManager = new IntegrationManager();
