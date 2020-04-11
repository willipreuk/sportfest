import appState from './uiState';
import { UI_SATE_SET_LOADING, UI_STATE_SET_NOTIFICATION } from '../actions/types';
import { setError, setLoading } from '../actions/uiState';

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
        type: UI_SATE_SET_LOADING,
        payload: false,
      });
    });
    it('should set to true', () => {
      expect.assertions(1);
      expect(appState(undefined, { type: UI_SATE_SET_LOADING, payload: true })).toStrictEqual({
        loading: true,
      });
    });
    it('should set to false', () => {
      expect.assertions(1);
      expect(appState(undefined, { type: UI_SATE_SET_LOADING, payload: false })).toStrictEqual({
        loading: false,
      });
    });
  });
  describe('action setError', () => {
    it('should, return action object', () => {
      expect.assertions(1);
      expect(setError('error', 'test')).toStrictEqual({
        type: UI_STATE_SET_NOTIFICATION,
        payload: { level: 'error', message: 'test' },
      });
    });
    it('should set error', () => {
      expect.assertions(1);
      expect(
        appState(undefined, {
          type: UI_STATE_SET_NOTIFICATION,
          payload: { level: 'info', message: 'test' },
        }),
      ).toStrictEqual({
        loading: false,
        error: {
          level: 'info',
          message: 'test',
        },
      });
    });
    it('should set error null', () => {
      expect.assertions(1);
      expect(appState(undefined, { type: UI_STATE_SET_NOTIFICATION })).toStrictEqual({
        loading: false,
        error: null,
      });
    });
  });
});
