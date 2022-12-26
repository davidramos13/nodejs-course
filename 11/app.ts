import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import db from './util/db';

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
  const user = await User.findByPk(1);
  req.user = user;
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const load = async () => {
  try {
    // await db.sync({ force: true });
    await db.sync();
    let user = await User.findByPk(1);
    if (!user) {
      user = await User.create({ name: 'David Ramos', email: 'dramos@klagan.com' });
      user.$create('cart', {});
    }
    app.listen(3000);
  } catch (ex) {
    console.log(ex);
  }
};

load();
