import { model, Schema } from 'mongoose';

export interface IPost {
  title: string;
  imageUrl: string;
  content: string;
  creator: { name: string };
  createdAt: Date;
}

const schema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
    creator: { name: { type: String, required: true } },
  },
  { timestamps: true },
);

const Post = model<IPost>('Post', schema);

export default Post;
