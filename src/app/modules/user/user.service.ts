import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(400, 'Email already  exists');
  }
  const newUser = await User.create(payload);

  // Return only the required fields
  return {
    _id: newUser?._id,
    name: newUser?.name,
    email: newUser?.email,
  };
};

// Helper function: Find a user by email
const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }).select('+password');
};

// Helper function: Block a user
const blockUserInDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  user.isBlocked = true;
  return await user.save();
};

export const UserServices = {
  createUserIntoDB,
  findUserByEmail,
  blockUserInDB,
};
