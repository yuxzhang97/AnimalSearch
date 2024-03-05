import React from "react";
import { useUser } from "../contexts/UserContext";
import { useGetUserCart } from "../services/cartServices";
import { useAddOrder } from "../services/orderServices";
import { Button, Center, Spinner, Box, Text } from "@chakra-ui/react";
import CheckoutItem from "../components/CheckoutItem";

const Checkout = () => {
  const { userId } = useUser(); // Get the current user from the context
  const { loading, error, cartItems, refetch } = useGetUserCart(userId); // Use useGetUserCart hook to fetch cart items
  const { addOrder } = useAddOrder(); // Hook for adding an order

  const handleCheckout = async () => {
    if (!cartItems || loading || error) return;

    try {
      // Extract items from cart data
      const items = cartItems.map((cartItem) => ({
        quantity: cartItem.quantity,
        productId: cartItem.product._id,
      }));

      // Add order
      await addOrder(userId, items);

      console.log("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      // Display error message to the user
    }
  };

  // Calculate subtotal by considering quantities
  const subtotal = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);

  if (loading)
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  if (error) return <p>Error fetching cart data: {error.message}</p>;

  return (
    <Center flexDirection="column">
      <Box width="100%">
        <Text fontSize="xl" mb="4">
          Your Cart Items:
        </Text>
        {cartItems.map((cartItem, index) => (
          <CheckoutItem key={index} item={cartItem} refetch={refetch} />
        ))}
      </Box>
      <Text fontSize="xl" mt="4">
        Subtotal ({totalItems} Items): ${subtotal.toFixed(2)}
      </Text>
      <Button colorScheme="blue" mt="4" onClick={handleCheckout}>
        Place Order
      </Button>
    </Center>
  );
};

export default Checkout;
