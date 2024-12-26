import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';

const loginUserHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoSystem(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

export const AuthControllers = {
  loginUserHandler,
};
