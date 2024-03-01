import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Products from "./products";
import ProductDetails from "./ProductDetails";
import NavBar from "../components/NavBar";
import { CartProvider } from "../contexts/CartContext"; // Import CartProvider
import Cart from "../components/Cart";

const Pages = () => {
  return (
    <ChakraProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route element={<Products />} path="/" />
            <Route element={<ProductDetails />} path="/product/:productId" />
          </Routes>
          <Cart/>
        </BrowserRouter>
      </CartProvider>
    </ChakraProvider>
  );
};

export default Pages;
