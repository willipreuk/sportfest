import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import DataTable from '../../components/DataTable';
import usePagination from '../../hooks/usePagination';
import CreateButton from '../../components/CreateButton';
import EditButton from '../../components/EditButton';
import DeleteButton from '../../components/DeleteButton';
import useLoadingQuery from '../../hooks/useLoadingQuery';

const ALL_USER = gql`
  query User {
    allUser {
      username
      rolle
      id
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const columns = [
  { id: 'actions', label: '', minWidth: 10 },
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'username', label: 'Nutzername', minWidth: 100 },
  { id: 'rolle', label: 'Rolle', minWidth: 100 },
];

export default () => {
  const { data } = useLoadingQuery(ALL_USER);
  const [deleteUserMutation] = useMutation(DELETE_USER, { refetchQueries: ['User'] });
  const { page, rowsPerPage, onChangeRows, onChangePage } = usePagination([]);

  const deleteUser = useCallback((id) => () => deleteUserMutation({ variables: { id } }), [
    deleteUserMutation,
  ]);

  if (!data) return null;

  return (
    <DataTable
      labelRowsPerPage="Nutzer pro Seite"
      title="Nutzer"
      rowsPerPageOptions={[5, 10, 25]}
      rows={data.allUser.map((u) => {
        const user = { ...u };
        user.actions = (
          <>
            <EditButton path={`/user/${u.username}`} />
            <DeleteButton action={deleteUser(u.id)} />
          </>
        );
        return user;
      })}
      onChangeRows={onChangeRows}
      rowsPerPage={rowsPerPage}
      columns={columns}
      page={page}
      onChangePage={onChangePage}
      total={data.allUser.length}
      filter={<CreateButton path="/user/create" />}
    />
  );
};
