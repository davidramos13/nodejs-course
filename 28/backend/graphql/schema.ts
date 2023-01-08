import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type AuthData {
    token: String!
    userId: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String!
    posts: [Post!]!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    creator: User!
    imageUrl: String!
    createdAt: String!
    updatedAt: String!
  }

  type PostData {
    posts: [Post!]!
    totalItems: Int!
  }

  input UserData {
    email: String!
    name: String!
    password: String!
  }

  input PostEditData {
    title: String!
    content: String!
    imageUrl: String!
  }

  type RootQuery {
    posts(page: Int!): PostData!
    post(id: ID!): Post!
    user: User!
  }

  type RootMutation {
    login(email: String!, password: String!): AuthData!
    createUser(userInput: UserData): User!
    createPost(postInput: PostEditData): Post!
    updatePost(id: ID!, postInput: PostEditData): Post!
    deletePost(id: ID!): Boolean
    updateStatus(status: String!): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

export default schema;
