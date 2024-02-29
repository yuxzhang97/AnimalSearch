const Product = require('./models/Product');

const resolvers = {
  Query: {
    getAllProducts: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        throw new Error('Error fetching all products');
      }
    },
    getProductByID: async (_, { _id }) => {
      try {
        const product = await Product.findById(_id);
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      } catch (error) {
        throw new Error('Error fetching product');
      }
    },
    searchProducts: async (_, { query }) => {
      // Filter products based on the search query
      const regex = new RegExp(query, 'i'); // Case-insensitive search
      const products = await Product.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      });
      return products;
    },
    
  }
};

module.exports = resolvers;
