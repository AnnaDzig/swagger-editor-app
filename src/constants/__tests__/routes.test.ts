import { ROUTES } from '@/constants/routes';

describe('ROUTES', () => {
  it('contains required application routes', () => {
    expect(ROUTES.MAIN).toBe('/');
    expect(ROUTES.SIGN_IN).toBe('/signin');
    expect(ROUTES.SIGN_UP).toBe('/signup');
    expect(ROUTES.HISTORY).toBe('/history');
    expect(ROUTES.ABOUT).toBe('/about');
  });
});
