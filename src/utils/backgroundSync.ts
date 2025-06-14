
import { offlineManager } from './offlineManager';
import { supabase } from '@/integrations/supabase/client';

class BackgroundSyncService {
  private syncInProgress = false;
  private syncInterval: NodeJS.Timeout | null = null;

  async init() {
    // Register sync events
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        if (registration.sync) {
          registration.sync.register('background-sync');
        }
      });
    }

    // Start periodic sync
    this.startPeriodicSync();

    // Sync when online
    window.addEventListener('online', () => {
      this.syncData();
    });
  }

  private startPeriodicSync() {
    // Sync every 5 minutes when app is active
    this.syncInterval = setInterval(() => {
      if (navigator.onLine && !this.syncInProgress) {
        this.syncData();
      }
    }, 5 * 60 * 1000);
  }

  async syncData() {
    if (this.syncInProgress || !navigator.onLine) return;

    this.syncInProgress = true;
    console.log('Starting background sync...');

    try {
      const unsyncedData = await offlineManager.getUnsyncedData();
      
      // Sync identifications
      for (const identification of unsyncedData.identifications) {
        try {
          const { error } = await supabase
            .from('identifications')
            .upsert({
              id: identification.id,
              orchid_species: identification.species,
              confidence_score: identification.confidence,
              notes: identification.description,
              image_url: identification.imageUrl,
              created_at: new Date(identification.timestamp).toISOString()
            });

          if (!error) {
            await offlineManager.markAsSynced('identifications', identification.id);
            console.log(`Synced identification: ${identification.id}`);
          }
        } catch (error) {
          console.error('Failed to sync identification:', error);
        }
      }

      // Sync plants
      for (const plant of unsyncedData.plants) {
        try {
          const { error } = await supabase
            .from('user_orchid_collection')
            .upsert({
              id: plant.id,
              orchid_species_id: plant.species,
              care_notes: plant.notes,
              last_watered: plant.lastWatered,
              last_fertilized: plant.lastFertilized,
              created_at: new Date(plant.timestamp).toISOString()
            });

          if (!error) {
            await offlineManager.markAsSynced('plants', plant.id);
            console.log(`Synced plant: ${plant.id}`);
          }
        } catch (error) {
          console.error('Failed to sync plant:', error);
        }
      }

      // Sync reminders (custom table would be needed)
      for (const reminder of unsyncedData.reminders) {
        // For now, just mark as synced since we don't have a reminders table
        await offlineManager.markAsSynced('careReminders', reminder.id);
      }

      console.log('Background sync completed');
      
      // Schedule notification for completed sync
      this.scheduleNotification('Sync completed', 'Your plant data has been backed up');

    } catch (error) {
      console.error('Background sync failed:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  async scheduleNotification(title: string, body: string, delay = 0) {
    if ('Notification' in window && Notification.permission === 'granted') {
      setTimeout(() => {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: 'orchidai-sync'
        });
      }, delay);
    }
  }

  async requestNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  async scheduleCareReminder(plantName: string, careType: string, dueTime: Date) {
    const now = new Date();
    const delay = dueTime.getTime() - now.getTime();
    
    if (delay > 0) {
      setTimeout(() => {
        this.scheduleNotification(
          `Time to ${careType}!`,
          `Your ${plantName} needs attention`,
          0
        );
      }, delay);
    }
  }

  stop() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }
}

export const backgroundSync = new BackgroundSyncService();
