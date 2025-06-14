
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Step 1: User lands on homepage
    expect(getByText('Identify Your Orchid')).toBeInTheDocument();

    // Step 2: User uploads a photo
    const uploadButton = getByText('Upload Photo');
    await userEvent.click(uploadButton);

    // Step 3: Photo is processed (mock successful identification)
    await vi.waitFor(() => {
      expect(getByText('Analyzing')).toBeInTheDocument();
    });

    // Step 4: Results are displayed
    await vi.waitFor(() => {
      expect(getByText('Identification Complete')).toBeInTheDocument();
    }, { timeout: 5000 });

    // Step 5: User can save to garden
    const saveButton = getByText('Save to Garden');
    expect(saveButton).toBeInTheDocument();
  });

  it('should handle identification errors gracefully', async () => {
    // Mock failed identification
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const uploadButton = getByText('Upload Photo');
    await userEvent.click(uploadButton);

    await vi.waitFor(() => {
      expect(getByText('Error')).toBeInTheDocument();
    });
  });
});
