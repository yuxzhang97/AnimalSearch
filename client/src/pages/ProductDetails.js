// ProductDetails.js

import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();


  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {productId}</p>
      {/* Render product details here */}
    </div>
  );
};

export default ProductDetails;
