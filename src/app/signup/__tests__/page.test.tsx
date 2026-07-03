import { render, screen } from '@testing-library/react';
import SignUpPage from '@/app/signup/page';

vi.mock('@/features/auth/components/sign-up-form', () => ({
  SignUpForm: () => <div data-testid="sign-up-form">Sign up form</div>,
}));

describe('SignUpPage', () => {
  it('renders sign up page', () => {
    render(<SignUpPage />);

    expect(screen.getByTestId('sign-up-form')).toBeInTheDocument();
  });
});
