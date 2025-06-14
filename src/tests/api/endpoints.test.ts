
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock fetch
global.fetch = vi.fn();

describe('API Endpoint Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Identification API', () => {
    it('should successfully identify orchid from image', async () => {
      const mockResponse = {
        species: 'Phalaenopsis amabilis',
        confidence: 0.95,
        care_instructions: 'Water weekly'
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const formData = new FormData();
      formData.append('image', new File(['test'], 'orchid.jpg'));

      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      expect(fetch).toHaveBeenCalledWith('/api/identify', {
        method: 'POST',
        body: formData
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      const response = await fetch('/api/identify', {
        method: 'POST',
        body: new FormData()
      });

      expect(response.ok).toBe(false);
      expect(response.status).toBe(500);
    });
  });

  describe('Species Database API', () => {
    it('should fetch species information', async () => {
      const mockSpecies = {
        id: '1',
        scientific_name: 'Phalaenopsis amabilis',
        care_level: 'beginner'
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSpecies)
      });

      const response = await fetch('/api/species/1');
      const result = await response.json();

      expect(result).toEqual(mockSpecies);
    });
  });

  describe('User Collection API', () => {
    it('should save orchid to user collection', async () => {
      const mockSaveResponse = { success: true, id: 'new-orchid-id' };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSaveResponse)
      });

      const orchidData = {
        species_name: 'Phalaenopsis',
        photo_url: 'https://example.com/photo.jpg'
      };

      const response = await fetch('/api/collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orchidData)
      });

      const result = await response.json();

      expect(result).toEqual(mockSaveResponse);
    });
  });
});
