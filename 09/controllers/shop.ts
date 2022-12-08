import Product from '../models/product';
import Cart from '../models/cart';

export const getProducts = (req: any, res: any, next: any) => {
  Product.fetchAll((products: any) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

export const getProduct = (req: any, res: any, next: any) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product: any) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

export const getIndex = (req: any, res: any, next: any) => {
  Product.fetchAll((products: any) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

export const getCart = (req: any, res: any, next: any) => {
  Cart.getCart((cart: any) => {
    Product.fetchAll((products: any) => {
      const cartProducts = [];
      for (product of products) {
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

export const postCart = (req: any, res: any, next: any) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product: any) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

export const postCartDeleteProduct = (req: any, res: any, next: any) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product: any) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

export const getOrders = (req: any, res: any, next: any) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

export const getCheckout = (req: any, res: any, next: any) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
