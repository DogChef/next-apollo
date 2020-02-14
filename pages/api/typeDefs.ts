import Types from "./typedefs/types.js";
import Queries from "./typedefs/queries.js";
import Mutations from "./typedefs/mutations.js";
import { gql } from "apollo-server-micro";

const typeDefs = gql`
  ${Types}
  ${Queries}
  ${Mutations}
`;

export default typeDefs;
