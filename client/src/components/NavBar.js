import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Box bg="teal" p="4">
      <Flex justifyContent="space-between" alignItems="center">
        <Link to="/">
          <Text color="white" fontWeight="bold" fontSize="xl">Home</Text>
        </Link>
        {/* Add additional links or navigation items here */}
      </Flex>
    </Box>
  );
};

export default NavBar;
