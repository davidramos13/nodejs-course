import { RequestHandler } from 'express';
import Product from '../models/Product';
import { validationResult } from 'express-validator/check';

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
  const { title, imageUrl, price, description } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: false,
      hasError: true,
      product: { title, imageUrl, price, description },
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

export const postDeleteProduct: RequestHandler = async (req, res, next) => {
  const prodId = req.body.productId;
  await Product.deleteOne({ _id: prodId, userId: req.user._id });
  res.redirect('/admin/products');
};
