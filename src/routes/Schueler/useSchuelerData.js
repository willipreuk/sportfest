import { useEffect, useState } from 'react';

const createData = (s) => {
  const schueler = { ...s };
  schueler.klasse = `${s.klasse.stufe}/${s.klasse.name}`;
  return schueler;
};

export default () => {
  const [data, setData] = useState();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) setRows(data.allSchueler.schueler.map((d) => createData(d)));
  }, [data]);

  return { rows, setData, total: data && data.allSchueler.total };
};
