import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BlogServices } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blogData = {
    ...req.body,
    author: req.user?._id,
  };
  const result = await BlogServices.createBlogIntoDB(blogData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.updateBlogInDB(
    req.params.id,
    req.user?._id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  await BlogServices.deleteBlogFromDB(req.params.id, req.user?._id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
