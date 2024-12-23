import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    email: z
      .string()
      .email('Invalid email address')
      .nonempty('Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .nonempty('Password is required'),
    role: z.enum(['admin', 'user']).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});

export default userValidationSchema;
