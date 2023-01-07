import { RequestHandler } from 'express';
import User from '../models/User';
import { validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../util/AppError';

export const postLogin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new AppError('Invalid user or password.', 401);

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) throw new AppError('Invalid user or password.', 401);

  const token = jwt.sign(
    {
      email,
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );

  res.status(200).json({ token, userId: user._id.toString() });
};

export const putSignUp: RequestHandler = async (req, res) => {
  const { email, name, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError('Validation Failed', 422, errors);

  const hashPassword = await bcrypt.hash(password, 12);
  const user = new User({ email, password: hashPassword, name });
  const result = await user.save();

  res.status(201).json({ message: 'User created!', userId: result._id });
};
