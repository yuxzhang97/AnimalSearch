import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Heading, Text } from '@chakra-ui/react';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={2}
        m={2}
        width="300px"
        height="400px"
        cursor="pointer"
      >
        <Image src={product.imageURL} alt={product.name} height="200px" objectFit="cover" />
        <Box mt={2}>
          <Heading as="h3" size="md" mb={1}>{product.name}</Heading>
          <Text fontSize="sm" fontWeight="bold" mb={1}>Price: ${product.price}</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductCard;
