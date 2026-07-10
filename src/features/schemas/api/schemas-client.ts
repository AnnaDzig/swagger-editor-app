import { firebaseAuth } from '@/lib/firebase/client';
import type {
  CreateUserSchemaInput,
  SavedUserSchema,
  UpdateUserSchemaInput,
} from '@/types/schema';

type SchemasResponse = {
  schemas: SavedUserSchema[];
};

type SchemaResponse = {
  schema: SavedUserSchema;
};

async function getAuthHeaders() {
  const idToken = await firebaseAuth.currentUser?.getIdToken();

  if (!idToken) {
    throw new Error('Unauthorized');
  }

  return {
    authorization: `Bearer ${idToken}`,
  };
}

async function handleSchemaResponse(response: Response) {
  if (!response.ok) {
    throw new Error('Failed to process schema request.');
  }

  const data = (await response.json()) as SchemaResponse;

  return data.schema;
}

export async function getCurrentUserSchemas() {
  const headers = await getAuthHeaders();

  const response = await fetch('/api/schemas', {
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to load schemas.');
  }

  const data = (await response.json()) as SchemasResponse;

  return data.schemas;
}

export async function createCurrentUserSchema(input: CreateUserSchemaInput) {
  const headers = await getAuthHeaders();

  const response = await fetch('/api/schemas', {
    method: 'POST',
    headers: {
      ...headers,
      'content-type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  return handleSchemaResponse(response);
}

export async function getCurrentUserSchema(schemaId: string) {
  const headers = await getAuthHeaders();

  const response = await fetch(`/api/schemas/${schemaId}`, {
    headers,
  });

  return handleSchemaResponse(response);
}

export async function updateCurrentUserSchema(
  schemaId: string,
  input: UpdateUserSchemaInput,
) {
  const headers = await getAuthHeaders();

  const response = await fetch(`/api/schemas/${schemaId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'content-type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  return handleSchemaResponse(response);
}

export async function deleteCurrentUserSchema(schemaId: string) {
  const headers = await getAuthHeaders();

  const response = await fetch(`/api/schemas/${schemaId}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to delete schema.');
  }
}
