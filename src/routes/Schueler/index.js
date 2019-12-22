import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoadingSpinner from '../../components/LoadingSpinner';
import DataTable from '../../components/DataTable';
import usePagination from '../../hooks/usePagination';
import Filter from './Filter';

const ALL_SCHUELER = gql`
    query Schueler($klasse: Int, $offset: Int, $limit: Int) { 
        allSchueler(idklasse: $klasse, offset: $offset, limit: $limit) {
            total
            schueler {
              vorname
              nachname
              klasse {
                  stufe
                  name
              }
            }
        }
    }
`;

const columns = [
  { id: 'vorname', label: 'Vorname', minWidth: 170 },
  { id: 'nachname', label: 'Nachname', minWidth: 100 },
  { id: 'klasse', label: 'Klasse', minWidth: 170 },
];

const createData = (s) => {
  const schueler = { ...s };
  schueler.klasse = `${s.klasse.stufe}/${s.klasse.name}`;
  return schueler;
};

export default function StickyHeadTable() {
  const [klasse, setKlasse] = useState(0);
  const {
    page, rowsPerPage, onChangeRows, onChangePage,
  } = usePagination([]);

  const { data, loading } = useQuery(
    ALL_SCHUELER,
    {
      variables: {
        klasse: klasse !== 0 ? klasse : undefined,
        offset: page * rowsPerPage,
        limit: rowsPerPage,
      },
    },
  );
  if (loading) return <LoadingSpinner />;

  const rows = data.allSchueler.schueler.map((s) => createData(s));

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
      total={data.allSchueler.total}
      filter={<Filter klasse={klasse} setKlasse={setKlasse} />}
    />
  );
}
