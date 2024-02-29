import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Box, Image, Heading, Text } from '@chakra-ui/react';

const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($_id: ID!) {
    getProductByID(_id: $_id) {
      _id
      name
      description
      price
      category
      imageURL
    }
  }
`;

const ProductDetails = () => {
  const { productId } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { _id: productId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { getProductByID: product } = data;

  return (
    <Box maxW="800px" mx="auto" p="4">
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
        <Image src={product.imageURL} alt={product.name} mb="4" />
        <Heading as="h2" size="lg" mb="2">{product.name}</Heading>
        <Text fontSize="md" mb="2">{product.description}</Text>
        <Text fontSize="lg" fontWeight="bold" mb="2">Price: ${product.price}</Text>
        <Text fontSize="lg" fontStyle="italic">Category: {product.category}</Text>
      </Box>
    </Box>
  );
};

export default ProductDetails;
