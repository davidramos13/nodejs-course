import Product from '../models/Product';
// import Cart from '../models/cart';
import { RequestHandler } from 'express';
import OrderItem from '../models/OrderItem';

export const getProducts: RequestHandler = async (req, res, next) => {
  const rows = await Product.findAll();

  res.render('shop/product-list', {
    prods: rows,
    pageTitle: 'All Products',
    path: '/products'
  });
};

export const getProduct: RequestHandler = async (req, res, next) => {
  const prodId = req.params.productId;
  const productModel = await Product.findByPk(prodId);

  if (!productModel) return;

  const product = productModel.dataValues;

  res.render('shop/product-detail', {
    product: product,
    pageTitle: product.title,
    path: '/products'
  });
};

export const getIndex: RequestHandler = async (req, res, next) => {
  const rows = await Product.findAll({ where: { userId: req.user.dataValues.id }});
  res.render('shop/index', {
    prods: rows,
    pageTitle: 'Shop',
    path: '/'
  });
};

export const getCart: RequestHandler = async (req, res, next) => {
  const cart = await req.user.$get('cart');
  const items = cart.cartItems;

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    items: items,
  });
};

export const postCart: RequestHandler = async (req, res, next) => {
  const prodId = req.body.productId;

  const cart = await req.user.$get('cart');
  const cartItems = await cart.$get('cartItems', { where: { productId: prodId } });
  let item = cartItems[0];

  if (item) {
    const newQuantity = item.quantity + 1;
    item = await item.update({ quantity: newQuantity });
  } else {
    item = await cart.$create('cartItem', { productId: prodId, quantity: 1 });
  }

  res.redirect('/cart');
};

export const postCartDeleteProduct: RequestHandler = async (req, res, next) => {
  const prodId = parseInt(req.body.productId);
  const cart = await req.user.$get('cart');

  const item = cart.cartItems.find(x => x.productId === prodId);
  await item.destroy();

  res.redirect('/cart');
};

export const postOrder: RequestHandler = async (req, res, next) => {
  const cart = await req.user.$get('cart');
  const order = await req.user.$create('order', {});

  await Promise.all(cart.cartItems.map(async ({ productId, quantity }) => {
    const newItem = await order.$create('orderItem', { productId, quantity });
    return newItem;
  }));

  await cart.$set('cartItems', null);
};

export const getOrders: RequestHandler = async (req, res, next) => {
  const orders = await req.user.$get('orders');

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
