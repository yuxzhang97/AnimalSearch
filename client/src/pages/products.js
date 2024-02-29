import React from 'react';
import { useQuery, gql } from '@apollo/client';

/** PRODUCTS gql query to retrieve all products */
const PRODUCTS = gql`
  query getProducts {
    products {
      _id
      name
      description
      price
      category
      imageURL
    }
  }
`;

/**
 * Products Page displays a grid of products fetched with useQuery using the PRODUCTS query
 */
const Products = () => {
  const { loading, error, data } = useQuery(PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.products?.map(product => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <img src={product.imageURL} alt={product.name} />
        </div>
      ))}
    </div>
  );
};

export default Products;
