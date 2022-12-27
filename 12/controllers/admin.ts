import { RequestHandler } from 'express';
import Product from '../models/Product';

export const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

export const postAddProduct: RequestHandler = async (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, description, imageUrl, req.user._id);
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
    product: product
  });
};

export const postEditProduct: RequestHandler = async (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl, prodId);

  await product.save();

  res.redirect('/admin/products');
};

export const getProducts: RequestHandler = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  });
};

export const postDeleteProduct: RequestHandler = async (req, res, next) => {
  const prodId = req.body.productId;
  await Product.deleteById(prodId);
  res.redirect('/admin/products');
};
