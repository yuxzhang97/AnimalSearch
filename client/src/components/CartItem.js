import React from 'react';
import { Flex, Image, Select, Button } from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext'; // Import useCart hook
import { DeleteIcon } from '@chakra-ui/icons'; // Import DeleteIcon from Chakra UI icons

const CartItem = ({ item, removeFromCart }) => {
  const { updateQuantity } = useCart(); // Get updateQuantity function from useCart hook

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    updateQuantity(item._id, newQuantity);
  };

  return (
    <Flex key={item._id} alignItems="center" mb="2" width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center"> {/* Center content */}
        <Image src={item.imageURL} alt={item.name} boxSize="80px" mb="2" /> {/* Image on top */}
        <Flex justifyContent="space-between" alignItems="center">
          <Select size="sm" value={item.quantity} onChange={handleQuantityChange}>
            {[...Array(10).keys()].map((number) => (
              <option key={number} value={number + 1}>{number + 1}</option> 
            ))}
            <option value="10">10+</option> {/* Add option for 10+ */}
          </Select>
          <Button size="sm" onClick={() => removeFromCart(item._id)} leftIcon={<DeleteIcon />} /> {/* Use DeleteIcon as leftIcon */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;
