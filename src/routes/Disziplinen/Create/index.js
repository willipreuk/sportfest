import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { push } from 'connected-react-router';
import { setPageName } from '../../../actions/navigation';
import DisziplinenForm from '../DisziplinenForm';
import useLoading from '../../../hooks/useLoading';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ADD_DISZIPLIN = gql`
  mutation AddDisziplin($name: String!, $best: Best!, $einheit: String!) {
    addDisziplin(name: $name, best: $best, einheit: $einheit) {
      id
      name
      best
      einheit
    }
  }
`;

export default () => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(setPageName('Disziplin erstellen')); }, [dispatch]);
  const { loading, setLoading } = useLoading();
  const [addDisziplin] = useMutation(ADD_DISZIPLIN, { refetchQueries: ['Disziplinen'] });

  const onSubmit = useCallback(async (values) => {
    setLoading(true);
    await addDisziplin({ variables: { ...values } });
    dispatch(push('/disziplinen'));
    setLoading(false);
  }, [setLoading, addDisziplin]);

  if (loading) return <LoadingSpinner />;

  return (
    <DisziplinenForm onSubmit={onSubmit} />
  );
};
