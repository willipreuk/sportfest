import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';

const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
      ),
    ),
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(persistedReducer);
      });
    }
  }

  const persistor = persistStore(store);
  return { store, persistor, history };
};
