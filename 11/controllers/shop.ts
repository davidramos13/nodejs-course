import Product from '../models/product';
import Cart from '../models/cart';
import { RequestHandler } from 'express';

export const getProducts: RequestHandler = async (req, res, next) => {
  const rows = await Product.fetchAll();
  res.render('shop/product-list', {
    prods: rows,
    pageTitle: 'All Products',
    path: '/products'
  });
};

export const getProduct: RequestHandler = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId);
  // Product.findById(prodId, (product: any) => {
  //   res.render('shop/product-detail', {
  //     product: product,
  //     pageTitle: product.title,
  //     path: '/products'
  //   });
  // });
};

export const getIndex: RequestHandler = async (req, res, next) => {
  const rows = await Product.fetchAll();
  res.render('shop/index', {
    prods: rows,
    pageTitle: 'Shop',
    path: '/'
  });
};

export const getCart: RequestHandler = (req, res, next) => {
  Cart.getCart((cart: any) => {
    Product.fetchAll().then(([rows, fieldData]) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: rows
      });
    }).catch(err => console.log(err));
  });
};

export const postCart: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId);
  // Product.findById(prodId, () => {
  //   Cart.addProduct(prodId, product.price);
  // });
  res.redirect('/cart');
};

export const postCartDeleteProduct: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId);
  // Product.findById(prodId, (product: any) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
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
