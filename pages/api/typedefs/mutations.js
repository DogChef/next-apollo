const Mutations = `
  type Mutation {
    logInUser(userInput: UserLoginInput!): User
    signUpUser(userInput: UserCreateInput!): User
    
    createArticle(articleInput: ArticleCreateInput!): Article
    updateArticle(articleInput: ArticleUpdateInput): Article
    
    toggleFavourite(articleId: ID!): Boolean

    moveArticle(id: ID!, parentId: ID): Boolean
    
    createTag(tagInput: TagInput): Tag
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

  input ArticleCreateInput {
    title: String!
    body: String
    authorId: ID
    parentId: ID
    tags: [ID]
  }

  input ArticleUpdateInput {
    id: ID
    title: String
    body: String
    children: [ID]
    tags: [ID] 
  }

  input TagInput {
    name: String!
  }
`;

export default Mutations;
