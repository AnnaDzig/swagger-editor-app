import { render, screen, waitFor } from '@testing-library/react';
import { AuthRouteGuard } from '@/features/auth/components/auth-route-guard';
import { useAppStore } from '@/store/app-store';

const replaceMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

describe('AuthRouteGuard', () => {
  beforeEach(() => {
    replaceMock.mockClear();
    useAppStore.setState({
      user: null,
      isAuthLoading: false,
    });
  });

  it('renders children for unauthenticated users', () => {
    render(
      <AuthRouteGuard>
        <div>Auth form</div>
      </AuthRouteGuard>,
    );

    expect(screen.getByText('Auth form')).toBeInTheDocument();
  });

  it('shows loading state while auth is loading', () => {
    useAppStore.setState({
      user: null,
      isAuthLoading: true,
    });

    render(
      <AuthRouteGuard>
        <div>Auth form</div>
      </AuthRouteGuard>,
    );

    expect(screen.getByText(/checking authentication/i)).toBeInTheDocument();
  });

  it('redirects authenticated users to main page', async () => {
    useAppStore.setState({
      user: {
        uid: 'user-1',
        email: 'user@example.com',
      },
      isAuthLoading: false,
    });

    render(
      <AuthRouteGuard>
        <div>Auth form</div>
      </AuthRouteGuard>,
    );

    expect(screen.getByText(/redirecting/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/');
    });
  });
});
