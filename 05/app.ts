import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
