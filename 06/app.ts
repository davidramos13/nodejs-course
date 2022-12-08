// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
const express = require('express');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'adminData'... Remove this comment to see the full error message
const adminData = require('./routes/admin');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
// @ts-expect-error TS(2304): Cannot find name '__dirname'.
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req: any, res: any, next: any) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
