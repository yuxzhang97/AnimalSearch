import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { Input, Button, Spinner, Box, Flex } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';

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

const Products = () => {
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
            <ProductCard key={product._id} product={product} />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Products;
