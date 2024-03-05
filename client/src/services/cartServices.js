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
//Known bug if you try to get the cart when you add the first of an item, it doesn't get it properly and it returns an error

const ADD_TO_CART = gql`
  mutation AddToCart($userId: ID!, $productId: ID!) {
    addToCart(userId: $userId, productId: $productId) {
      _id
      firstName
      lastName
      username
      email
      password
      
    }
  }
`;

// GraphQL mutation for updating an item in the cart
//Known bug if you try to get the cart when you add the first of an item, it doesn't get it properly and it returns an error
const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($userId: ID!, $productId: ID!, $quantity: Int!) {
    updateCartItem(userId: $userId, productId: $productId, quantity: $quantity) {
      _id
      firstName
      lastName
      username
      email
      password
      
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

// GraphQL mutation for subtracting the quantity of an item from the cart
const MINUS_FROM_CART = gql`
  mutation MinusFromCart($userId: ID!, $productId: ID!) {
    minusFromCart(userId: $userId, productId: $productId) {
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

const CLEAR_USER_CART = gql`
  mutation ClearUserCart($userId: ID!) {
    clearUserCart(userId: $userId) {
      _id      
    }
  }
`;

// Custom hook to fetch user's cart items
const useGetUserCart = (userId) => {
  const { loading, error, data, refetch } = useQuery(GET_USER_CART, {
    variables: { userId },
  });

  return { loading, error, cartItems: data ? data.getUserCart : [], refetch };
};

// Custom hook to add an item to the cart
const useAddToCart = () => {
  const [addToCartMutation] = useMutation(ADD_TO_CART);

  const addToCart = async (userId, productId, refetch) => {
    try {
      const { data } = await addToCartMutation({
        variables: { userId, productId },
      });
      await refetch(); // Refetch the cart
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

  const updateCartItem = async (userId, productId, quantity, refetch) => {
    try {
      const { data } = await updateCartItemMutation({
        variables: { userId, productId, quantity },
      });
      await refetch(); // Refetch the cart
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

  const removeFromCart = async (userId, productId, refetch) => {
    try {
      const { data } = await removeFromCartMutation({
        variables: { userId, productId },
      });
      await refetch(); // Refetch the cart
      return data.removeCartItem;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return removeFromCart;
};

// Custom hook to subtract the quantity of an item from the cart by 1
const useMinusFromCart = () => {
  const [minusFromCartMutation] = useMutation(MINUS_FROM_CART);

  const minusFromCart = async (userId, productId, refetch) => {
    try {
      const { data } = await minusFromCartMutation({
        variables: { userId, productId },
      });
      await refetch(); // Refetch the cart
      return data.minusFromCart;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return minusFromCart;
};

const useClearUserCart = () => {
    const [clearUserCartMutation] = useMutation(CLEAR_USER_CART);
  
    const clearUserCart = async (userId, refetch) => {
      try {
        const { data } = await clearUserCartMutation({
          variables: { userId },
        });
        await refetch(); // Refetch the cart
        return data.clearUserCart;
      } catch (error) {
        throw new Error(error.message);
      }
    };
  
    return clearUserCart;
  };

// Export the custom hooks for use in components
export { useGetUserCart, useAddToCart, useUpdateCartItem, useRemoveFromCart, useMinusFromCart, useClearUserCart };
