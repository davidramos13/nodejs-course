// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
const express = require('express');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const bodyParser = require('body-parser');

const app = express();

// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const adminRoutes = require('./routes/admin');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
// @ts-expect-error TS(2304): Cannot find name '__dirname'.
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req: any, res: any, next: any) => {
    // @ts-expect-error TS(2304): Cannot find name '__dirname'.
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
