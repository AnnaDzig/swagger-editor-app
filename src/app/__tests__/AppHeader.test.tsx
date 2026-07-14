import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useRouter } from 'next/navigation';
import * as authClient from '@/features/auth/api/auth-client';
import { AppHeader } from '../../components/layout/app-header';
import { useAppStore } from '@/store/app-store';

interface AppStoreState {
  user: { email: string } | null;
  isAuthLoading: boolean;
  setUser: (user: { email: string } | null) => void;
  schema: { format: string };
}

type RouterInstance = ReturnType<typeof useRouter>;

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(() => '/'),
}));

vi.mock('@/store/app-store', () => ({
  useAppStore: vi.fn(),
}));

vi.mock('@/features/auth/api/auth-client', () => ({
  signOutUser: vi.fn(),
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

describe('AppHeader', () => {
  const mockSetUser = vi.fn();

  const mockStore = (overrides: Partial<AppStoreState> = {}) => {
    const state: AppStoreState = {
      user: null,
      isAuthLoading: false,
      setUser: mockSetUser,
      schema: { format: 'openapi' },
      ...overrides,
    };

    vi.mocked(useAppStore).mockImplementation((selector) =>
      (selector as (s: AppStoreState) => unknown)(state),
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockStore();
  });

  it('должен отображать гостевые ссылки, когда пользователь не авторизован', () => {
    render(<AppHeader />);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('должен отображать кнопку Sign Out, когда пользователь авторизован', () => {
    mockStore({
      user: { email: 'test@test.com' },
      schema: { format: 'json' },
    });

    render(<AppHeader />);
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('должен открывать/закрывать мобильное меню при клике', () => {
    render(<AppHeader />);
    const menuBtn = screen.getByLabelText(/open navigation menu/i);

    fireEvent.click(menuBtn);
    expect(screen.getByLabelText(/close navigation menu/i)).toBeInTheDocument();

    fireEvent.click(menuBtn);
    expect(screen.getByLabelText(/open navigation menu/i)).toBeInTheDocument();
  });

  it('должен вызывать signOutUser и редиректить при выходе', async () => {
    mockStore({
      user: { email: 'test@test.com' },
      schema: { format: 'json' },
    });

    const pushMock = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
    } as unknown as RouterInstance);

    render(<AppHeader />);
    const signOutBtn = screen.getByText(/sign out/i);

    fireEvent.click(signOutBtn);

    await waitFor(() => {
      expect(authClient.signOutUser).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalledWith(null);
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });

  it('должен менять стили при скролле', () => {
    render(<AppHeader />);
    const header = screen.getByRole('banner');

    Object.defineProperty(window, 'scrollY', {
      value: 100,
      configurable: true,
    });
    fireEvent.scroll(window);

    expect(header).toHaveClass('shadow-lg');
  });
});
