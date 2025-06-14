
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    
    render(<PhotoCapture onImageCapture={mockOnImageCapture} onCancel={() => {}} />);

    // Test file input
    const fileInput = screen.getByLabelText(/choose from gallery/i);
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    await waitFor(() => {
      expect(mockOnImageCapture).toHaveBeenCalledWith(mockFile);
    });
  });

  it('should validate file types', async () => {
    const mockOnImageCapture = vi.fn();
    const invalidFile = new File(['test'], 'document.pdf', { type: 'application/pdf' });
    
    render(<PhotoCapture onImageCapture={mockOnImageCapture} onCancel={() => {}} />);

    const fileInput = screen.getByLabelText(/choose from gallery/i);
    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    await waitFor(() => {
      expect(mockOnImageCapture).not.toHaveBeenCalled();
    });
  });

  it('should handle large file sizes', async () => {
    const mockOnImageCapture = vi.fn();
    // Create a mock large file (>10MB)
    const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    
    render(<PhotoCapture onImageCapture={mockOnImageCapture} onCancel={() => {}} />);

    const fileInput = screen.getByLabelText(/choose from gallery/i);
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    await waitFor(() => {
      expect(mockOnImageCapture).not.toHaveBeenCalled();
    });
  });
});
