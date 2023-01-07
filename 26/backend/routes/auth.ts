import express from 'express';
import { check, body } from 'express-validator';

import * as authController from '../controllers/auth';
import User from '../models/User';

const router = express.Router();

router.post('/login', authController.postLogin);

router.put(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (value, { req: _req }) => {
        const user = await User.findOne({ email: value });
        if (user) throw new Error('Email exists already, pick a different one.');
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }).isAlphanumeric(),
    body('name').trim().notEmpty(),
  ],
  authController.putSignUp,
);

// router.get('/reset', authController.getReset);

// router.post('/reset', authController.postReset);

// router.post('/logout', authController.postLogout);

// router.get('/reset/:token', authController.getNewPassword);

// router.post('/new-password', authController.postNewPassword);

export default router;
