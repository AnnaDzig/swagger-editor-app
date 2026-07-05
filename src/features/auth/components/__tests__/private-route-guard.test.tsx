import { render, screen, waitFor } from '@testing-library/react';
import { PrivateRouteGuard } from '@/features/auth/components/private-route-guard';
import { useAppStore } from '@/store/app-store';

const replaceMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

describe('PrivateRouteGuard', () => {
  beforeEach(() => {
    replaceMock.mockClear();
    useAppStore.setState({
      user: null,
      isAuthLoading: false,
    });
  });

  it('renders children for authenticated users', () => {
    useAppStore.setState({
      user: {
        uid: 'user-1',
        email: 'user@example.com',
      },
      isAuthLoading: false,
    });

    render(
      <PrivateRouteGuard>
        <div>Private content</div>
      </PrivateRouteGuard>,
    );

    expect(screen.getByText('Private content')).toBeInTheDocument();
  });

  it('shows loading state while auth is loading', () => {
    useAppStore.setState({
      user: null,
      isAuthLoading: true,
    });

    render(
      <PrivateRouteGuard>
        <div>Private content</div>
      </PrivateRouteGuard>,
    );

    expect(screen.getByText(/checking authentication/i)).toBeInTheDocument();
  });

  it('redirects unauthenticated users to main page', async () => {
    render(
      <PrivateRouteGuard>
        <div>Private content</div>
      </PrivateRouteGuard>,
    );

    expect(screen.getByText(/redirecting/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/');
    });
  });
});
