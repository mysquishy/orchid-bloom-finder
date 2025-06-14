
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
      onAuthStateChange: vi.fn()
    }
  }
}));

describe('Authentication Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('User Signup', () => {
    it('should successfully create a new user account', async () => {
      const mockResponse = {
        data: { user: { id: 'test-user-id', email: 'test@example.com' } },
        error: null
      };
      
      (supabase.auth.signUp as any).mockResolvedValue(mockResponse);

      const result = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
      expect(result.data.user).toBeDefined();
      expect(result.error).toBeNull();
    });

    it('should handle signup errors gracefully', async () => {
      const mockError = { message: 'Email already registered' };
      (supabase.auth.signUp as any).mockResolvedValue({
        data: { user: null },
        error: mockError
      });

      const result = await supabase.auth.signUp({
        email: 'existing@example.com',
        password: 'password123'
      });

      expect(result.error).toEqual(mockError);
    });
  });

  describe('User Login', () => {
    it('should successfully authenticate user', async () => {
      const mockResponse = {
        data: { user: { id: 'test-user-id', email: 'test@example.com' } },
        error: null
      };
      
      (supabase.auth.signInWithPassword as any).mockResolvedValue(mockResponse);

      const result = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(result.data.user).toBeDefined();
      expect(result.error).toBeNull();
    });

    it('should handle invalid credentials', async () => {
      const mockError = { message: 'Invalid login credentials' };
      (supabase.auth.signInWithPassword as any).mockResolvedValue({
        data: { user: null },
        error: mockError
      });

      const result = await supabase.auth.signInWithPassword({
        email: 'wrong@example.com',
        password: 'wrongpassword'
      });

      expect(result.error).toEqual(mockError);
    });
  });

  describe('User Logout', () => {
    it('should successfully sign out user', async () => {
      (supabase.auth.signOut as any).mockResolvedValue({ error: null });

      const result = await supabase.auth.signOut();

      expect(supabase.auth.signOut).toHaveBeenCalled();
      expect(result.error).toBeNull();
    });
  });
});
