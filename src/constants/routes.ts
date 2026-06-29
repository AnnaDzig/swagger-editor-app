export const ROUTES = {
  MAIN: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  HISTORY: '/history',
  ABOUT: '/about',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
