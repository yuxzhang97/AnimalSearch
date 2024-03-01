import React from 'react';
import { Box, Text, Image, Flex, Button } from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();

  const handleAdd = (item) => {
    addToCart(item);
  };

  const handleRemove = (item) => {
    removeFromCart(item._id);
  };

  const handleDecreaseQuantity = (item) => {
    decreaseQuantity(item._id);
  };

  return (
    <Box flex="1" bg="gray.100" p="4" ml="4">
      <Text fontSize="lg" fontWeight="bold" mb="4">Cart</Text>
      {cart.map(item => (
        <Box key={item._id} mb="2">
          <Flex alignItems="center">
            <Image src={item.imageURL} alt={item.name} boxSize="50px" mr="2" />
            <Text>{item.name} x {item.quantity}</Text>
            <Text ml="2">${(item.price * item.quantity).toFixed(2)}</Text>
            <Button size="sm" colorScheme="teal" ml="2" onClick={() => handleAdd(item)}>+</Button>
            <Button size="sm" colorScheme="red" ml="2" onClick={() => handleDecreaseQuantity(item)}>-</Button> {/* Button to decrease quantity */}
            <Button size="sm" colorScheme="red" ml="2" onClick={() => handleRemove(item)}>Remove</Button>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default Cart;
