import { cloneDeep } from 'lodash';
import { ERGEBNIS_SET_RANGE } from '../actions/types';

const initialState = {
  filter: {
    von: 5,
    bis: 10,
  },
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);
  switch (action.type) {
    case ERGEBNIS_SET_RANGE: {
      if (action.payload.von) state.filter.von = action.payload.von;
      if (action.payload.bis) state.filter.bis = action.payload.bis;
      break;
    }
    default: return s;
  }
  return state;
};
