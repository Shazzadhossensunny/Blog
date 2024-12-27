import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { BlogController } from '../blog/blog.controller';

const router = express.Router();

router.patch('/users/:userId/block', auth('admin'), UserController.blockUser);
router.delete('/blogs/:id', auth('admin'), BlogController.adminDeleteBlog);

export default router;
