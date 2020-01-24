import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String!): User
    updateUser(id: ID!, name: String!): User
  }
`;

export default typeDefs;
