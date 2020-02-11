import { ApolloServer, AuthenticationError } from "apollo-server-micro";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import db from "./models";
import jwt from "jsonwebtoken";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ db: db }),
  context: async ({ req, res }) => {
    const token = req?.cookies?.token || "";
    const { user } = await (token
      ? jwt.verify(token, "supersecret")
      : undefined);

    return {
      req,
      res,
      currentUserId: user.id
    };
  },
  introspection: true,
  playground: true,
  cors: false
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
