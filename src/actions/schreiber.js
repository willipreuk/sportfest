import {
  SCHREIBER_DEC_COUNTER,
  SCHREIBER_INC_COUNTER, SCHREIBER_SET_CURRENT_SCHUELER,
  SCHREIBER_SET_DISZIPLIN,
  SCHREIBER_SET_KLASSE, SCHREIBER_SET_SCHUELER, SCHREIBER_UPDATE_ERGEBNIS,
} from './types';

export const setKlasse = (klasse) => ({ type: SCHREIBER_SET_KLASSE, payload: klasse });
export const setDisziplin = (disziplin) => ({ type: SCHREIBER_SET_DISZIPLIN, payload: disziplin });
export const incCounter = () => ({ type: SCHREIBER_INC_COUNTER });
export const decCounter = () => ({ type: SCHREIBER_DEC_COUNTER });
export const setSchueler = (schueler) => ({ type: SCHREIBER_SET_SCHUELER, payload: schueler });
export const setErgebnis = (idschueler, ergebnis) => (
  { type: SCHREIBER_UPDATE_ERGEBNIS, payload: { idschueler, ergebnis } }
);
export const setCurrentSchueler = (idschueler) => (
  { type: SCHREIBER_SET_CURRENT_SCHUELER, payload: idschueler }
);
