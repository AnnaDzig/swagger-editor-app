import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as firebaseAuth from 'firebase/auth';
import { signInWithEmail, signOutUser } from '@/features/auth/api/auth-client';
import { toast } from 'sonner';

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

vi.mock('@/lib/firebase/client', () => ({
  firebaseAuth: {},
}));

describe('auth-client api', () => {
  const mockUser = {
    getIdToken: vi.fn().mockResolvedValue('mock-token'),
  } as unknown as firebaseAuth.User;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.clearAllMocks();
  });

  it('signInWithEmail should call fetch and firebase', async () => {
    vi.mocked(firebaseAuth.signInWithEmailAndPassword).mockResolvedValue({
      user: mockUser,
    } as firebaseAuth.UserCredential);

    vi.mocked(fetch).mockResolvedValue({ ok: true } as Response);

    await signInWithEmail({ email: 'test@test.com', password: 'password' });

    expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      '/api/auth/session',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ idToken: 'mock-token' }),
      }),
    );
  });

  it('signOutUser should clear session and sign out from firebase', async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: true } as Response);

    await signOutUser();

    expect(fetch).toHaveBeenCalledWith('/api/auth/session', {
      method: 'DELETE',
    });
    expect(firebaseAuth.signOut).toHaveBeenCalled();
  });

  it('signOutUser should show toast on failure', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    await expect(signOutUser()).rejects.toThrow('Could not complete sign out.');
    expect(toast.error).toHaveBeenCalledWith('Failed to sign out.');
  });
});
