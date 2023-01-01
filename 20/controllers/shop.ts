import fs from 'fs';
import path from 'path';
import { HydratedDocument } from 'mongoose';
import { RequestHandler } from 'express';
import PDFDocument from 'pdfkit';

import Product, { IProduct, ProductWithDoc } from '../models/Product';
// import Cart from '../models/cart';
import Order from '../models/Order';
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

export const getInvoice: RequestHandler = async (req, res, next) => {
  const orderId = req.params.orderId;

  const order = await Order.findById(orderId);
  if (order.user.userId.toString() !== req.user._id.toString()) {
    return next(new Error('Unauthorized'));
  }

  const invoiceName = `invoice-${orderId}.pdf`;
  const invoicePath = path.join('data', 'invoices', invoiceName);

  const pdfDoc = new PDFDocument();
  pdfDoc.pipe(fs.createWriteStream(invoicePath));
  pdfDoc.pipe(res);

  pdfDoc.fontSize(26).text('Invoice', { underline: true });
  pdfDoc.text('--------------------');

  let totalPrice = 0;
  order.products.forEach(prod => {
    totalPrice += prod.product.price;
    pdfDoc.fontSize(14).text(`${prod.product.title} - ${prod.quantity} x $${prod.product.price}`);
  });

  pdfDoc.text('----');
  pdfDoc.fontSize(20).text(`Total Price: $${totalPrice}`);
  pdfDoc.end();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`);

  // reading pdf instead of creating
  // const file = await fs.promises.readFile(invoicePath);
  // const file = fs.createReadStream(invoicePath);

  // file.pipe(res);
};
