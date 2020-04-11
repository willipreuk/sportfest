/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import useLoading from '../../../hooks/useLoading';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { setPageName } from '../../../actions/navigation';
import UserForm from '../UserForm';

const USER = gql`
  query User($username: String) {
    user(username: $username) {
      rolle
      id
      username
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $username: String, $password: String, $role: Rolle) {
    updateUser(id: $id, username: $username, password: $password, rolle: $role) {
      id
      username
      rolle
    }
  }
`;

export default () => {
  const { username: queryUser } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageName(`Nutzer ${queryUser} bearbeiten`));
  }, [dispatch, queryUser]);

  const { data, loading: tmpLoading } = useQuery(USER, { variables: { username: queryUser } });
  const [updateUser] = useMutation(UPDATE_USER);
  const { loading, setLoading } = useLoading();
  useEffect(() => setLoading(tmpLoading), [setLoading, tmpLoading]);

  const onSubmit = useCallback(
    async (values) => {
      setLoading(true);
      updateUser({ variables: { id: data.user.id, ...values } }).then(() => {
        setLoading(false);
        dispatch(push('/user'));
      });
    },
    [setLoading, updateUser, data, dispatch],
  );

  if (loading) return <LoadingSpinner />;

  return (
    <UserForm
      onSubmit={onSubmit}
      initialValues={{
        username: data.user.username,
        role: data.user.rolle,
        password: '',
        passwordConfirmation: '',
      }}
    />
  );
};
