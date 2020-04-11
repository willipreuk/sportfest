import { cloneDeep } from 'lodash';
import { APP_STATE_SET_LOADING } from '../actions/types';

const initialState = {
  loading: false,
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);
  switch (action.type) {
    case APP_STATE_SET_LOADING: {
      state.loading = action.payload;
      break;
    }
    default:
      return s;
  }
  return state;
};
