import ApiError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  return await Blog.create(payload);
};

const updateBlogInDB = async (
  id: string,
  userId: string,
  blogData: Partial<TBlog>,
) => {
  const blog = await Blog.findOne({ _id: id, author: userId });
  if (!blog) {
    throw new ApiError(404, 'Blog not found');
  }

  Object.assign(blog, blogData);
  return await blog.save();
};

const deleteBlogFromDB = async (id: string, userId: string) => {
  const result = await Blog.findOneAndDelete({ _id: id, author: userId });
  if (!result) {
    throw new ApiError(404, 'Blog not found');
  }
  return result;
};

const getAllBlogsFromDB = async (queryParams: {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: string;
}) => {
  const { search, sortBy, sortOrder, filter } = queryParams;
  let query = Blog.find();

  if (search) {
    query = query.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  if (filter) {
    query = query.find({ author: filter });
  }

  if (sortBy && sortOrder) {
    query = query.sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 });
  }

  return await query.populate('author', 'name email');
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogInDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
