import Product from '../models/product';

export const getAddProduct = (req: any, res: any, next: any) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

export const postAddProduct = (req: any, res: any, next: any) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

export const getProducts = (req: any, res: any, next: any) => {
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
