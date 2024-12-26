import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';
import { UserServices } from '../user/user.service';
import ApiError from '../../errors/AppError';
import config from '../../config';

const loginUserIntoSystem = async (payload: TLoginUser) => {
  const user = await UserServices.findUserByEmail(payload.email);
  if (!user) throw new ApiError(401, 'Invalid credentials');
  if (user.isBlocked) throw new ApiError(403, 'User is blocked');

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) throw new ApiError(401, 'Invalid credentials');

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expires_in },
  );

  return { token };
};

export const AuthServices = {
  loginUserIntoSystem,
};
