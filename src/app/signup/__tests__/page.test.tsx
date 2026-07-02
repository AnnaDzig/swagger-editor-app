import { render, screen } from '@testing-library/react';
import SignUpPage from '@/app/signup/page';

describe('SignUpPage', () => {
  it('renders sign up page', () => {
    render(<SignUpPage />);

    expect(
      screen.getByRole('heading', { name: /create account/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
