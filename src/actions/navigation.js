import { NAVIGATION_SET_PAGE_NAME } from './types';

export const setPageName = (name) => ({ type: NAVIGATION_SET_PAGE_NAME, payload: name });
