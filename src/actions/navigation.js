import { NAVIGATION_SET_PAGE } from './types';

export const setPage = (name) => ({ type: NAVIGATION_SET_PAGE, payload: name });
