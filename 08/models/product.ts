import fs from 'fs';
import path from 'path';
import root from '../util/root';

const p = path.join(
  root,
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

export default class Product {
  description: any;
  imageUrl: any;
  price: any;
  title: any;
  constructor(title: any, imageUrl: any, description: any, price: any) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products: any) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err: any) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb: any) {
    getProductsFromFile(cb);
  }
};
