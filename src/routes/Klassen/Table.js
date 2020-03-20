import React, { useCallback, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import LoadingSpinner from '../../components/LoadingSpinner';
import DataTable from '../../components/DataTable';
import usePagination from '../../hooks/usePagination';
import useLoading from '../../hooks/useLoading';
import EditButton from '../../components/EditButton';
import DeleteButton from '../../components/DeleteButton';

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

const DELETE_KLASSE = gql`
  mutation DeleteKlasse($id: Int) {
    deleteKlasse(id: $id) {
      id
    }
  }
`;

const columns = [
  { id: 'actions', label: '', minWidth: 50 },
  { id: 'klasse', label: 'Klasse', minWidth: 50 },
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

  const [deleteKlasse] = useMutation(DELETE_KLASSE);
  const makeData = useCallback((klasse) => ({
    ...klasse,
    klasse: `${klasse.stufe}/${klasse.name}`,
    actions: (
      <>
        <EditButton path={`/klassen/${klasse.id}`} />
        <DeleteButton action={() => deleteKlasse({ variables: { id: klasse.id } })} />
      </>
    ),
  }), [deleteKlasse]);

  if (loading) return <LoadingSpinner />;

  return (
    <DataTable
      labelRowsPerPage="Klassen pro Seite"
      title="Klassen"
      rowsPerPageOptions={[5, 10, 20]}
      rows={data.allKlassen.klassen.map(makeData)}
      onChangeRows={onChangeRows}
      rowsPerPage={rowsPerPage}
      columns={columns}
      page={page}
      onChangePage={onChangePage}
      total={data.allKlassen.total}
    />
  );
};
