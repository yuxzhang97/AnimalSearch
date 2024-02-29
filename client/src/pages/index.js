import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/** importing our pages */
import Products from './products';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Products />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}
