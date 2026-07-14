import { describe, it, expect } from 'vitest';

import { isResponseObject } from '../../features/swagger/SwaggerViewer/isResponseObject';
import { isParameterObject } from '../../features/swagger/SwaggerViewer/isParameterObject';
import { isSchemaObject } from '../../features/swagger/SwaggerViewer/isSchemaObject';

describe('Swagger Type Guards', () => {
  it('isResponseObject', () => {
    type ResponseArg = Parameters<typeof isResponseObject>[0];

    expect(isResponseObject({ description: 'ok' })).toBe(true);

    expect(isResponseObject({ $ref: '...' } as unknown as ResponseArg)).toBe(
      false,
    );
  });

  it('isSchemaObject', () => {
    type SchemaArg = Parameters<typeof isSchemaObject>[0];

    expect(isSchemaObject({ type: 'string' })).toBe(true);
    expect(isSchemaObject({ $ref: '...' } as unknown as SchemaArg)).toBe(false);

    expect(isSchemaObject(undefined as unknown as SchemaArg)).toBe(false);
  });

  it('isParameterObject', () => {
    type ParameterArg = Parameters<typeof isParameterObject>[0];

    expect(isParameterObject({ name: 'id', in: 'query' })).toBe(true);

    expect(isParameterObject({ $ref: '...' } as unknown as ParameterArg)).toBe(
      false,
    );
  });
});
