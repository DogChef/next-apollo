//TODO:: change query names to be more readable when used on components
//Example: getUser to user, getUsers to users and so on

const Queries = `
  type Query {
    verifyUser: User
    
    getUser(id: ID!): User
    getUsers: [User]!

    getArticle(id: ID!): Article
    getArticles: [Article]

    getArticleModifications(id: ID!): [ArticleModification]
    
    getSearchFiltered(value: String!): [String]

    getTag(id: ID!): Tag
    getTags: [Tag]

    getArticleTags(id: ID!): [Tag]
    getTagArticles(id: ID!): [Article]
  }
`;

export default Queries;
