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
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  authSchema,
  signUpSchema,
  type AuthFormValues,
} from '@/features/auth/schemas/auth-schema';
import { authFormContent, type AuthFormMode } from '@/features/auth/constants';

type AuthFormProps = {
  mode: AuthFormMode;
  errorMessage?: string | null;
  onSubmit?: (values: AuthFormValues) => Promise<void>;
};

export function AuthForm({ mode, errorMessage, onSubmit }: AuthFormProps) {
  const content = authFormContent[mode];

  const validationSchema = mode === 'sign-up' ? signUpSchema : authSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function handleAuthSubmit(values: AuthFormValues) {
    await onSubmit?.(values);
  }

  return (
    <Card className="w-full max-w-md border-border/70 bg-card/95 shadow-xl">
      <CardHeader>
        <h1 className="text-2xl font-bold tracking-tight">{content.title}</h1>{' '}
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-5"
          noValidate
          onSubmit={handleSubmit(handleAuthSubmit)}
        >
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
              <p
                id="email-error"
                role="alert"
                className="text-sm text-destructive"
              >
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
              <p
                id="password-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.password.message}
              </p>
            )}

            {errorMessage && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {errorMessage}
              </p>
            )}
            {mode === 'sign-up' && (
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword
                      ? 'confirm-password-error'
                      : undefined
                  }
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p
                    id="confirm-password-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : content.submitLabel}
            </Button>
          </div>
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
