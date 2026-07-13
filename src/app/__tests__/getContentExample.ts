import { describe, it, expect } from 'vitest';
import { getContentExample } from '../../features/swagger/SwaggerViewer/EndpointDetails/TryItOut/getContentExample';

type GetContentExampleParams = Parameters<typeof getContentExample>[0];

describe('getContentExample', () => {
  it('should return empty string if parameters is an array', () => {
    const mockData = [] as unknown as GetContentExampleParams;
    expect(getContentExample(mockData)).toBe('');
  });

  it('should return stringified example if present in JSON content', () => {
    const mockParams = {
      requestBody: {
        content: {
          'application/json': {
            example: { id: 1, name: 'Test' },
          },
        },
      },
    };

    const result = getContentExample(
      mockParams as unknown as GetContentExampleParams,
    );
    expect(JSON.parse(result)).toEqual({ id: 1, name: 'Test' });
  });

  it('should return default message if no example available', () => {
    const mockParams = {
      requestBody: {
        content: {
          'application/json': {},
        },
      },
    };

    expect(
      getContentExample(mockParams as unknown as GetContentExampleParams),
    ).toBe('No example available');
  });

  it('should handle undefined content safely', () => {
    expect(getContentExample({} as unknown as GetContentExampleParams)).toBe(
      'No example available',
    );
  });
});
