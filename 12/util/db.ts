import path from "path";
import { Sequelize } from "sequelize-typescript";

const modelsPath = path.join(__dirname, '..', 'models');

const db = new Sequelize('udemynode', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3316,
  models: [modelsPath],
});

export default db;
