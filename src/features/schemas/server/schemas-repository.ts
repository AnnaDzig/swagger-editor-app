import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebase/admin';
import type {
  CreateUserSchemaInput,
  SavedUserSchema,
  SchemaFormat,
  UpdateUserSchemaInput,
} from '@/types/schema';

type UserSchemaDocument = {
  name?: unknown;
  content?: unknown;
  format?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
};

function getUserSchemasCollection(userId: string) {
  return getAdminDb().collection('users').doc(userId).collection('schemas');
}

function isSchemaFormat(value: unknown): value is SchemaFormat {
  return value === 'json' || value === 'yaml';
}

function mapSchemaDocument(
  documentId: string,
  data: UserSchemaDocument,
): SavedUserSchema {
  return {
    id: documentId,
    name: typeof data.name === 'string' ? data.name : 'Untitled schema',
    content: typeof data.content === 'string' ? data.content : '',
    format: isSchemaFormat(data.format) ? data.format : 'json',
    createdAt: typeof data.createdAt === 'number' ? data.createdAt : 0,
    updatedAt: typeof data.updatedAt === 'number' ? data.updatedAt : 0,
  };
}

export async function createUserSchema(
  userId: string,
  input: CreateUserSchemaInput,
) {
  const timestamp = Date.now();
  const schemasRef = getUserSchemasCollection(userId);

  const schemaRef = await schemasRef.add({
    name: input.name,
    content: input.content,
    format: input.format,
    createdAt: timestamp,
    updatedAt: timestamp,
    serverCreatedAt: FieldValue.serverTimestamp(),
    serverUpdatedAt: FieldValue.serverTimestamp(),
  });

  return {
    id: schemaRef.id,
    name: input.name,
    content: input.content,
    format: input.format,
    createdAt: timestamp,
    updatedAt: timestamp,
  } satisfies SavedUserSchema;
}

export async function getUserSchemas(userId: string) {
  const snapshot = await getUserSchemasCollection(userId)
    .orderBy('updatedAt', 'desc')
    .limit(50)
    .get();

  return snapshot.docs.map((doc) =>
    mapSchemaDocument(doc.id, doc.data() as UserSchemaDocument),
  );
}

export async function getUserSchema(userId: string, schemaId: string) {
  const snapshot = await getUserSchemasCollection(userId).doc(schemaId).get();

  if (!snapshot.exists) {
    return null;
  }

  return mapSchemaDocument(snapshot.id, snapshot.data() as UserSchemaDocument);
}

export async function updateUserSchema(
  userId: string,
  schemaId: string,
  input: UpdateUserSchemaInput,
) {
  const schemaRef = getUserSchemasCollection(userId).doc(schemaId);
  const snapshot = await schemaRef.get();

  if (!snapshot.exists) {
    return null;
  }

  const timestamp = Date.now();

  await schemaRef.update({
    ...input,
    updatedAt: timestamp,
    serverUpdatedAt: FieldValue.serverTimestamp(),
  });

  return getUserSchema(userId, schemaId);
}

export async function deleteUserSchema(userId: string, schemaId: string) {
  const schemaRef = getUserSchemasCollection(userId).doc(schemaId);
  const snapshot = await schemaRef.get();

  if (!snapshot.exists) {
    return false;
  }

  await schemaRef.delete();

  return true;
}
