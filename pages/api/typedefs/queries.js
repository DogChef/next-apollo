//TODO:: change query names to be more readable when used on components
//Example: getUser to user, getUsers to users and so on

const Queries = `
  type Query {
    verifyUser: User
    
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
