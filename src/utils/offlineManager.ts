
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
    indexes: {
      timestamp: number;
      synced: boolean;
    };
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
        watering: number; // days
        fertilizing: number; // days
      };
      timestamp: number;
      synced: boolean;
    };
    indexes: {
      timestamp: number;
      synced: boolean;
    };
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
    indexes: {
      plantId: string;
      dueDate: string;
      synced: boolean;
    };
  };
}

type StoreNames = keyof OrchidAIDB;

class OfflineManager {
  private db: IDBPDatabase<OrchidAIDB> | null = null;

  async init() {
    if (this.db) return this.db;

    this.db = await openDB<OrchidAIDB>('OrchidAI', 1, {
      upgrade(db) {
        // Identifications store
        if (!db.objectStoreNames.contains('identifications')) {
          const identificationStore = db.createObjectStore('identifications', { keyPath: 'id' });
          identificationStore.createIndex('timestamp', 'timestamp');
          identificationStore.createIndex('synced', 'synced');
        }

        // Plants store
        if (!db.objectStoreNames.contains('plants')) {
          const plantsStore = db.createObjectStore('plants', { keyPath: 'id' });
          plantsStore.createIndex('timestamp', 'timestamp');
          plantsStore.createIndex('synced', 'synced');
        }

        // Care reminders store
        if (!db.objectStoreNames.contains('careReminders')) {
          const remindersStore = db.createObjectStore('careReminders', { keyPath: 'id' });
          remindersStore.createIndex('plantId', 'plantId');
          remindersStore.createIndex('dueDate', 'dueDate');
          remindersStore.createIndex('synced', 'synced');
        }
      },
    });

    return this.db;
  }

  // Identification methods
  async saveIdentification(identification: OrchidAIDB['identifications']['value']) {
    const db = await this.init();
    await db.put('identifications', identification);
  }

  async getIdentifications() {
    const db = await this.init();
    return db.getAll('identifications');
  }

  async getIdentification(id: string) {
    const db = await this.init();
    return db.get('identifications', id);
  }

  // Plant methods
  async savePlant(plant: OrchidAIDB['plants']['value']) {
    const db = await this.init();
    await db.put('plants', plant);
  }

  async getPlants() {
    const db = await this.init();
    return db.getAll('plants');
  }

  async getPlant(id: string) {
    const db = await this.init();
    return db.get('plants', id);
  }

  // Care reminder methods
  async saveReminder(reminder: OrchidAIDB['careReminders']['value']) {
    const db = await this.init();
    await db.put('careReminders', reminder);
  }

  async getReminders() {
    const db = await this.init();
    return db.getAll('careReminders');
  }

  async getPlantReminders(plantId: string) {
    const db = await this.init();
    return db.getAllFromIndex('careReminders', 'plantId', plantId);
  }

  async getUpcomingReminders() {
    const db = await this.init();
    const all = await db.getAll('careReminders');
    const today = new Date().toISOString().split('T')[0];
    
    return all.filter(reminder => 
      !reminder.completed && 
      reminder.dueDate <= today
    ).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }

  // Sync methods
  async getUnsyncedData() {
    const db = await this.init();
    
    const [identifications, plants, reminders] = await Promise.all([
      db.getAllFromIndex('identifications', 'synced', false),
      db.getAllFromIndex('plants', 'synced', false),
      db.getAllFromIndex('careReminders', 'synced', false)
    ]);

    return { identifications, plants, reminders };
  }

  async markAsSynced(store: StoreNames, id: string) {
    const db = await this.init();
    
    if (store === 'identifications') {
      const item = await db.get('identifications', id);
      if (item) {
        await db.put('identifications', { ...item, synced: true });
      }
    } else if (store === 'plants') {
      const item = await db.get('plants', id);
      if (item) {
        await db.put('plants', { ...item, synced: true });
      }
    } else if (store === 'careReminders') {
      const item = await db.get('careReminders', id);
      if (item) {
        await db.put('careReminders', { ...item, synced: true });
      }
    }
  }

  async clearSyncedData() {
    const db = await this.init();
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    
    // Handle identifications
    const syncedIdentifications = await db.getAllFromIndex('identifications', 'synced', true);
    for (const item of syncedIdentifications) {
      if (item.timestamp < thirtyDaysAgo) {
        await db.delete('identifications', item.id);
      }
    }

    // Handle plants
    const syncedPlants = await db.getAllFromIndex('plants', 'synced', true);
    for (const item of syncedPlants) {
      if (item.timestamp < thirtyDaysAgo) {
        await db.delete('plants', item.id);
      }
    }

    // Handle care reminders
    const syncedReminders = await db.getAllFromIndex('careReminders', 'synced', true);
    for (const item of syncedReminders) {
      if (item.timestamp < thirtyDaysAgo) {
        await db.delete('careReminders', item.id);
      }
    }
  }

  // Export/Import for backup
  async exportData() {
    const db = await this.init();
    
    const [identifications, plants, reminders] = await Promise.all([
      db.getAll('identifications'),
      db.getAll('plants'),
      db.getAll('careReminders')
    ]);

    return {
      identifications,
      plants,
      reminders,
      exportDate: new Date().toISOString()
    };
  }

  async importData(data: any) {
    const db = await this.init();
    const tx = db.transaction(['identifications', 'plants', 'careReminders'], 'readwrite');
    
    // Clear existing data
    await tx.objectStore('identifications').clear();
    await tx.objectStore('plants').clear();
    await tx.objectStore('careReminders').clear();
    
    // Import new data
    if (data.identifications) {
      for (const item of data.identifications) {
        await tx.objectStore('identifications').put(item);
      }
    }
    
    if (data.plants) {
      for (const item of data.plants) {
        await tx.objectStore('plants').put(item);
      }
    }
    
    if (data.reminders) {
      for (const item of data.reminders) {
        await tx.objectStore('careReminders').put(item);
      }
    }
    
    await tx.done;
  }

  // Storage management
  async getStorageUsage() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      return await navigator.storage.estimate();
    }
    return null;
  }

  async requestPersistentStorage() {
    if ('storage' in navigator && 'persist' in navigator.storage) {
      return await navigator.storage.persist();
    }
    return false;
  }
}

export const offlineManager = new OfflineManager();
