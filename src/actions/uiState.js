import { UI_SATE_SET_LOADING, UI_STATE_SET_NOTIFICATION } from './types';

export const setLoading = (loading) => ({ type: UI_SATE_SET_LOADING, payload: loading });
export const setError = (level, error) => ({
  type: UI_STATE_SET_NOTIFICATION,
  payload: { error, level },
});
