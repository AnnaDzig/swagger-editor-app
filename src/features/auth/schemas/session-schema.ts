import { z } from 'zod';

export const sessionRequestSchema = z.object({
  idToken: z.string().min(1, 'Firebase ID token is required.'),
});

export type SessionRequest = z.infer<typeof sessionRequestSchema>;
