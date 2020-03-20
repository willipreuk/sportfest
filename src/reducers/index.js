import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ergebnis from './ergebnis';
import user from './user';
import navigation from './navigation';
import schreiber from './schreiber';
import uiState from './uiState';

const createRootReducer = (history) => combineReducers({
  ergebnis,
  user,
  navigation,
  schreiber,
  uiState,
  router: connectRouter(history),
});

export default createRootReducer;
