import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import useLoading from '../../../hooks/useLoading';
import LoadingSpinner from '../../../components/LoadingSpinner';
import DisziplinenForm from '../DisziplinenForm';

const GET_DISZIPLIN = gql`
  query GetDisziplin($id: Int!) {
    disziplin(id: $id) {
      name
      best
      einheit
      id
      klasse
    }
  }
`;

const UPDATE_DISZIPLIN = gql`
  mutation UpdateDisziplin(
    $id: Int!
    $best: Best
    $einheit: String
    $name: String!
    $klasse: Boolean!
  ) {
    updateDisziplin(id: $id, best: $best, einheit: $einheit, name: $name, klasse: $klasse) {
      id
    }
  }
`;

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [updateDisziplin] = useMutation(UPDATE_DISZIPLIN, { refetchQueries: ['Disziplinen'] });
  const { data, loading: queryLoading } = useQuery(GET_DISZIPLIN, {
    variables: { id: parseInt(id, 10) },
  });
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    setLoading(queryLoading);
  }, [setLoading, queryLoading]);

  const onSubmit = useCallback(
    async (values) => {
      setLoading(true);
      await updateDisziplin({ variables: { id: parseInt(id, 10), ...values } });
      setLoading(false);
      dispatch(push('/disziplinen'));
    },
    [dispatch, setLoading, updateDisziplin, id],
  );

  if (loading) return <LoadingSpinner />;

  return (
    <DisziplinenForm
      onSubmit={onSubmit}
      initialValues={{
        name: data.disziplin.name,
        best: data.disziplin.best,
        einheit: data.disziplin.einheit,
        klasse: data.disziplin.klasse,
      }}
    />
  );
};
