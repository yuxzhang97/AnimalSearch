// services/cartService.js

import { useMutation, gql } from '@apollo/client';

// GraphQL mutation for adding an item to the cart
const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $productId: ID!, $quantity: Int!) {
    updateCartItem(userId: $userId, productId: $productId, quantity: $quantity) {
      _id
      firstName
      lastName
      username
      email
      password
      cart {
        product {
          _id
          name
          description
          price
          category
          imageURL
        }
        quantity
      }
    }
  }
`;

// GraphQL mutation for removing an item from the cart
const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($userId: ID!, $productId: ID!) {
    removeCartItem(userId: $userId, productId: $productId) {
      _id
      firstName
      lastName
      username
      email
      password
      cart {
        product {
          _id
          name
          description
          price
          category
          imageURL
        }
        quantity
      }
    }
  }
`;

// Custom hook to add an item to the cart
const useAddToCart = () => {
  const [addToCartMutation] = useMutation(ADD_TO_CART);

  const addToCart = async (userId, productId, quantity) => {
    try {
      // Call the addToCart mutation with the provided parameters
      const { data } = await addToCartMutation({
        variables: { userId, productId, quantity },
      });
      return data.updateCartItem; // Return the updated user object with cart details
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return addToCart;
};

// Custom hook to remove an item from the cart
const useRemoveFromCart = () => {
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);

  const removeFromCart = async (userId, productId) => {
    try {
      // Call the removeFromCart mutation with the provided parameters
      const { data } = await removeFromCartMutation({
        variables: { userId, productId },
      });
      return data.removeCartItem; // Return the updated user object with cart details
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return removeFromCart;
};

// Export the custom hooks for use in components
export { useAddToCart, useRemoveFromCart };
