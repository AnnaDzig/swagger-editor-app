'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/constants/routes';
import {
  authSchema,
  type AuthFormValues,
} from '@/features/auth/schemas/auth-schema';

type AuthFormMode = 'sign-in' | 'sign-up';

type AuthFormProps = {
  mode: AuthFormMode;
};

const authFormContent = {
  'sign-in': {
    title: 'Sign in',
    description: 'Access your saved schemas and request history.',
    submitLabel: 'Sign in',
    switchText: "Don't have an account?",
    switchLabel: 'Create one',
    switchHref: ROUTES.SIGN_UP,
  },
  'sign-up': {
    title: 'Create account',
    description: 'Save schemas and keep analytics for your API requests.',
    submitLabel: 'Create account',
    switchText: 'Already have an account?',
    switchLabel: 'Sign in',
    switchHref: ROUTES.SIGN_IN,
  },
} satisfies Record<
  AuthFormMode,
  {
    title: string;
    description: string;
    submitLabel: string;
    switchText: string;
    switchLabel: string;
    switchHref: string;
  }
>;

export function AuthForm({ mode }: AuthFormProps) {
  const content = authFormContent[mode];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(_values: AuthFormValues) {
    await Promise.resolve();
  }

  return (
    <Card className="w-full max-w-md border-border/70 bg-card/95 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete={
                mode === 'sign-in' ? 'current-password' : 'new-password'
              }
              placeholder="At least 8 characters"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? 'password-error password-help'
                  : 'password-help'
              }
              {...register('password')}
            />
            <p id="password-help" className="text-xs text-muted-foreground">
              Use at least 8 characters with a letter, a number, and a special
              character.
            </p>
            {errors.password && (
              <p id="password-error" className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : content.submitLabel}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {content.switchText}{' '}
          <Link
            href={content.switchHref}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {content.switchLabel}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
