import { z } from 'zod';

export const schemaFormatSchema = z.enum(['json', 'yaml']);

export const createUserSchemaSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Schema name is required.')
    .max(120, 'Schema name must be 120 characters or less.'),
  content: z.string().trim().min(1, 'Schema content is required.'),
  format: schemaFormatSchema,
});

export const updateUserSchemaSchema = createUserSchemaSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided.',
  });

export type CreateUserSchemaValues = z.infer<typeof createUserSchemaSchema>;
export type UpdateUserSchemaValues = z.infer<typeof updateUserSchemaSchema>;
