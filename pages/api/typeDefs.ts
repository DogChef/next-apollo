import { gql } from "apollo-server-micro";

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    name: String
    email: String!
    createdAt: Date
    updatedAt: Date
  }

  type AuthPayLoad {
    accessToken: String!
    refreshToken: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input UserCreateInput {
    name: String
    email: String!
    password: String!
  }

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User
  }

  type Mutation {
    logInUser(data: UserLoginInput!): User
    signUpUser(data: UserCreateInput!): User
  }
`;

export default typeDefs;
