import { BelongsTo, Column, CreatedAt, DefaultScope, ForeignKey, HasOne, Model, Table, UpdatedAt } from "sequelize-typescript";
import Cart from "./Cart";
import Product from "./Product";

@DefaultScope(() => ({ include: Product }))
@Table
class CartItem extends Model<CartItem> {
  @ForeignKey(() => Cart)
  @Column
  cartId!: number;

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

export default CartItem;
