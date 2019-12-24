import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import DataTable from '../../../components/DataTable';
import usePagination from '../../../hooks/usePagination';
import Filter from './Filter';
import useSchuelerData from './useSchuelerData';
import useLoading from '../../../hooks/useLoading';
import LoadingSpinner from '../../../components/LoadingSpinner';

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
  const {
    page, rowsPerPage, onChangeRows, onChangePage,
  } = usePagination([klasse]);
  const {
    rows, total, setData,
  } = useSchuelerData();
  const { loading, setLoading } = useLoading();

  const { loading: tmpLoading } = useQuery(
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

  useEffect(() => { setLoading(tmpLoading); }, [tmpLoading, setLoading]);

  if (loading) return <LoadingSpinner />;

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
