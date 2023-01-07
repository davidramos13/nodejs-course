import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../util/AppError';

type TokenPayload = { userId: string };
const isAuth: RequestHandler = (req, res, next) => {
  const header = req.get('Authorization');
  if (!header) throw new AppError('Not Authenticated', 401);

  const token = header.split(' ')[1];
  const secret = process.env.JWT_SECRET;
  const decodedToken = jwt.verify(token, secret) as TokenPayload;
  if (!decodedToken) throw new AppError('Not Authenticated', 401);

  req.userId = decodedToken.userId;
  next();
};

export default isAuth;
