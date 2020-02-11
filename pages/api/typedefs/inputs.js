const Inputs = `
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
    tags: [ID]
  }

  input ArticleUpdateInput {
    title: String!
    body: String
    tags: [ID] 
  }

  input TagInput {
    name: String!
  }
`;

export default Inputs;
