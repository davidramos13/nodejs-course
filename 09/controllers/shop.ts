// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Product'.
const Product = require('../models/product');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Cart'.
const Cart = require('../models/cart');

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getProducts = (req: any, res: any, next: any) => {
  Product.fetchAll((products: any) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getProduct = (req: any, res: any, next: any) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product: any) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getIndex = (req: any, res: any, next: any) => {
  Product.fetchAll((products: any) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getCart = (req: any, res: any, next: any) => {
  Cart.getCart((cart: any) => {
    Product.fetchAll((products: any) => {
      const cartProducts = [];
      // @ts-expect-error TS(2304): Cannot find name 'product'.
      for (product of products) {
        const cartProductData = cart.products.find(
          // @ts-expect-error TS(2304): Cannot find name 'product'.
          (prod: any) => prod.id === product.id
        );
        if (cartProductData) {
          // @ts-expect-error TS(2304): Cannot find name 'product'.
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.postCart = (req: any, res: any, next: any) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product: any) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.postCartDeleteProduct = (req: any, res: any, next: any) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product: any) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getOrders = (req: any, res: any, next: any) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getCheckout = (req: any, res: any, next: any) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
