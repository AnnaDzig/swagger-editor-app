import { render, screen } from '@testing-library/react';
import SignInPage from '@/app/signin/page';

vi.mock('@/features/auth/components/sign-in-form', () => ({
  SignInForm: () => <div data-testid="sign-in-form">Sign in form</div>,
}));

describe('SignInPage', () => {
  it('renders sign in page', () => {
    render(<SignInPage />);

    expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
  });
});
