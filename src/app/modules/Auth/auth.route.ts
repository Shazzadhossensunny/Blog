import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validations';
import { AuthControllers } from './auth.controller';
import { userValidationSchema } from '../user/user.validation';
import { UserController } from '../user/user.controller';

const router = express.Router();

// Add registration route here
router.post(
  '/register',
  validateRequest(userValidationSchema.createUserValidationSchema),
  UserController.createUser,
);

// Existing login route
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUserHandler,
);

export default router;
