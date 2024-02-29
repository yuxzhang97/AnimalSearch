const { gql } = require('apollo-server');

const typeDefs = gql`
  type Animal {
    id: ID!
    name: String!
    type: String!
    description: String!
  }

  type Query {
    animals: [Animal]
  }
`;

module.exports = typeDefs;
