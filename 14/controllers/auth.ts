import { RequestHandler } from "express"

export const getLogin: RequestHandler = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

export const postLogin: RequestHandler = (req, res, next) => {
};

export const postLogout: RequestHandler = (req, res, next) => {

};
