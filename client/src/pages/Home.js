import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Products from "./products";
import ProductDetails from "./ProductDetails";
import NavBar from "../components/NavBar";

const Pages = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<Products />} path="/" />
          <Route element={<ProductDetails />} path="/product/:productId" />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default Pages;
