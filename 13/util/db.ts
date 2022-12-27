import mongoose from 'mongoose';

const connStr = '***REMOVED***?retryWrites=true&w=majority';

export const connect = async () => {
  await mongoose.connect(connStr);
};
