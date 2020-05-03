import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { push } from 'connected-react-router';
import { setPageName } from '../../../actions/navigation';
import DisziplinenForm from '../KlassenForm';
import { setLoading } from '../../../actions/uiState';

const ADD_KLASSE = gql`
  mutation AddKlasse($name: Int!, $stufe: Int!) {
    addKlasse(name: $name, stufe: $stufe) {
      id
      name
      stufe
    }
  }
`;

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageName('Klasse erstellen'));
  }, [dispatch]);
  const [addKlasse] = useMutation(ADD_KLASSE, { refetchQueries: ['Klassen'] });

  const onSubmit = useCallback(
    async (values) => {
      setLoading(true);
      await addKlasse({ variables: { ...values } });
      setLoading(false);
      dispatch(push('/disziplinen'));
    },
    [addKlasse, dispatch],
  );

  return <DisziplinenForm onSubmit={onSubmit} />;
};
