import React, { useEffect, useState } from 'react';
import StatusCheckbox from './StatusCheckbox';

const createData = (s) => {
  const schueler = { ...s };
  schueler.klasse = `${s.klasse.stufe}/${s.klasse.name}`;
  schueler.checkbox = <StatusCheckbox id={schueler.id} status={schueler.status} />;
  return schueler;
};

export default () => {
  const [data, setData] = useState();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data) {
      setRows(data.allSchueler.schueler.map((d) => createData(d)));
      setTotal(data.allSchueler.total);
    }
  }, [data]);

  return {
    rows,
    setData,
    total,
  };
};
