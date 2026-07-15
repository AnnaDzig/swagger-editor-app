import { ROUTES } from '@/constants/routes';

export type NavigationItem = {
  label: string;
  href: string;
};

export const publicNavigationItems: NavigationItem[] = [
  {
    label: 'about',
    href: ROUTES.ABOUT,
  },
];

export const guestNavigationItems: NavigationItem[] = [
  {
    label: 'signIn',
    href: ROUTES.SIGN_IN,
  },
  {
    label: 'signUp',
    href: ROUTES.SIGN_UP,
  },
];

export const authenticatedNavigationItems: NavigationItem[] = [
  {
    label: 'history',
    href: ROUTES.HISTORY,
  },
];
