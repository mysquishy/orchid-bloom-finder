
import { offlineManager } from './offlineManager';
import { supabase } from '@/integrations/supabase/client';

interface SyncStatus {
  isOnline: boolean;
  lastSync: Date | null;
  pendingOperations: number;
}

class BackgroundSyncManager {
  private syncInterval: NodeJS.Timeout | null = null;
  private isRunning = false;
  private lastSync: Date | null = null;

  init() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.setupPeriodicSync();
    this.setupOnlineListener();
    
    console.log('Background sync initialized');
  }

  stop() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    this.isRunning = false;
    console.log('Background sync stopped');
  }

  private setupPeriodicSync() {
    // Sync every 5 minutes when online
    this.syncInterval = setInterval(() => {
      if (navigator.onLine) {
        this.performSync();
      }
    }, 5 * 60 * 1000);
  }

  private setupOnlineListener() {
    window.addEventListener('online', () => {
      console.log('Device came online, triggering sync');
      this.performSync();
    });
  }

  private async performSync() {
    try {
      console.log('Starting background sync...');
      
      // Get pending data from offline manager
      const syncStatus = await offlineManager.getSyncStatus();
      
      if (syncStatus.pending === 0) {
        console.log('No pending operations to sync');
        return;
      }

      console.log(`Syncing ${syncStatus.pending} pending operations`);

      // Get all stored data that needs syncing
      const [identifications, plants, reminders] = await Promise.all([
        offlineManager.getStoredIdentifications(),
        offlineManager.getStoredPlants(),
        this.getStoredReminders()
      ]);

      // Sync identifications
      for (const identification of identifications.filter(i => !i.synced)) {
        await this.syncIdentification(identification);
      }

      // Sync plants
      for (const plant of plants.filter(p => !p.synced)) {
        await this.syncPlant(plant);
      }

      // Sync reminders
      for (const reminder of reminders.filter(r => !r.synced)) {
        await this.syncReminder(reminder);
      }

      this.lastSync = new Date();
      console.log('Background sync completed successfully');

    } catch (error) {
      console.error('Background sync failed:', error);
    }
  }

  private async getStoredReminders() {
    // Simple mock for stored reminders
    return [];
  }

  private async syncIdentification(identification: any) {
    try {
      // Here you would sync with your backend
      console.log('Syncing identification:', identification.id);
      
      // Mark as synced locally after successful sync
      identification.synced = true;
    } catch (error) {
      console.error('Failed to sync identification:', error);
    }
  }

  private async syncPlant(plant: any) {
    try {
      console.log('Syncing plant:', plant.id);
      
      // Mark as synced locally after successful sync
      plant.synced = true;
    } catch (error) {
      console.error('Failed to sync plant:', error);
    }
  }

  private async syncReminder(reminder: any) {
    try {
      console.log('Syncing reminder:', reminder.id);
      
      // Mark as synced locally after successful sync
      reminder.synced = true;
    } catch (error) {
      console.error('Failed to sync reminder:', error);
    }
  }

  async getSyncStatus(): Promise<SyncStatus> {
    const syncStatus = await offlineManager.getSyncStatus();
    
    return {
      isOnline: navigator.onLine,
      lastSync: this.lastSync,
      pendingOperations: syncStatus.pending
    };
  }

  async requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  }

  async scheduleNotification(title: string, body: string, delay: number) {
    if (await this.requestNotificationPermission()) {
      setTimeout(() => {
        new Notification(title, { body, icon: '/favicon.ico' });
      }, delay);
    }
  }
}

export const backgroundSync = new BackgroundSyncManager();
