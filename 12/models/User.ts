import { Column, CreatedAt, HasMany, HasOne, Model, Scopes, Table, UpdatedAt } from "sequelize-typescript";
import Cart from "./Cart";
import Order from "./Order";
import Product from "./Product";

@Table
class User extends Model<User> {
  @Column
  name!: string;

  @Column
  email!: string;

  @HasOne(() =>  Cart)
  cart: Cart;

  @HasMany(() => Product)
  products: Product[];

  @HasMany(() => Order)
  orders: Order[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export default User;

// import { DataTypes, Model, Optional } from "sequelize";
// import db from "../util/db";

// interface IUser {
//   id: number;
//   name: string;
//   email: string;
// }

// export type UserModel = Model<IUser, Optional<IUser, 'id'>>;

// const User = db.define<UserModel>('user', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// export default User;
