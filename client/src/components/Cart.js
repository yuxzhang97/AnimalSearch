import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import CartItem from './CartItem';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, decreaseQuantity, removeFromCart } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      bottom="0"
      bg="gray.100"
      p="4"
      overflowY="auto"
      width="200px"
      boxShadow="md"
      borderRadius="md"
    >
      <Text fontSize="xl" fontWeight="bold" mb="2" textAlign="center">Subtotal:</Text>
      <Text fontSize="xl" fontWeight="bold" color="red" mb="4" textAlign="center">${subtotal.toFixed(2)}</Text>
      {cart.map(item => (
        <CartItem key={item._id} item={item} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} />
      ))}
    </Box>
  );
};

export default Cart;
