import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../util/AppError';
import Post from '../models/Post';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';

// I will follow this way for typing to not change a lot what is shown in the course
// I am aware of type-graphql, which follow a different (strongly typed) way to create resolvers and schemas

type CreateUserInput = { userInput: { email: string; name: string; password: string } };
type LoginInput = { email: string; password: string };
type PostCreateBase = { title: string; content: string; imageUrl: string };
type PostCreateInput = { postInput: PostCreateBase };
type PostsInput = { page: number };
type PostInput = { id: string };
type PostUpdateInput = { id: string; postInput: PostCreateBase };
type StatusInput = { status: string };

const resolver = {
  hello: () => ({ text: 'Hello World', views: 124 }),

  createUser: async (input: CreateUserInput) => {
    const { email, name, password } = input.userInput;

    if (
      !validator.isEmail(email) ||
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 5 })
    )
      throw new AppError('Validation Failed', 422);

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError('Email exists already, pick a different one', 422);

    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashPassword, name });
    const result = await user.save();

    return { ...result._doc, _id: result._id.toString() };
  },

  login: async (body: LoginInput) => {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) throw new AppError('Invalid user or password', 401);

    const matches = await bcrypt.compare(password, user.password);
    if (!matches) throw new AppError('Invalid user or password', 401);

    const token = jwt.sign(
      {
        email,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    return { token, userId: user._id.toString() };
  },

  post: async (body: PostInput, req: Request) => {
    if (!req.isAuth) throw new AppError('Not Authenticated', 401);
    const { id } = body;

    const post = await Post.findById(id).populate('creator');
    if (!post) throw new AppError('Post not found', 404);

    if (post.creator._id.toString() !== req.userId) {
      throw new AppError('Not authorized!', 403);
    }

    return {
      ...post._doc,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  },

  posts: async (body: PostsInput, req: Request) => {
    if (!req.isAuth) throw new AppError('Not Authenticated', 401);

    const { page } = body;
    const currentPage = page || 1;
    const perPage = 2;
    const totalItems = await Post.countDocuments();
    const dbPosts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .populate('creator');

    const posts = dbPosts.map((p) => ({
      ...p._doc,
      _id: p._id.toString(),
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));

    return { posts, totalItems };
  },

  createPost: async (body: PostCreateInput, req: Request) => {
    if (!req.isAuth) throw new AppError('Not Authenticated', 401);

    const { content, imageUrl, title } = body.postInput;

    if (
      validator.isEmpty(title) ||
      !validator.isLength(title, { min: 5 }) ||
      validator.isEmpty(content) ||
      !validator.isLength(content, { min: 5 })
    )
      throw new AppError('Validation Failed', 422);

    const post = new Post({ title, content, imageUrl, creator: req.userId });
    const result = await post.save();

    const user = await User.findById(req.userId);
    user.posts.push(result._id);
    await user.save();

    return {
      ...result._doc,
      creator: user._doc,
      _id: result._id.toString(),
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
    };
  },

  updatePost: async (body: PostUpdateInput, req: Request) => {
    if (!req.isAuth) throw new AppError('Not Authenticated', 401);

    const { id, postInput } = body;
    const { title, content, imageUrl } = postInput;

    if (
      validator.isEmpty(title) ||
      !validator.isLength(title, { min: 5 }) ||
      validator.isEmpty(content) ||
      !validator.isLength(content, { min: 5 }) ||
      validator.isEmpty(imageUrl)
    )
      throw new AppError('Validation Failed', 422);

    const post = await Post.findById(id);
    if (!post) throw new AppError('Could not find post', 404);

    if (post.creator.toString() !== req.userId) {
      throw new AppError('Not authorized!', 403);
    }

    if (post.imageUrl !== imageUrl) {
      clearImage(post.imageUrl);
    }

    Object.assign(post, { title, content, imageUrl });
    const result = await (await post.save()).populate('creator');

    return {
      ...result._doc,
      _id: result._id.toString(),
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
    };
  },

  deletePost: async (args: PostInput, req: Request) => {
    if (!req.isAuth) throw new AppError('Not Authenticated', 401);

    const { id } = args;
    const post = await Post.findById(id);
    if (!post) throw new AppError('Could not find post', 404);

    if (post.creator.toString() !== req.userId) {
      throw new AppError('Not authorized!', 403);
    }

    clearImage(post.imageUrl);
    await post.delete();

    const user = await User.findById(req.userId);
    const postsUpdated = user.posts.slice().filter((p) => p._id.toString() !== id);
    user.posts = postsUpdated;
    await user.save();

    return true;
  },

  user: async (_: unknown, req: Request) => {
    if (!req.isAuth) throw new AppError('Not Authenticated', 401);

    const user = await User.findById(req.userId);
    return { ...user._doc, _id: user._id.toString() };
  },

  updateStatus: async (body: StatusInput, req: Request) => {
    if (!req.isAuth) throw new AppError('Not Authenticated', 401);

    const { status } = body;

    const user = await User.findById(req.userId);
    user.status = status;
    await user.save();

    return { ...user._doc, _id: user._id.toString() };
  },
};

const clearImage = (filePath: string) => {
  const imagePath = path.join(__dirname, '..', filePath);
  fs.unlink(imagePath, (err) => console.log(err));
};

export default resolver;
