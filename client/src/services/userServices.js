import { gql, useQuery } from '@apollo/client';

// GraphQL query to fetch user information by ID
const GET_USER_BY_ID = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      _id
      firstName
      lastName
      username
      email
    }
  }
`;

// Custom hook to fetch user information by ID using useQuery
const useGetUserById = (userId) => {
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userId },
  });

  return { loading, error, user: data ? data.getUser : null };
};

export default useGetUserById;
