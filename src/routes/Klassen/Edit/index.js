import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import KlassenForm from '../KlassenForm';
import { setLoading } from '../../../actions/uiState';
import useLoadingQuery from '../../../hooks/useLoadingQuery';

const GET_KLASSE = gql`
  query GetKlasse($id: Int!) {
    klasse(id: $id) {
      name
      stufe
      id
    }
  }
`;

const UPDATE_KLASSE = gql`
  mutation UpdateKlasse($id: Int!, $name: Int, $stufe: Int) {
    updateKlasse(id: $id, name: $name, stufe: $stufe) {
      id
    }
  }
`;

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [updateDisziplin] = useMutation(UPDATE_KLASSE, { refetchQueries: ['Klassen'] });
  const { data } = useLoadingQuery(GET_KLASSE, {
    variables: { id: parseInt(id, 10) },
  });

  const onSubmit = useCallback(
    async ({ stufe, name }) => {
      dispatch(setLoading(true));
      await updateDisziplin({
        variables: { id: parseInt(id, 10), stufe: parseInt(stufe, 10), name: parseInt(name, 10) },
      });
      dispatch(setLoading(false));
      dispatch(push('/klassen'));
    },
    [dispatch, updateDisziplin, id],
  );

  if (!data) return null;

  return (
    <KlassenForm
      onSubmit={onSubmit}
      initialValues={{
        name: data.klasse.name,
        stufe: data.klasse.stufe,
      }}
    />
  );
};
