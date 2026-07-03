import { render, screen, waitFor } from '@testing-library/react';
import { HistoryView } from '@/features/history/components/history-view';
import { getCurrentUserHistory } from '@/features/history/api/history-client';

vi.mock('@/features/history/api/history-client', () => ({
  getCurrentUserHistory: vi.fn(),
}));

const getCurrentUserHistoryMock = vi.mocked(getCurrentUserHistory);

describe('HistoryView', () => {
  beforeEach(() => {
    getCurrentUserHistoryMock.mockReset();
  });

  it('shows loading state before history is loaded', () => {
    getCurrentUserHistoryMock.mockReturnValue(new Promise(() => {}));

    render(<HistoryView />);

    expect(screen.getByText(/loading request history/i)).toBeInTheDocument();
  });

  it('renders empty state when user has no request history', async () => {
    getCurrentUserHistoryMock.mockResolvedValue([]);

    render(<HistoryView />);

    await waitFor(() => {
      expect(screen.getByText(/no requests yet/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('link', { name: /go to editor/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renders loaded request history', async () => {
    getCurrentUserHistoryMock.mockResolvedValue([
      {
        id: 'history-1',
        method: 'GET',
        url: 'https://api.example.com/users',
        status: 200,
        duration: 120,
        requestSize: 0,
        responseSize: 2048,
        timestamp: 1783114067708,
      },
    ]);

    render(<HistoryView />);

    await waitFor(() => {
      expect(
        screen.getByText('https://api.example.com/users'),
      ).toBeInTheDocument();
    });

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('120ms')).toBeInTheDocument();
    expect(screen.getByText('2.0 KB')).toBeInTheDocument();
  });

  it('renders error state when history loading fails', async () => {
    getCurrentUserHistoryMock.mockRejectedValue(new Error('Failed'));

    render(<HistoryView />);

    await waitFor(() => {
      expect(
        screen.getByRole('alert', {
          name: '',
        }),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(/could not load request history/i),
    ).toBeInTheDocument();
  });
});
