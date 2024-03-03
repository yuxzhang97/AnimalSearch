import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Heading, Text, Button, Spinner } from '@chakra-ui/react';
import { useGetProductDetails } from '../services/productService';
import { useAddToCart } from '../services/cartServices'; // Import the useAddToCart hook
import { useUser } from '../contexts/UserContext';
import { useGetUserCart } from '../services/cartServices';

const ProductDetails = () => {
  const { productId } = useParams();
  const { loading, error, product } = useGetProductDetails(productId);
  const { userId } = useUser();
  const [isAddingToCart, setIsAddingToCart] = useState(false); // State to track loading state
  const { refetch } = useGetUserCart(userId); // Fetch refetch function from useGetUserCart
  const addToCart = useAddToCart();

  const handleAddToCart = async (product) => {
    setIsAddingToCart(true); // Set loading state to true while adding to cart
    try {
      await addToCart(userId, product._id, refetch); // Pass refetch to addToCart
      console.log('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    } finally {
      setIsAddingToCart(false); // Reset loading state
    }
  };

  if (loading) return <Spinner size="lg" color="teal" />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box maxW="800px" mx="auto" p="4">
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
        <Image src={product.imageURL} alt={product.name} mb="4" />
        <Heading as="h2" size="lg" mb="2">{product.name}</Heading>
        <Text fontSize="md" mb="2">{product.description}</Text>
        <Text fontSize="lg" fontWeight="bold" mb="2">Price: ${product.price}</Text>
        <Text fontSize="lg" fontStyle="italic">Category: {product.category}</Text>
        <Button onClick={() => handleAddToCart(product)} colorScheme="teal" mt="4" isLoading={isAddingToCart}>
          {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
