// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Product'.
const Product = require('../models/product');

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getProducts = (req: any, res: any, next: any) => {
  Product.fetchAll((products: any) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getIndex = (req: any, res: any, next: any) => {
  Product.fetchAll((products: any) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getCart = (req: any, res: any, next: any) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getOrders = (req: any, res: any, next: any) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getCheckout = (req: any, res: any, next: any) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
