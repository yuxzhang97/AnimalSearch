import React, { useState, useEffect } from "react";
import { Flex, Image, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useRemoveFromCart } from "../services/cartServices";
import { useUser } from "../contexts/UserContext";
import { useGetUserCart } from "../services/cartServices";


//Cart Item Component
const CartItem = ({ item }) => {
  const removeFromCart = useRemoveFromCart();
  const [inputQuantity, setInputQuantity] = useState(item.quantity);
  const { userId } = useUser();
  const { refetch } = useGetUserCart(userId); // Fetch refetch function from useGetUserCart


  useEffect(() => {
    setInputQuantity(item.quantity);
  }, [item.quantity]);

  const handleInputChange = (valueString) => {
    const newQuantity = parseInt(valueString);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      // Handle quantity change
      setInputQuantity(newQuantity);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      console.log(userId, item);
      await removeFromCart(userId, item.product._id, refetch);
      console.log('Product removed from cart successfully');
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };

  return (
    <Flex key={item.product._id} alignItems="center" mb="2" width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Image
          src={item.product.imageURL}
          alt={item.product.name}
          boxSize="80px"
          mb="2"
        />
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
          <Button size="sm" onClick={handleRemoveFromCart}>
            <DeleteIcon />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;
