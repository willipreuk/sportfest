import { cloneDeep } from 'lodash';
import { NAVIGATION_SET_PAGE } from '../actions/types';

const initialState = {
  name: '',
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);
  switch (action) {
    case NAVIGATION_SET_PAGE: state.name = action.payload; break;
    default: return s;
  }
  return state;
};
