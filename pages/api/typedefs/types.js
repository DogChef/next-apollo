const Types = `
  scalar Date

  type User {
    id: ID!
    name: String
    email: String!
    articles: [Article]
    favourites: [Article]
    createdAt: Date
    updatedAt: Date
  }

  type Article {
    id: ID!
    title: String!
    body: String
    author: User
    tags: [Tag]
    parent: Article
    children: [Article]
    rootPath: [String]
    favourited: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type ArticleModification {
    id: ID!
    articleId: ID!
    title: String!
    body: String
    user: User!
    author: User!
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

export default Types;
