import { describe, it, expect } from 'vitest';
import { OpenAPIV3 } from 'openapi-types';
import getResponsesData from '../../features/swagger/SwaggerViewer/EndpointDetails/getResponsesData';

describe('getResponsesData', () => {
  it('should return undefined if no responses provided', () => {
    expect(getResponsesData(undefined)).toBeUndefined();
    expect(getResponsesData({})).toBeUndefined();
  });

  it('should return isReference true if the first response is a $ref', () => {
    const mockResponses: OpenAPIV3.ResponsesObject = {
      '200': { $ref: '#/components/responses/Success' },
    };
    const result = getResponsesData(mockResponses);
    expect(result).toEqual({
      applicationType: '',
      contentSchema: '',
      contentExample: '',
      appType: '',
      isReference: true,
    });
  });

  it('should extract data from application/json', () => {
    const mockResponses: OpenAPIV3.ResponsesObject = {
      '200': {
        description: 'OK',
        content: {
          'application/json': {
            schema: { type: 'object', properties: { id: { type: 'string' } } },
            example: { id: '123' },
          },
        },
      },
    };
    const result = getResponsesData(mockResponses);
    expect(result?.applicationType).toBe('json');
    expect(result?.appType).toBe('application/json');
    expect(result?.contentSchema).toContain('"type": "object"');
    expect(result?.contentExample).toContain('"id": "123"');
  });

  it('should handle missing schema or example', () => {
    const mockResponses: OpenAPIV3.ResponsesObject = {
      '200': {
        description: 'OK',
        content: {
          'text/plain': {},
        },
      },
    };
    const result = getResponsesData(mockResponses);
    expect(result?.applicationType).toBe('plain');
    expect(result?.contentSchema).toBe('No schema available');
    expect(result?.contentExample).toBe('No example available');
  });

  it('should handle content without slash in type', () => {
    const mockResponses: OpenAPIV3.ResponsesObject = {
      '200': {
        description: 'OK',
        content: {
          customtype: {},
        },
      },
    };

    const result = getResponsesData(mockResponses);

    expect(result?.applicationType).toBe('customtype');
  });
});
