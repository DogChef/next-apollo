import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { UserInputError, AuthenticationError } from "apollo-server-micro";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "supersecret";
const util = require("util");

const setTokens = ({ dataValues: { id, email } }) => {
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const fifteenMins = 60 * 15 * 1000;
  const accessUser = {
    id: id
  };

  const accessToken = jwt.sign({ user: accessUser }, secret, {
    expiresIn: fifteenMins
  });

  const refreshUser = {
    id: id
  };

  const refreshToken = jwt.sign({ user: refreshUser }, secret, {
    expiresIn: sevenDays
  });

  return { accessToken, refreshToken };
};

const authenticated = next => (root, args, context, info) => {
  if (!context.currentUserId) {
    throw new AuthenticationError("No user detected, please log in.");
  }

  return next(root, args, context, info);
};

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  }),

  Query: {
    verifyUser: (parent, args, { dataSources: { db }, currentUserId }) =>
      db.user.findByPk(currentUserId),
    getUser: (parent, { id }, { dataSources: { db } }) => db.user.findByPk(id),
    getUsers: authenticated(
      (parent, args, { dataSources: { db }, currentUser }) => db.user.findAll()
    ),

    getArticle: (parent, { id }, { dataSources: { db } }) =>
      db.article.findByPk(id),
    getArticles: authenticated((parent, args, { dataSources: { db } }) =>
      db.article.findAll()
    ),

    getTag: (parent, { id }, { dataSources: { db } }) => db.tag.findByPk(id),
    getTags: (parent, args, { dataSources: { db } }) => db.tag.findAll()
  },

  Mutation: {
    signUpUser: (parent, { userInput }, { dataSources: { db }, res }) =>
      db.user
        .create(userInput)
        .then(user => {
          const tokens = setTokens(user);
          res.setHeader("Set-Cookie", `token=${tokens.accessToken}; httpOnly`);
          return user;
        })
        .catch(err => {
          throw new UserInputError(
            "There's already an account with this email"
          );
        }),
    logInUser: (
      parent,
      { userInput: { email, password } },
      { dataSources: { db }, res }
    ) =>
      db.user
        .findOne({ where: { email: email } })
        .then(user => {
          if (user) {
            if (bcrypt.compareSync(password, user.password)) {
              const tokens = setTokens(user);
              res.setHeader(
                "Set-Cookie",
                `token=${tokens.accessToken}; httpOnly`
              );
              return user;
            } else {
              throw null;
            }
          } else {
            throw null;
          }
        })
        .catch(err => {
          return new UserInputError(
            "The email and password you entered did not match our records. Please double-check and try again."
          );
        }),
    createArticle: authenticated(
      (parent, { articleInput }, { dataSources: { db }, currentUserId }) => {
        articleInput.authorId = currentUserId;
        return db.article.create(articleInput);
      }
    )
  },
  User: {
    articles: user => user.getArticles()
  },
  Article: {
    author: article => article.getAuthor(),
    tags: article => article.getTags()
  },
  Tag: {
    articles: tag => tag.getArticles()
  }
};

export default resolvers;
