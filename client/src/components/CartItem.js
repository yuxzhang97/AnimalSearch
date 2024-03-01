import React from 'react';
import { Flex, Image, Select, Button } from '@chakra-ui/react';
import { useCart } from '../contexts/CartContext'; // Import useCart hook
import { DeleteIcon } from '@chakra-ui/icons';

const CartItem = ({ item, removeFromCart }) => {
  const { updateQuantity } = useCart(); // Get updateQuantity function from useCart hook

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    if (newQuantity === "0") {
      removeFromCart(item._id);
    } else {
      updateQuantity(item._id, parseInt(newQuantity));
    }
  };

  return (
    <Flex key={item._id} alignItems="center" mb="2" width="100%" justifyContent="center">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Image src={item.imageURL} alt={item.name} boxSize="80px" mb="2" />
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Select size="sm" value={item.quantity} onChange={handleQuantityChange}>
            <option value="0">0 (Delete)</option>
            {[...Array(9).keys()].map((number) => (
              <option key={number} value={number + 1}>{number + 1}</option>
            ))}
          </Select>
          <Button size="sm" onClick={() => removeFromCart(item._id)}><DeleteIcon /></Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;
