// services/cartService.js

import { useQuery, gql, useMutation } from '@apollo/client';

// GraphQL query for fetching the user's cart items
const GET_USER_CART = gql`
  query GetUserCart($userId: ID!) {
    getUserCart(userId: $userId) {
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
`;

// GraphQL mutation for adding an item to the cart
const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $productId: ID!) {
    addToCart(userId: $userId, productId: $productId) {
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

// GraphQL mutation for updating an item in the cart
const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($userId: ID!, $productId: ID!, $quantity: Int!) {
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

// Custom hook to fetch user's cart items
const useGetUserCart = (userId) => {
  const { loading, error, data } = useQuery(GET_USER_CART, {
    variables: { userId },
  });

  return { loading, error, cartItems: data ? data.getUserCart : [] };
};

// Custom hook to add an item to the cart
const useAddToCart = () => {
  const [addToCartMutation] = useMutation(ADD_TO_CART);

  const addToCart = async (userId, productId) => {
    try {
      const { data } = await addToCartMutation({
        variables: { userId, productId },
      });
      return data.addToCart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return addToCart;
};

// Custom hook to update an item in the cart
const useUpdateCartItem = () => {
  const [updateCartItemMutation] = useMutation(UPDATE_CART_ITEM);

  const updateCartItem = async (userId, productId, quantity) => {
    try {
      const { data } = await updateCartItemMutation({
        variables: { userId, productId, quantity },
      });
      return data.updateCartItem;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return updateCartItem;
};


// Custom hook to remove an item from the cart
const useRemoveFromCart = () => {
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);

  const removeFromCart = async (userId, productId) => {
    try {
      const { data } = await removeFromCartMutation({
        variables: { userId, productId },
      });
      return data.removeCartItem;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return removeFromCart;
};

// Export the custom hooks for use in components
export { useGetUserCart, useAddToCart, useUpdateCartItem, useRemoveFromCart };
