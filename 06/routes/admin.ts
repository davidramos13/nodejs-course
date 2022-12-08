// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
const express = require('express');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'rootDir'.
const rootDir = require('../util/path');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = express.Router();

const products: any = [];

// /admin/add-product => GET
router.get('/add-product', (req: any, res: any, next: any) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /admin/add-product => POST
router.post('/add-product', (req: any, res: any, next: any) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.routes = router;
// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.products = products;
