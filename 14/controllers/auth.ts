import { RequestHandler } from "express"
import User from "../models/User";

export const getLogin: RequestHandler = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

export const postLogin: RequestHandler = async (req, res, next) => {
  req.session.isLoggedIn = true;
  const user = await User.findById('63aa596bf352e378fa84fab7');
  req.session.user = user;
  req.session.save(() => {
    res.redirect('/');
  });
};

export const postLogout: RequestHandler = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
