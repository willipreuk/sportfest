import { USER_LOGOUT, USER_SET_JWT } from './types';

export const setJWT = (payload) => ({ type: USER_SET_JWT, payload });

export const logout = () => ({ type: USER_LOGOUT });
