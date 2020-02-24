import React from 'react';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

export default () => {
  const dispatch = useDispatch();

  return (
    <IconButton color="primary" onClick={() => dispatch(push('/user/create'))}>
      <Add />
    </IconButton>
  );
};
