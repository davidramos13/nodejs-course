import fs from 'fs';
import path from 'path';
import root from '../util/root';

const p = path.join(root, 'data', 'products.json');

const getProductsFromFile = (cb: any) => {
  fs.readFile(p, (err: any, fileContent: any) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

class Product {
  title: any;
  constructor(t: any) {
    this.title = t;
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

export default Product;
