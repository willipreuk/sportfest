import appState from './uiState';
import { APP_STATE_SET_LOADING } from '../actions/types';
import { setLoading } from '../actions/uiState';

describe('app-state reducer', () => {
  it('should return initial state', () => {
    expect.assertions(1);
    expect(appState(undefined, {})).toStrictEqual({
      loading: false,
    });
  });
  describe('action setLoading', () => {
    it('should, return action object', () => {
      expect.assertions(1);
      expect(setLoading(false)).toStrictEqual({
        type: APP_STATE_SET_LOADING,
        payload: false,
      });
    });
    it('should set to true', () => {
      expect.assertions(1);
      expect(appState(
        undefined,
        { type: APP_STATE_SET_LOADING, payload: true },
      )).toStrictEqual({ loading: true });
    });
    it('should set to false', () => {
      expect.assertions(1);
      expect(appState(
        undefined,
        { type: APP_STATE_SET_LOADING, payload: false },
      )).toStrictEqual({ loading: false });
    });
  });
});
