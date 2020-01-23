import { ApolloServer } from "apollo-server-micro";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import db from "./models";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
  introspection: true,
  playground: true
});

export const config = {
  api: {
    bodyParser: false
  }
};

const users = [{ 'name': 'pp'}, { 'name': 'pep'}, { 'name': 'pap'}];
db.sequelize.sync().then(() => {
  db.user.bulkCreate(users, {returning: true});
});

export default apolloServer.createHandler({ path: "/api/graphql" });
