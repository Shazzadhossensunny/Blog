import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BlogServices } from './blog.service';
import sendResponse from '../../utils/sendResponse';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blogData = {
    ...req.body,
    author: req.user?._id,
  };
  const result = await BlogServices.createBlogIntoDB(blogData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.updateBlogInDB(
    req.params.id,
    req.user?._id,
    req.user?.role,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  await BlogServices.deleteBlogFromDB(req.params.id, req.user?._id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
  });
});

const adminDeleteBlog = catchAsync(async (req, res) => {
  await BlogServices.adminDeleteBlogFromDB(req?.params?.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  adminDeleteBlog,
};
