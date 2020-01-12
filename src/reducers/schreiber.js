import { cloneDeep } from 'lodash';
import {
  SCHREIBER_DEC_COUNTER,
  SCHREIBER_INC_COUNTER, SCHREIBER_SET_CURRENT_SCHUELER,
  SCHREIBER_SET_DISZIPLIN,
  SCHREIBER_SET_KLASSE, SCHREIBER_SET_SCHUELER, SCHREIBER_UPDATE_ERGEBNIS,
} from '../actions/types';

const initialState = {
  klasse: null,
  disziplin: null,
  schueler: [],
  counter: 0,
};

const increment = (length) => (counter) => {
  if ((counter + 1) >= length) {
    return 0;
  }
  return counter + 1;
};

const decrement = (length) => (counter) => {
  if ((counter - 1) < 0) {
    return length - 1;
  }
  return counter - 1;
};

const checkSchueler = (s, count) => {
  const state = cloneDeep(s);
  let check = true;

  state.counter = count(s.counter);
  let { counter } = state;

  while (check) {
    const newSchueler = state.schueler[counter];
    if (newSchueler.versuch !== 3 && newSchueler.status !== 'E') {
      check = false;
    } else {
      counter = count(counter);
    }
  }
  return counter;
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);

  switch (action.type) {
    case SCHREIBER_SET_KLASSE: state.klasse = action.payload; break;
    case SCHREIBER_SET_DISZIPLIN: state.disziplin = action.payload; break;
    case SCHREIBER_INC_COUNTER: {
      state.counter = checkSchueler(state, increment(state.schueler.length));
      break;
    }
    case SCHREIBER_DEC_COUNTER: {
      state.counter = checkSchueler(state, decrement(state.schueler.length));
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
    case SCHREIBER_SET_CURRENT_SCHUELER: {
      const index = s.schueler.findIndex((schueler) => schueler.id === action.payload);
      state.counter = index === -1 ? 0 : index;
      break;
    }
    default: return s;
  }
  return state;
};
