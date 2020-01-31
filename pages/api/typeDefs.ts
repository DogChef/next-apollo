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

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String, email: String!, password: String!): User
    updateUser(id: ID!, name: String!): User
  }
`;

export default typeDefs;
