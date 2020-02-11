const Models = `
  scalar Date

  type User {
    id: ID!
    name: String
    email: String!
    articles: [Article]
    createdAt: Date
    updatedAt: Date
  }

  type Article {
    id: ID!
    title: String!
    body: String
    author: User
    tags: [Tag]
    createdAt: Date
    updatedAt: Date
  }

  type Tag {
    id: ID!
    name: String!
    articles: [Article]
    createdAt: Date
    updatedAt: Date
  }
`;

export default Models;
