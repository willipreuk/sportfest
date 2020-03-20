import { APP_STATE_SET_LOADING } from './types';

export const setLoading = (loading) => ({ type: APP_STATE_SET_LOADING, payload: loading });
