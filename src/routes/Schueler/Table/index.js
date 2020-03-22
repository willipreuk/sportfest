import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useSelector } from 'react-redux';
import DataTable from '../../../components/DataTable';
import usePagination from '../../../hooks/usePagination';
import Filter from './Filter';
import useSchuelerData from './useSchuelerData';
import useLoadingQuery from '../../../hooks/useLoadingQuery';

const ALL_SCHUELER = gql`
    query Schueler($klasse: Int, $offset: Int, $limit: Int) { 
        allSchueler(idklasse: $klasse, offset: $offset, limit: $limit) {
            total
            schueler {
              id
              vorname
              nachname
              status
              klasse {
                  stufe
                  name
              }
            }
        }
    }
`;

const columns = [
  { id: 'vorname', label: 'Vorname', minWidth: 100 },
  { id: 'nachname', label: 'Nachname', minWidth: 100 },
  { id: 'klasse', label: 'Klasse', minWidth: 50 },
  { id: 'checkbox', label: 'entschuldigt', minWidth: 50 },
];

export default () => {
  const [klasse, setKlasse] = useState(0);
  const loading = useSelector((state) => state.uiState.loading);
  const {
    page, rowsPerPage, onChangeRows, onChangePage,
  } = usePagination([klasse]);
  const {
    rows, total, setData,
  } = useSchuelerData();

  useLoadingQuery(
    ALL_SCHUELER,
    {
      variables: {
        klasse: klasse !== 0 ? klasse : undefined,
        offset: page * rowsPerPage,
        limit: rowsPerPage,
      },
      onCompleted: (res) => setData(res),
    },
  );


  if (loading) return null;

  return (
    <DataTable
      labelRowsPerPage="Schueler pro Seite:"
      title="Schülerliste"
      rowsPerPageOptions={[10, 30, 90]}
      rows={rows}
      rowsPerPage={rowsPerPage}
      columns={columns}
      page={page}
      onChangeRows={onChangeRows}
      onChangePage={onChangePage}
      total={total}
      filter={<Filter klasse={klasse} setKlasse={setKlasse} />}
    />
  );
};
