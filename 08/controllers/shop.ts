import { RequestHandler } from 'express';
import Product from '../models/product';

export const getProducts: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: any) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

export const getIndex: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: any) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

export const getCart: RequestHandler = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

export const getOrders: RequestHandler = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

export const getCheckout: RequestHandler = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
