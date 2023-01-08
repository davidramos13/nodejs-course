import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

type TokenPayload = { userId: string };
const isAuth: RequestHandler = (req, res, next) => {
  const header = req.get('Authorization');
  if (!header) {
    req.isAuth = false;
    return next();
  }
  const token = header.split(' ')[1];
  const secret = process.env.JWT_SECRET;
  const decodedToken = jwt.verify(token, secret) as TokenPayload;
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};

export default isAuth;
