import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    content: z.string().nonempty('Content is required'),
  }),
});
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
