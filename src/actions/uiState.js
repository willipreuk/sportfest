import { UI_SATE_SET_LOADING, UI_STATE_SET_ERROR } from './types';

export const setLoading = (loading) => ({ type: UI_SATE_SET_LOADING, payload: loading });
export const setError = (error) => ({ type: UI_STATE_SET_ERROR, payload: error });
