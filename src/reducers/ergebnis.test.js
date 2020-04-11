import ergebnis from './ergebnis';
import { ERGEBNIS_SET_RANGE } from '../actions/types';

describe('ergebnis reducer', () => {
  it('should return initial state', () => {
    expect.assertions(1);
    expect(ergebnis(undefined, {})).toStrictEqual({
      filter: {
        von: 5,
        bis: 10,
      },
    });
  });
  describe('action ERGEBNIS_SET_RANGE', () => {
    it('should handle only von', () => {
      expect.assertions(1);
      expect(ergebnis(undefined, { type: ERGEBNIS_SET_RANGE, payload: { von: 1 } })).toStrictEqual({
        filter: { von: 1, bis: 10 },
      });
    });
    it('should handle only bis', () => {
      expect.assertions(1);
      expect(
        ergebnis(undefined, { type: ERGEBNIS_SET_RANGE, payload: { bis: 100 } }),
      ).toStrictEqual({ filter: { von: 5, bis: 100 } });
    });
    it('should handle both', () => {
      expect.assertions(1);
      expect(
        ergebnis(undefined, { type: ERGEBNIS_SET_RANGE, payload: { von: 8, bis: 8 } }),
      ).toStrictEqual({ filter: { von: 8, bis: 8 } });
    });
  });
});
