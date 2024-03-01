import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import CartItem from './CartItem';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, decreaseQuantity, removeFromCart } = useCart();

  return (
    <Box position="fixed" top="0" right="0" bottom="0" bg="gray.100" p="4" display="flex" flexDirection="column" alignItems="flex-end" overflowY="auto" width="200px"> {/* Add position and CSS properties to position the cart */}
      <Text fontSize="lg" fontWeight="bold" mb="4">Cart</Text>
      {cart.map(item => (
        <CartItem key={item._id} item={item} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} />
      ))}
    </Box>
  );
};

export default Cart;
