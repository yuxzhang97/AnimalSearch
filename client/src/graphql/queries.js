import { gql } from "@apollo/client";

//Seach product using query string
const SEARCH_PRODUCTS = gql`
  query SearchProducts($query: String!) {
    searchProducts(query: $query) {
      _id
      name
      description
      price
      category
      imageURL
    }
  }
`;

export default SEARCH_PRODUCTS;
