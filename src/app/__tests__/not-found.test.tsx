import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import en from '@/messages/en.json';
import { ROUTES } from '@/constants/routes';
import NotFoundPage from '@/app/not-found';

vi.mock('next-intl/server', () => ({
  getTranslations: async () => {
    return (key: string) => {
      const value = key
        .split('.')
        .reduce<unknown>(
          (obj, part) => (obj as Record<string, unknown>)?.[part],
          en.NotFound,
        );

      return typeof value === 'string' ? value : key;
    };
  },
}));

const renderNotFoundPage = async () => {
  const page = await NotFoundPage();

  return render(page);
};

describe('NotFoundPage', () => {
  it('renders a user-friendly 404 message', async () => {
    await renderNotFoundPage();

    expect(
      screen.getByRole('heading', {
        name: /this endpoint does not exist/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/error 404/i)).toBeInTheDocument();
  });

  it('provides links to the workspace and about page', async () => {
    await renderNotFoundPage();

    expect(
      screen.getByRole('link', {
        name: /back to workspace/i,
      }),
    ).toHaveAttribute('href', ROUTES.MAIN);

    expect(
      screen.getByRole('link', {
        name: /about apiflux/i,
      }),
    ).toHaveAttribute('href', ROUTES.ABOUT);
  });
});
