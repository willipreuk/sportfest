import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import LoadingSpinner from '../../components/LoadingSpinner';
import DataTable from '../../components/DataTable';
import usePagination from '../../hooks/usePagination';
import useLoading from '../../hooks/useLoading';

const GET_KLASSEN = gql`
  query GetKlassen($offset: Int, $limit: Int, $stufe: Int) {
    allKlassen(offset: $offset, limit: $limit, stufe: $stufe) {
      total
      klassen {
        name
        stufe
        id
      }
    }
  }
`;

const columns = [
  { id: 'actions', label: '', minWidth: 50 },
  { id: 'stufe', label: 'Stufe', minWidth: 50 },
  { id: 'name', label: '', minWidth: 50 },
];

export default () => {
  const { loading, setLoading } = useLoading();
  const {
    onChangeRows, page, onChangePage, rowsPerPage,
  } = usePagination();
  const { data, loading: queryLoading } = useQuery(
    GET_KLASSEN,
    {
      variables:
        {
          limit: rowsPerPage,
          offset: rowsPerPage * page,
        },
    },
  );
  useEffect(() => { setLoading(queryLoading); }, [queryLoading, setLoading]);

  if (loading) return <LoadingSpinner />;

  return (
    <DataTable
      labelRowsPerPage="Klassen pro Seite"
      title="Klassen"
      rowsPerPageOptions={[5, 10, 20]}
      rows={data.allKlassen.klassen}
      onChangeRows={onChangeRows}
      rowsPerPage={rowsPerPage}
      columns={columns}
      page={page}
      onChangePage={onChangePage}
      total={data.allKlassen.total}
    />
  );
};
