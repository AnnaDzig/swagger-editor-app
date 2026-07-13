import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import HistoryPage from '../page';

const mocks = vi.hoisted(() => ({
  getSessionUser: vi.fn(),
  getRequestHistory: vi.fn(),
}));

vi.mock('@/features/auth/server/get-session-user', () => ({
  getSessionUser: mocks.getSessionUser,
}));

vi.mock('@/features/history/server/history-repository', () => ({
  getRequestHistory: mocks.getRequestHistory,
}));

describe('HistoryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.getSessionUser.mockResolvedValue({
      uid: 'user-1',
      email: 'user@example.com',
    });

    mocks.getRequestHistory.mockResolvedValue([]);
  });

  it('renders server-generated history page for an authenticated user', async () => {
    const page = await HistoryPage();

    render(page);

    expect(
      screen.getByRole('heading', {
        name: /request history/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/no requests yet/i)).toBeInTheDocument();

    expect(mocks.getSessionUser).toHaveBeenCalledOnce();
    expect(mocks.getRequestHistory).toHaveBeenCalledWith('user-1');
  });
});
