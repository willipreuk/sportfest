import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import LoadingSpinner from './components/LoadingSpinner';
import ApolloClient from './ApolloClient';

const configuredStore = configureStore();
export const { store } = configuredStore;

serviceWorker.register();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={configuredStore.store}>
      <PersistGate loading={<LoadingSpinner />} persistor={configuredStore.persistor}>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <ApolloProvider client={ApolloClient}>
            <ConnectedRouter history={configuredStore.history}>
              <Component />
            </ConnectedRouter>
          </ApolloProvider>
        </div>
      </PersistGate>
    </Provider>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
