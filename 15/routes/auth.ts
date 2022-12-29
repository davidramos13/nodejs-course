import express from 'express';

import * as authController from '../controllers/auth';

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.post('/logout', authController.postLogout);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

export default router;
