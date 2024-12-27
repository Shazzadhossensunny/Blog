import mongoose, { Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new mongoose.Schema<TBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Blog = mongoose.model<TBlog>('Blog', blogSchema);
