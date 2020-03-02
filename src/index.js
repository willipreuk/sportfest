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
import { store, history, persistor } from './store';
import LoadingSpinner from './components/LoadingSpinner';
import ApolloClient from './ApolloClient';

serviceWorker.register();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <ApolloProvider client={ApolloClient}>
            <ConnectedRouter history={history}>
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
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
