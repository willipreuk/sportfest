import { combineReducers } from 'redux';
import ergebnis from './ergebnis';
import user from './user';
import navigation from './navigation';

export default combineReducers({ ergebnis, user, navigation });
