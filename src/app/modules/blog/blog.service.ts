import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TBlog, TQueryParams } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const newBlog = await Blog.create(payload);
  const populatedBlog = await Blog.findById(newBlog._id)
    .populate('author', 'name email')
    .lean();
  return {
    _id: populatedBlog?._id,
    title: populatedBlog?.title,
    content: populatedBlog?.content,
    author: populatedBlog?.author,
  };
};

const updateBlogInDB = async (
  id: string,
  userId: string,
  userRole: string,
  blogData: Partial<TBlog>,
) => {
  if (userRole === 'admin') {
    throw new AppError(403, 'Admins are not allowed to update blogs');
  }
  const blog = await Blog.findOne({ _id: id, author: userId });
  if (!blog) {
    throw new AppError(404, 'Blog not found');
  }

  Object.assign(blog, blogData);
  await blog.save();
  const updatedBlog = await Blog.findById(blog._id)
    .select('_id title content author')
    .populate('author', 'name email')
    .lean();

  return updatedBlog;
};

const deleteBlogFromDB = async (id: string, userId: string) => {
  const result = await Blog.findOneAndDelete({ _id: id, author: userId });
  if (!result) {
    throw new AppError(404, 'Blog not found');
  }
  return result;
};

const adminDeleteBlogFromDB = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    throw new AppError(404, 'Blog not found');
  }
  return blog;
};

const getAllBlogsFromDB = async (queryParams: TQueryParams) => {
  const { search, sortBy, sortOrder, filter } = queryParams;
  let query = Blog.find();

  if (search) {
    query = query?.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  if (filter) {
    // Validate if filter is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(filter)) {
      throw new Error('Invalid author ID format');
    }
    query = query.find({ author: filter });
  }

  if (sortBy) {
    // Validate sortBy field exists in schema
    const validSortFields = ['title', 'createdAt', 'updatedAt'];
    if (!validSortFields.includes(sortBy)) {
      throw new Error(
        `Invalid sort field. Must be one of: ${validSortFields.join(', ')}`,
      );
    }

    const sortDirection = sortOrder === 'asc' ? 1 : -1;
    query = query.sort({ [sortBy]: sortDirection });
  } else if (sortOrder) {
    // If sortOrder is provided without sortBy, default to sorting by createdAt
    query = query.sort({ createdAt: sortOrder === 'asc' ? 1 : -1 });
  }

  const blogs = await query
    .select('_id title content')
    .populate('author', '_id name email')
    .lean();

  if (!blogs || blogs.length === 0) {
    throw new AppError(404, 'No blogs found');
  }

  return blogs;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogInDB,
  deleteBlogFromDB,
  adminDeleteBlogFromDB,
  getAllBlogsFromDB,
};
