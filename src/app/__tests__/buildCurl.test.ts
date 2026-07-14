import { describe, it, expect } from 'vitest';
import { buildCurl } from '../../features/swagger/SwaggerViewer/utils/buildCurl';

describe('buildCurl', () => {
  it('should build a basic GET request', () => {
    const result = buildCurl({
      method: 'GET',
      url: 'https://api.example.com/users',
    });
    expect(result).toBe(
      'curl -X GET "https://api.example.com/users" \\\n  -H "Content-Type: application/json"',
    );
  });

  it('should include custom headers', () => {
    const result = buildCurl({
      method: 'GET',
      url: 'https://api.example.com',
      headers: { Authorization: 'Bearer token123' },
    });
    expect(result).toContain('-H "Authorization: Bearer token123"');
  });

  it('should include body for POST requests and escape quotes', () => {
    const body = JSON.stringify({ name: "L'oreal" });
    const result = buildCurl({
      method: 'POST',
      url: 'https://api.example.com/users',
      body,
    });

    expect(result).toContain("-d '{\"name\":\"L'\\''oreal\"}'");
  });

  it('should not include body for GET requests even if provided', () => {
    const result = buildCurl({
      method: 'GET',
      url: 'https://api.example.com',
      body: '{"test":1}',
    });
    expect(result).not.toContain('-d');
  });
});
