const { gql } = require("apollo-server");

const typeDefs = gql`
  "A Product is an item in the store with different properties"
  type Product {
    _id: ID!
    "The product's name"
    name: String!
    "Some information abotu the product"
    description: String!
    "The price of the product"
    price: Float!
    "The category the product belongs to"
    category: String!
    "The product's image to display on each product card or detail"
    imageURL: String!
  }

  # Define the Query type with its fields
  type Query {
    "Query to retrieve all products"
    getAllProducts: [Product]
    "Query to retrieve a product by its ID"
    getProductByID(_id: ID!): Product
    "Query to search for products based on a search query"
    searchProducts(query: String!): [Product]
  }
`;

module.exports = typeDefs;
