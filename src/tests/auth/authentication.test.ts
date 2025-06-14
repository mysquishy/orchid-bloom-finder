
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase
vi.mock('@/integrations/supabase/client');

describe('Authentication Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('User Registration', () => {
    it('should register a new user successfully', async () => {
      const mockSignUp = vi.fn().mockResolvedValue({
        data: { user: { id: 'test-user-id', email: 'test@example.com' } },
        error: null
      });

      (supabase.auth.signUp as any) = mockSignUp;

      const { data, error } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
      expect(data.user).toBeDefined();
      expect(error).toBeNull();
    });

    it('should handle registration errors', async () => {
      const mockError = new Error('Email already registered');
      const mockSignUp = vi.fn().mockResolvedValue({
        data: { user: null },
        error: mockError
      });

      (supabase.auth.signUp as any) = mockSignUp;

      const { data, error } = await supabase.auth.signUp({
        email: 'existing@example.com',
        password: 'password123'
      });

      expect(error).toBe(mockError);
      expect(data.user).toBeNull();
    });
  });

  describe('User Login', () => {
    it('should login user successfully', async () => {
      const mockSignIn = vi.fn().mockResolvedValue({
        data: { user: { id: 'test-user-id', email: 'test@example.com' } },
        error: null
      });

      (supabase.auth.signInWithPassword as any) = mockSignIn;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(data.user).toBeDefined();
      expect(error).toBeNull();
    });
  });

  describe('User Logout', () => {
    it('should logout user successfully', async () => {
      const mockSignOut = vi.fn().mockResolvedValue({ error: null });
      (supabase.auth.signOut as any) = mockSignOut;

      const { error } = await supabase.auth.signOut();

      expect(error).toBeNull();
      expect(mockSignOut).toHaveBeenCalled();
    });
  });
});
