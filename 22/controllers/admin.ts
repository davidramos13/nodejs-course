import { RequestHandler } from 'express';
import fs from 'fs';
import { validationResult } from 'express-validator/check';
import Product from '../models/Product';

export const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

export const postAddProduct: RequestHandler = async (req, res, next) => {
  const { title, price, description } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: false,
      hasError: true,
      product: { title, price, description },
      errorMessage: 'Attached file is not an image.',
      validationErrors: []
    });
  }

  const errors = validationResult(req);
  const imageUrl = image.path;

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: false,
      hasError: true,
      product: { title, price, description },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const product = new Product({ title, price, description, imageUrl, userId: req.user });
  await product.save();

  res.redirect('/admin/products');
};

export const getEditProduct: RequestHandler = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  const product = await Product.findById(prodId);

  if (!product) {
    return res.redirect('/');
  }

  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: product,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

export const postEditProduct: RequestHandler = async (req, res, next) => {
  const { productId, ...values } = req.body;
  const image = req.file;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      hasError: true,
      product: { ...values, _id: productId },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const product = await Product.findById(productId);

  if (product.userId.toString() !== req.user._id.toString()) {
    return res.redirect('/');
  }

  if (image) {
    fs.promises.unlink(product.imageUrl);
    product.imageUrl = image.path;
  }

  Object.assign(product, { ...values });
  await product.save();

  res.redirect('/admin/products');
};

export const getProducts: RequestHandler = async (req, res, next) => {
  const products = await Product.find({ userId: req.user._id });
  //  .select('title price -_id').populate('userId');

  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products',
  });
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);

  if (!product) {
    return next(new Error('Product not found.'));
  }

  fs.promises.unlink(product.imageUrl);
  await product.delete();

  res.status(200).json({ message: 'Success!' });
};
