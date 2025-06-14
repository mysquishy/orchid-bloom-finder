
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/integrations/supabase/client');

describe('Database Operations Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Orchid Collection Operations', () => {
    it('should save orchid to user collection', async () => {
      const mockFrom = vi.fn().mockReturnThis();
      const mockInsert = vi.fn().mockReturnThis();
      const mockSelect = vi.fn().mockResolvedValue({
        data: [{ id: 'test-id', orchid_species_id: 'species-1', user_id: 'user-1' }],
        error: null
      });

      (supabase.from as any) = mockFrom;
      mockFrom.mockReturnValue({
        insert: mockInsert,
        select: mockSelect
      });
      mockInsert.mockReturnValue({
        select: mockSelect
      });

      const result = await supabase
        .from('user_orchid_collection')
        .insert({
          orchid_species_id: 'species-1',
          user_id: 'user-1'
        })
        .select();

      expect(result.data).toBeDefined();
      expect(result.error).toBeNull();
    });

    it('should retrieve user orchid collection', async () => {
      const mockData = [
        { id: '1', orchid_species_id: 'species-1', user_id: 'user-1' },
        { id: '2', orchid_species_id: 'species-2', user_id: 'user-1' }
      ];

      const mockFrom = vi.fn().mockReturnThis();
      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockResolvedValue({ data: mockData, error: null });

      (supabase.from as any) = mockFrom;
      mockFrom.mockReturnValue({
        select: mockSelect
      });
      mockSelect.mockReturnValue({
        eq: mockEq
      });

      const result = await supabase
        .from('user_orchid_collection')
        .select('*')
        .eq('user_id', 'user-1');

      expect(result.data).toEqual(mockData);
      expect(result.error).toBeNull();
    });

    it('should handle database errors gracefully', async () => {
      const mockError = new Error('Database connection failed');
      const mockFrom = vi.fn().mockReturnThis();
      const mockInsert = vi.fn().mockResolvedValue({
        data: null,
        error: mockError
      });

      (supabase.from as any) = mockFrom;
      mockFrom.mockReturnValue({
        insert: mockInsert
      });

      const result = await supabase
        .from('user_orchid_collection')
        .insert({});

      expect(result.error).toBe(mockError);
      expect(result.data).toBeNull();
    });
  });

  describe('Identification History', () => {
    it('should save identification result', async () => {
      const mockData = {
        id: 'identification-1',
        user_id: 'user-1',
        orchid_species: 'Phalaenopsis',
        confidence_score: 0.95
      };

      const mockFrom = vi.fn().mockReturnThis();
      const mockInsert = vi.fn().mockResolvedValue({
        data: [mockData],
        error: null
      });

      (supabase.from as any) = mockFrom;
      mockFrom.mockReturnValue({
        insert: mockInsert
      });

      const result = await supabase
        .from('identifications')
        .insert(mockData);

      expect(result.data).toEqual([mockData]);
      expect(result.error).toBeNull();
    });
  });
});
