import { model, Schema, Types } from 'mongoose';
import { DocumentResult } from '../util/interfaces';

export interface IPost extends DocumentResult<IPost> {
  title: string;
  imageUrl: string;
  content: string;
  creator: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

const Post = model<IPost>('Post', schema);

export default Post;
