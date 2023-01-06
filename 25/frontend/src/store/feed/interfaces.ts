export interface IPost {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  creator: { name: string };
  createdAt: string;
}

export type PostFormData = {
  title: string;
  image?: File;
  content: string;
};
