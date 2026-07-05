'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signUpWithEmail } from '@/features/auth/api/auth-client';
import { AuthForm } from '@/features/auth/components/auth-form';
import { getAuthErrorMessage } from '@/features/auth/utils/auth-errors';
import { getPostAuthRedirectPath } from '@/features/auth/utils/auth-redirects';
import type { AuthFormValues } from '@/features/auth/schemas/auth-schema';

export function SignUpForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignUp(values: AuthFormValues) {
    setErrorMessage(null);

    try {
      await signUpWithEmail(values);
      router.push(getPostAuthRedirectPath());
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    }
  }

  return (
    <AuthForm
      mode="sign-up"
      errorMessage={errorMessage}
      onSubmit={handleSignUp}
    />
  );
}
