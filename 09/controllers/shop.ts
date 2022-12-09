import Product from '../models/product';
import Cart from '../models/cart';
import { RequestHandler } from 'express';

export const getProducts: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: any) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

export const getProduct: RequestHandler = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product: any) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

export const getIndex: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: any) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

export const getCart: RequestHandler = (req, res, next) => {
  Cart.getCart((cart: any) => {
    Product.fetchAll((products: Product[]) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod: any) => prod.id === product.id
        );
        if (cartProductData) {
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

export const postCart: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product: any) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

export const postCartDeleteProduct: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product: any) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

export const getOrders: RequestHandler = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

export const getCheckout: RequestHandler = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
