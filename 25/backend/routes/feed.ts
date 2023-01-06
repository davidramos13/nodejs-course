import express from 'express';
import { body } from 'express-validator';

import * as feedController from '../controllers/feed';

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// GET /feed/posts/{id}
router.get('/posts/:id', feedController.getPost);

// POST /feed/post
router.post(
  '/post',
  [body('title').trim().isLength({ min: 5 }), body('content').trim().isLength({ min: 5 })],
  feedController.createPost,
);

export default router;
