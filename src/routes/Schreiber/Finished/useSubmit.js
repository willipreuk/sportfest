import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useDispatch, useSelector } from 'react-redux';
import { max, min } from 'lodash';
import { resetSchreiber } from '../../../actions/schreiber';
import { setLoading } from '../../../actions/uiState';

const UPDATE_ERGEBNIS = gql`
  mutation UpdateErgebnis(
    $wert: Float
    $idschueler: Int
    $iddisziplin: Int
    $allWerte: String
    $status: String
  ) {
    updateErgebnis(
      wert: $wert
      idschueler: $idschueler
      iddisziplin: $iddisziplin
      allWerte: $allWerte
      status: $status
    ) {
      id
    }
  }
`;

export default () => {
  const { disziplin } = useSelector((state) => state.schreiber);
  const [updateErgebnis] = useMutation(UPDATE_ERGEBNIS);
  const dispatch = useDispatch();

  const submit = useCallback(
    (allSchueler) => {
      dispatch(setLoading(true));
      (async () => {
        const promises = allSchueler.map(async (schueler) => {
          if (schueler.status === 'E') return;
          const wert = parseFloat(
            disziplin.best === 'low'
              ? min(schueler.ergebnisseSchueler.map((ergebniss) => parseFloat(ergebniss)))
              : max(schueler.ergebnisseSchueler.map((ergebniss) => parseFloat(ergebniss))),
          );
          await updateErgebnis({
            variables: {
              wert,
              idschueler: schueler.id,
              iddisziplin: disziplin.id,
              allWerte: JSON.stringify(schueler.ergebnisseSchueler),
              status: schueler.stationsStatus,
            },
          });
        });
        await Promise.all(promises);
        dispatch(resetSchreiber());
        dispatch(setLoading(false));
      })();
    },
    [disziplin, updateErgebnis, dispatch],
  );
  return { submit };
};
