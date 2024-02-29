import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <Box position="fixed" top="0" right="0" p="4" bg="white" borderLeft="1px" borderColor="gray.200">
      <Heading size="md">Shopping Cart</Heading>
      {cart.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          {cart.map(product => (
            <Box key={product._id} mt="4">
              <Text>{product.name}</Text>
              <Text fontSize="sm">Price: ${product.price}</Text>
              <Button colorScheme="red" size="xs" onClick={() => removeFromCart(product._id)}>Remove</Button>
            </Box>
          ))}
          <Button mt="4" colorScheme="teal" size="sm">Checkout</Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
