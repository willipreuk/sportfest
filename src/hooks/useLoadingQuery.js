import { useQuery } from '@apollo/react-hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification, setLoading } from '../actions/uiState';

export default (graphqlQuery, options) => {
  const dispatch = useDispatch();
  const { loading, error, ...rest } = useQuery(graphqlQuery, options);
  useEffect(() => void dispatch(setLoading(loading)), [loading, dispatch]);
  useEffect(() => {
    if (error) {
      dispatch(setNotification('error', 'Netzwerkfehler'));
    }
  }, [error, dispatch]);
  return rest;
};
