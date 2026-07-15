import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders the project introduction', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'ApiFlux — OpenAPI Studio',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/browser-based Swagger and OpenAPI editor/i),
    ).toBeInTheDocument();
  });

  it('renders the main project sections', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', { name: 'RS School' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Technologies' }),
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Team' })).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Resources' }),
    ).toBeInTheDocument();
  });

  it('renders the current project technologies', () => {
    render(<AboutPage />);

    const technologyNames = [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Firebase',
      'Zustand',
    ];

    technologyNames.forEach((technology) => {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: technology,
        }),
      ).toBeInTheDocument();
    });
  });

  it('renders all team members and their roles', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Mikhail Kruk',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Swagger Editor · Internationalization'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Michael Elsky',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Swagger Viewer · API Interaction'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Anna Dzhyhota',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Authentication · Infrastructure'),
    ).toBeInTheDocument();
  });

  it('renders each team member GitHub profile', () => {
    render(<AboutPage />);

    const mikhailLink = screen.getByRole('link', {
      name: /open Mikhail Kruk's GitHub profile/i,
    });

    const michaelLink = screen.getByRole('link', {
      name: /open Michael Elsky's GitHub profile/i,
    });

    const annaLink = screen.getByRole('link', {
      name: /open Anna Dzhyhota's GitHub profile/i,
    });

    expect(mikhailLink).toHaveAttribute('href', 'https://github.com/mikekruk');

    expect(michaelLink).toHaveAttribute(
      'href',
      'https://github.com/michael-elsky',
    );

    expect(annaLink).toHaveAttribute('href', 'https://github.com/AnnaDzig');

    [mikhailLink, michaelLink, annaLink].forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');

      const relValues = link.getAttribute('rel')?.split(/\s+/) ?? [];

      expect(relValues).toContain('noopener');
      expect(relValues).toContain('noreferrer');
    });
  });

  it('renders the project resources with correct links', () => {
    render(<AboutPage />);

    const resourcesSection = screen
      .getByRole('heading', { name: 'Resources' })
      .closest('section');

    expect(resourcesSection).not.toBeNull();

    const repositoryLink = within(resourcesSection!).getByRole('link', {
      name: /GitHub Repository/i,
    });

    const rsSchoolLink = within(resourcesSection!).getByRole('link', {
      name: /RS School/i,
    });

    const openApiLink = within(resourcesSection!).getByRole('link', {
      name: /OpenAPI Specification/i,
    });

    expect(repositoryLink).toHaveAttribute(
      'href',
      'https://github.com/AnnaDzig/swagger-editor-app',
    );

    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/');

    expect(openApiLink).toHaveAttribute(
      'href',
      'https://spec.openapis.org/oas/v3.0.3.html',
    );
    [repositoryLink, rsSchoolLink, openApiLink].forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');

      const relValues = link.getAttribute('rel')?.split(/\s+/) ?? [];

      expect(relValues).toContain('noopener');
      expect(relValues).toContain('noreferrer');
    });
  });

  it('does not render a project task board resource', () => {
    render(<AboutPage />);

    expect(screen.queryByText(/Project Task Board/i)).not.toBeInTheDocument();
  });
});
