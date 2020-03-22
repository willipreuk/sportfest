import { useQuery } from '@apollo/react-hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../actions/uiState';

export default (graphqlQuery, options) => {
  const dispatch = useDispatch();
  const { loading, ...rest } = useQuery(graphqlQuery, options);
  useEffect(() => void dispatch(setLoading(loading)), [loading, dispatch]);
  return rest;
};
