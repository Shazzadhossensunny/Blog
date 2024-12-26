/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/AppError';
import config from '../config';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const auth = (requiredRole?: 'admin' | 'user') => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    console.log('new token', token);
    if (!token) throw new ApiError(401, 'Authentication failed');

    const decoded = jwt.verify(token, config.jwt.secret) as any;
    const user = await User.findById(decoded._id);

    if (!user || user.isBlocked) {
      throw new ApiError(401, 'Authentication failed');
    }

    if (requiredRole && user.role !== requiredRole) {
      throw new ApiError(403, 'Unauthorized access');
    }

    req.user = user;
    next();
  });
};

export default auth;
