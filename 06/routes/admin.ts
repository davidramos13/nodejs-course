import path from 'path';
import express from 'express';
export const router = express.Router();

export const products: any = [];

// /admin/add-product => GET
router.get('/add-product', (req: any, res: any, next: any) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /admin/add-product => POST
router.post('/add-product', (req: any, res: any, next: any) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});
