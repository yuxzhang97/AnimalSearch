import React from 'react';

const Product = ({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <img src={product.imageURL} alt={product.name} />
    </div>
  );
};

export default Product;
