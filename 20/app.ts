import path from 'path';
import express, { NextFunction, Request } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import mongoDbSession from 'connect-mongodb-session';
import csrf from "csurf";
import flash from "connect-flash";
import multer from "multer";

import * as errorController from './controllers/error';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import authRoutes from './routes/auth';
import User from './models/User';
import { FileFilterFn } from './util/interfaces';

const CONNECTIONSTRING = '***REMOVED***';

const app = express();
const MongoDBStore = mongoDbSession(session);
const store = new MongoDBStore({ uri: CONNECTIONSTRING, collection: 'sessions' });

const csrfProtection = csrf();

const fileStore = multer.diskStorage({ destination: (req, file, cb) => {
  cb(null, 'images');
}, filename: (req, file, cb) => {
  cb(null, new Date().toISOString() + '-' + file.originalname);
}});

const fileFilter: FileFilterFn = (req, file, cb) => {
  const isImage = ['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype);
  cb(null, isImage);
};

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStore, fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session({
  secret: 'longStringValue',
  resave: false,
  saveUninitialized: false,
  store
}));
app.use(csrfProtection);
app.use(flash());

app.use(async (req, res, next) => {
  if (req.session.user) {
    const user = await User.findById(req.session.user._id);
    req.user = user;
  }
  next();
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
  console.log(err);
  res.status(500).render('500', { pageTitle: 'Error!', path: '/500' });
});

const load = async () => {
  try {
    await mongoose.connect(CONNECTIONSTRING);
    app.listen(3000);
    console.log('SERVER READY');

  } catch (ex) {
    console.log(ex);
  }
};

load();
