import Product, { IProduct, ProductWithDoc } from '../models/Product';
// import Cart from '../models/cart';
import { RequestHandler } from 'express';
import Order from '../models/Order';
import { HydratedDocument } from 'mongoose';
import { Cart } from '../models/User';

export const getProducts: RequestHandler = async (req, res, next) => {
  const products = await Product.find();

  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products',
  });
};

export const getProduct: RequestHandler = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId);

  res.render('shop/product-detail', {
    product: product,
    pageTitle: product.title,
    path: '/products',
  });
};

export const getIndex: RequestHandler = async (req, res, next) => {
  const products = await Product.find();

  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
  });
};

export const getCart: RequestHandler = async (req, res, next) => {
  const user = await req.user.populate('cart.items.productId');

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: user.cart.items,
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
  const user = await req.user.populate<{ cart: Cart<ProductWithDoc> }>('cart.items.productId');

  const { email, cart: { items } } = user;
  const products = items.map(i => ({
    quantity: i.quantity,
    product: { ...i.productId._doc },
  }));

  const order = new Order({ user: { email, userId: user }, products });
  await order.save();
  await user.clearCart();

  res.redirect('/orders');
};

export const getOrders: RequestHandler = async (req, res, next) => {
  const orders = await Order.find({ 'user.userId': req.user._id });

  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
    orders: orders,
  });
};

export const getCheckout: RequestHandler = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
