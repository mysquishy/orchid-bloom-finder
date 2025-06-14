
import { supabase } from '@/integrations/supabase/client';

export interface SystemMetrics {
  totalSpecies: number;
  totalUsers: number;
  totalCollections: number;
  totalIdentifications: number;
  popularSpeciesCount: number;
  userContributedCount: number;
  recentSignups7d: number;
  recentIdentifications7d: number;
}

export const getSystemMetrics = async (): Promise<SystemMetrics | null> => {
  try {
    const { data, error } = await supabase.rpc('get_database_stats');
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      const stats = data[0];
      return {
        totalSpecies: Number(stats.total_species),
        totalUsers: Number(stats.total_users),
        totalCollections: Number(stats.total_collections),
        totalIdentifications: Number(stats.total_identifications),
        popularSpeciesCount: Number(stats.popular_species_count),
        userContributedCount: Number(stats.user_contributed_count),
        recentSignups7d: Number(stats.recent_signups_7d),
        recentIdentifications7d: Number(stats.recent_identifications_7d)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get system metrics:', error);
    return null;
  }
};

export const validateDatabaseData = async () => {
  try {
    const { data, error } = await supabase.rpc('validate_orchid_data');
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Failed to validate database data:', error);
    return [];
  }
};

export const cleanupOldData = async () => {
  try {
    const { error } = await supabase.rpc('cleanup_old_analytics');
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Failed to cleanup old data:', error);
    return { success: false, error: error.message };
  }
};

export const checkSystemHealth = async () => {
  try {
    // Basic health check by trying to fetch from each main table
    const promises = [
      supabase.from('orchid_species').select('id').limit(1),
      supabase.from('profiles').select('id').limit(1),
      supabase.from('user_orchid_collection').select('id').limit(1),
      supabase.from('identifications').select('id').limit(1)
    ];

    const results = await Promise.allSettled(promises);
    
    const health = {
      orchid_species: results[0].status === 'fulfilled',
      profiles: results[1].status === 'fulfilled',
      user_orchid_collection: results[2].status === 'fulfilled',
      identifications: results[3].status === 'fulfilled',
      overall: results.every(result => result.status === 'fulfilled')
    };

    return health;
  } catch (error) {
    console.error('System health check failed:', error);
    return {
      orchid_species: false,
      profiles: false,
      user_orchid_collection: false,
      identifications: false,
      overall: false
    };
  }
};
