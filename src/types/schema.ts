import type { OpenAPIV3 } from 'openapi-types';

export type SchemaFormat = 'json' | 'yaml';

export interface SwaggerSchemaState {
  rawContent: string;
  parsedContent: OpenAPIV3.Document | null;
  format: SchemaFormat;
  isValid: boolean;
  error: string | null;
}
