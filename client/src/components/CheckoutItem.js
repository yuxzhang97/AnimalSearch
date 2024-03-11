import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Image,
  Button,
  Select,
  Spinner,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useUser } from "../contexts/UserContext";
import { useGetUserCart, useRemoveFromCart, useUpdateCartItem } from "../services/cartServices";


// Cart Item Component
const CheckoutItem = ({ item }) => {
  const removeFromCart = useRemoveFromCart();
  const updateCartItem = useUpdateCartItem();
  const { userId } = useUser();
  const { refetch } = useGetUserCart(userId); // Fetch refetch function from useGetUserCart
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const [editMode, setEditMode] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    setLoading(true);
    try {
      await updateCartItem(
        userId,
        item.product._id,
        parseInt(newQuantity),
        refetch
      );
      setQuantity(newQuantity);
    } catch (error) {
      console.error("Error updating cart item:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDropdown = async (event) => {
    if (event.target.value === "10+") {
      setEditMode(true);
    } else {
      const newQuantity = parseInt(event.target.value);
      handleQuantityChange(newQuantity);
    }
  };

  const handleChangeInput = (event) => {
    if (!editMode) {
      setEditMode(true);
    }
    setQuantity(event.target.value);
  };
  const handleUpdateQuantity = async () => {
    await handleQuantityChange(quantity);
    setEditMode(false);
  };

  const handleRemoveFromCart = async () => {
    setLoading(true);
    try {
      await removeFromCart(userId, item.product._id, refetch);
      console.log("Product removed from cart successfully");
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!editMode) {
      setQuantity(item.quantity);
    }
  });

  return (
    <Box
      p="4"
      mb="4"
      width="70%"
      border="1px solid #E2E8F0"
      borderRadius="md"
      boxShadow="md"
      backgroundColor="white"
    >
      <Flex alignItems="center">
        <Link to={`/product/${item.product._id}`}>
          <Image
            src={item.product.imageURL}
            alt={item.product.name}
            boxSize="100px"
            mr="4"
          />
        </Link>
        <Flex flexDirection="column" flex="1">
          <Link to={`/product/${item.product._id}`}>
            <Text fontWeight="bold" mb="1">
              {item.product.name}
            </Text>
          </Link>
          <Text fontSize="sm" mb="1">
            {item.product.description}
          </Text>
          <Text fontSize="lg" fontWeight="bold" mb="1">
            ${item.product.price}
          </Text>
          <Flex alignItems="center">
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <>
                {quantity > 9 || editMode ? (
                  <Input
                    size="sm"
                    value={quantity}
                    onChange={handleChangeInput}
                    disabled={loading}
                    width="8rem"
                    textAlign="center"
                  />
                ) : (
                  <Select
                    size="sm"
                    value={quantity}
                    onChange={handleDropdown}
                    disabled={loading}
                    width={"8rem"}
                    mr="2"
                  >
                    {[...Array(9).keys()].map((value) => (
                      <option key={value} value={value + 1}>
                        {value + 1}
                      </option>
                    ))}
                    <option value="10+">10+</option>
                  </Select>
                )}
                <Button
                  size="sm"
                  onClick={
                    editMode ? handleUpdateQuantity : handleRemoveFromCart
                  }
                  disabled={loading}
                >
                  {editMode ? "Update" : <DeleteIcon />}
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CheckoutItem;
