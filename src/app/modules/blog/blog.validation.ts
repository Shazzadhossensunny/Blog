import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    content: z.string().nonempty('Content is required'),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
};
