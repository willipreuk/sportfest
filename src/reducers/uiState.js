import { cloneDeep } from 'lodash';
import { UI_SATE_SET_LOADING, UI_STATE_SET_NOTIFICATION } from '../actions/types';

const initialState = {
  loading: false,
  notfication: null,
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);
  switch (action.type) {
    case UI_SATE_SET_LOADING: {
      state.loading = action.payload;
      break;
    }
    case UI_STATE_SET_NOTIFICATION: {
      if (action.payload.message) {
        state.error = {};
        state.error.level = action.payload.level;
        state.error.message = action.payload.message;
      } else {
        state.error = null;
      }
      break;
    }
    default:
      return s;
  }
  return state;
};
