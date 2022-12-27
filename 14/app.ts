import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import * as errorController from './controllers/error';

import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

import User from './models/User';
import { connect } from './util/db';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const user = await User.findById('63aa596bf352e378fa84fab7');
  req.user = user;
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const load = async () => {
  try {
    await connect();
    app.listen(3000);
    console.log('SERVER READY');

  } catch (ex) {
    console.log(ex);
  }
};

load();
