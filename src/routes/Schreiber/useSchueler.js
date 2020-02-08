import gql from 'graphql-tag';
import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setSchueler } from '../../actions/schreiber';

const GET_SCHUELER = gql`
  query($klasse: Int!, $disziplin: Int!) {
    allSchueler(idklasse: $klasse) {
      schueler {
        vorname
        nachname
        id
        status
        klasse {
          name
          stufe
        }
      }
    }
    allErgebnisByKlasse(iddisziplin: $disziplin, idklasse: $klasse) {
      id
      wert
      schueler {
        id
      }
    }
  }
`;

export default () => {
  const { klasse, disziplin, schueler } = useSelector((state) => state.schreiber);
  const dispatch = useDispatch();
  const { data, loading } = useQuery(
    GET_SCHUELER,
    { variables: { klasse, disziplin: disziplin.id } },
  );

  useEffect(() => {
    if (!data) return;
    if (schueler.length > 0) return;

    const res = data.allSchueler.schueler.map((s) => {
      const tmp = { ...s };

      const ergebnisseSchueler = data.allErgebnisByKlasse.find(
        (e) => e.schueler.idschueler === tmp.id,
      ) || [];

      tmp.ergebnisseSchueler = ergebnisseSchueler;
      tmp.versuch = ergebnisseSchueler.length;

      return tmp;
    });
    dispatch(setSchueler(res));
  }, [data, dispatch, schueler.length]);

  return {
    loading,
  };
};
