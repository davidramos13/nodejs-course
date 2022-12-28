import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import mongoDbSession from 'connect-mongodb-session';

import * as errorController from './controllers/error';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import authRoutes from './routes/auth';
import User from './models/User';

const CONNECTIONSTRING = '***REMOVED***';

const app = express();
const MongoDBStore = mongoDbSession(session);
const store = new MongoDBStore({ uri: CONNECTIONSTRING, collection: 'sessions' });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'longStringValue',
  resave: false,
  saveUninitialized: false,
  store
}));

app.use(async (req, res, next) => {
  if (req.session.user) {
    const user = await User.findById(req.session.user._id);
    req.user = user;
  }
  next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

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
