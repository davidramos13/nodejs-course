// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Product'.
const Product = require('../models/product');

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getAddProduct = (req: any, res: any, next: any) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.postAddProduct = (req: any, res: any, next: any) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getProducts = (req: any, res: any, next: any) => {
  Product.fetchAll((products: any) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
