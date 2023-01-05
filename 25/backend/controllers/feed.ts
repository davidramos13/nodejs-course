import { RequestHandler } from "express";
import sleep from "../util/sleep";

export const getPosts: RequestHandler = async (req, res, next) => {
  // await sleep(3000); for testing frontend loaders
  res.status(200).json({
    posts: [{
      _id: '1',
      title: 'First Post',
      content: 'This is the first post!',
      imageUrl: 'images/book.jpg',
      creator: { name: 'David' },
      createdAt: new Date(),
    }]
  });
};

export const createPost: RequestHandler = async (req, res, next) => {
  const { title, content } = req.body;
  // Create post in db
  res.status(201).json({
    message: 'Post created successfully!',
    post: { id: new Date().toISOString(), title: title, content: content }
  });
};
