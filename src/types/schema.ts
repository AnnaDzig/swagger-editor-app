import type { OpenAPIV3 } from 'openapi-types';

export type SchemaFormat = 'json' | 'yaml';

export interface SwaggerSchemaState {
  rawContent: string;
  parsedContent: OpenAPIV3.Document | null;
  format: SchemaFormat;
  isValid: boolean;
  error: string | null;
}

export interface SavedUserSchema {
  id: string;
  name: string;
  content: string;
  format: SchemaFormat;
  createdAt: number;
  updatedAt: number;
}

export type CreateUserSchemaInput = {
  name: string;
  content: string;
  format: SchemaFormat;
};

export type UpdateUserSchemaInput = Partial<CreateUserSchemaInput>;
