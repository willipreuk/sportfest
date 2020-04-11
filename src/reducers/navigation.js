import { cloneDeep, drop } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import { NAVIGATION_SET_PAGE_NAME } from '../actions/types';

const initialState = {
  name: '',
  history: [],
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);
  switch (action.type) {
    case LOCATION_CHANGE: {
      const { pathname } = action.payload.location;
      let name;
      switch (pathname) {
        case '/disziplinen':
          name = 'Disziplinen';
          break;
        case '/ergebnisse':
          name = 'Ergebnisse';
          break;
        case '/klassen':
          name = 'Klassen';
          break;
        case '/massstaebe':
          name = 'Maßstäbe';
          break;
        case '/schueler':
          name = 'Schueler';
          break;
        case '/user':
          name = 'User';
          break;
        default:
          name = 'Dashboard';
      }
      state.name = name;

      if (state.history.length >= 10) {
        state.history = drop(s.history, 1);
      }
      state.history = [...state.history, pathname];
      break;
    }
    case NAVIGATION_SET_PAGE_NAME: {
      state.name = action.payload;
      break;
    }
    default:
      return s;
  }
  return state;
};
