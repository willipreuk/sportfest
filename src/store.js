import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';

const browserHistory = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer(browserHistory));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const exportedValues = {
  store: null,
  history: null,
  persistor: null,
};

(() => {
  exportedValues.store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(browserHistory),
      ),
    ),
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        exportedValues.store.replaceReducer(persistedReducer);
      });
    }
  }

  exportedValues.persistor = persistStore(exportedValues.store);
  exportedValues.history = browserHistory;
})();

export const { store } = exportedValues;
export const { history } = exportedValues;
export const { persistor } = exportedValues;
