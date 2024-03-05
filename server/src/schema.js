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

  "A User represents a registered user in the system"
  type User {
    _id: ID!
    "The user's first name"
    firstName: String!
    "The user's last name"
    lastName: String!
    "The user's username"
    username: String!
    "The user's email address"
    email: String!
    "The user's password (should not be queried, only for mutation)"
    password: String!
    "The user's cart containing cart items"
    cart: [Item!]!
  }

  "A CartItem represents a product in the user's cart along with its quantity"
  type Item {
    "The product in the cart"
    product: Product!
    "The quantity of the product in the cart"
    quantity: Int!
  }

  "An Order represents an order placed by a user"
  type Order {
    "The ID of the order"
    _id: ID!
    "The ID of the user who placed the order"
    user: User!
    "The array of items in the order"
    items: [Item!]!
    "The date the order was placed"
    createdAt: String!
  }

  input ItemInput {
    "The ID of the product"
    productId: ID!
    "The quantity of the product"
    quantity: Int!
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
    getUser(userId: ID!): User
    "Query to get the cart and the product details for a user"
    getUserCart(userId: ID!): [Item]
    "Query to get the orders for a given user"
    getUserOrders(userId: ID!): [Order!]!
    
  }

  type Mutation {
    "Mutation to update a user's cart item"
    updateCartItem(userId: ID!, productId: ID!, quantity: Int!): User
    "Mutation to remove product from cart"
    removeCartItem(userId: ID!, productId: ID!): User
    "Mutation to add an item to the cart or increase its quantity by 1"
    addToCart(userId: ID!, productId: ID!): User
    "Mutation to subtract the quantity of an existing item by 1 but not less than 1"
    minusFromCart(userId: ID!, productId: ID!): User
    "Mutation to add a new order for a user"
    addOrder(userId: ID!, items: [ItemInput!]!): Order
    "Mutation to clear the cart of a user"
    clearUserCart(userId: ID!): User
  }
`;

module.exports = typeDefs;
