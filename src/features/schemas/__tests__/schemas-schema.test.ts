import { describe, expect, it } from 'vitest';
import {
  createUserSchemaSchema,
  updateUserSchemaSchema,
} from '@/features/schemas/schemas-schema';

describe('createUserSchemaSchema', () => {
  it('accepts valid json schema input', () => {
    const result = createUserSchemaSchema.safeParse({
      name: 'Petstore API',
      content: '{"openapi":"3.0.0"}',
      format: 'json',
    });

    expect(result.success).toBe(true);
  });

  it('accepts valid yaml schema input', () => {
    const result = createUserSchemaSchema.safeParse({
      name: 'Petstore API',
      content: 'openapi: 3.0.0',
      format: 'yaml',
    });

    expect(result.success).toBe(true);
  });

  it('trims schema name and content', () => {
    const result = createUserSchemaSchema.safeParse({
      name: '  Petstore API  ',
      content: '  {"openapi":"3.0.0"}  ',
      format: 'json',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.name).toBe('Petstore API');
      expect(result.data.content).toBe('{"openapi":"3.0.0"}');
    }
  });

  it('rejects empty schema name', () => {
    const result = createUserSchemaSchema.safeParse({
      name: '',
      content: '{"openapi":"3.0.0"}',
      format: 'json',
    });

    expect(result.success).toBe(false);
  });

  it('rejects empty schema content', () => {
    const result = createUserSchemaSchema.safeParse({
      name: 'Petstore API',
      content: '',
      format: 'json',
    });

    expect(result.success).toBe(false);
  });

  it('rejects unsupported schema format', () => {
    const result = createUserSchemaSchema.safeParse({
      name: 'Petstore API',
      content: '{"openapi":"3.0.0"}',
      format: 'xml',
    });

    expect(result.success).toBe(false);
  });
});

describe('updateUserSchemaSchema', () => {
  it('accepts partial update input', () => {
    const result = updateUserSchemaSchema.safeParse({
      name: 'Updated API',
    });

    expect(result.success).toBe(true);
  });

  it('accepts content-only update input', () => {
    const result = updateUserSchemaSchema.safeParse({
      content: 'openapi: 3.0.0',
    });

    expect(result.success).toBe(true);
  });

  it('accepts format-only update input', () => {
    const result = updateUserSchemaSchema.safeParse({
      format: 'yaml',
    });

    expect(result.success).toBe(true);
  });

  it('rejects empty update object', () => {
    const result = updateUserSchemaSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it('rejects invalid partial update', () => {
    const result = updateUserSchemaSchema.safeParse({
      format: 'xml',
    });

    expect(result.success).toBe(false);
  });
});
