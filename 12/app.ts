import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { mongoConnect } from './util/db';

import * as errorController from './controllers/error';

import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import User from './models/User';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const user = await User.findById('63aa2deb365384a83ba424c8');
  req.user = new User(user.name, user.email, user.cart, user._id);
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const load = async () => {
  try {
    await mongoConnect();
    app.listen(3000);
    console.log('SERVER READY');

  } catch (ex) {
    console.log(ex);
  }
};

load();
