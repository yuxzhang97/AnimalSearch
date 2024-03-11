import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import Pages from './pages';


const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>
);
