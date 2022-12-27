import { model, Schema, Types, ObjectId } from "mongoose";
import { DocumentResult } from "../util/interfaces";

export interface IProduct {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: Types.ObjectId;
}

export type ProductWithDoc = IProduct & DocumentResult<IProduct>;

const schema = new Schema<IProduct>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Product = model<IProduct>('Product', schema);

export default Product;

// class Product {
//   _id?: ObjectId;
//   title!: string;
//   price!: number;
//   description!: string;
//   imageUrl!: string;
//   userId!: ObjectId;

//   constructor(title: string, price: number, description: string, imageUrl: string, userId: ObjectId, id?: string) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.userId = userId;
//     this._id = id ? new ObjectId(id) : undefined;
//   }

  // async save() {
  //   const db = getDb();
  //   const collection = db.collection('products');

  //   if (this._id) {
  //     await collection.updateOne({ _id: this._id }, { $set: this });
  //   } else {
  //     await collection.insertOne(this);
  //   }
  // }

  // static async fetchAll() {
  //   const db = getDb();
  //   const products = await db.collection('products').find().toArray();
  //   return products;
  // }

  // static async findById(id: string) {
  //   const db = getDb();
  //   const product = await db.collection('products')
  //     .find({ _id: new ObjectId(id) }).next();
  //   return product;
  // }

  // static async deleteById(id: string) {
  //   const db = getDb();
  //   await db.collection('products').deleteOne({ _id: new ObjectId(id) });
  // }
// }

// export default Product;
