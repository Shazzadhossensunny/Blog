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
  const result = await UserServices.blockUserInDB(req.params.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  blockUser,
};
