import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import UserForm from '../UserForm';
import useLoading from '../../../hooks/useLoading';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ADD_USER = gql`
  mutation AddUser($username: String!, $rolle: Rolle!, $password: String!) {
    addUser(username: $username, password: $password, rolle: $rolle) {
      id
      username
    }
  }
`;

export default () => {
  const [addUser] = useMutation(ADD_USER);
  const dispatch = useDispatch();
  const { loading, setLoading } = useLoading();

  const onSubmit = useCallback(
    async (values) => {
      setLoading(true);
      await addUser({
        variables: {
          username: values.username,
          password: values.password,
          rolle: values.role,
        },
      });
      setLoading(false);
      dispatch(push('/user'));
    },
    [setLoading, addUser, dispatch],
  );

  if (loading) return <LoadingSpinner />;

  return <UserForm onSubmit={onSubmit} />;
};
