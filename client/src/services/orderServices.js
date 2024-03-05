import { useQuery, useMutation, gql } from "@apollo/client";

// Define the mutation for adding an order
const ADD_ORDER = gql`
  mutation AddOrder($userId: ID!, $items: [ItemInput!]!) {
    addOrder(userId: $userId, items: $items) {
      _id
    }
  }
`;

// Define the query for fetching user orders
const GET_USER_ORDERS = gql`
  query GetUserOrders($userId: ID!) {
    getUserOrders(userId: $userId) {
      _id
      items {
        product {
          _id
          name
          price
          imageURL
        }
        quantity
      }
      createdAt
    }
  }
`;

// Custom hook for adding an order
const useAddOrder = () => {
  const [addOrderMutation] = useMutation(ADD_ORDER);

  const addOrder = async (userId, items) => {
    try {
      const { data } = await addOrderMutation({
        variables: {
          userId,
          items,
        },
      });
      return data.addOrder; // Return the result of the mutation
    } catch (error) {
      console.error("Error adding order:", error);
      throw new Error("Error adding order");
    }
  };

  return { addOrder };
};

// Custom hook for fetching user orders
const useGetUserOrders = (userId) => {
  const { loading, error, data, refetch } = useQuery(GET_USER_ORDERS, {
    variables: { userId },
  });

  return { loading, error, userOrders: data ? data.getUserOrders : [], refetch };
};

export { useAddOrder, useGetUserOrders };
