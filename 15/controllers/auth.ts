import { RequestHandler } from "express"
import bcrypt from "bcryptjs";
import User from "../models/User";

export const getLogin: RequestHandler = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: req.flash('error')
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
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
  });
};

export const postSignup: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.redirect('/signup');
  }

  const hashPassword = await bcrypt.hash(password, 12);
  user = new User({ email, password: hashPassword, cart: { items: [] } });
  await user.save();
  res.redirect('/login');
};

export const postLogout: RequestHandler = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
