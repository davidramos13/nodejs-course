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
