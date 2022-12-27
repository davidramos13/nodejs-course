import { HydratedDocument, Model, model, Schema, Types } from "mongoose";
import { IProduct } from "./Product";

// This solves typing for both ObjectId and populate scenarios
export type Cart<T> = {
  items: {
    productId: T;
    quantity: number;
  }[];
};

export interface IUser {
  name: string;
  email: string;
  cart: Cart<Types.ObjectId>;
}

export interface IUserMethods {
  addToCart(product: HydratedDocument<IProduct>): Promise<void>;
  deleteItemFromCart(productId: string): Promise<void>;
  clearCart(): Promise<void>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const schema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: {
    items: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }]
  }
});

schema.methods.addToCart = async function(product: HydratedDocument<IProduct>) {
  const self = this as HydratedDocument<IUser, IUserMethods>;
  const cartProductIndex = self.cart.items.findIndex(ci => {
    return ci.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...self.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = self.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }

  self.cart = { items: updatedCartItems };
  await self.save();
}

schema.methods.deleteItemFromCart = async function (productId: string) {
  const self = this as HydratedDocument<IUser, IUserMethods>;
  const updatedCartItems = self.cart.items.filter(item => {
    return item.productId.toString() !== productId;
  });
  self.cart.items = updatedCartItems;
  await self.save();
}

schema.methods.clearCart = async function() {
  const self = this as HydratedDocument<IUser, IUserMethods>;
  self.cart = {items: []};
  await self.save();
}

const User = model<IUser, UserModel>('User', schema);

export default User;
