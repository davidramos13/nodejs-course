import path from 'path';
import express from 'express';
import rootDir from '../util/root';

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

export default router;
