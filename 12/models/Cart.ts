import { Column, CreatedAt, DefaultScope, ForeignKey, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import CartItem from "./CartItem";
import User from "./User";

@DefaultScope(() => ({ include: [CartItem] }))
@Table
class Cart extends Model<Cart> {

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @HasMany(() => CartItem)
  cartItems: CartItem[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export default Cart;
