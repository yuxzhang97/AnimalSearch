import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
/** importing our pages */
import Products from "./products";

export default function Pages() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Products />} path="/" />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
