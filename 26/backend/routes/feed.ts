import express from 'express';
import { body } from 'express-validator';

import * as feedController from '../controllers/feed';
import isAuth from '../middleware/isAuth';

const router = express.Router();

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// GET /feed/posts/{id}
router.get('/post/:id', isAuth, feedController.getPost);

// POST /feed/post
router.post(
  '/post',
  isAuth,
  [body('title').trim().isLength({ min: 5 }), body('content').trim().isLength({ min: 5 })],
  feedController.createPost,
);

// PUT /feed/post
router.put(
  '/post/:id',
  isAuth,
  [body('title').trim().isLength({ min: 5 }), body('content').trim().isLength({ min: 5 })],
  feedController.updatePost,
);

// DELETE /feed/post/{id}
router.delete('/post/:id', isAuth, feedController.deletePost);

// GET /feed/status
router.get('/status', isAuth, feedController.getStatus);

// POST /feed/status
router.post(
  '/status',
  isAuth,
  body('status').trim().isLength({ min: 5 }),
  feedController.updateStatus,
);

export default router;
