// Cart.js

import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Box, Heading, Text } from '@chakra-ui/react';

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Box maxW="800px" mx="auto" p="4">
      <Heading as="h2" size="xl" mb="4">Shopping Cart</Heading>
      {cartItems.length === 0 ? (
        <Text>No items in cart</Text>
      ) : (
        <Box>
          {cartItems.map(item => (
            <Box key={item._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" mb="4">
              <Heading as="h3" size="lg" mb="2">{item.name}</Heading>
              <Text fontSize="md" mb="2">{item.description}</Text>
              <Text fontSize="lg" fontWeight="bold" mb="2">Price: ${item.price}</Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Cart;
