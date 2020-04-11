import { cloneDeep } from 'lodash';
// eslint-disable-next-line import/named
import schreiber, { __get__ } from './schreiber';
import {
  SCHREIBER_DEC_COUNTER,
  SCHREIBER_INC_COUNTER,
  SCHREIBER_RESET,
  SCHREIBER_SET_CURRENT_SCHUELER,
  SCHREIBER_SET_DISZIPLIN,
  SCHREIBER_SET_KLASSE,
  SCHREIBER_SET_SCHUELER,
  SCHREIBER_SET_VERLETZT,
  SCHREIBER_UPDATE_ERGEBNIS,
} from '../actions/types';

describe('schreiber resolver', () => {
  it('should return initial state', () => {
    expect.assertions(1);
    expect(schreiber(undefined, {})).toStrictEqual({
      klasse: null,
      disziplin: null,
      schueler: [],
      counter: 0,
      finished: false,
    });
  });
  describe('utils', () => {
    const increment = __get__('increment');
    const decrement = __get__('decrement');
    describe('counter increment', () => {
      it('should increment normally', () => {
        expect.assertions(1);
        const counter = increment(4)(0);
        expect(counter).toStrictEqual(1);
      });
      it('should increment to 0 again', () => {
        expect.assertions(1);
        const counter = increment(4)(3);
        expect(counter).toStrictEqual(0);
      });
    });
    describe('counter decrement', () => {
      it('should decrement normally', () => {
        expect.assertions(1);
        const counter = decrement(4)(2);
        expect(counter).toStrictEqual(1);
      });
      it('should decrement to length of array', () => {
        expect.assertions(1);
        const counter = decrement(4)(0);
        expect(counter).toStrictEqual(3);
      });
    });
    describe('checkFinished', () => {
      const checkFinished = __get__('checkFinished');
      it('should return false on versuch < 3', () => {
        expect.assertions(1);
        const schueler = [
          { status: null, versuch: 1 },
          { status: null, versuch: 2 },
        ];
        expect(checkFinished(schueler)).toBe(false);
      });
      it('should return true on versuch = 3', () => {
        expect.assertions(1);
        const schueler = [
          { status: null, versuch: 3 },
          { status: null, versuch: 3 },
        ];
        expect(checkFinished(schueler)).toBe(true);
      });
      it('should exclude status E', () => {
        expect.assertions(1);
        const schueler = [
          { status: 'E', versuch: 3 },
          { status: 'E', versuch: 2 },
        ];
        expect(checkFinished(schueler)).toBe(true);
      });
    });
    describe('check schueler', () => {
      const checkSchueler = __get__('checkSchueler');

      it('should not iterate more than schueler length', () => {
        expect.assertions(1);
        const schueler = [
          { status: 'E', versuch: 1 },
          { status: 'E', versuch: 1 },
        ];
        expect(checkSchueler({ counter: 0, schueler }, increment(schueler.length))).toStrictEqual(
          0,
        );
      }, 1);

      it('should distinguish direction', () => {
        expect.assertions(2);
        const state = {
          schueler: [
            { status: null, versuch: 1 },
            { status: null, versuch: 1 },
          ],
          counter: 0,
        };

        const countUP = checkSchueler(state, increment(state.schueler.length));
        expect(countUP).toStrictEqual(1);

        state.counter = 1;
        const countDown = checkSchueler(state, decrement(state.schueler.length));
        expect(countDown).toStrictEqual(0);
      });

      const schueler = [
        { status: null, versuch: 1 },
        { status: 'E', versuch: 1 },
        { status: null, versuch: 1 },
      ];
      it('should skip status E up', () => {
        expect.assertions(1);
        expect(checkSchueler({ counter: 0, schueler }, increment(schueler.length))).toStrictEqual(
          2,
        );
      });
      it('schuld skip status E down', () => {
        expect.assertions(1);
        expect(checkSchueler({ counter: 2, schueler }, decrement(schueler.length))).toStrictEqual(
          0,
        );
      });

      const schueler2 = [
        { status: null, versuch: 1 },
        { status: null, versuch: 3 },
        { status: null, versuch: 1 },
      ];
      it('should skip versuch >= 3 up', () => {
        expect.assertions(1);
        expect(
          checkSchueler({ counter: 0, schueler: schueler2 }, increment(schueler2.length)),
        ).toStrictEqual(2);
      });
      it('should skip versuch >= 3 down', () => {
        expect.assertions(1);
        expect(
          checkSchueler({ counter: 2, schueler: schueler2 }, decrement(schueler2.length)),
        ).toStrictEqual(0);
      });
      it('should skip both', () => {
        expect.assertions(1);
        schueler2[1].status = 'E';
        expect(
          checkSchueler({ counter: 0, schueler: schueler2 }, increment(schueler2.length)),
        ).toStrictEqual(2);
      });
    });
  });
  describe('action SCHREIBER_SET_KLASSE', () => {
    it('should set klasse', () => {
      expect.assertions(1);
      expect(schreiber(undefined, { type: SCHREIBER_SET_KLASSE, payload: 8 })).toStrictEqual({
        klasse: 8,
        disziplin: null,
        schueler: [],
        counter: 0,
        finished: false,
      });
    });
  });
  describe('action SCHREIBER_SET_DISZIPLIN', () => {
    it('should set disziplin', () => {
      expect.assertions(1);
      expect(schreiber(undefined, { type: SCHREIBER_SET_DISZIPLIN, payload: 1 })).toStrictEqual({
        klasse: null,
        disziplin: 1,
        schueler: [],
        counter: 0,
        finished: false,
      });
    });
  });

  const schueler = [
    {
      status: null,
      versuch: 0,
      id: 1,
      ergebnisseSchueler: [],
      stationsStatus: null,
    },
    {
      status: null,
      versuch: 0,
      id: 2,
      ergebnisseSchueler: [],
      stationsStatus: null,
    },
  ];
  describe('action SCHREIBER_SET_SCHUELER', () => {
    it('should set schueler', () => {
      expect.assertions(1);
      expect(
        schreiber(undefined, { type: SCHREIBER_SET_SCHUELER, payload: schueler }),
      ).toStrictEqual({
        klasse: null,
        disziplin: null,
        schueler,
        counter: 0,
        finished: false,
      });
    });
    it('should inc counter if first schueler status = E', () => {
      expect.assertions(1);
      const schueler2 = [
        {
          status: 'E',
          versuch: 0,
          id: 1,
          ergebnisseSchueler: [],
        },
        {
          status: null,
          versuch: 0,
          id: 2,
          ergebnisseSchueler: [],
        },
      ];
      expect(
        schreiber(undefined, { type: SCHREIBER_SET_SCHUELER, payload: schueler2 }),
      ).toStrictEqual({
        klasse: null,
        disziplin: null,
        schueler: schueler2,
        counter: 1,
        finished: false,
      });
    });
  });
  describe('action SCHREIBER_INC_COUNTER', () => {
    it('should increment counter', () => {
      expect.assertions(1);
      expect(schreiber({ schueler, counter: 0 }, { type: SCHREIBER_INC_COUNTER })).toStrictEqual({
        schueler,
        counter: 1,
      });
    });
    it('should increment counter two times', () => {
      expect.assertions(1);
      const newSchueler = cloneDeep(schueler);
      newSchueler[1].status = 'E';
      newSchueler.push({
        status: 'E',
        versuch: 0,
        id: 3,
        ergebnisseSchueler: [],
      });
      newSchueler.push({
        status: null,
        versuch: 0,
        id: 4,
        ergebnisseSchueler: [],
      });
      expect(
        schreiber({ schueler: newSchueler, counter: 0 }, { type: SCHREIBER_INC_COUNTER }),
      ).toStrictEqual({ schueler: newSchueler, counter: 3 });
    }, 100);
  });
  describe('action SCHREIBER_DEC_COUNTER', () => {
    it('should decrement counter', () => {
      expect.assertions(1);
      expect(schreiber({ schueler, counter: 1 }, { type: SCHREIBER_DEC_COUNTER })).toStrictEqual({
        schueler,
        counter: 0,
      });
    });
  });
  describe('action SCHREIBER_UPDATE_ERGEBNIS', () => {
    it('should insert ergebnis', () => {
      expect.assertions(1);
      const newSchueler = cloneDeep(schueler);
      newSchueler[0].ergebnisseSchueler = [10];
      newSchueler[0].versuch = 1;
      expect(
        schreiber(
          { schueler },
          { type: SCHREIBER_UPDATE_ERGEBNIS, payload: { idschueler: 1, ergebnis: 10 } },
        ),
      ).toStrictEqual({
        schueler: newSchueler,
      });
    });
  });
  describe('action SCHREIBER_SET_CURRENT_SCHUELER', () => {
    it('should set counter', () => {
      expect.assertions(1);
      expect(
        schreiber({ schueler, counter: 0 }, { type: SCHREIBER_SET_CURRENT_SCHUELER, payload: 2 }),
      ).toStrictEqual({ schueler, counter: 1 });
    });
    it('should set to 0 if not found', () => {
      expect.assertions(1);
      expect(
        schreiber({ schueler, counter: 1 }, { type: SCHREIBER_SET_CURRENT_SCHUELER, payload: 55 }),
      ).toStrictEqual({ schueler, counter: 0 });
    });
  });
  describe('action SCHREIBER_RESET', () => {
    it('should return initial state', () => {
      expect.assertions(1);
      expect(
        schreiber({ schueler, counter: 1, finished: true }, { type: SCHREIBER_RESET }),
      ).toStrictEqual({
        klasse: null,
        disziplin: null,
        schueler: [],
        counter: 0,
        finished: false,
      });
    });
  });
  describe('action SCHREIBER_SET_VERLETZT', () => {
    const newSchueler = [
      {
        status: null,
        versuch: 0,
        id: 1,
        ergebnisseSchueler: [],
        stationsStatus: 'V',
      },
      {
        status: null,
        versuch: 0,
        id: 2,
        ergebnisseSchueler: [],
        stationsStatus: null,
      },
    ];
    it('should set stationsStatus V for truthy values', () => {
      expect.assertions(1);
      expect(
        schreiber(
          { schueler },
          { type: SCHREIBER_SET_VERLETZT, payload: { idschueler: 1, verletzt: true } },
        ),
      ).toStrictEqual({
        schueler: newSchueler,
      });
    });
    it('should set stationsStatus null for falsy values', () => {
      expect.assertions(1);
      expect(
        schreiber(
          { schueler: newSchueler },
          { type: SCHREIBER_SET_VERLETZT, payload: { idschueler: 1, verletzt: false } },
        ),
      ).toStrictEqual({ schueler });
    });
  });
});
