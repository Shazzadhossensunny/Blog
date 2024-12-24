import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BlogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blogData = { ...req.body };
  const result = await BlogService.createBlogIntoDB(blogData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
};
