import { USER_LOGOUT, USER_LOGIN } from './types';

export const setJWT = (payload) => ({ type: USER_LOGIN, payload });

export const logout = () => ({ type: USER_LOGOUT });
