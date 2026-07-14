import { describe, it, expect, vi, beforeEach } from 'vitest';
import { User } from 'firebase/auth';

import { firebaseAuth } from '@/lib/firebase/client';
import { executeProxyRequest } from '@/features/api/client/proxy-client';

type ProxyRequestInput = Parameters<typeof executeProxyRequest>[0];

vi.mock('@/lib/firebase/client', () => ({
  firebaseAuth: {
    currentUser: null,
  },
}));

describe('proxy-client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.restoreAllMocks();
  });

  it('should include auth header if user is logged in', async () => {
    const mockUser = {
      getIdToken: vi.fn().mockResolvedValue('fire-token'),
    } as unknown as User;

    vi.spyOn(firebaseAuth, 'currentUser', 'get').mockReturnValue(mockUser);

    vi.mocked(fetch).mockResolvedValue({
      json: vi.fn().mockResolvedValue({ success: true }),
    } as unknown as Response);

    const input: ProxyRequestInput = {
      endpointUrl: '/test',
      method: 'GET',
      headers: {},
    };

    const result = await executeProxyRequest(input);

    expect(fetch).toHaveBeenCalledWith(
      '/api/proxy',
      expect.objectContaining({
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer fire-token',
        },
      }),
    );
    expect(result).toEqual({ success: true });
  });

  it('should not include auth header if user is not logged in', async () => {
    vi.spyOn(firebaseAuth, 'currentUser', 'get').mockReturnValue(null);

    vi.mocked(fetch).mockResolvedValue({
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response);

    const input: ProxyRequestInput = {
      endpointUrl: '/test',
      method: 'GET',
      headers: {},
    };

    await executeProxyRequest(input);

    const callArgs = vi.mocked(fetch).mock.calls[0][1];
    expect(callArgs?.headers).not.toHaveProperty('authorization');
  });
});
