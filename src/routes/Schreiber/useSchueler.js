import gql from 'graphql-tag';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';

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
    disziplin(id: $disziplin) {
      name
      best
    }
  }
`;

export default () => {
  const { klasse, disziplin } = useSelector((state) => state.schreiber);
  const [schueler, setSchueler] = useState([]);
  const [counter, setCounter] = useState(0);

  const { data, loading } = useQuery(GET_SCHUELER, { variables: { klasse, disziplin } });

  const setErgebnis = useCallback((idschueler, ergebnis) => {
    setSchueler((prevState) => {
      const s = prevState;
      const i = prevState.findIndex((p) => p.id === idschueler);
      s[i].ergebnisseSchueler = [...s[i].ergebnisseSchueler, ergebnis];
      s[i].versuch = s[i].ergebnisseSchueler.length;
      return s;
    });
    setCounter((prevState) => {
      if ((prevState + 1) >= schueler.length) {
        return 0;
      }
      return prevState + 1;
    });
  }, [setSchueler, schueler]);

  useEffect(() => {
    if (!data) return;

    const res = data.allSchueler.schueler.map((s) => {
      const tmp = { ...s };

      const ergebnisseSchueler = data.allErgebnisByKlasse.find(
        (e) => e.schueler.idschueler === tmp.id,
      ) || [];
      tmp.ergebnisseSchueler = ergebnisseSchueler;
      // welcher versuch
      tmp.versuch = ergebnisseSchueler.length;

      return tmp;
    });
    setSchueler(res);
  }, [data, setSchueler]);

  const disziplinData = data && data.disziplin;
  return {
    loading, schueler, counter, setCounter, disziplin: disziplinData, setErgebnis,
  };
};
