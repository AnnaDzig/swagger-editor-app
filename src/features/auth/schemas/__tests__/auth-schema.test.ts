import { authSchema } from '@/features/auth/schemas/auth-schema';

describe('authSchema', () => {
  it('accepts valid email and strong password', () => {
    const result = authSchema.safeParse({
      email: 'user@example.com',
      password: 'Strong1!',
    });

    expect(result.success).toBe(true);
  });

  it('trims email before validation', () => {
    const result = authSchema.safeParse({
      email: ' user@example.com ',
      password: 'Strong1!',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.email).toBe('user@example.com');
    }
  });

  it('rejects invalid email', () => {
    const result = authSchema.safeParse({
      email: 'not-an-email',
      password: 'Strong1!',
    });

    expect(result.success).toBe(false);
  });

  it('rejects password shorter than 8 characters', () => {
    const result = authSchema.safeParse({
      email: 'user@example.com',
      password: 'S1!',
    });

    expect(result.success).toBe(false);
  });

  it('rejects password without a number', () => {
    const result = authSchema.safeParse({
      email: 'user@example.com',
      password: 'Strong!!',
    });

    expect(result.success).toBe(false);
  });

  it('rejects password without a special character', () => {
    const result = authSchema.safeParse({
      email: 'user@example.com',
      password: 'Strong123',
    });

    expect(result.success).toBe(false);
  });

  it('accepts password with unicode letters', () => {
    const result = authSchema.safeParse({
      email: 'user@example.com',
      password: 'Пароль1!',
    });

    expect(result.success).toBe(true);
  });
});
