import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, Image, Button, Select, Spinner, Input } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useUser } from "../contexts/UserContext";
import { useGetUserCart, useRemoveFromCart, useUpdateCartItem } from "../services/cartServices";


// Cart Item Component
const CartItem = ({ item }) => {
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
    <Flex
      justifyContent="center"
      alignItems="center"
      key={item.product._id}
      mb="2"
      width="100%"
    >
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Link to={`/product/${item.product._id}`}>
          <Image
            src={item.product.imageURL}
            alt={item.product.name}
            boxSize="80px"
            mb="2"
          />
        </Link>
        <Flex justifyContent="space-between" alignItems="center" width="100%">
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
                  width="50px"
                  textAlign="center"
                />
              ) : (
                <Select
                  size="sm"
                  value={quantity}
                  onChange={handleDropdown}
                  disabled={loading}
                >
                  {[...Array(9).keys()].map((value) => (
                    <option key={value} value={value + 1}>
                      {value + 1}
                    </option>
                  ))}
                  <option value="10+">10+</option>
                </Select>
              )}
            </>
          )}
          {editMode && (
            <Button size="sm" onClick={handleUpdateQuantity} disabled={loading}>
              Update
            </Button>
          )}
          {!editMode && (
            <Button size="sm" onClick={handleRemoveFromCart} disabled={loading}>
              <DeleteIcon />
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;
