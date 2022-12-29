import { RequestHandler } from 'express';
import Product from '../models/Product';

export const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

export const postAddProduct: RequestHandler = async (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({ title, price, description, imageUrl, userId: req.user });
  await product.save();

  res.redirect('/');
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
  });
};

export const postEditProduct: RequestHandler = async (req, res, next) => {
  const { productId, ...values } = req.body;

  const product = await Product.findById(productId);

  if (product.userId.toString() !== req.user._id.toString()) {
    return res.redirect('/');
  }

  Object.assign(product, { ...values });
  await product.save()

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
