import { model, Schema, Types } from "mongoose";

export interface IOrder {
  products: {
    product: {
      title: string;
      price: number;
      description: string;
      imageUrl: string;
    };
    quantity: number;
  }[];
  user: { name: string; userId: Types.ObjectId; };
};

const schema = new Schema<IOrder>({
  products: [{
    product: { type: Object, required: true },
    quantity: { type: Number, required: true }
  }],
  user: {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  }
});

const Order = model<IOrder>('Order', schema);

export default Order;
