import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { IconButton, makeStyles } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import useLoading from '../../hooks/useLoading';
import LoadingSpinner from '../../components/LoadingSpinner';
import DataTable from '../../components/DataTable';
import usePagination from '../../hooks/usePagination';


const ALL_USER = gql`
  query User {
    allUser {
      username
      rolle
      id
    }
  }
`;

const useStyles = makeStyles(() => ({
  checkbox: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const columns = [
  { id: 'edit', label: 'Bearbeiten', minWidth: 10 },
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'username', label: 'Nutzername', minWidth: 100 },
  { id: 'rolle', label: 'Rolle', minWidth: 100 },
];

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading: tmpLoading, data } = useQuery(ALL_USER);
  const { loading, setLoading } = useLoading();
  useEffect(() => setLoading(tmpLoading), [setLoading, tmpLoading]);
  const {
    page, rowsPerPage, onChangeRows, onChangePage,
  } = usePagination([]);

  if (loading) return <LoadingSpinner />;

  return (
    <DataTable
      labelRowsPerPage="Nutzer pro Seite"
      title="Nutzer"
      rowsPerPageOptions={[5, 10, 25]}
      rows={data.allUser.map((u) => {
        const user = { ...u };
        user.edit = (
          <IconButton
            className={classes.checkbox}
            onClick={() => dispatch(push(`/user/${u.username}`))}
          >
            <Edit />
          </IconButton>
        );
        return user;
      })}
      onChangeRows={onChangeRows}
      rowsPerPage={rowsPerPage}
      columns={columns}
      page={page}
      onChangePage={onChangePage}
      total={data.allUser.length}
    />
  );
};
