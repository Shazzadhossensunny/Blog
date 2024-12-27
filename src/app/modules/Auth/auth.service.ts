import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TLoginUser } from './auth.interface';
import { UserServices } from '../user/user.service';
import AppError from '../../errors/AppError';
import config from '../../config';

const loginUserIntoSystem = async (payload: TLoginUser) => {
  const user = await UserServices.findUserByEmail(payload.email);
  if (!user) throw new AppError(401, 'Invalid credentials');
  if (user.isBlocked) throw new AppError(403, 'User is blocked');

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) throw new AppError(401, 'Invalid credentials');

  const jwtPayload = { _id: user?._id, role: user?.role };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return { accessToken };
};

export const AuthServices = {
  loginUserIntoSystem,
};
