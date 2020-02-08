import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useDispatch, useSelector } from 'react-redux';
import { max, min } from 'lodash';
import useLoading from '../../../hooks/useLoading';
import { resetSchreiber } from '../../../actions/schreiber';

const UPDATE_ERGEBNIS = gql`
  mutation UpdateErgebnis($wert: Float, $idschueler: Int, $iddisziplin: Int, $allWerte: String) {
    updateErgebnis(wert: $wert, idschueler: $idschueler, iddisziplin: $iddisziplin, allWerte: $allWerte) {
      id
    }
  }
`;

export default () => {
  const { disziplin } = useSelector((state) => state.schreiber);
  const { loading, setLoading } = useLoading();
  const [updateErgebnis] = useMutation(UPDATE_ERGEBNIS);
  const dispatch = useDispatch();

  const submit = useCallback((schueler) => {
    setLoading(true);
    (async () => {
      const promises = schueler.map(async (s) => {
        if (s.status === 'E') return;
        const wert = parseFloat(disziplin.best === 'low' ? min(s.ergebnisseSchueler) : max(s.ergebnisseSchueler));
        await updateErgebnis({
          variables: {
            wert,
            idschueler: s.id,
            iddisziplin: disziplin.id,
            allWerte: JSON.stringify(s.ergebnisseSchueler),
          },
        });
      });
      await Promise.all(promises);
      dispatch(resetSchreiber());
      setLoading(false);
    })();
  }, [disziplin, updateErgebnis, setLoading, dispatch]);
  return { submit, loading };
};
