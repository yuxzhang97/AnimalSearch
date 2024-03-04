import React, { useState } from "react";
import { Flex, Image, Button, Select, Spinner } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRemoveFromCart, useUpdateCartItem } from "../services/cartServices";
import { useUser } from "../contexts/UserContext";
import { useGetUserCart } from "../services/cartServices";

// Cart Item Component
const CartItem = ({ item }) => {
  const removeFromCart = useRemoveFromCart();
  const updateCartItem = useUpdateCartItem();
  const { userId } = useUser();
  const { refetch } = useGetUserCart(userId); // Fetch refetch function from useGetUserCart
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (event) => {
    const newQuantity = parseInt(event.target.value);
    setLoading(true);
    try {
      await updateCartItem(userId, item.product._id, newQuantity, refetch);
    } catch (error) {
      console.error("Error updating cart item:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    setLoading(true);
    try {
      await removeFromCart(userId, item.product._id, refetch);
      console.log('Product removed from cart successfully');
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" key={item.product._id} mb="2" width="100%">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Image
          src={item.product.imageURL}
          alt={item.product.name}
          boxSize="80px"
          mb="2"
        />
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          {loading ? (
            <Spinner size="sm" />
          ) : (
            <Select
              size="sm"
              value={item.quantity}
              onChange={handleQuantityChange}
              disabled={loading}
            >
              {[...Array(9).keys()].map((value) => (
                <option key={value} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </Select>
          )}
          <Button size="sm" onClick={handleRemoveFromCart} disabled={loading}>
            <DeleteIcon />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;
