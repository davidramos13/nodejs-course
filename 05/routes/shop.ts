// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
const express = require('express');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'rootDir'.
const rootDir = require('../util/path');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = express.Router();

router.get('/', (req: any, res: any, next: any) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router;
