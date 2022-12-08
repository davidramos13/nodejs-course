// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const Product = require('../models/product');

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getAddProduct = (req: any, res: any, next: any) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.postAddProduct = (req: any, res: any, next: any) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getProducts = (req: any, res: any, next: any) => {
  Product.fetchAll((products: any) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
