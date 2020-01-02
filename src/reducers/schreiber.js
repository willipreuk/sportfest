import { cloneDeep } from 'lodash';
import {
  SCHREIBER_DEC_COUNTER,
  SCHREIBER_INC_COUNTER,
  SCHREIBER_SET_DISZIPLIN,
  SCHREIBER_SET_KLASSE, SCHREIBER_SET_SCHUELER, SCHREIBER_UPDATE_ERGEBNIS,
} from '../actions/types';

const initialState = {
  klasse: null,
  disziplin: null,
  schueler: [],
  counter: 0,
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);

  switch (action.type) {
    case SCHREIBER_SET_KLASSE: state.klasse = action.payload; break;
    case SCHREIBER_SET_DISZIPLIN: state.disziplin = action.payload; break;
    case SCHREIBER_INC_COUNTER: {
      if ((s.counter + 1) >= s.schueler.length) {
        state.counter = 0;
      } else {
        state.counter = s.counter + 1;
      }
      break;
    }
    case SCHREIBER_DEC_COUNTER: {
      if ((s.counter - 1) <= 0) {
        state.counter = s.schueler.length - 1;
      } else {
        state.counter = s.counter - 1;
      }
      break;
    }
    case SCHREIBER_SET_SCHUELER: state.schueler = action.payload; break;
    case SCHREIBER_UPDATE_ERGEBNIS: {
      const i = s.schueler.findIndex((p) => p.id === action.payload.idschueler);
      state.schueler[i].ergebnisseSchueler = [
        ...state.schueler[i].ergebnisseSchueler,
        action.payload.ergebnis,
      ];
      state.schueler[i].versuch = state.schueler[i].ergebnisseSchueler.length;
      break;
    }
    default: return s;
  }
  return state;
};
