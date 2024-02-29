import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Heading, Text, Image, Spinner } from '@chakra-ui/react';

/** PRODUCTS gql query to retrieve all products */
const PRODUCTS = gql`
  query getProducts {
    products {
      _id
      name
      description
      price
      category
      imageURL
    }
  }
`;

/**
 * Products Page displays a grid of products fetched with useQuery using the PRODUCTS query
 */
const Products = () => {
  const { loading, error, data } = useQuery(PRODUCTS);

  if (loading) return <Spinner size="xl" />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} p={4}>
      {data?.products?.map(product => (
        <Box key={product._id} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={product.imageURL} alt={product.name} />
          <Box p="6">
            <Heading as="h3" size="md" mb={2}>
              {product.name}
            </Heading>
            <Text fontSize="sm" mb={2}>
              {product.description}
            </Text>
            <Text fontWeight="bold" mb={2}>
              Price: ${product.price}
            </Text>
            <Text fontSize="sm" fontStyle="italic">
              Category: {product.category}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Products;
