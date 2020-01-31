import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { UserInputError } from "apollo-server-micro";

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
    createUser: (parent, { name, email, password }, { db }) => {
      return db.user
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
    },
    updateUser: (parent, { id, name, email }, { db }) =>
      db.user.update(
        {
          name: name,
          email: email
        },
        { where: { id: id } }
      )
  }
};

export default resolvers;
