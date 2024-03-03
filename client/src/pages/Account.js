import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Box, Heading, Text } from '@chakra-ui/react';
import useGetUserById from '../services/userServices';

const Account = () => {
  const { userId } = useUser();
  const { loading, error, user } = useGetUserById(userId); // Fetch user by ID

  return (
    <Box maxW="800px" mx="auto" p="4">
      <Heading as="h1" mb="4">Account</Heading>
      {/* Loading and Error texts */}
      {loading && <Text>Loading...</Text>} 
      {error && <Text>Error: {error.message}</Text>}
      {user && (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
          <Text fontSize="lg">First Name: {user.firstName}</Text>
          <Text fontSize="lg">Last Name: {user.lastName}</Text>
          <Text fontSize="lg">Email: {user.email}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Account;
