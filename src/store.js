import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';

const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export default () => {
  const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(
        routerMiddleware(history),
      ),
      /* eslint-disable no-underscore-dangle */
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      /* eslint-enable */
    ),
  );
  const persistor = persistStore(store);
  return { store, persistor, history };
};
