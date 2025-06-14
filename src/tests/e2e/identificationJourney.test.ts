
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';

// Mock components and services
vi.mock('@/integrations/supabase/client');
vi.mock('@/components/LoadingAnalysis');

describe('End-to-End Identification Journey', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should complete full identification workflow', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Step 1: User lands on homepage
    expect(screen.getByText('Identify Your Orchid')).toBeInTheDocument();

    // Step 2: User uploads a photo
    const uploadButton = screen.getByText('Upload Photo');
    fireEvent.click(uploadButton);

    // Step 3: Photo is processed (mock successful identification)
    await waitFor(() => {
      expect(screen.getByText('Analyzing')).toBeInTheDocument();
    });

    // Step 4: Results are displayed
    await waitFor(() => {
      expect(screen.getByText('Identification Complete')).toBeInTheDocument();
    }, { timeout: 5000 });

    // Step 5: User can save to garden
    const saveButton = screen.getByText('Save to Garden');
    expect(saveButton).toBeInTheDocument();
  });

  it('should handle identification errors gracefully', async () => {
    // Mock failed identification
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const uploadButton = screen.getByText('Upload Photo');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });
});
