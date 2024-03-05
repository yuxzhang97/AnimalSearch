import { useMutation, gql } from '@apollo/client';

// Define the mutation for adding an order
const ADD_ORDER = gql`
  mutation AddOrder($userId: ID!, $items: [ItemInput!]!) {
    addOrder(userId: $userId, items: $items) {
      _id      
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

export default useAddOrder;
