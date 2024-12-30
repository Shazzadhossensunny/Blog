import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .min(8, 'Password must be at least 8 characters long'),
  }),
});
const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email').optional(),
    password: z.string({}).min(8).optional(),
  }),
});

export const userValidationSchema = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
