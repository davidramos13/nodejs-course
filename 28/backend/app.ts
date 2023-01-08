import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import 'express-async-errors'; // needed for easier async error handling (until Express 5.x arrives)
import multer from 'multer';

import AppError from './util/AppError';
import { FileFilterFn } from './util/interfaces';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
import resolver from './graphql/resolvers';
import isAuth from './middleware/isAuth';

dotenv.config();
mongoose.set('strictQuery', false);

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

const getFormattedError = (error: Error | AppError) => {
  if ('statusCode' in error) {
    // is AppError
    const { message, statusCode, errors } = error;
    return {
      status: statusCode,
      message: `${message}${errors ? `\n${JSON.stringify(errors)}` : ''}`,
    };
  }
  return { status: 500, message: error.message };
};

app.use(bodyParser.json());
app.use(multer({ storage: fileStore, fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(isAuth);

app.put('/postimage', (req, res) => {
  if (!req.isAuth) throw new AppError('Not Authenticated', 401);
  return req.file
    ? res.status(201).json({ filePath: req.file.path })
    : res.status(200).json({ message: 'No file provided' });
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
    customFormatErrorFn: (error) => {
      if (!error.originalError) return error;
      return getFormattedError(error.originalError);
    },
  }),
);

app.use((error: Error | AppError, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = getFormattedError(error);
  res.status(status).json({ message });
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
