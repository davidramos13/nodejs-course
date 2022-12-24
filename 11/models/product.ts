import { RowDataPacket } from 'mysql2';
import db from '../util/db';
import Cart from './cart';

export interface IProduct {
  description: string;
  id: string;
  imageUrl: string;
  price: number;
  title: string;
}

type IProductRow = IProduct & RowDataPacket;

export default class Product implements IProduct {
  description: string;
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  constructor(id: string, title: string, imageUrl: string, description: string, price: number) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    await db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]);
  }

  static deleteById(id: any) {

  }

  static async fetchAll() {
    const [rows] = await db.query<IProductRow[]>('SELECT * FROM products');
    return rows;
  }

  static async findById(id: any) {
    const [rows] = await db.query<IProductRow[]>('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }
};
