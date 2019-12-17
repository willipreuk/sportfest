import React from 'react';
import { CssBaseline } from '@material-ui/core';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

function App() {
  return (
    <>
      <CssBaseline />
      <ApolloProvider client={client}>
        <h1>Sportfest</h1>
      </ApolloProvider>
    </>
  );
}

export default App;
