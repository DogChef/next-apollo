const Mutations = `
  type Mutation {
    logInUser(userInput: UserLoginInput!): User
    signUpUser(userInput: UserCreateInput!): User
    
    createArticle(articleInput: ArticleCreateInput!): Article
    updateArticle(articleInput: ArticleUpdateInput): Article

    createTag(tagInput: TagInput): Tag
  }
`;

export default Mutations;
