const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");

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
    getUser: async (_, { userId }) => {
      try {
        let user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found!");
        }
        // Save the updated user with the removed item
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    //Gets the cart and all product details given a user
    getUserCart: async (_, { userId }) => {
      try {
        let user = await User.findById(userId).populate("cart.product");
        if (!user) {
          throw new Error("User not found!");
        }
        // Save the updated user with the removed item
        return user.cart;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    // Mutation to update cart data
    updateCartItem: async (_, { userId, productId, quantity }) => {
      try {
        let user = await User.findById(userId).populate("cart.product");

        if (!user) {
          throw new Error("User not found!");
        }

        let product = await Product.findById(productId);
        if (!product) {
          throw new Error("Product not found!");
        }

        const existingCartItemIndex = user.cart.findIndex(
          (item) => String(item.product._id) === String(productId)
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
        let user = await User.findById(userId).populate("cart.product");
        if (!user) {
          throw new Error("User not found!");
        }

        // Filter out the cart item to be removed
        user.cart = user.cart.filter(
          (item) => String(item.product._id) !== String(productId)
        );

        // Save the updated user with the removed item
        user = await user.save();
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    // Mutation to add an item to the cart or increase its quantity by 1
    addToCart: async (_, { userId, productId }) => {
      try {
        let user = await User.findById(userId).populate("cart.product");

        if (!user) {
          throw new Error("User not found!");
        }

        let product = await Product.findById(productId);
        if (!product) {
          throw new Error("Product not found!");
        }

        const existingCartItemIndex = user.cart.findIndex(
          (item) => String(item.product._id) === String(productId)
        );

        if (existingCartItemIndex !== -1) {
          // Increment the quantity of the existing cart item by 1
          user.cart[existingCartItemIndex].quantity += 1;
        } else {
          // Add a new item to the cart with quantity 1
          user.cart.push({ product: productId, quantity: 1 });
        }

        user = await user.save();
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    //Subtract an item from the cart
    //Not user anymore
    minusFromCart: async (_, { userId, productId }) => {
      try {
        // Find the user by userId and populate the cart with product details
        let user = await User.findById(userId).populate("cart.product");
        // Check if user exists
        if (!user) {
          throw new Error("User not found!");
        }

        // Find the index of the cart item with the given productId
        const existingCartItemIndex = user.cart.findIndex(
          (item) => String(item.product._id) === String(productId)
        );

        // If the cart item exists
        if (existingCartItemIndex !== -1) {
          // If the quantity of the cart item is already 1, throw an error
          if (user.cart[existingCartItemIndex].quantity === 1) {
            throw new Error("Quantity cannot be less than 1!");
          }
          // Otherwise, decrement the quantity of the cart item by 1
          user.cart[existingCartItemIndex].quantity -= 1;
        } else {
          // If the cart item does not exist, throw an error
          throw new Error("Product not found in the cart!");
        }

        // Save the updated user with the modified cart
        user = await user.save();
        return user;
      } catch (error) {
        // Throw an error if any operation fails
        throw new Error(error.message);
      }
    },
    //Query to add an order
    addOrder: async (_, { userId, items }) => {
      try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found!");
        }
        // Create a new order object
        const order = new Order({
          user: userId,
          items: items.map((item) => ({
            product: item.productId,
            quantity: item.quantity,
          })),
        });

        // Save the order to the database
        const savedOrder = await order.save();

        // Return the saved order
        return savedOrder;
      } catch (error) {
        // Throw an error if any operation fails
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
