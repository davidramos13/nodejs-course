import path from 'path';
import express from 'express';
import adminData from './admin';

const router = express.Router();

router.get('/', (req: any, res: any, next: any) => {
  const products = adminData.products;
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

export default router;
