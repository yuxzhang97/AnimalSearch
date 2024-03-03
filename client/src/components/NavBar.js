import React from 'react';
import { Link } from 'react-router-dom';
import { Box, HStack, Text } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Box bg="teal" p="4">
      <HStack spacing="4" justify="flex-start">
        <Link to="/">
          <Text color="white" fontWeight="bold" fontSize="xl">Home</Text>
        </Link>
        <Link to="/account">
          <Text color="white" fontWeight="bold" fontSize="xl">Account</Text>
        </Link>
      </HStack>
    </Box>
  );
};

export default NavBar;
