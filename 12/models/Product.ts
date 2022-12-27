import { ObjectId } from "mongodb";
import { getDb } from "../util/db";

class Product {
  _id?: ObjectId;
  title!: string;
  price!: number;
  description!: string;
  imageUrl!: string;
  userId!: ObjectId;

  constructor(title: string, price: number, description: string, imageUrl: string, userId: ObjectId, id?: string) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
    this._id = id ? new ObjectId(id) : undefined;
  }

  async save() {
    const db = getDb();
    const collection = db.collection('products');

    if (this._id) {
      await collection.updateOne({ _id: this._id }, { $set: this });
    } else {
      await collection.insertOne(this);
    }
  }

  static async fetchAll() {
    const db = getDb();
    const products = await db.collection('products').find().toArray();
    return products;
  }

  static async findById(id: string) {
    const db = getDb();
    const product = await db.collection('products')
      .find({ _id: new ObjectId(id) }).next();
    return product;
  }

  static async deleteById(id: string) {
    const db = getDb();
    await db.collection('products').deleteOne({ _id: new ObjectId(id) });
  }
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
