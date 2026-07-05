import { render, screen } from '@testing-library/react';
import { HistoryList } from '@/features/history/components/history-list';

describe('HistoryList', () => {
  it('renders empty state when history is empty', () => {
    render(<HistoryList history={[]} />);

    expect(screen.getByText(/no requests yet/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to editor/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renders request analytics cards', () => {
    render(
      <HistoryList
        history={[
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
        ]}
      />,
    );

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(
      screen.getByText('https://api.example.com/users'),
    ).toBeInTheDocument();
    expect(screen.getByText('120ms')).toBeInTheDocument();
    expect(screen.getByText('2.0 KB')).toBeInTheDocument();
  });

  it('renders error details when present', () => {
    render(
      <HistoryList
        history={[
          {
            id: 'history-1',
            method: 'GET',
            url: 'https://api.example.com/missing',
            status: 404,
            duration: 80,
            requestSize: 0,
            responseSize: 120,
            timestamp: 1783114067708,
            errorDetails: 'Not Found',
          },
        ]}
      />,
    );

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
