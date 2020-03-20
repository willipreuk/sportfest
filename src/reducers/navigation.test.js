import { LOCATION_CHANGE } from 'connected-react-router';
import navigation from './navigation';
import { NAVIGATION_SET_PAGE_NAME } from '../actions/types';

describe('navigation reducer', () => {
  it('should return initial state', () => {
    expect.assertions(1);
    expect(navigation(undefined, {})).toStrictEqual({
      name: '',
      history: [],
    });
  });
  describe('action LOCATION_CHANGE', () => {
    it('should set Location', () => {
      expect.assertions(1);
      expect(
        navigation(
          undefined,
          { type: LOCATION_CHANGE, payload: { location: { pathname: '/disziplinen' } } },
        ),
      ).toStrictEqual({ name: 'Disziplinen', history: ['/disziplinen'] });
    });
    it('should return default', () => {
      expect.assertions(1);
      expect(
        navigation(
          undefined,
          { type: LOCATION_CHANGE, payload: { location: { pathname: '/1234' } } },
        ),
      ).toStrictEqual({ name: 'Dashboard', history: ['/1234'] });
    });
    it('should trim history', () => {
      expect.assertions(1);
      expect(
        navigation(
          { name: 'Dashboard', history: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
          { type: LOCATION_CHANGE, payload: { location: { pathname: 11 } } },
        ),
      ).toStrictEqual({ name: 'Dashboard', history: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11] });
    });
  });
  describe('action NAVIGATION_SET_PATH_NAME', () => {
    it('should set name', () => {
      expect.assertions(1);
      expect(
        navigation(
          undefined,
          { type: NAVIGATION_SET_PAGE_NAME, payload: 'test' },
        ),
      ).toStrictEqual({
        name: 'test',
        history: [],
      });
    });
  });
});
