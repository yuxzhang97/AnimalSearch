const { gql } = require("apollo-server");

const typeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    category: String!
    imageURL: String!
  }

  type Query {
    products: [Product]
    product(_id: ID!): Product
    productsByCategory(category: String!): [Product] 
  }
`;

module.exports = typeDefs;
