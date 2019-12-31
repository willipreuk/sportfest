import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ergebnis from './ergebnis';
import user from './user';
import navigation from './navigation';

const createRootReducer = (history) => combineReducers({
  ergebnis,
  user,
  navigation,
  router: connectRouter(history),
});

export default createRootReducer;
