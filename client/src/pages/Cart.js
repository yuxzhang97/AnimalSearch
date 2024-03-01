import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import CartItem from './CartItem'; // Import CartItem component
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart } = useCart();

  return (
    <Box bg="gray.100" p="4" ml="4" width="500px"> {/* Set width directly */}
      <Text fontSize="lg" fontWeight="bold" mb="4">Cart</Text>
      {cart.map(item => (
        <CartItem key={item._id} item={item} />
      ))}
    </Box>
  );
};

export default Cart;
