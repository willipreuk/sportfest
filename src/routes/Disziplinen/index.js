import React, { useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import DataTable from '../../components/DataTable';
import usePagination from '../../hooks/usePagination';
import useLoading from '../../hooks/useLoading';
import LoadingSpinner from '../../components/LoadingSpinner';
import CreateButton from '../../components/CreateButton';
import EditButton from '../../components/EditButton';
import DeleteButton from '../../components/DeleteButton';

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

const DELETE_DISZIPLIN = gql`
  mutation DeleteDisziplinen($id: Int!) {
    deleteDisziplin(id: $id) {
      id
    }
  }
`;

const columns = [
  { id: 'actions', label: '', minWidth: 20 },
  { id: 'name', label: 'Name', minWidth: 50 },
  { id: 'best', label: 'Bestes', minWidth: 50 },
  { id: 'einheit', label: 'Einheit', minWidth: 50 },
];

export default () => {
  const { loading, setLoading } = useLoading();
  const [deleteDisziplinMutation] = useMutation(DELETE_DISZIPLIN, { refetchQueries: ['Disziplinen'] });
  const { data, loading: queryLoading } = useQuery(ALL_DISZIPLINEN);
  useEffect(() => setLoading(queryLoading), [setLoading, queryLoading]);

  const {
    onChangePage, onChangeRows, page, rowsPerPage,
  } = usePagination();

  const deleteDisziplin = useCallback((id) => () => deleteDisziplinMutation({ variables: { id } }),
    [deleteDisziplinMutation]);

  if (loading) return <LoadingSpinner />;

  return (
    <DataTable
      labelRowsPerPage="Disziplinen pro Seite"
      title="Disziplinen"
      rowsPerPageOptions={[5, 10, 20]}
      rows={data.allDisziplin.disziplinen.map((disziplin) => ({
        ...disziplin,
        actions: (
          <>
            <EditButton path={`/disziplinen/${disziplin.id}`} />
            <DeleteButton action={deleteDisziplin(disziplin.id)} />
          </>
        ),
      }))}
      onChangeRows={onChangeRows}
      rowsPerPage={rowsPerPage}
      columns={columns}
      page={page}
      onChangePage={onChangePage}
      total={data.allDisziplin.total}
      filter={<CreateButton path="/disziplinen/create" />}
    />
  );
};
