import { BelongsTo, Column, CreatedAt, DefaultScope, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import Order from "./Order";
import Product from "./Product";

@DefaultScope(() => ({ include: Product }))
@Table
class OrderItem extends Model<OrderItem> {
  @ForeignKey(() => Order)
  @Column
  orderId!: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @Column
  quantity: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export default OrderItem;
