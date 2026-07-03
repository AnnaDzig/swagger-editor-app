import { render, screen } from '@testing-library/react';
import HistoryPage from '@/app/history/page';

vi.mock('@/features/auth/components/private-route-guard', () => ({
  PrivateRouteGuard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="private-route-guard">{children}</div>
  ),
}));

describe('HistoryPage', () => {
  it('renders history page inside private route guard', () => {
    render(<HistoryPage />);

    expect(screen.getByTestId('private-route-guard')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /request history/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/no requests yet/i)).toBeInTheDocument();
  });
});
