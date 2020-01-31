import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { UserInputError } from "apollo-server-micro";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    getUsers: (parent, args, { db }) => db.user.findAll(),
    getUser: (parent, { id }, { db }) => db.user.findByPk(id)
  },

  Mutation: {
    signUpUser: async (parent, { name, email, password }, { db }) => {
      const newUser = db.user
        .create({
          name: name,
          email: email,
          password: password
        })
        .catch(err => {
          throw new UserInputError(
            "There's already an account with this email"
          );
        });

      return { token: jwt.sign(newUser, "supersecret") };
    },
    logInUser: (parent, { email, password }, { db }) => {
      const [currentUser] = db.user
        .findOne({ where: { email: email } })
        .then(data => {
          const isMatch = bcrypt.compareSync(password, currentUser.password);
          if (isMatch) {
            return { token: jwt.sign(currentUser, "supersecret") };
          } else {
            throw new UserInputError("que hacesss");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};

export default resolvers;
