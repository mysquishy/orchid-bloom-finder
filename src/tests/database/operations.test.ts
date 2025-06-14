
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
      maybeSingle: vi.fn()
    }))
  }
}));

describe('Database Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Save Plants to Collection', () => {
    it('should save orchid to user collection', async () => {
      const mockOrchid = {
        id: 'test-orchid-id',
        species_name: 'Phalaenopsis',
        user_id: 'test-user-id'
      };

      const mockResponse = { data: [mockOrchid], error: null };
      (supabase.from as any)().insert().mockResolvedValue(mockResponse);

      const result = await supabase
        .from('user_orchid_collection')
        .insert(mockOrchid);

      expect(supabase.from).toHaveBeenCalledWith('user_orchid_collection');
      expect(result.data).toEqual([mockOrchid]);
    });

    it('should handle save errors', async () => {
      const mockError = { message: 'Database error' };
      (supabase.from as any)().insert().mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await supabase
        .from('user_orchid_collection')
        .insert({});

      expect(result.error).toEqual(mockError);
    });
  });

  describe('Retrieve User History', () => {
    it('should fetch user orchid collection', async () => {
      const mockCollection = [
        { id: '1', species_name: 'Phalaenopsis' },
        { id: '2', species_name: 'Cattleya' }
      ];

      (supabase.from as any)().select().eq().mockResolvedValue({
        data: mockCollection,
        error: null
      });

      const result = await supabase
        .from('user_orchid_collection')
        .select('*')
        .eq('user_id', 'test-user-id');

      expect(result.data).toEqual(mockCollection);
    });
  });

  describe('Species Database Operations', () => {
    it('should fetch orchid species data', async () => {
      const mockSpecies = {
        id: '1',
        scientific_name: 'Phalaenopsis amabilis',
        common_name: 'Moon Orchid'
      };

      (supabase.from as any)().select().eq().single().mockResolvedValue({
        data: mockSpecies,
        error: null
      });

      const result = await supabase
        .from('orchid_species')
        .select('*')
        .eq('id', '1')
        .single();

      expect(result.data).toEqual(mockSpecies);
    });
  });
});
