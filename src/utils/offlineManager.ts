
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface OrchidAIDB extends DBSchema {
  identifications: {
    key: string;
    value: {
      id: string;
      species: string;
      commonName: string;
      confidence: number;
      description: string;
      careInstructions: string[];
      characteristics: string[];
      imageUrl: string;
      timestamp: number;
      synced: boolean;
    };
    indexes: { 'by-synced': boolean; 'by-timestamp': number };
  };
  plants: {
    key: string;
    value: {
      id: string;
      name: string;
      species: string;
      lastWatered: string;
      lastFertilized: string;
      notes: string;
      imageUrl: string;
      careSchedule: {
        watering: number;
        fertilizing: number;
      };
      timestamp: number;
      synced: boolean;
    };
    indexes: { 'by-synced': boolean; 'by-timestamp': number };
  };
  careReminders: {
    key: string;
    value: {
      id: string;
      plantId: string;
      type: 'watering' | 'fertilizing' | 'repotting' | 'checkup';
      dueDate: string;
      completed: boolean;
      timestamp: number;
      synced: boolean;
    };
    indexes: { 'by-synced': boolean; 'by-due-date': string };
  };
}

class OfflineManager {
  private db: IDBPDatabase<OrchidAIDB> | null = null;
  private isOnline: boolean = navigator.onLine;

  constructor() {
    this.initDB();
    this.setupOnlineListener();
  }

  private async initDB() {
    try {
      this.db = await openDB<OrchidAIDB>('OrchidAI', 1, {
        upgrade(db) {
          // Identifications store
          const identificationStore = db.createObjectStore('identifications', {
            keyPath: 'id'
          });
          identificationStore.createIndex('by-synced', 'synced');
          identificationStore.createIndex('by-timestamp', 'timestamp');

          // Plants store
          const plantsStore = db.createObjectStore('plants', {
            keyPath: 'id'
          });
          plantsStore.createIndex('by-synced', 'synced');
          plantsStore.createIndex('by-timestamp', 'timestamp');

          // Care reminders store
          const remindersStore = db.createObjectStore('careReminders', {
            keyPath: 'id'
          });
          remindersStore.createIndex('by-synced', 'synced');
          remindersStore.createIndex('by-due-date', 'dueDate');
        }
      });
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);
    }
  }

  private setupOnlineListener() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncPendingData();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Store identification offline
  async storeIdentification(identification: any) {
    if (!this.db) return false;

    try {
      const data = {
        ...identification,
        timestamp: Date.now(),
        synced: this.isOnline
      };

      await this.db.add('identifications', data);
      
      if (this.isOnline) {
        this.syncIdentifications();
      }

      return true;
    } catch (error) {
      console.error('Failed to store identification:', error);
      return false;
    }
  }

  // Get all stored identifications
  async getStoredIdentifications() {
    if (!this.db) return [];

    try {
      return await this.db.getAll('identifications');
    } catch (error) {
      console.error('Failed to get identifications:', error);
      return [];
    }
  }

  // Store plant data offline
  async storePlant(plant: any) {
    if (!this.db) return false;

    try {
      const data = {
        ...plant,
        timestamp: Date.now(),
        synced: this.isOnline
      };

      await this.db.put('plants', data);
      
      if (this.isOnline) {
        this.syncPlants();
      }

      return true;
    } catch (error) {
      console.error('Failed to store plant:', error);
      return false;
    }
  }

  // Get all stored plants
  async getStoredPlants() {
    if (!this.db) return [];

    try {
      return await this.db.getAll('plants');
    } catch (error) {
      console.error('Failed to get plants:', error);
      return [];
    }
  }

  // Store care reminder offline
  async storeCareReminder(reminder: any) {
    if (!this.db) return false;

    try {
      const data = {
        ...reminder,
        timestamp: Date.now(),
        synced: this.isOnline
      };

      await this.db.put('careReminders', data);
      
      if (this.isOnline) {
        this.syncCareReminders();
      }

      return true;
    } catch (error) {
      console.error('Failed to store care reminder:', error);
      return false;
    }
  }

  // Get unsynced data for background sync
  async getUnsyncedData() {
    if (!this.db) return { identifications: [], plants: [], careReminders: [] };

    try {
      const [identifications, plants, careReminders] = await Promise.all([
        this.db.getAllFromIndex('identifications', 'by-synced', false),
        this.db.getAllFromIndex('plants', 'by-synced', false),
        this.db.getAllFromIndex('careReminders', 'by-synced', false)
      ]);

      return { identifications, plants, careReminders };
    } catch (error) {
      console.error('Failed to get unsynced data:', error);
      return { identifications: [], plants: [], careReminders: [] };
    }
  }

  // Sync pending data when online
  private async syncPendingData() {
    if (!this.isOnline || !this.db) return;

    try {
      await Promise.all([
        this.syncIdentifications(),
        this.syncPlants(),
        this.syncCareReminders()
      ]);
    } catch (error) {
      console.error('Failed to sync pending data:', error);
    }
  }

  private async syncIdentifications() {
    if (!this.db) return;

    try {
      const unsyncedData = await this.db.getAllFromIndex('identifications', 'by-synced', false);
      
      for (const item of unsyncedData) {
        // Here you would sync with your backend API
        // For now, we'll just mark as synced
        await this.db.put('identifications', { ...item, synced: true });
      }
    } catch (error) {
      console.error('Failed to sync identifications:', error);
    }
  }

  private async syncPlants() {
    if (!this.db) return;

    try {
      const unsyncedData = await this.db.getAllFromIndex('plants', 'by-synced', false);
      
      for (const item of unsyncedData) {
        // Here you would sync with your backend API
        await this.db.put('plants', { ...item, synced: true });
      }
    } catch (error) {
      console.error('Failed to sync plants:', error);
    }
  }

  private async syncCareReminders() {
    if (!this.db) return;

    try {
      const unsyncedData = await this.db.getAllFromIndex('careReminders', 'by-synced', false);
      
      for (const item of unsyncedData) {
        // Here you would sync with your backend API
        await this.db.put('careReminders', { ...item, synced: true });
      }
    } catch (error) {
      console.error('Failed to sync care reminders:', error);
    }
  }

  // Check if device is online
  isDeviceOnline(): boolean {
    return this.isOnline;
  }

  // Get sync status
  async getSyncStatus() {
    if (!this.db) return { pending: 0, synced: 0 };

    try {
      const [unsyncedIdentifications, unsyncedPlants, unsyncedReminders] = await Promise.all([
        this.db.getAllFromIndex('identifications', 'by-synced', false),
        this.db.getAllFromIndex('plants', 'by-synced', false),
        this.db.getAllFromIndex('careReminders', 'by-synced', false)
      ]);

      const pending = unsyncedIdentifications.length + unsyncedPlants.length + unsyncedReminders.length;
      
      const [allIdentifications, allPlants, allReminders] = await Promise.all([
        this.db.getAll('identifications'),
        this.db.getAll('plants'),
        this.db.getAll('careReminders')
      ]);

      const total = allIdentifications.length + allPlants.length + allReminders.length;
      const synced = total - pending;

      return { pending, synced };
    } catch (error) {
      console.error('Failed to get sync status:', error);
      return { pending: 0, synced: 0 };
    }
  }
}

export const offlineManager = new OfflineManager();
