import Product from '../models/Product';
// import Cart from '../models/cart';
import { RequestHandler } from 'express';

export const getProducts: RequestHandler = async (req, res, next) => {
  const products = await Product.fetchAll();

  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  });
};

export const getProduct: RequestHandler = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId);

  res.render('shop/product-detail', {
    product: product,
    pageTitle: product.title,
    path: '/products'
  });
};

export const getIndex: RequestHandler = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
};

export const getCart: RequestHandler = async (req, res, next) => {
  const items = await req.user.getCart();

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    items: items,
  });
};

export const postCart: RequestHandler = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);
  await req.user.addToCart(product);

  res.redirect('/cart');
};

export const postCartDeleteProduct: RequestHandler = async (req, res, next) => {
  const prodId = req.body.productId;
  await req.user.deleteItemFromCart(prodId);

  res.redirect('/cart');
};

export const postOrder: RequestHandler = async (req, res, next) => {
  await req.user.addOrder();
};

export const getOrders: RequestHandler = async (req, res, next) => {
  const orders = await req.user.getOrders();

  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
    orders: orders
  });
};

export const getCheckout: RequestHandler = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
