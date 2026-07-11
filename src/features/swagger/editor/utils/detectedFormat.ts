import { SchemaFormat } from '@/types/schema';

export default function detectedFormat(value: string): SchemaFormat {
  const trimmedValue = value.trim();
  if (trimmedValue.startsWith('{') || trimmedValue.startsWith('[')) {
    return 'json';
  }
  return 'yaml';
}
