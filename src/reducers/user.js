import { cloneDeep } from 'lodash';
import { USER_LOGOUT, USER_SET_JWT } from '../actions/types';

const initialState = {
  jwt: null,
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);
  switch (action.type) {
    case USER_SET_JWT: {
      state.jwt = action.payload.jwt;
      break;
    }
    case USER_LOGOUT: {
      state.jwt = null;
      break;
    }
    default: return state;
  }
  return state;
};
