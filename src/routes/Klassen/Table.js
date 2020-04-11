import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import DataTable from '../../components/DataTable';
import usePagination from '../../hooks/usePagination';
import EditButton from '../../components/EditButton';
import DeleteButton from '../../components/DeleteButton';
import useLoadingQuery from '../../hooks/useLoadingQuery';

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
  mutation DeleteKlasse($id: Int!) {
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
  const loading = useSelector((state) => state.uiState.loading);
  const { onChangeRows, page, onChangePage, rowsPerPage } = usePagination();
  const { data } = useLoadingQuery(GET_KLASSEN, {
    variables: {
      limit: rowsPerPage,
      offset: rowsPerPage * page,
    },
  });

  const [deleteKlasse] = useMutation(DELETE_KLASSE);
  const makeData = useCallback(
    (klasse) => ({
      ...klasse,
      klasse: `${klasse.stufe}/${klasse.name}`,
      actions: (
        <>
          <EditButton path={`/klassen/${klasse.id}`} />
          <DeleteButton action={() => deleteKlasse({ variables: { id: klasse.id } })} />
        </>
      ),
    }),
    [deleteKlasse],
  );

  if (loading || !data) return null;

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
