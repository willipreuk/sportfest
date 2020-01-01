import { cloneDeep } from 'lodash';
import { SCHREIBER_SET_DISZIPLIN, SCHREIBER_SET_KLASSE } from '../actions/types';

const initialState = {
  klasse: null,
  disziplin: null,
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);

  switch (action.type) {
    case SCHREIBER_SET_KLASSE: state.klasse = action.payload; break;
    case SCHREIBER_SET_DISZIPLIN: state.disziplin = action.payload; break;
    default: return s;
  }
  return state;
};
