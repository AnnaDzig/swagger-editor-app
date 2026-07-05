import { ROUTES } from '@/constants/routes';

export type AuthFormMode = 'sign-in' | 'sign-up';

export const authFormContent = {
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
