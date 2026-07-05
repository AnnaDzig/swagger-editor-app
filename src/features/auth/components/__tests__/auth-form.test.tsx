import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthForm } from '@/features/auth/components/auth-form';

describe('AuthForm', () => {
  it('renders sign in form content', () => {
    render(<AuthForm mode="sign-in" />);

    expect(
      screen.getByRole('heading', { name: /sign in/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /create one/i })).toHaveAttribute(
      'href',
      '/signup',
    );
  });

  it('renders sign up form content', () => {
    render(<AuthForm mode="sign-up" />);

    expect(
      screen.getByRole('heading', { name: /create account/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create account/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute(
      'href',
      '/signin',
    );
  });

  it('shows validation errors for invalid values', async () => {
    const user = userEvent.setup();

    render(<AuthForm mode="sign-in" />);

    await user.type(screen.getByLabelText(/email/i), 'wrong-email');
    await user.type(screen.getByLabelText(/password/i), '123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    expect(alerts[1]).toHaveTextContent(/at least 8 characters/i);
  });
  it('does not show validation errors for valid values', async () => {
    const user = userEvent.setup();

    render(<AuthForm mode="sign-in" />);

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Strong1!');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(
      screen.queryByText(/please enter a valid email address/i),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(/password must be at least 8 characters/i),
    ).not.toBeInTheDocument();
  });
});
