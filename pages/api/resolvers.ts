import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { UserInputError, AuthenticationError } from "apollo-server-micro";
import { decodedToken } from "./decodedToken";

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
    getUsers: (parent, args, { dataSources: { db }, req, currentUser }) => {
      /*const decoded = decodedToken(req, secret);*/
      if (currentUser === undefined) {
        throw new AuthenticationError("No user detected, please log in.");
      }

      return db.user.findAll();
    },
    getUser: (parent, { id }, { dataSources: { db } }) => db.user.findByPk(id)
  },

  Mutation: {
    signUpUser: (
      parent,
      { data: { name, email, password } },
      { dataSources: { db }, res, setCookies }
    ) => {
      return db.user
        .create({
          name: name,
          email: email,
          password: password
        })
        .then(user => {
          const tokens = setTokens(user);
          res.setHeader("Set-Cookie", `token=${tokens.accessToken}; httpOnly`);
          return user;
        })
        .catch(err => {
          throw new UserInputError(
            "There's already an account with this email"
          );
        });
    },
    logInUser: (
      parent,
      { data: { email, password } },
      { dataSources: { db }, res, setCookies }
    ) => {
      return db.user
        .findOne({ where: { email: email } })
        .then(user => {
          if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
              const tokens = setTokens(user);
              res.setHeader("Set-Cookie", `token=${tokens.accessToken}; httpOnly`);
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
        });
    }
  }
};

export default resolvers;
