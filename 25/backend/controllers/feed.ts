import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import path from 'path';
import fs from 'fs';
import Post from '../models/Post';
import AppError from '../util/AppError';
import _sleep from '../util/sleep';

export const getPosts: RequestHandler = async (req, res) => {
  // await _sleep(3000); for testing frontend loaders
  const currentPage = req.query.page ? parseInt(req.query.page as string) : 1;
  const perPage = 2;
  const totalItems = await Post.countDocuments();
  const posts = await Post.find()
    .skip((currentPage - 1) * perPage)
    .limit(perPage);
  res.status(200).json({ posts, totalItems });
};

export const getPost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) throw new AppError('Post not found', 404);

  res.status(200).json(post);
};

export const createPost: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError('Validation Failed', 422, errors);
  if (!req.file) throw new AppError('No image provided', 422);

  const { title, content } = req.body;

  const post = new Post({
    title,
    content,
    imageUrl: req.file.path,
    creator: { name: 'David' },
  });
  const result = await post.save();

  res.status(201).json({ message: 'Post created!', post: result });
};

export const updatePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError('Validation Failed', 422, errors);

  const { title, content } = req.body;
  let imageUrl: string = req.body.imageUrl;

  if (req.file) {
    imageUrl = req.file.path;
  }

  if (!imageUrl) throw new AppError('No image provided', 422);

  const post = await Post.findById(id);
  if (!post) throw new AppError('Could not find post', 404);

  if (post.imageUrl !== imageUrl) {
    clearImage(post.imageUrl);
  }

  Object.assign(post, { title, content, imageUrl });
  const result = await post.save();

  res.status(200).json({ message: 'Post updated!', post: result });
};

export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) throw new AppError('Could not find post', 404);

  clearImage(post.imageUrl);
  await post.delete();

  res.status(200).json({ message: 'Post deleted!' });
};

const clearImage = (filePath: string) => {
  const imagePath = path.join(__dirname, '..', filePath);
  fs.unlink(imagePath, (err) => console.log(err));
};
