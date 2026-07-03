'use client';

import { AuthForm } from '@/features/auth/components/auth-form';
import type { AuthFormValues } from '@/features/auth/schemas/auth-schema';

export function SignUpForm() {
  async function handleSignUp(values: AuthFormValues) {
    await Promise.resolve(values);
  }

  return <AuthForm mode="sign-up" onSubmit={handleSignUp} />;
}
