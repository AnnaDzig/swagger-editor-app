import { z } from 'zod';

const passwordStrengthRegex = /^(?=.*[\p{L}])(?=.*\d)(?=.*[^\p{L}\d\s]).{8,}$/u;

export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .regex(
      passwordStrengthRegex,
      'Password must be at least 8 characters and include a letter, a number, and a special character.',
    ),
});

export type AuthFormValues = z.infer<typeof authSchema>;
