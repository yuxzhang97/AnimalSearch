import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import Account from "./Account";
import NavBar from "../components/NavBar";
import { CartProvider } from "../contexts/CartContext"; // Import CartProvider
import Cart from "../components/Cart";
import { UserProvider } from "../contexts/UserContext";
import Checkout from "./Checkout";
import Orders from "./Orders";
import Login from "./Login";
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider

const Pages = () => {
  return (
    <ChakraProvider>
      <UserProvider>
        <CartProvider>
          <BrowserRouter>
            <NavBar />
            <GoogleOAuthProvider clientId="414481212962-j6hi2gijp69c3fbiv5l7tvgg78dr0uhg.apps.googleusercontent.com">
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<ProductDetails />} path="/product/:productId" />
                <Route element={<Account />} path="/account" />
                <Route element={<Checkout />} path="/checkout" />
                <Route element={<Orders />} path="/orders" />
                <Route element={<Login />} path="/login" /> {/* Include the Login component */}
              </Routes>
            </GoogleOAuthProvider>
            <Cart />
          </BrowserRouter>
        </CartProvider>
      </UserProvider>
    </ChakraProvider>
  );
};

export default Pages;
