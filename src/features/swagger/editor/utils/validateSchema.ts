import { SchemaFormat } from '@/types/schema';
import SwaggerParser from '@apidevtools/swagger-parser';
import { load } from 'js-yaml';

export default async function validateSchema(
  value: string,
  format: SchemaFormat,
) {
  try {
    const parsed = format === 'json' ? JSON.parse(value) : load(value);
    await SwaggerParser.validate(parsed as never);
    return true;
  } catch {
    return false;
  }
}
