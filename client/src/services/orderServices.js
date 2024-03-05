import { useMutation, gql } from '@apollo/client';

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
export const useAddOrder = () => {
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
      console.error('Error adding order:', error);
      throw new Error('Error adding order'); // Handle error gracefully
    }
  };

  return { addOrder };
};

// Custom hook for fetching user orders
export const useGetUserOrders = () => {
    const [getUserOrdersQuery, { loading, error, data }] = useQuery(GET_USER_ORDERS);
  
    const getUserOrders = async (userId) => {
      try {
        const { data } = await getUserOrdersQuery({
          variables: { userId },
        });
        return data.getUserOrders;
      } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error('Error fetching user orders');
      }
    };
  
    return { loading, error, getUserOrders };
  };

  export { useAddOrder, useGetUserOrders };
