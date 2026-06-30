import { ROUTES } from '@/constants/routes';

export type NavigationItem = {
  label: string;
  href: string;
};

export const publicNavigationItems: NavigationItem[] = [
  {
    label: 'About',
    href: ROUTES.ABOUT,
  },
];

export const guestNavigationItems: NavigationItem[] = [
  {
    label: 'Sign In',
    href: ROUTES.SIGN_IN,
  },
  {
    label: 'Sign Up',
    href: ROUTES.SIGN_UP,
  },
];

export const authenticatedNavigationItems: NavigationItem[] = [
  {
    label: 'History',
    href: ROUTES.HISTORY,
  },
];
