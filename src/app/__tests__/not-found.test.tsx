import { render, screen } from '@testing-library/react';

import NotFoundPage from '@/app/not-found';
import { ROUTES } from '@/constants/routes';

describe('NotFoundPage', () => {
  it('renders a user-friendly 404 message', () => {
    render(<NotFoundPage />);

    expect(
      screen.getByRole('heading', {
        name: /this endpoint does not exist/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/error 404/i)).toBeInTheDocument();
  });

  it('provides links to the workspace and about page', () => {
    render(<NotFoundPage />);

    expect(
      screen.getByRole('link', { name: /back to workspace/i }),
    ).toHaveAttribute('href', ROUTES.MAIN);

    expect(
      screen.getByRole('link', { name: /about apiflux/i }),
    ).toHaveAttribute('href', ROUTES.ABOUT);
  });
});
