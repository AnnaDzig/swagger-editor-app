import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useRouter } from '@/i18n/routing';
import * as authClient from '@/features/auth/api/auth-client';
import { AppHeader } from '../../components/layout/app-header';
import { useAppStore } from '@/store/app-store';

import en from '@/messages/en.json';

type Messages = Record<string, unknown>;

vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const messages = en as Messages;

    const namespaceMessages = messages[namespace] as Record<string, string>;

    return namespaceMessages?.[key] ?? key;
  },

  useLocale: () => 'en',
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),

  useRouter: vi.fn(),

  usePathname: vi.fn(() => '/'),
}));

vi.mock('@/store/app-store', () => ({
  useAppStore: vi.fn(),
}));

vi.mock('@/features/auth/api/auth-client', () => ({
  signOutUser: vi.fn().mockResolvedValue(undefined),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});

interface AppStoreState {
  user: { email: string } | null;
  isAuthLoading: boolean;
  setUser: (user: { email: string } | null) => void;
  schema: {
    format: string;
  };
}

type RouterInstance = ReturnType<typeof useRouter>;

describe('AppHeader', () => {
  const mockSetUser = vi.fn();

  const mockStore = (overrides: Partial<AppStoreState> = {}) => {
    const state: AppStoreState = {
      user: null,
      isAuthLoading: false,
      setUser: mockSetUser,
      schema: {
        format: 'openapi',
      },
      ...overrides,
    };

    vi.mocked(useAppStore).mockImplementation((selector) =>
      (selector as (state: AppStoreState) => unknown)(state),
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockStore();
  });

  it('renders guest navigation when user is not authenticated', () => {
    render(<AppHeader />);

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('renders sign out button when user is authenticated', () => {
    mockStore({
      user: {
        email: 'test@test.com',
      },
    });

    render(<AppHeader />);

    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    render(<AppHeader />);

    const menuButton = screen.getByLabelText(/open navigation menu/i);

    fireEvent.click(menuButton);

    expect(screen.getByLabelText(/close navigation menu/i)).toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(screen.getByLabelText(/open navigation menu/i)).toBeInTheDocument();
  });

  it('signs out user and redirects', async () => {
    mockStore({
      user: {
        email: 'test@test.com',
      },
    });

    const pushMock = vi.fn();

    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
    } as unknown as RouterInstance);

    render(<AppHeader />);

    fireEvent.click(screen.getByText(/sign out/i));

    await waitFor(() => {
      expect(authClient.signOutUser).toHaveBeenCalled();

      expect(mockSetUser).toHaveBeenCalledWith(null);

      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });

  it('adds shadow after scrolling', () => {
    render(<AppHeader />);

    const header = screen.getByRole('banner');

    Object.defineProperty(window, 'scrollY', {
      value: 100,
      configurable: true,
    });

    fireEvent.scroll(window);

    expect(header).toHaveClass('shadow-xl');
    expect(header).toHaveClass('shadow-black/30');
  });
});
