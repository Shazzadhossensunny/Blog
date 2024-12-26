import express from 'express';
import { BlogValidations } from './blog.validation';
import { BlogController } from './blog.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogController.createBlog,
);

router.patch(
  '/:id',
  auth(),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogController.updateBlog,
);

router.delete('/:id', auth(), BlogController.deleteBlog);
router.get('/', BlogController.getAllBlogs);

export default router;
