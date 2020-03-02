import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { store } from './store';

const authLink = setContext((_, { headers }) => {
  const token = store.getState().user.jwt;
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // eslint-disable-next-line
        graphQLErrors.forEach(({ message, locations, path }) => console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ));
      }
      // eslint-disable-next-line
      if (networkError) console.error(`[Network error]: ${networkError}`);
    }),
    authLink,
    createUploadLink({
      uri: 'http://localhost:4000',
    }),
  ]),
  cache: new InMemoryCache(),
});
