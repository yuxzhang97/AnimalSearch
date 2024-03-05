import React, { useEffect } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useSearchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
const Home = () => {
  const { loading, error, data, searchProducts } = useSearchProducts();

  const handleSearch = (searchTerm) => {
    searchProducts(searchTerm);
  };
  

  useEffect(() => {
    // Fetch the top 10 items only once when the component mounts
    searchProducts("");
  }, []); 

  return (
    <Box>
      <SearchBar onSearch={handleSearch} />

      {loading && <Spinner size="md" color="teal.500" mt={4} />}
      {error && <p>Error: {error.message}</p>}

      {data && (
        <Flex flexWrap="wrap">
          {data.searchProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Home;
