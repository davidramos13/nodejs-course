import { Column, CreatedAt, DefaultScope, ForeignKey, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import CartItem from "./CartItem";
import OrderItem from "./OrderItem";
import User from "./User";

@DefaultScope(() => ({ include: [OrderItem] }))
@Table
class Order extends Model<Order> {

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export default Order;
