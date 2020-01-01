import { SCHREIBER_SET_DISZIPLIN, SCHREIBER_SET_KLASSE } from './types';

export const setKlasse = (klasse) => ({ type: SCHREIBER_SET_KLASSE, payload: klasse });
export const setDisziplin = (disziplin) => ({ type: SCHREIBER_SET_DISZIPLIN, payload: disziplin });
