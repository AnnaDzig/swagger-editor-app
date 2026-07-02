import { render, screen } from '@testing-library/react';
import SignInPage from '@/app/signin/page';

describe('SignInPage', () => {
  it('renders sign in page', () => {
    render(<SignInPage />);

    expect(
      screen.getByRole('heading', { name: /sign in/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
