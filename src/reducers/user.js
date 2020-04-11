import { cloneDeep, mapKeys } from 'lodash';
import { USER_LOGOUT, USER_LOGIN } from '../actions/types';

const initialState = {
  jwt: '',
  username: '',
  id: null,
  rolle: '',
};

export default (s = initialState, action) => {
  const state = cloneDeep(s);
  switch (action.type) {
    case USER_LOGIN: {
      state.jwt = action.payload.jwt;
      mapKeys(action.payload.user, (value, key) => {
        // omit graphql type
        if (key === '__typename') return;
        state[key] = value;
      });
      break;
    }
    case USER_LOGOUT:
      return initialState;
    default:
      return s;
  }
  return state;
};
