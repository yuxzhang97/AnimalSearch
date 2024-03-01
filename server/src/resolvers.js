const Product = require("./models/Product");
const User = require("./models/User");

const resolvers = {
  Query: {
    // Query to get all products in collection
    getAllProducts: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        throw new Error("Error fetching all products");
      }
    },
    // Query product by ID
    getProductByID: async (_, { _id }) => {
      try {
        const product = await Product.findById(_id);
        if (!product) {
          throw new Error("Product not found");
        }
        return product;
      } catch (error) {
        throw new Error("Error fetching product");
      }
    },
    // Query to search product collection given query string
    searchProducts: async (_, { query }) => {
      const regex = new RegExp(query, "i");
      const products = await Product.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
          { category: { $regex: regex } },
        ],
      });
      return products;
    },
  },
  Mutation: {
    // Mutation to update cart data
    updateCartItem: async (_, { userId, productId, quantity }) => {
      try {
        let user = await User.findById(userId); // Populate cart with product details
        if (!user) {
          throw new Error("User not found!");
        }

        let product = await Product.findById(productId);
        if (!product) {
          throw new Error("Product not found!");
        }

        const existingCartItemIndex = user.cart.findIndex(
          (item) => String(item.product) === String(productId)
        );

        if (existingCartItemIndex !== -1) {
          // Update the quantity of the existing cart item
          user.cart[existingCartItemIndex].quantity = quantity;
        } else {
          // Add a new item to the cart
          user.cart.push({ product: productId, quantity: quantity });
        }

        user = await user.save();
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    // Mutation to remove an item from the cart
    removeCartItem: async (_, { userId, productId }) => {
      try {
        let user = await User.findById(userId).populate("cart.product"); // Populate cart with product details

        if (!user) {
          throw new Error("User not found!");
        }

        // Filter out the cart item to be removed
        user.cart = user.cart.filter(item => String(item.product) !== String(productId));

        // Save the updated user with the removed item
        user = await user.save();
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
