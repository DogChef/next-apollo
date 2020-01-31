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
    token: String!
  }

  type UserLoginInput {
    email: String!
    password: String!
  }

  type UserCreateInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User
  }

  type Mutation {
    logInUser(data: UserLoginInput!): AuthPayLoad!
    signUpUser(data: UserCreateInput!): AuthPayLoad!
  }
`;

export default typeDefs;
