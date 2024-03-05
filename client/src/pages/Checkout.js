import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useGetUserCart } from '../services/cartServices';
import { useAddOrder } from '../services/orderServices';
import { Button, Center, Spinner } from '@chakra-ui/react';

const Checkout = () => {
  const { userId } = useUser(); // Get the current user from the context
  const { loading, error, cartItems } = useGetUserCart(userId); // Use useGetUserCart hook to fetch cart items
  const { addOrder } = useAddOrder(); // Hook for adding an order

  const handleCheckout = async () => {
    console.log(userId);
    if (!cartItems || loading || error) return;

    try {
      // Extract items from cart data
      const items = cartItems.map(cartItem => ({
        quantity: cartItem.quantity,
        productId: cartItem.product._id,
      }));

      console.log(items);

      // Add order
      await addOrder(userId, items);

      console.log('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      // Display error message to the user
    }
  };

  if (loading) return <Center><Spinner size="xl" /></Center>;
  if (error) return <p>Error fetching cart data: {Error.message}</p>;

  return (
    <Center flexDirection="column">
      <h2>Checkout</h2>
      <Button colorScheme="blue" onClick={handleCheckout}>Place Order</Button>
    </Center>
  );
};

export default Checkout;
