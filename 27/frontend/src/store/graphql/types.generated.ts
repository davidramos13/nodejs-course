export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthData = {
  __typename?: 'AuthData';
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  imageUrl: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostData = {
  __typename?: 'PostData';
  posts: Array<Post>;
  totalItems: Scalars['Int'];
};

export type PostEditData = {
  content: Scalars['String'];
  imageUrl: Scalars['String'];
  title: Scalars['String'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  createPost: Post;
  createUser: User;
  deletePost?: Maybe<Scalars['Boolean']>;
  login: AuthData;
  updatePost: Post;
  updateStatus: User;
};


export type RootMutationCreatePostArgs = {
  postInput?: InputMaybe<PostEditData>;
};


export type RootMutationCreateUserArgs = {
  userInput?: InputMaybe<UserData>;
};


export type RootMutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type RootMutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type RootMutationUpdatePostArgs = {
  id: Scalars['ID'];
  postInput?: InputMaybe<PostEditData>;
};


export type RootMutationUpdateStatusArgs = {
  status: Scalars['String'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  post: Post;
  posts: PostData;
  user: User;
};


export type RootQueryPostArgs = {
  id: Scalars['ID'];
};


export type RootQueryPostsArgs = {
  page: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  posts: Array<Post>;
  status: Scalars['String'];
};

export type UserData = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};
