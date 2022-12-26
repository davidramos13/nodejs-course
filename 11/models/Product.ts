import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import User from "./User";

@Table
class Product extends Model<Product> {
  @Column
  title!: string;

  @Column(DataType.DOUBLE)
  price!: number;

  @Column
  imageUrl!: string;

  @Column
  description!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export default Product;

// import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
// import db from "../util/db";

// interface IProduct {
//   id: number;
//   title: string;
//   price: number;
//   imageUrl: string;
//   description: string;
//   userId: ForeignKey<number>;
// };

// type ProductModel = Model<IProduct, Optional<IProduct, 'id'>>;

// const Product = db.define<ProductModel>('product', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   }
// });

// export default Product;
