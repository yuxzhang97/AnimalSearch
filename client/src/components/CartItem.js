import React, { useState, useEffect } from "react";
import { Flex, Image, Button } from "@chakra-ui/react";
import { useCart } from "../contexts/CartContext";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [inputQuantity, setInputQuantity] = useState(item.quantity);

  useEffect(() => {
    setInputQuantity(item.quantity);
  }, [item.quantity]);

  const handleInputChange = (valueString) => {
    const newQuantity = parseInt(valueString);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      updateQuantity(item._id, newQuantity);
      setInputQuantity(valueString);
    }
  };

  return (
    <Flex key={item._id} alignItems="center" mb="2" width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Image src={item.imageURL} alt={item.name} boxSize="80px" mb="2" />
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <NumberInput
            size="sm"
            min={1}
            value={inputQuantity}
            onChange={handleInputChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button size="sm" onClick={() => removeFromCart(item._id)}>
            <DeleteIcon />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;
