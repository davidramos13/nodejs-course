import express from 'express';
import { check, body } from 'express-validator/check';

import * as authController from '../controllers/auth';
import User from '../models/User';

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address.').normalizeEmail(),
    body('password', 'Password has to be valid.').isLength({ min: 5 }).isAlphanumeric().trim()
  ], authController.postLogin
);

router.get('/signup', authController.getSignup);

router.post('/signup', [
    check('email').isEmail().withMessage('Please enter a valid email.')
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) throw new Error('Email exists already, pick a different one.');
      }).normalizeEmail(),
    body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
      .isLength({ min: 5 }).isAlphanumeric().trim(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Passwords have to match!');
      return true;
    })
  ], authController.postSignup
);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.post('/logout', authController.postLogout);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

export default router;
