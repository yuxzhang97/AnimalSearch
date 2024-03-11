import React from "react";
import { Box, Text } from "@chakra-ui/react";
import CartItem from "./CartItem";
import { useUser } from "../contexts/UserContext";
import { useGetUserCart } from "../services/cartServices";

const Cart = () => {
  const { userId } = useUser();
  const { loading, error, cartItems } = useGetUserCart(userId); // Use useGetUserCart hook to fetch cart items

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

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
      <Text fontSize="xl" fontWeight="bold" mb="2" textAlign="center">
        Subtotal:
      </Text>
      <Text
        fontSize="xl"
        fontWeight="bold"
        color="red"
        mb="4"
        textAlign="center"
      >
        ${subtotal.toFixed(2)}
      </Text>
      {cartItems.map((item) => (
        <CartItem key={item.product._id} item={item} />
      ))}
    </Box>
  );
};

export default Cart;
