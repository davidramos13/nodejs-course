import fs from 'fs';
import path from 'path';
import root from '../util/root';

const p = path.join(
  root,
  'data',
  'cart.json'
);

export default class Cart {
  static addProduct(id: any, productPrice: any) {
    // Fetch the previous cart
    fs.readFile(p, (err: any, fileContent: any) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        // @ts-expect-error TS(2322): Type '{ id: any; qty: number; }' is not assignable... Remove this comment to see the full error message
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err: any) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id: any, productPrice: any) {
    fs.readFile(p, (err: any, fileContent: any) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod: any) => prod.id === id);
      if (!product) {
          return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod: any) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err: any) => {
        console.log(err);
      });
    });
  }

  static getCart(cb: any) {
    fs.readFile(p, (err: any, fileContent: any) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
