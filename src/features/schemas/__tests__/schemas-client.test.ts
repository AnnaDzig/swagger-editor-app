import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createCurrentUserSchema,
  deleteCurrentUserSchema,
  getCurrentUserSchema,
  getCurrentUserSchemas,
  updateCurrentUserSchema,
} from '@/features/schemas/api/schemas-client';

const mocks = vi.hoisted(() => ({
  getIdToken: vi.fn(),
}));

vi.mock('@/lib/firebase/client', () => ({
  firebaseAuth: {
    currentUser: {
      getIdToken: mocks.getIdToken,
    },
  },
}));

const fetchMock = vi.fn();

global.fetch = fetchMock;

describe('schemas-client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getIdToken.mockResolvedValue('test-token');
  });

  it('loads current user schemas with auth token', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        schemas: [
          {
            id: 'schema-1',
            name: 'Test API',
            content: '{}',
            format: 'json',
            createdAt: 1,
            updatedAt: 1,
          },
        ],
      }),
    });

    const schemas = await getCurrentUserSchemas();

    expect(fetchMock).toHaveBeenCalledWith('/api/schemas', {
      headers: {
        authorization: 'Bearer test-token',
      },
    });
    expect(schemas).toHaveLength(1);
  });

  it('creates current user schema', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        schema: {
          id: 'schema-1',
          name: 'Test API',
          content: '{}',
          format: 'json',
          createdAt: 1,
          updatedAt: 1,
        },
      }),
    });

    const schema = await createCurrentUserSchema({
      name: 'Test API',
      content: '{}',
      format: 'json',
    });

    expect(fetchMock).toHaveBeenCalledWith('/api/schemas', {
      method: 'POST',
      headers: {
        authorization: 'Bearer test-token',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test API',
        content: '{}',
        format: 'json',
      }),
    });
    expect(schema.id).toBe('schema-1');
  });

  it('loads one current user schema', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        schema: {
          id: 'schema-1',
          name: 'Test API',
          content: '{}',
          format: 'json',
          createdAt: 1,
          updatedAt: 1,
        },
      }),
    });

    const schema = await getCurrentUserSchema('schema-1');

    expect(fetchMock).toHaveBeenCalledWith('/api/schemas/schema-1', {
      headers: {
        authorization: 'Bearer test-token',
      },
    });
    expect(schema.name).toBe('Test API');
  });

  it('updates current user schema', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        schema: {
          id: 'schema-1',
          name: 'Updated API',
          content: '{}',
          format: 'json',
          createdAt: 1,
          updatedAt: 2,
        },
      }),
    });

    const schema = await updateCurrentUserSchema('schema-1', {
      name: 'Updated API',
    });

    expect(fetchMock).toHaveBeenCalledWith('/api/schemas/schema-1', {
      method: 'PUT',
      headers: {
        authorization: 'Bearer test-token',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Updated API',
      }),
    });
    expect(schema.name).toBe('Updated API');
  });

  it('deletes current user schema', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
    });

    await deleteCurrentUserSchema('schema-1');

    expect(fetchMock).toHaveBeenCalledWith('/api/schemas/schema-1', {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer test-token',
      },
    });
  });

  it('throws unauthorized when there is no current user token', async () => {
    mocks.getIdToken.mockResolvedValue(undefined);

    await expect(getCurrentUserSchemas()).rejects.toThrow('Unauthorized');
  });

  it('throws when loading schemas fails', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
    });

    await expect(getCurrentUserSchemas()).rejects.toThrow(
      'Failed to load schemas.',
    );
  });

  it('throws when schema request fails', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
    });

    await expect(getCurrentUserSchema('schema-1')).rejects.toThrow(
      'Failed to process schema request.',
    );
  });

  it('throws when delete fails', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
    });

    await expect(deleteCurrentUserSchema('schema-1')).rejects.toThrow(
      'Failed to delete schema.',
    );
  });
});
