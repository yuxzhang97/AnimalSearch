const Product = require('./models/Product');

const resolvers = {
  Query: {
    products: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        throw new Error('Error fetching all products');
      }
    },
    product: async (_, { _id }) => {
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
    productsByCategory: async (_, { category }) => {
      try {
        const products = await Product.find({ category });
        return products;
      } catch (error) {
        throw new Error('Error fetching products by category');
      }
    }
  }
};

module.exports = resolvers;
