// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Cart'.
const Cart = require('./cart');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'p'.
const p = path.join(
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (cb: any) => {
  fs.readFile(p, (err: any, fileContent: any) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = class Product {
  description: any;
  id: any;
  imageUrl: any;
  price: any;
  title: any;
  constructor(id: any, title: any, imageUrl: any, description: any, price: any) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products: any) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod: any) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err: any) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err: any) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id: any) {
    getProductsFromFile((products: any) => {
      const product = products.find((prod: any) => prod.id === id);
      const updatedProducts = products.filter((prod: any) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err: any) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(cb: any) {
    getProductsFromFile(cb);
  }

  static findById(id: any, cb: any) {
    getProductsFromFile((products: any) => {
      const product = products.find((p: any) => p.id === id);
      cb(product);
    });
  }
};
