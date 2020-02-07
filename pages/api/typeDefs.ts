import Models from './typedefs/models.js';
import Inputs from './typedefs/inputs.js';
import Queries from './typedefs/queries.js';
import Mutations from './typedefs/mutations.js';
import { gql } from "apollo-server-micro";

const typeDefs = gql`
  ${Models}
  ${Inputs}
  ${Queries}
  ${Mutations}
`

export default typeDefs;
