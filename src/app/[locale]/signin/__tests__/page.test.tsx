import { render, screen } from '@testing-library/react';
import SignInPage from '@/app/signin/page';

vi.mock('@/features/auth/components/auth-route-guard', () => ({
  AuthRouteGuard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-route-guard">{children}</div>
  ),
}));

vi.mock('@/features/auth/components/sign-in-form', () => ({
  SignInForm: () => <div data-testid="sign-in-form">Sign in form</div>,
}));

describe('SignInPage', () => {
  it('renders sign in page inside auth route guard', () => {
    render(<SignInPage />);

    expect(screen.getByTestId('auth-route-guard')).toBeInTheDocument();
    expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
  });
});
