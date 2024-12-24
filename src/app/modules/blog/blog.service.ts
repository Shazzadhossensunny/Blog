import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  return await Blog.create(payload);
};

export const BlogService = {
  createBlogIntoDB,
};
