import { proxyRequestSchema } from '@/features/api/schemas/proxy-request-schema';

describe('proxyRequestSchema', () => {
  it('accepts valid proxy request input', () => {
    const result = proxyRequestSchema.safeParse({
      endpointUrl: 'https://api.example.com/users',
      method: 'POST',
      headers: {
        authorization: 'Bearer token',
      },
      body: {
        name: 'Anna',
      },
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid endpoint URL', () => {
    const result = proxyRequestSchema.safeParse({
      endpointUrl: 'not-url',
      method: 'GET',
      headers: {},
    });

    expect(result.success).toBe(false);
  });

  it('rejects unsupported HTTP method', () => {
    const result = proxyRequestSchema.safeParse({
      endpointUrl: 'https://api.example.com/users',
      method: 'TRACE',
      headers: {},
    });

    expect(result.success).toBe(false);
  });

  it('defaults headers to empty object', () => {
    const result = proxyRequestSchema.safeParse({
      endpointUrl: 'https://api.example.com/users',
      method: 'GET',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.headers).toEqual({});
    }
  });
});
