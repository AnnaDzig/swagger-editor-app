import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as authApi from '@/features/auth/api/auth-client';
import { useRouter } from 'next/navigation';
import { SignInForm } from '../../features/auth/components/sign-in-form';

interface AuthFormProps {
  onSubmit: (data: Record<string, string>) => void;
}

type RouterInstance = ReturnType<typeof useRouter>;

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/features/auth/api/auth-client', () => ({
  signInWithEmail: vi.fn(),
}));

vi.mock('@/features/auth/components/auth-form', () => ({
  AuthForm: ({ onSubmit }: AuthFormProps) => (
    <button onClick={() => onSubmit({ email: 't@t.com', password: '123' })}>
      Submit
    </button>
  ),
}));

describe('SignInForm', () => {
  it('should redirect on successful sign in', async () => {
    const pushMock = vi.fn();

    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
    } as unknown as RouterInstance);

    vi.mocked(authApi.signInWithEmail).mockResolvedValue(undefined);

    render(<SignInForm />);
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(authApi.signInWithEmail).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalled();
    });
  });
});
