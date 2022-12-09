import path from 'path';
import express from 'express';
import rootDir from '../util/root';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

export default router;
