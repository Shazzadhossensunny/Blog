import express from 'express';
import authRoutes from '../modules/Auth/auth.route';
import userRoutes from '../modules/user/user.route';
import blogRoutes from '../modules/blog/blog.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', userRoutes);
router.use('/blogs', blogRoutes);

export default router;
