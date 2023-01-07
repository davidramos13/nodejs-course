import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import 'express-async-errors'; // needed for easier async error handling (until Express 5.x arrives)
import multer from 'multer';

import feedRoutes from './routes/feed';
import authRoutes from './routes/auth';
import AppError from './util/AppError';
import { FileFilterFn } from './util/interfaces';

dotenv.config();

const app = express();

const fileStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter: FileFilterFn = (req, file, cb) => {
  const isImage = ['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype);
  cb(null, isImage);
};

app.use(bodyParser.json());
app.use(multer({ storage: fileStore, fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error: Error | AppError, _req: Request, res: Response, _next: NextFunction) => {
  if ('statusCode' in error) {
    // is AppError
    const { message, statusCode, errors } = error;
    return res.status(statusCode).json({ message, statusCode, errors });
  }

  res.status(500).json({ message: error.message });
});

const load = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    app.listen(8080);
    console.log('SERVER READY');
  } catch (ex) {
    console.log(ex);
  }
};

load();
