import mysql from "mysql2";

const pool = mysql.createPool({
  host: 'localhost',
  port: 3316,
  user: 'root',
  database: 'udemynode',
  password: 'root',
});

export default pool.promise();

