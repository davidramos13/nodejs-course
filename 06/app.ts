import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
