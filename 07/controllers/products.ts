import { RequestHandler } from 'express';
import Product from '../models/product';

export const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

export const postAddProduct: RequestHandler = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

export const getProducts: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: any) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
