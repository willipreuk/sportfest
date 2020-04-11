import { cloneDeep } from 'lodash';
import { UI_SATE_SET_LOADING, UI_STATE_SET_ERROR } from '../actions/types';

const initialState = {
  loading: false,
  error: null,
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);
  switch (action.type) {
    case UI_SATE_SET_LOADING: {
      state.loading = action.payload;
      break;
    }
    case UI_STATE_SET_ERROR: {
      state.error = action.payload ? action.payload : null;
      break;
    }
    default:
      return s;
  }
  return state;
};
