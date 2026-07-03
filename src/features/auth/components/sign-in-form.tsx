'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthForm } from '@/features/auth/components/auth-form';
import { signInWithEmail } from '@/features/auth/api/auth-client';
import { getPostAuthRedirectPath } from '@/features/auth/utils/auth-redirects';
import { getAuthErrorMessage } from '@/features/auth/utils/auth-errors';
import type { AuthFormValues } from '@/features/auth/schemas/auth-schema';

export function SignInForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignIn(values: AuthFormValues) {
    setErrorMessage(null);

    try {
      await signInWithEmail(values);
      router.push(getPostAuthRedirectPath());
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    }
  }

  return (
    <AuthForm
      mode="sign-in"
      errorMessage={errorMessage}
      onSubmit={handleSignIn}
    />
  );
}
