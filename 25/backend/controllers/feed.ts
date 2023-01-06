import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import Post from '../models/Post';
import AppError from '../util/AppError';
import _sleep from '../util/sleep';

export const getPosts: RequestHandler = async (req, res) => {
  // await _sleep(3000); for testing frontend loaders
  const posts = await Post.find();
  res.status(200).json({ posts });
};

export const getPost: RequestHandler = async (req, res) => {
  const id: string = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError('Post not found', 404);
  }

  res.status(200).json(post);
};

export const createPost: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation Failed', 422, errors);
  }

  if (!req.file) {
    throw new AppError('No image provided', 422);
  }

  const { title, content } = req.body;

  const post = new Post({
    title,
    content,
    imageUrl: req.file.path,
    creator: { name: 'David' },
  });
  const result = await post.save();

  // Create post in db
  res.status(201).json({ message: 'Post created!', post: result });
};
