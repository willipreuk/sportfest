import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useSelector } from 'react-redux';
import DataTable from '../../components/DataTable';
import usePagination from '../../hooks/usePagination';
import Filter from './Filter';
import useLoadingQuery from '../../hooks/useLoadingQuery';

const ALL_MASSSTAEBE = gql`
  query Massstaebe($klassenStufe: Int, $disziplin: Int, $offset: Int, $limit: Int) {
    allMassstaebe(klassenStufe: $klassenStufe, iddisziplin: $disziplin, offset: $offset, limit: $limit) {
      total
      massstaebe {
        id
        disziplin {
          id
          name
        }
        klassenStufe
        geschlecht
        punkte
        werte
      }
    }
    allDisziplin {
      disziplinen {
        id
        name
      }
    }
  }
`;

const columns = [
  { id: 'disziplin', label: 'Disziplin', minWidth: 50 },
  { id: 'klassenStufe', label: 'Klassenstufe', minWidth: 50 },
  { id: 'geschlecht', label: 'Geschlecht', minWidth: 10 },
  { id: 'punkte', label: 'Punkte', minWidth: 10 },
  { id: 'wert', label: 'Wert', minWidth: 10 },
];

const klassenStufen = [
  { id: 5, name: 5 },
  { id: 6, name: 6 },
  { id: 7, name: 7 },
  { id: 8, name: 8 },
  { id: 9, name: 9 },
  { id: 10, name: 10 },
];

export default () => {
  const [disziplin, setDisziplin] = useState(0);
  const [klassenStufe, setKlassenStufe] = useState(0);
  const loading = useSelector((state) => state.uiState.loading);
  const {
    onChangeRows, rowsPerPage, page, onChangePage,
  } = usePagination([disziplin, klassenStufe]);
  const { data } = useLoadingQuery(ALL_MASSSTAEBE, {
    variables: {
      offset: page * rowsPerPage,
      limit: rowsPerPage,
      disziplin: disziplin !== 0 ? disziplin : undefined,
      klassenStufe: klassenStufe !== 0 ? klassenStufe : undefined,
    },
  });

  if (loading || !data) return null;

  return (
    <DataTable
      labelRowsPerPage="Maßstäbe pro Seite"
      title="Maßstäbe"
      rowsPerPageOptions={[10, 30, 90, 200, 500]}
      rows={data.allMassstaebe.massstaebe.map((m) => ({ ...m, disziplin: m.disziplin.name }))}
      onChangeRows={onChangeRows}
      rowsPerPage={rowsPerPage}
      columns={columns}
      page={page}
      onChangePage={onChangePage}
      total={data.allMassstaebe.total}
      filter={(
        <>
          <Filter label="Disziplin" setValue={setDisziplin} values={data.allDisziplin.disziplinen} value={disziplin} />
          <Filter label="Klasenstufe" setValue={setKlassenStufe} values={klassenStufen} value={klassenStufe} />
        </>
)}
    />
  );
};
