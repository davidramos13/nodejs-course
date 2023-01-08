import { model, Schema, Types } from 'mongoose';
import { DocumentResult } from '../util/interfaces';

export interface IUser extends DocumentResult<IUser> {
  email: string;
  name: string;
  password: string;
  status?: string;
  posts: Types.ObjectId[];
}

const schema = new Schema<IUser>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, default: 'I am new!' },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

const User = model<IUser>('User', schema);

export default User;
