const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/AnimalSearch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`
    🚀  Server is running
    📭  Query at ${url}
  `);
});
