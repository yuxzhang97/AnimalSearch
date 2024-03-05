import React, { useEffect } from "react";
import { useGetUserOrders } from "../services/orderServices";
import { Center, Spinner, Box, Text, List, ListItem, Image } from "@chakra-ui/react";
import { useUser } from "../contexts/UserContext";

const Orders = () => {
  const { userId } = useUser();
  const { loading, error, userOrders, refetch: getUserOrders } = useGetUserOrders(
    userId
  );

  useEffect(() => {
    // Fetch user orders when component mounts
    getUserOrders();
  }, [getUserOrders]);

  if (loading)
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  if (error) return <p>Error fetching orders: {error.message}</p>;

  return (
    <Center flexDirection="column">
      <Box width="70%" p="4">
        <Text fontSize="xl" mb="4" textAlign="center">
          Your Past Orders:
        </Text>
        {userOrders.map((order) => (
          <Box
            key={order._id}
            border="1px solid #E2E8F0"
            borderRadius="md"
            mb="4"
            p="4"
          >
            <Text mb="2">Order ID: {order._id}</Text>
            <Text mb="2" fontSize="sm">
              Order Date: {new Date(order.createdAt).toLocaleString()}
            </Text>
            <Text mb="2">Items:</Text>
            <List styleType="none">
              {order.items.map((item) => (
                <ListItem key={item.product._id} mb="2" display="flex" alignItems="center">
                  <Image src={item.product.imageURL} alt={item.product.name} boxSize="50px" mr="2" />
                  <Text fontWeight="bold">{item.product.name}</Text> - Quantity:{" "}
                  {item.quantity} - Price: ${item.product.price}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Center>
  );
};

export default Orders;
