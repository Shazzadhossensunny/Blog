import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { userValidationSchema } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidationSchema.createUserValidationSchema),
  UserController.createUser,
);

router.patch('/:userId/block', auth('admin'), UserController.blockUser);

export default router;
