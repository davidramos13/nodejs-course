// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
const express = require('express');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'rootDir'.
const rootDir = require('../util/path');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req: any, res: any, next: any) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req: any, res: any, next: any) => {
  console.log(req.body);
  res.redirect('/');
});

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router;
