import { Document, ObjectId, WithId } from "mongodb";
import { getDb } from "../util/db";
import Product from "./Product";

type CartItem = { productId: ObjectId, quantity: number };
type Cart = { items: CartItem[] };

class User {
  _id?: ObjectId;
  name!: string;
  email!: string;
  cart!: Cart;

  constructor(name: string, email: string, cart: Cart, id?: ObjectId) {
    this.name = name;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  async save() {
    const db = getDb();
    await db.collection('users').insertOne(this);
  }

  static async findById(id: string) {
    const db = getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    return user;
  }

  async addToCart(product: WithId<Document>) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems: CartItem[] = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity
      });
    }
    const updatedCart = { items: updatedCartItems };
    const db = getDb();
    await db.collection('users').updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  async getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(i => i.productId);
    const products = await db.collection('products').find({ _id: { $in: productIds } }).toArray();
    const data = products.map(p => {
      const quantity = this.cart.items.find(i => i.productId.toString() === p._id.toString()).quantity;
      return { ...p, quantity };
    });
    return data;
  }

  async deleteItemFromCart(productId: string) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId;
    });
    const updatedCartData = { cart: { items: updatedCartItems } };
    const db = getDb();
    await db.collection('users').updateOne({ _id: this._id }, { $set: updatedCartData });
  }

  async addOrder() {
    const db = getDb();
    const products = await this.getCart();

    const user = { _id: this._id, name: this.name };
    const order = { items: products, user };

    await db.collection('orders').insertOne(order);
    this.cart = { items: [] };

    await db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
  }

  async getOrders() {
    const db = getDb();
    const orders = await db.collection('orders').find({ 'user._id': this._id }).toArray();
    return orders;
  }
}

export default User;
