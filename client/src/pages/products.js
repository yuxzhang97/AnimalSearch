import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { Input, Button, Spinner, Box, Image, Heading, Text, Flex } from '@chakra-ui/react';

const SEARCH_PRODUCTS = gql`
  query SearchProducts($query: String!) {
    searchProducts(query: $query) {
      _id
      name
      description
      price
      category
      imageURL
    }
  }
`;

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchProducts, { loading, error, data }] = useLazyQuery(SEARCH_PRODUCTS);

  const handleSearch = () => {
    searchProducts({ variables: { query: searchTerm } });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box>
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        mb={4}
      />
      <Button onClick={handleSearch} colorScheme="teal" variant="solid" size="sm" mb={4}>
        Search
      </Button>

      {loading && <Spinner size="md" color="teal.500" mt={4} />}
      {error && <p>Error: {error.message}</p>}
      
      {data && (
        <Flex flexWrap="wrap">
          {data.searchProducts.map(product => (
            <Box key={product._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={2} m={2} width="300px" height="400px">
              <Image src={product.imageURL} alt={product.name} height="200px" objectFit="cover" />
              <Box mt={2}>
                <Heading as="h3" size="md" mb={1}>{product.name}</Heading>
                <Text fontSize="sm" mb={1}>{product.description}</Text>
                <Text fontSize="sm" fontWeight="bold" mb={1}>Price: ${product.price}</Text>
                <Text fontSize="sm" fontStyle="italic">Category: {product.category}</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default ProductSearch;
