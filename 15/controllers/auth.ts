import { RequestHandler } from "express"
import bcrypt from "bcryptjs";
import User from "../models/User";
import nodemailer from "nodemailer";
import * as crypto from 'crypto';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "***REMOVED***",
    pass: "***REMOVED***"
  }
});

export const getLogin: RequestHandler = (req, res, next) => {
  const flashMessages = req.flash('error');

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: flashMessages.length === 0 ? null : flashMessages
  });
};

export const postLogin: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    req.flash('error', 'Invalid email or password.');
    return res.redirect('/login');
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) {
    req.flash('error', 'Invalid email or password.');
    return res.redirect('/login');
  }

  req.session.isLoggedIn = true;
  req.session.user = user;
  req.session.save(() => {
    res.redirect('/');
  });
};

export const getSignup: RequestHandler = (req, res, next) => {
  const flashMessages = req.flash('error');

  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: flashMessages.length === 0 ? null : flashMessages
  });
};

export const postSignup: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    req.flash('error', 'Email exists, pick a different one.');
    return res.redirect('/signup');
  }

  const hashPassword = await bcrypt.hash(password, 12);
  user = new User({ email, password: hashPassword, cart: { items: [] } });
  await user.save();
  transport.sendMail({
    to: email,
    from: 'nodecourse@smtp.mailtrap.io',
    subject: 'Signup succeeded!',
    html: '<h1>You successfully signed up!</h1>',
  });
  res.redirect('/login');
};

export const postLogout: RequestHandler = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

export const getReset: RequestHandler = (req, res, next) => {
  const flashMessages = req.flash('error');

  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset password',
    errorMessage: flashMessages.length === 0 ? null : flashMessages
  });
};

export const postReset: RequestHandler = async (req, res, next) => {
  const token = crypto.randomBytes(32).toString();
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    req.flash('error', 'No account with that email found');
    return res.redirect('/reset');
  }

  user.resetToken = token;
  user.resetTokenExpiration = Date.now() + 3600000;
  await user.save();

  transport.sendMail({
    to: req.body.email,
    from: 'nodecourse@smtp.mailtrap.io',
    subject: 'Password reset',
    html: `
      <p>You requested a password reset</p>
      <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
    `,
  });
  res.redirect('/');
};

export const getNewPassword: RequestHandler = async (req, res, next) => {
  const token: string = req.params.token;
  const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

  if (!user) {
    return res.redirect('/');
  }

  const flashMessages = req.flash('error');

  res.render('auth/new-password', {
    path: '/new-password',
    pageTitle: 'New password',
    userId: user._id.toString(),
    passwordToken: token,
    errorMessage: flashMessages.length === 0 ? null : flashMessages
  });
};

export const postNewPassword: RequestHandler = async (req, res, next) => {
  const { password, userId, passwordToken } = req.body;
  const user = await User.findOne({ _id: userId, resetToken: passwordToken, resetTokenExpiration: { $gt: Date.now() } });

  const hashPassword = await bcrypt.hash(password, 12);
  user.password = hashPassword;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();

  res.redirect('/login');
};
