import { Db, MongoClient } from 'mongodb';

const connStr = '***REMOVED***?retryWrites=true&w=majority';

let _db: Db;

export const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

export const mongoConnect = async () => {
  const client = new MongoClient(connStr);
  await client.connect();
  _db = client.db();
};
