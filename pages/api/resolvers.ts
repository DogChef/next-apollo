import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import {
  UserInputError,
  AuthenticationError,
  ApolloError
} from "apollo-server-micro";

const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const secret = "supersecret";

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

const getRootPath = async (article, isSlug = true) => {
  const path = [];

  var parent = article.parentId ? article : null;

  while (parent) {
    const newParent = await parent.getParent();
    if (newParent?.dataValues) {
      const newNode = isSlug
        ? `${newParent.dataValues.title}-${newParent.dataValues.id}`
        : `${newParent.dataValues.id}`;
      path.push(newNode);
      parent = newParent;
    } else {
      parent = null;
    }
  }

  return path.reverse();
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

    getArticleModifications: authenticated(
      (parent, { id }, { dataSources: { db } }) =>
        db.articleModification.findAll({ where: { articleId: id } })
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
          throw new UserInputError(
            "The email and password you entered did not match our records. Please double-check and try again."
          );
        }),
    createArticle: authenticated(
      (parent, { articleInput }, { dataSources: { db }, currentUserId }) =>
        db.article.create({ ...articleInput, authorId: currentUserId })
    ),
    updateArticle: authenticated(
      (parent, { articleInput }, { dataSources: { db }, currentUserId }) =>
        db.article
          .findByPk(articleInput.id)
          .then(article =>
            article.update(articleInput).then(updated =>
              db.articleModification
                .findOne({
                  where: {
                    userId: currentUserId,
                    articleId: article.dataValues.id
                  },
                  order: [["updatedAt", "DESC"]]
                })
                .then(articleModification => {
                  const updatedArticle = updated.dataValues;
                  const updatedData = {
                    userId: currentUserId,
                    articleId: updatedArticle.id,
                    title: updatedArticle.title,
                    body: updatedArticle.body,
                    authorId: updatedArticle.authorId
                  };

                  if (
                    articleModification?.dataValues &&
                    moment(articleModification.dataValues.updatedAt).isSame(
                      moment(),
                      "minute"
                    )
                  ) {
                    articleModification.update(updatedData);
                  } else {
                    db.articleModification.create(updatedData);
                  }

                  return updated;
                })
            )
          )
          .catch(err => {
            throw new ApolloError(err);
          })
    ),
    toggleFavourite: authenticated(
      (parent, { articleId }, { dataSources: { db }, currentUserId }) =>
        db.favouriteArticle
          .findOne({ where: { userId: currentUserId, articleId: articleId } })
          .then(favouriteArticle => {
            if (favouriteArticle) {
              return favouriteArticle.destroy().then(() => false);
            } else {
              db.favouriteArticle.create({
                userId: currentUserId,
                articleId: articleId
              });
              return true;
            }
          })
    ),
    moveArticle: authenticated(
      (parent, { id, parentId }, { dataSources: { db }, currentUserId }) => {
        if (id === parentId) return false;

        return db.article.findByPk(parentId).then(parent =>
          getRootPath(parent, false).then(rootPath => {
            if (rootPath.includes(id)) return false;
            return db.article.findByPk(id).then(article => {
              if (article.dataValues.parentId == parentId) return false;
              return article.update({ parentId: parentId }).then(() => true);
            });
          })
        );
      }
    )
  },
  User: {
    articles: user => user.getArticles(),
    favourites: user => user.getFavourites()
  },
  Article: {
    author: article => article.getAuthor(),
    tags: article => article.getTags(),
    parent: article => article.getParent(),
    children: article => article.getChildren(),
    favourited: (article, args, { dataSources: { db }, currentUserId }) =>
      db.favouriteArticle
        .findOne({ where: { userId: currentUserId, articleId: article.id } })
        .then(favouriteArticle => !!favouriteArticle),
    rootPath: article => getRootPath(article).then(path => path)
  },
  ArticleModification: {
    user: articleModification => articleModification.getUser(),
    author: articleModification => articleModification.getAuthor()
  },
  Tag: {
    articles: tag => tag.getArticles()
  }
};

export default resolvers;
