import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import ApolloClient from './ApolloClient';
import configureStore from './store';

const store = configureStore();

// eslint-disable-next-line react/prop-types
const AllProviders = ({ children }) => (
  <Provider store={store.store}>
    <ApolloProvider client={ApolloClient}>
      {children}
    </ApolloProvider>
  </Provider>
);

const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options });

// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';
export { customRender as render };
