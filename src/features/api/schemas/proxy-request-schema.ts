import { z } from 'zod';

const httpMethodSchema = z.enum([
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS',
]);

export const proxyRequestSchema = z.object({
  endpointUrl: z.string().trim().url('Endpoint URL must be a valid URL.'),
  method: httpMethodSchema,
  headers: z.record(z.string(), z.string()).default({}),
  body: z.unknown().optional(),
});

export type ProxyRequestInput = z.infer<typeof proxyRequestSchema>;
