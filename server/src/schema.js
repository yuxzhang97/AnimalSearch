const { gql } = require("apollo-server");

const typeDefs = gql`
  "A Product is an item in the store with different properties"
  type Product {
    _id: ID!
    "The product's name"
    name: String!
    "Some information about the product"
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
    "Query to get the user info by ID"
    getUser(userId:ID!): User
    "Query to get the cart and the product details for a user"
    getUserCart(userId: ID!): [CartItem]
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    cart: [CartItem!]!
  }

  type CartItem {
    product: Product!
    quantity: Int!
  }

  type Mutation {
    "Mutation to update a user's cart item"
    updateCartItem(userId: ID!, productId: ID!, quantity: Int!): User
    "Mutation to remove product from cart"
    removeCartItem(userId: ID!, productId: ID!): User
  }
`;

module.exports = typeDefs;
