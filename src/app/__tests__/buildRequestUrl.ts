import { describe, it, expect } from 'vitest';
import buildRequestUrl from '../../features/swagger/SwaggerViewer/EndpointDetails/TryItOut/buildRequestUrl';

describe('buildRequestUrl', () => {
  const server = 'https://api.test.com/v1/';

  it('should replace path parameters correctly', () => {
    const { requestUrl } = buildRequestUrl(
      server,
      '/users/{id}/posts/{postId}',
      { id: '123', postId: '456' },
    );
    expect(requestUrl).toBe('https://api.test.com/v1/users/123/posts/456');
  });

  it('should leave placeholder if path parameter is missing', () => {
    const { requestUrl } = buildRequestUrl(server, '/users/{id}', {});
    expect(requestUrl).toBe('https://api.test.com/v1/users/{id}');
  });

  it('should append query parameters and filter empty ones', () => {
    const { requestUrl } = buildRequestUrl(
      server,
      '/search',
      {},
      { query: 'test', limit: '10', empty: '' },
    );
    expect(requestUrl).toBe(
      'https://api.test.com/v1/search?query=test&limit=10',
    );
  });

  it('should handle slashes correctly (normalize double slashes)', () => {
    const { requestUrl } = buildRequestUrl(
      'http://test.com/',
      '//path',
      {},
      {},
    );
    expect(requestUrl).toBe('http://test.com/path');
  });
});
