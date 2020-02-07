const Queries = `
  type Query {
    getUser(id: ID!): User
    getUsers: [User]!

    getArticle(id: ID!): Article
    getArticles: [Article]

    getTag(id: ID!): Tag
    getTags: [Tag]

    getUserArticles(id: ID!): [Article]

    getArticleTags(id: ID!): [Tag]
    getArticleAuthor(id: ID!): User

    getTagArticles(id: ID!): [Article]
  }
`;

export default Queries;
