import { OpenAPIV3 } from 'openapi-types';

export const isSchemaObject = (
  schema?: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
): schema is OpenAPIV3.SchemaObject => {
  if (!schema) return false;

  return !('$ref' in schema);
};
