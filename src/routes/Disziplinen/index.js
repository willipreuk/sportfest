import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import DataTable from '../../components/DataTable';
import usePagination from '../../hooks/usePagination';
import useLoading from '../../hooks/useLoading';
import LoadingSpinner from '../../components/LoadingSpinner';

const ALL_DISZIPLINEN = gql`
  query Disziplinen($offset: Int, $limit: Int) {
    allDisziplin(offset: $offset, limit: $limit) {
      total
      disziplinen {
        id
        name
        best
        einheit
      }
    }
  }
`;

const columns = [
  { id: 'name', label: 'Name', minWidth: 50 },
  { id: 'best', label: 'Bestes', minWidth: 50 },
  { id: 'einheit', label: 'Einheit', minWidth: 50 },
];

export default () => {
  const { loading, setLoading } = useLoading();
  const { data, loading: queryLoading } = useQuery(ALL_DISZIPLINEN);
  useEffect(() => setLoading(queryLoading), [setLoading, queryLoading]);

  const {
    onChangePage, onChangeRows, page, rowsPerPage,
  } = usePagination();

  if (loading) return <LoadingSpinner />;

  return (
    <DataTable
      labelRowsPerPage="Disziplinen pro Seite"
      title="Disziplinen"
      rowsPerPageOptions={[5, 10, 20]}
      rows={data.allDisziplin.disziplinen}
      onChangeRows={onChangeRows}
      rowsPerPage={rowsPerPage}
      columns={columns}
      page={page}
      onChangePage={onChangePage}
      total={data.allDisziplin.total}
    />
  );
};
