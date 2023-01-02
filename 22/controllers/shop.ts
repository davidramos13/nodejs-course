import fs from 'fs';
import path from 'path';
import { RequestHandler } from 'express';
import PDFDocument from 'pdfkit';
import Stripe from 'stripe';

import Product, { IProduct, ProductWithDoc } from '../models/Product';
import Order from '../models/Order';
import { Cart } from '../models/User';

const ITEMS_PER_PAGE = 2;
const stripe = new Stripe('sk_test***REMOVED***', { apiVersion: null });

export const getProducts: RequestHandler = async (req, res, next) => {
  const count = await Product.find().countDocuments();

  const page = parseInt(req.query.page?.toString() || '1');
  const products = await Product.find().skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);

  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products',
    totalProducts: count,
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < count,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(count/ITEMS_PER_PAGE)
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
  const count = await Product.find().countDocuments();

  const page = parseInt(req.query.page?.toString() || '1');
  const products = await Product.find().skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);

  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    totalProducts: count,
    currentPage: page,
    hasNextPage: ITEMS_PER_PAGE * page < count,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(count/ITEMS_PER_PAGE)
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

export const getCheckout: RequestHandler = async (req, res, next) => {
  const user = await req.user.populate<{ cart: Cart<ProductWithDoc> }>('cart.items.productId');
  const products = user.cart.items;

  let total = 0;
  products.forEach(p => {
    total += p.quantity * p.productId.price;
  });

  const host = req.get('host');

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: products.map(p => ({
      quantity: p.quantity,
      price_data: {
        unit_amount: Math.ceil(p.productId.price * 100),
        product_data: {
          name: p.productId.title,
          description: p.productId.description,
          images: [p.productId.imageUrl]
        },
        currency: 'usd'
      }
    })),
    success_url: `${req.protocol}://${host}/checkout/success`, // => http://localhost:3000
    cancel_url: `${req.protocol}://${host}/checkout/cancel`
  });

  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
    products: products,
    totalSum: total,
    sessionId: session.id
  });
};

export const getCheckoutSuccess: RequestHandler = async (req, res, next) => {
  const user = await req.user.populate<{ cart: Cart<ProductWithDoc> }>('cart.items.productId');
  const products = user.cart.items.map(i => {
    return { quantity: i.quantity, product: { ...i.productId._doc } };
  });

  const order = new Order({
    user: { email: req.user.email, userId: req.user },
    products: products
  });
  await order.save();
  await req.user.clearCart();
  res.redirect('/orders');
};
