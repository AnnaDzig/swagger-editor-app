import { render, screen } from '@testing-library/react';
import SignUpPage from '@/app/signup/page';

vi.mock('@/features/auth/components/auth-route-guard', () => ({
  AuthRouteGuard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-route-guard">{children}</div>
  ),
}));

vi.mock('@/features/auth/components/sign-up-form', () => ({
  SignUpForm: () => <div data-testid="sign-up-form">Sign up form</div>,
}));

describe('SignUpPage', () => {
  it('renders sign up page inside auth route guard', () => {
    render(<SignUpPage />);

    expect(screen.getByTestId('auth-route-guard')).toBeInTheDocument();
    expect(screen.getByTestId('sign-up-form')).toBeInTheDocument();
  });
});
