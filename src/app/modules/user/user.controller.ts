import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const blockUser = catchAsync(async (req, res) => {
  if (req.params.userId === req.user?._id.toString()) {
    throw new AppError(400, 'You cannot block yourself!');
  }
  await UserServices.blockUserInDB(req.params.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User blocked successfully',
  });
});

export const UserController = {
  createUser,
  blockUser,
};
