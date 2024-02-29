import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Products from "./products";
import ProductDetails from "./ProductDetails";

const Pages = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Products />} path="/" />
          <Route element={<ProductDetails />} path="/product/:productId" />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default Pages;
