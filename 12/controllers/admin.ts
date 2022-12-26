import { RequestHandler } from 'express';
import Product from '../models/Product';
import db from '../util/db';

export const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

export const postAddProduct: RequestHandler = async (req, res, next) => {
  if (!req.user) return;
  const { title, imageUrl, price, description } = req.body;


  await req.user.$create('product', { title, price, imageUrl, description });
  // createProduct inside req.user is not typed
  // $create allows to call "createProduct" based on definition here

  res.redirect('/');
};

export const getEditProduct: RequestHandler = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  const model = await Product.findByPk(prodId);

  if (!model) {
    return res.redirect('/');
  }

  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: model.dataValues
  });
};

export const postEditProduct: RequestHandler = async (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const model = await Product.findByPk(prodId);

  if (!model) return;

  await model.update({ title, price, imageUrl, description });
  console.log('Updated Product!');

  res.redirect('/admin/products');
};

export const getProducts: RequestHandler = async (req, res, next) => {
  const rows = await req.user.$get('products');
  res.render('admin/products', {
    prods: rows,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  });
};

export const postDeleteProduct: RequestHandler = async (req, res, next) => {
  const prodId = req.body.productId;
  const productModel = await Product.findByPk(prodId);
  await productModel.destroy();
  console.log('Deleted Product!');
  res.redirect('/admin/products');
};
