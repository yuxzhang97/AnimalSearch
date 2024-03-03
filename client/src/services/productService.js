// services/productService.js

import { useLazyQuery, gql, useQuery } from "@apollo/client";

// GraphQL query for searching products
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

// Function to search products using a query string
const useSearchProducts = () => {
  const [searchProductsQuery, { loading, error, data }] =
    useLazyQuery(SEARCH_PRODUCTS);

  const searchProducts = (searchTerm) => {
    // Execute the searchProductsQuery with the provided search term
    searchProductsQuery({ variables: { query: searchTerm } });
  };

  return { loading, error, data, searchProducts };
};

// GraphQL query for getting product details by ID
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

// Function to get product details by ID
const useGetProductDetails = (productId) => {
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { _id: productId },
  });
  return { loading, error, product: data ? data.getProductByID : null };
};

export { useGetProductDetails, useSearchProducts }; // Export both functions
