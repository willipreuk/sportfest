import { cloneDeep } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';

const initialState = {
  name: '',
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);
  switch (action.type) {
    case LOCATION_CHANGE: {
      let name;
      switch (action.payload.location.pathname) {
        case '/disziplinen': name = 'Disziplinen'; break;
        case '/ergebnisse': name = 'Ergebnisse'; break;
        case '/klassen': name = 'Klassen'; break;
        case '/massstaebe': name = 'Maßstäbe'; break;
        case '/schueler': name = 'Schueler'; break;
        case '/user': name = 'User'; break;
        default: name = 'Dashboard';
      }
      state.name = name;
      break;
    }
    default: return s;
  }
  return state;
};
