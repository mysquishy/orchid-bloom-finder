
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PhotoCapture from '@/components/PhotoCapture';

// Mock file upload
const mockFile = new File(['test image'], 'orchid.jpg', { type: 'image/jpeg' });

describe('Photo Upload Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-url');
  });

  it('should handle photo capture workflow', async () => {
    const mockOnImageCapture = vi.fn();
    
    const { getByLabelText } = render(<PhotoCapture onImageCapture={mockOnImageCapture} onCancel={() => {}} />);

    // Test file input
    const fileInput = getByLabelText('Choose from gallery');
    await userEvent.upload(fileInput, mockFile);

    await vi.waitFor(() => {
      expect(mockOnImageCapture).toHaveBeenCalledWith(mockFile);
    });
  });

  it('should validate file types', async () => {
    const mockOnImageCapture = vi.fn();
    const invalidFile = new File(['test'], 'document.pdf', { type: 'application/pdf' });
    
    const { getByLabelText } = render(<PhotoCapture onImageCapture={mockOnImageCapture} onCancel={() => {}} />);

    const fileInput = getByLabelText('Choose from gallery');
    await userEvent.upload(fileInput, invalidFile);

    await vi.waitFor(() => {
      expect(mockOnImageCapture).not.toHaveBeenCalled();
    });
  });

  it('should handle large file sizes', async () => {
    const mockOnImageCapture = vi.fn();
    // Create a mock large file (>10MB)
    const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    
    const { getByLabelText } = render(<PhotoCapture onImageCapture={mockOnImageCapture} onCancel={() => {}} />);

    const fileInput = getByLabelText('Choose from gallery');
    await userEvent.upload(fileInput, largeFile);

    await vi.waitFor(() => {
      expect(mockOnImageCapture).not.toHaveBeenCalled();
    });
  });
});
