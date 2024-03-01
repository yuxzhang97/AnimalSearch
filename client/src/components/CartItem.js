import React from "react";
import { Flex, Image, Select, Button } from "@chakra-ui/react";
import { useCart } from "../contexts/CartContext";
import { DeleteIcon } from "@chakra-ui/icons";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity === 0) {
      removeFromCart(item._id);
    } else {
      updateQuantity(item._id, newQuantity);
    }
  };

  return (
    <Flex key={item._id} alignItems="center" mb="2" width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Image src={item.imageURL} alt={item.name} boxSize="80px" mb="2" />
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Select
            size="sm"
            value={item.quantity} // Always show the current quantity
            onChange={handleQuantityChange}
          >
            <option value={0}>0 (Delete)</option>
            {[...Array(10).keys()].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </Select>
          <Button size="sm" onClick={() => removeFromCart(item._id)}>
            <DeleteIcon />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;
